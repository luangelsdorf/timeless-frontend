import Tooltip from '@mui/material/Tooltip';
import React from 'react';
import styles from './CategoryItem.module.scss';

export default function CategoryItem({ children, color }) {
  return (
    <div className={styles.item}>
      <div>
        <Tooltip title={children}>
          <span className={styles.color} style={{ backgroundColor: color }} />
        </Tooltip>
        <span>{children}</span>
      </div>
    </div>
  )
}
