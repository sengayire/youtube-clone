import React, { ReactNode } from 'react';
import styles from './styles.module.css';

type Props = {
  children: ReactNode;
};

export default function PreviewLayout({ children }: Props) {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.layoutHeader}>
        <h3>Youtube clone</h3>
      </div>
      <div className={styles.listContainer}>
        <div className={styles.leftSideBar}></div>
        <div className={styles.videoContainer}>{children}</div>
        <div className={styles.rightSideBar}></div>
      </div>
    </div>
  );
}
