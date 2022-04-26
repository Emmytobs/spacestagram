import React from 'react'

import styles from './Buttons.module.css'

import likeIcon from '../../icons/like.png'
import unlikeIcon from '../../icons/unlike.png'

interface ButtonProps {
  onClick: (e: React.BaseSyntheticEvent) => any
}

export function LikeButton(props: ButtonProps) {
  return (
    <div className={styles.likeButton} onClick={(e: React.BaseSyntheticEvent) => props.onClick(e)}>
      <img src={likeIcon} alt="Like" width="23px" height="23px" />
    </div>
  )
}

export function UnlikeButton(props: ButtonProps) {
  return (
    <div className={styles.unlikeButton} onClick={(e: React.BaseSyntheticEvent) => props.onClick(e)}>
      <img src={unlikeIcon} alt="Unlike" width="23px" height="23px" />
    </div>
  )
}