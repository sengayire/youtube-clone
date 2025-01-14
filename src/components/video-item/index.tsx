import { formatTime } from '@/utils';
import React, {
  forwardRef,
  ReactEventHandler,
  ReactNode,
  useState,
} from 'react';
import styles from './styles.module.css';

import { IoMdVolumeHigh, IoMdVolumeOff } from 'react-icons/io';
interface VideoItemProps {
  thumbnailUrl: string;
  videoUrl: string;
  isHovered?: boolean;
  remainingTime?: number;
  currentTime?: number;
  duration?: number;
  children?: ReactNode;
  interactive?: boolean;
  onVideoStart?: () => void;
  onVideoEnd?: () => void;
  onVideoResume?: () => void;
  onVideoSeek?: ReactEventHandler<HTMLVideoElement>;
  controls?: boolean;
}

const VideoItem = forwardRef<HTMLVideoElement, VideoItemProps>(
  (
    {
      thumbnailUrl,
      videoUrl,
      isHovered,
      remainingTime,
      children,
      onVideoEnd,
      onVideoResume,
      onVideoStart,
      onVideoSeek,
      duration,
      currentTime,
      controls,
    }: VideoItemProps,

    ref
  ) => {
    const [isMuted, setIsMutes] = useState(true);

    const handleSoundClicked = () => {
      setIsMutes(prev => !prev);
    };
    const handlePause = () => {
      if (currentTime === duration) {
        onVideoEnd?.();
      } else {
        onVideoResume?.();
      }
    };
    return (
      <div className={styles.videoItemContainer}>
        <video
          ref={ref}
          muted={isMuted}
          style={{ display: isHovered ? 'block' : 'none' }}
          className={styles.video}
          onPlay={onVideoStart}
          onEnded={onVideoEnd}
          onSeeked={onVideoSeek}
          onPause={handlePause}
          poster={thumbnailUrl}
          controls={controls}
        >
          <source src={videoUrl} type='video/mp4' />
        </video>
        {isHovered && !controls && (
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
        {!controls ? (
          <>
            <div className={styles.remainingDuration}>
              {formatTime(remainingTime ?? 0)}
            </div>
            <div> {children}</div>
          </>
        ) : null}
      </div>
    );
  }
);

VideoItem.displayName = 'VideoItem';
export default VideoItem;
