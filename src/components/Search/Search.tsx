import React from 'react';
import SearchIcon from '../icons/search';
import styles from './search.module.css';

export default function Search() {
  return (
    <div className={styles.search}>
      <SearchIcon />
      <input type='text' placeholder='Search' className={styles.searchInput} />
    </div>
  );
}
