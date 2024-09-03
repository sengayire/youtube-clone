'use client';
export const metadata: Metadata = {
  title: 'My Page Title',
};

import { Metadata } from 'next';
import { VideoList } from '@/components/video-list';
import useFetchVideo from '@/hooks/use-fetch-video';

export function VideoPreview() {
  const { data } = useFetchVideo();

  return <VideoList list={data} />;
}
