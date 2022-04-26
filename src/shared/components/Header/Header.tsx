import React from 'react'
import styles from './Header.module.css'

function Header() {
  return (
    <header className={styles.header}>
        <div>
            <p>Shopify Frontend Internship Project</p>
            <p>Built by <a href="https://github.com/emmytobs">emmytobs</a></p>
        </div>
    </header>
  )
}

export default Header