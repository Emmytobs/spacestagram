import React from 'react'
import styles from './Header.module.css'

function Header() {
  return (
    <header className={styles.header}>
        <div>
            <p>Spacestagram</p>
            <p>Built by <a target="_blank" rel="noreferrer" href="https://github.com/emmytobs">emmytobs</a></p>
        </div>
    </header>
  )
}

export default Header