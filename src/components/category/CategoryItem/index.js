import React from 'react';
import styles from './CategoryItem.module.scss';

export default function CategoryItem({children, color}) {
  return (
    <div className={styles.item}>
      <span style={{backgroundColor: color}} />
      { children }
    </div>
  )
}
