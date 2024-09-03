import styles from './styles.module.css';

interface VideoInfoProps {
  title: string;
  author: string;
  views: string;
  uploadTime: string;
}
export function VideoInfo({
  title,
  author,
  views,
  uploadTime,
}: VideoInfoProps) {
  return (
    <div className={styles.videoInfoContainer}>
      <div>
        <h3> {title}</h3>
        <div className={styles.videoInfo}>
          <p>{author}</p>
          <div className={styles.videoViews}>
            <div>{views}</div>
            <div className={styles.circle}></div>
            <div>{uploadTime}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
