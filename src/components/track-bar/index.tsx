import React, { ChangeEvent, MouseEvent, useState } from 'react';
import styles from './styles.module.css';
import { formatTime } from '@/utils';

interface TrackBarProps {
  duration?: string | number | undefined | any;
  videoUrl?: string;
  onTimeChange: (time: number) => void;
  onFocus: () => void;
}

export default function TrackBar({
  duration = 0,
  videoUrl,
  onTimeChange,
  onFocus,
}: TrackBarProps) {
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [previewTime, setPreviewTime] = useState(0);
  const [previewPos, setPreviewPos] = useState(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

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
    setCurrentTime(newTime);
    onTimeChange(newTime);
  };

  const handleOnFocus = () => {
    onFocus();
  };

  return (
    <div className={styles.controls}>
      <input
        type='range'
        min='0'
        max={duration}
        value={currentTime}
        onChange={handleTrackbarChange}
        onMouseMove={handleTrackbarMouseMove}
        onMouseEnter={handleTrackbarMouseEnter}
        onMouseLeave={handleTrackbarMouseLeave}
        className={styles.trackBar}
        onFocus={handleOnFocus}
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
            <source src={videoUrl} type='video/mp4' />
          </video>
          <div className={styles.timestamp}>{formatTime(previewTime)}</div>
        </div>
      )}
    </div>
  );
}
