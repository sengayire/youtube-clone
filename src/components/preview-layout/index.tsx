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
      <nav className={styles.layoutHeader}>
        <Image
          src='/happy-tube-logo-2.webp'
          width={250}
          height={50}
          alt='Happy Tube'
        />
        <SearchInput placeholder='Search...' />
        <div className={styles.profile}>
          <AiFillBell size={30} />
          <div className={styles.placeholder}>
            <img src='/placeholder.webp' className={styles.profilePicture} />
          </div>
        </div>
      </nav>
      <div className={styles.listContainer}>
        <aside></aside>
        <div className={styles.videoContainer}>{children}</div>
      </div>
    </div>
  );
}
