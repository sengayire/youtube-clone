import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import TrackBar from '../track-bar';
import { formatTime } from '@/utils';
import VideoItem from '../video-item';
import { LitsType } from '../video-list';

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
  const [previewTime, setPreviewTime] = useState(0);
  const [previewPos, setPreviewPos] = useState(0);

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
      videoRef.current.currentTime = 0; // Reset to the beginning
    } // Reset the video to the beginning
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef?.current?.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
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

  const handleTrackbarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  const handleTrackbarMouseMove = (e: ChangeEvent<HTMLInputElement>) => {
    const trackbarWidth = e.target.clientWidth;
    const clickPosition = e.nativeEvent.offsetX;
    const time = (clickPosition / trackbarWidth) * duration;
    setPreviewTime(time);
    setPreviewPos(clickPosition);
  };

  const remainingTime = duration - currentTime;
  console.log('videoRef', videoRef.current?.currentTime, duration, currentTime);
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
            currentTime={currentTime}
            videoUrl={item.videoUrl}
            handleTrackbarChange={handleTrackbarChange}
            handleTrackbarMouseMove={handleTrackbarMouseMove}
            previewTime={previewTime}
            previewPos={previewPos}
          />
        )}
      </VideoItem>

      <div className={styles.videoInfoContainer}>
        <div>
          <img src='/placeholder.webp' className={styles.placeholderImage} />
        </div>
        <div>
          <h3> {item.title}</h3>
          <div className={styles.videoInfo}>
            <p>{item.author}</p>
            <div className={styles.videoViews}>
              <div>{item.views}</div>
              <div className={styles.circle}></div>
              <div>{item.uploadTime}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
