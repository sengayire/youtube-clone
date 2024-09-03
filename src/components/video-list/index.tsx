import VideoPreview from '../video-preview';
import styles from './styles.module.css';

export type LitsType = {
  id: number;
  title: string;
  thumbnailUrl: string;
  duration: string;
  uploadTime: string;
  views: string;
  author: string;
  videoUrl: string;
  description: string;
  subscriber: string;
  isLive: boolean;
};
export interface VideoListProps {
  list: LitsType[];
}

export const VideoList = ({ list }: VideoListProps) => {
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
};
