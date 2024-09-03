import React, { useState } from 'react';
import styles from './styles.module.css';
import { formatTime } from '@/utils';

interface TrackBarProps {
  duration?: string | number | undefined | any;
  currentTime?: number;
  handleTrackbarChange?: (e?: any) => void;
  handleTrackbarMouseMove?: (e?: any) => void;
  videoUrl?: string;
  previewTime?: number;
  previewPos?: number;
}

export default function TrackBar({
  previewTime,
  previewPos,
  duration = 0,
  currentTime,
  videoUrl,
  handleTrackbarChange,
  handleTrackbarMouseMove,
}: TrackBarProps) {
  const [isScrubbing, setIsScrubbing] = useState(false);

  const handleTrackbarMouseEnter = () => {
    setIsScrubbing(true);
  };

  const handleTrackbarMouseLeave = () => {
    setIsScrubbing(false);
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
      />

      {isScrubbing && (
        <div
          className={styles.previewPopup}
          style={{ left: `${previewPos}px` }}
        >
          <video
            src={videoUrl}
            className={styles.previewVideo}
            muted
            style={{ objectPosition: `${(previewTime / duration) * 100}% 0` }}
          />
          <div className={styles.timestamp}>{formatTime(currentTime)}</div>
        </div>
      )}
    </div>
  );
}
