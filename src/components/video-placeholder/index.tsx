import React from 'react';
import styles from './styles.module.css';
type Props = {};

export function VideoPlaceholder({}: Props) {
  return (
    <div className={styles.videoPlaceholder}>
      <div className={styles.fauxImageWrapper}>
        <div className={styles.fauxImage} />
      </div>
      <div className={styles.fauxText} />
      <div className={styles.fauxText} />
      <div className={styles.hort} />
    </div>
  );
}
