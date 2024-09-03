import { LitsType } from '@/types';
import styles from './styles.module.css';
import VideoPreview from '../video-preview';

export interface VideoListProps {
  list: LitsType[];
}

export function VideoList({ list }: VideoListProps) {
  return (
    <>
      <ul className={styles.listContainer}>
        {list?.map((item: LitsType, index: number) => {
          return (
            <li key={index} className={styles.videoList}>
              <VideoPreview item={item} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
