import { formatTime } from '@/utils';
import React, { forwardRef, ReactNode, useState } from 'react';
import styles from './styles.module.css';

import { IoMdVolumeHigh, IoMdVolumeOff } from 'react-icons/io';
<IoMdVolumeHigh />;
interface VideoItemProps {
  thumbnailUrl: string;
  videoUrl: string;
  isHovered: boolean;
  remainingTime: number;
  children: ReactNode;
}

const VideoItem = forwardRef<HTMLVideoElement, VideoItemProps>(
  (
    {
      thumbnailUrl,
      videoUrl,
      isHovered,
      remainingTime,
      children,
    }: VideoItemProps,
    ref
  ) => {
    const [isMuted, setIsMutes] = useState(true);

    const handleSoundClicked = () => {
      setIsMutes(prev => !prev);
    };
    return (
      <div className={styles.videoItemContainer}>
        <video
          ref={ref}
          muted={isMuted}
          style={{ display: isHovered ? 'block' : 'none' }}
          className={styles.video}
        >
          <source src={videoUrl} type='video/mp4' />
        </video>
        {isHovered && (
          <div className={styles.soundTrack} onClick={handleSoundClicked}>
            {isMuted ? <IoMdVolumeOff /> : <IoMdVolumeHigh />}
          </div>
        )}
        {!isHovered && (
          <img
            src={thumbnailUrl}
            alt='Video Thumbnail'
            className={styles.thumbnail}
          />
        )}
        <div className={styles.remainingDuration}>
          {formatTime(remainingTime)}
        </div>

        <div>{children}</div>
      </div>
    );
  }
);

VideoItem.displayName = 'VideoItem';
export default VideoItem;
