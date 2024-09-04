'use client';
export const metadata: Metadata = {
  title: 'My Page Title',
};

import { Metadata } from 'next';
import { VideoList } from '@/components/video-list';
import useFetchVideo from '@/hooks/use-fetch-video';
import PreviewLayout from '@/components/preview-layout';

export function VideoPreview() {
  const { data, isLoading } = useFetchVideo();
  console.log('isLoading', data, isLoading);

  return (
    <PreviewLayout>
      <VideoList list={data} isLoading={isLoading || !data} />
    </PreviewLayout>
  );
}
