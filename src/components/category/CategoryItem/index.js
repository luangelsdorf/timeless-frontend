import Button from '@mui/material/Button';
import React from 'react';
import styles from './CategoryItem.module.scss';

export default function CategoryItem({ children, color }) {
  return (
    <div className={styles.item}>
      <div>
        <span className={styles.color} style={{ backgroundColor: color }} />
        {children}
      </div>
    </div>
  )
}
