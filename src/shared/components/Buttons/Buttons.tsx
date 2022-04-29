import React from 'react'

import styles from './Buttons.module.css'

import likeIcon from '../../icons/like.png'
import unlikeIcon from '../../icons/unlike.png'

type ButtonType = 'LIKE' | 'UNLIKE'
interface ButtonProps {
  onClick: (e: React.BaseSyntheticEvent) => any
  type: ButtonType
}

function Button(props: ButtonProps) {

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      props.onClick(e)
    }
  }

  return (
    <button 
      className={styles.button} 
      onKeyDown={(e) => handleKeyDown(e)}
      onClick={(e: React.BaseSyntheticEvent) => props.onClick(e)}
      tabIndex={0}>
      <img 
        src={props.type === 'LIKE' ? likeIcon : unlikeIcon} 
        alt={props.type === 'LIKE' ? 'Like' : 'Unlike'} 
        width="23px" 
        height="23px" 
      />
    </button>
  )
}

export default Button