import React, { ChangeEvent, MouseEvent, useRef, useState } from 'react';
import styles from './styles.module.css';
import { formatTime } from '@/utils';

interface TrackBarProps {
  duration?: string | number | undefined | any;
  videoUrl?: string;
  onTimeChange?: (time: number) => void;
  onFocus?: () => void;
  currentTime: number;
}

export default function TrackBar({
  duration = 0,
  videoUrl,
  onTimeChange,
  onFocus,
  currentTime,
}: TrackBarProps) {
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [previewTime, setPreviewTime] = useState(0);
  const [previewPos, setPreviewPos] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const progress = (currentTime / duration) * 100;

  const handleTrackbarMouseEnter = () => {
    setIsScrubbing(true);
  };

  const handleTrackbarMouseLeave = () => {
    setIsScrubbing(false);
  };

  const handleTrackbarMouseMove = (e: MouseEvent<HTMLInputElement>) => {
    const trackbarWidth = e.currentTarget.clientWidth;
    const clickPosition = e.nativeEvent.offsetX;
    const time = (clickPosition / trackbarWidth) * duration;
    setPreviewTime(time);
    setPreviewPos(clickPosition);
  };

  const handleTrackbarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);

    onTimeChange?.(newTime);
  };

  const handleOnFocus = () => {
    onFocus?.();
  };

  if (currentTime != duration) {
    if (inputRef.current) {
      inputRef.current.style.background = `linear-gradient(to right, #f50 ${progress}%, #ccc ${progress}%)`;
    }
  }

  return (
    <div className={styles.controls}>
      <input
        ref={inputRef}
        type='range'
        min='0'
        id={'trackBar'}
        max={duration}
        value={currentTime}
        onChange={handleTrackbarChange}
        onMouseMove={handleTrackbarMouseMove}
        onMouseEnter={handleTrackbarMouseEnter}
        onMouseLeave={handleTrackbarMouseLeave}
        className={styles.trackBar}
        onFocus={handleOnFocus}
        alt=''
      />

      {isScrubbing && (
        <div
          className={styles.previewPopup}
          style={{ left: `${previewPos}px` }}
        >
          <video
            muted
            className={styles.previewVideo}
            style={{ objectPosition: `${(previewTime / duration) * 100}% 0` }}
          >
            <source
              src={
                'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
              }
              type='video/mp4'
            />
          </video>
          <div className={styles.timestamp}>{formatTime(previewTime)}</div>
        </div>
      )}
    </div>
  );
}
