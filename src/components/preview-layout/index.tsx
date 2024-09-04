import React, { ReactNode } from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import SearchInput from '../ui/search-input';
import { AiFillBell } from 'react-icons/ai';

type Props = {
  children: ReactNode;
};

export default function PreviewLayout({ children }: Props) {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.layoutHeader}>
        <Image
          src='/happy-tube-logo-2.webp'
          width={250}
          height={50}
          alt='Happy Tube'
        />
        <SearchInput />
        <div className={styles.profile}>
          <AiFillBell size={30} />
          <div className={styles.placeholder}>
            <img src='/placeholder.webp' className={styles.profilePicture} />
          </div>
        </div>
      </div>
      <div className={styles.listContainer}>
        <div className={styles.leftSideBar}></div>
        <div className={styles.videoContainer}>{children}</div>
        <div className={styles.rightSideBar}></div>
      </div>
    </div>
  );
}
