import React, { ReactEventHandler, useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import TrackBar from '../track-bar';
import VideoItem from '../video-item';
import { LitsType } from '@/types';
import { VideoInfo } from '../video-info';
import { VideoPlaceholder } from '../video-placeholder';

interface VideoPreviewProps {
  item: LitsType;
}
interface InteractiveProps {
  mode?: 'interactive';
  onVideoStart?: () => void;
  onVideoEnd?: () => void;
  onVideoResume?: () => void;
  onVideoSeek?: ReactEventHandler<HTMLVideoElement>;
}
interface StaticProps {
  mode?: 'static';
  onVideoStart?: never;
  onVideoEnd?: never;
  onVideoResume?: never;
  onVideoSeek?: never;
}
type VideoItemProps = VideoPreviewProps & (InteractiveProps | StaticProps);

/**
 *
 * Preview component
 * @param item
 * @returns tsx
 */
export default function VideoPreview({
  item,
  onVideoEnd,
  onVideoResume,
  onVideoStart,
  onVideoSeek,
  mode = 'interactive',
}: VideoItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState(0);

  const remainingTime = duration - currentTime;

  const handleMouseEnter = () => {
    if (mode === 'interactive') {
      setIsHovered(true);
      if (videoRef.current) {
        setTimeout(() => {
          videoRef?.current?.play();
        }, 2000);
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current?.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current?.currentTime ?? 0);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current?.duration ?? 0);
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('timeupdate', handleTimeUpdate);
      videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    }
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
        videoElement.removeEventListener(
          'loadedmetadata',
          handleLoadedMetadata
        );
      }
    };
  }, []);

  const handleTimeChange = (time: number) => {
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };
  return (
    <div
      className={styles.videoContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <VideoItem
        ref={videoRef}
        thumbnailUrl={item.thumbnailUrl}
        videoUrl={item.videoUrl}
        isHovered={isHovered}
        remainingTime={remainingTime}
        onVideoStart={onVideoStart}
        onVideoEnd={onVideoEnd}
        onVideoSeek={onVideoSeek}
        onVideoResume={onVideoResume}
      >
        {isHovered && (
          <TrackBar
            duration={duration}
            videoUrl={item.videoUrl}
            onTimeChange={handleTimeChange}
          />
        )}
      </VideoItem>
      <VideoInfo
        title={item.title}
        author={item.author}
        views={item.views}
        uploadTime={item.uploadTime}
      />
    </div>
  );
}
