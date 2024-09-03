'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
export const metadata: Metadata = {
  title: 'My Page Title',
};

import { Metadata } from 'next';
import { VideoList } from '@/components/video-list';

// const env = process.env;

export function VideoPreview() {
  const [videoData, setVideoData] = useState();

  const fetchAPI = () => {
    axios
      .get(
        'https://gist.githubusercontent.com/poudyalanil/ca84582cbeb4fc123a13290a586da925/raw/14a27bd0bcd0cd323b35ad79cf3b493dddf6216b/videos.json'
      )
      .then(data => {
        setVideoData(data.data);
      });
  };
  useEffect(() => {
    fetchAPI();
  }, []);

  return <VideoList list={videoData ?? []} />;
}
