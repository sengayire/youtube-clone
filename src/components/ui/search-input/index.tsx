import React from 'react';

import styles from './styles.module.css';
import { FiSearch } from 'react-icons/fi';

type Props = {};

export default function SearchInput({}: Props) {
  return (
    <div className={styles.searchInputContainer}>
      <input className={styles.searchInput} placeholder='Search...' />
      <div className={styles.searchIcon}>
        <FiSearch size={25} />
      </div>
    </div>
  );
}
