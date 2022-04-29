import React, { useContext, useEffect } from 'react'

import { Context } from '../../../../shared/context/Context'
import httpModule from '../../../../shared/hooks/http'

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
// Stylesheets
import styles from './PhotoOfTheDay.module.css'

/**
 * @description Displays the Astronomy Picture of the Day
 * 
 */
function PhotoOfTheDay() {
  const { astronomyPhoto, setAstronomyPhoto } = useContext(Context)

  const http = httpModule();
  const { isLoading, callGet } = http.useGet()

  const getAstronomyPhotoOfTheDay = async () => {
    const astronomyPhotoDetails = await callGet({ 
        url: `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY}`
    });
    if (astronomyPhotoDetails) {
        setAstronomyPhoto({
            title: astronomyPhotoDetails.title,
            imageUrl: astronomyPhotoDetails.url,
            date: astronomyPhotoDetails.date,
            explanation: astronomyPhotoDetails.explanation
        })
    }
  }

  useEffect(() => {
    getAstronomyPhotoOfTheDay()
  }, []); // eslint-disable-line

  return (
    <div className={styles.componentContainer}>
      <h1 className={`${styles.containerTitle} ${styles.smallScreen}`}>Astronomy Photo Of The Day</h1>
      <div className={styles.photoContainer}>
        {
          isLoading ?
          <Skeleton /> : 
          <img src={astronomyPhoto.imageUrl} alt="" />
        }
      </div>
      <div className={styles.photoDetails}>
          <h1 className={`${styles.containerTitle} ${styles.largeScreen}`}>Astronomy Photo Of The Day</h1>
          <h3 className={styles.title}>
            {isLoading ? <Skeleton /> : astronomyPhoto.title}
          </h3>
          <p className={styles.description}>
            {isLoading ? <Skeleton count={10} /> : astronomyPhoto.explanation}
          </p>
      </div> 
    </div>
  )
}

export default PhotoOfTheDay