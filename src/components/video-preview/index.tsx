import React, {
  ReactEventHandler,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './styles.module.css';
import TrackBar from '../track-bar';
import VideoItem from '../video-item';
import { LitsType } from '@/types';
import { VideoInfo } from '../video-info';

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
  let timer: NodeJS.Timeout | number | undefined;

  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [trackInteracted, setTrackInteracted] = useState(false);
  const [duration, setDuration] = useState(0);

  const remainingTime = duration - currentTime;

  const handleMouseEnter = () => {
    if (mode === 'interactive') {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current?.pause();
      if (!trackInteracted) {
        videoRef.current.currentTime = 0;
      }
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current?.currentTime ?? 0);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current?.duration ?? 0);
  };

  useEffect(() => {
    if (isHovered) {
      console.log(isHovered);
      timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef?.current?.play();
        }
      }, 2000);
    }
    return () => clearInterval(timer);
  }, [isHovered]);

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

  const handleSeek = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    onVideoSeek?.(e);
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
        onVideoSeek={handleSeek}
        onVideoResume={onVideoResume}
      >
        {isHovered && (
          <TrackBar
            duration={duration}
            videoUrl={item.videoUrl}
            onTimeChange={handleTimeChange}
            onFocus={() => setTrackInteracted(true)}
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
