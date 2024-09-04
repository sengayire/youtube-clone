import { LitsType } from '@/types';
import styles from './styles.module.css';
import VideoPreview from '../video-preview';
import { VideoPlaceholder } from '../video-placeholder';

export interface VideoListProps {
  list: LitsType[];
  isLoading: boolean;
}

export function VideoList({ list, isLoading }: VideoListProps) {
  return (
    <ul className={styles.listContainer}>
      {list?.map((item: LitsType, index: number) => {
        return (
          <li key={index} className={styles.videoList}>
            {isLoading ? (
              <VideoPlaceholder />
            ) : (
              <VideoPreview mode='interactive' item={item} />
            )}
          </li>
        );
      })}
    </ul>
  );
}
