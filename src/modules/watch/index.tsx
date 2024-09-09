'use client';
import VideoItem from '@/components/video-item';
import { LitsType } from '@/types';
import React, { useEffect, useRef } from 'react';

import styles from './styles.module.css';
import PreviewLayout from '@/components/preview-layout';

const item: LitsType = {
  id: 1,
  title: 'Big Buck Bunny',
  thumbnailUrl:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png',
  duration: '8:18',
  uploadTime: 'May 9, 2011',
  views: '24,969,123',
  author: 'Vlc Media Player',
  videoUrl:
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  description:
    "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
  subscriber: '25254545 Subscribers',
  isLive: true,
};
export function Watch() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    videoRef.current?.play();
  }, []);

  return (
    // <PreviewLayout>
    //   <div className={styles.playerContainer}>
    //     <VideoItem
    //       ref={videoRef}
    //       thumbnailUrl={item.thumbnailUrl}
    //       videoUrl={item.videoUrl}
    //       isHovered={true}
    //       controls
    //     />
    //   </div>
    // </PreviewLayout>
    <div className={styles.gridLearn}>
      <div className={styles.gridLearnOne}>1 one</div>
      <div className={styles.gridLearnTwo}>2 two</div>
      <div className={styles.gridLearnThree}>3 three</div>
      <footer className={styles.gridLearnFour}>4 four</footer>
    </div>
  );
}
