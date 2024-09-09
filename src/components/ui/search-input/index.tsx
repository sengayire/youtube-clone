import React, { InputHTMLAttributes } from 'react';

import styles from './styles.module.css';
import { FiSearch } from 'react-icons/fi';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch?: () => void;
}

export default function SearchInput({ onSearch, ...props }: SearchInputProps) {
  return (
    <div className={styles.searchInputContainer}>
      <input className={styles.searchInput} {...props} />
      <div className={styles.searchIcon} onClick={onSearch}>
        <FiSearch size={25} />
      </div>
    </div>
  );
}
