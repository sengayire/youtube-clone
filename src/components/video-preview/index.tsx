import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import TrackBar from '../track-bar';
import VideoItem from '../video-item';
import { LitsType } from '@/types';
import { VideoInfo } from '../video-info';

interface VideoPreviewProps {
  item: LitsType;
}

/**
 *
 * Preview component
 * @param item
 * @returns tsx
 */
export default function VideoPreview({ item }: VideoPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState(0);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play();
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

  const remainingTime = duration - currentTime;

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
