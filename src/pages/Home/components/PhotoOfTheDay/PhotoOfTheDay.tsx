import React, { useContext } from 'react'
// Stylesheets
import styles from './PhotoOfTheDay.module.css'
// Images
import photo_of_the_day from '../../../../shared/icons/PhotoOfTheDay.jpg'
// Abstractions (interfaces)
import { AstronomyPhoto, Context } from '../../../../shared/context/Context'

/**
 * @description Displays the Astronomy Picture of the Day
 * 
 */
interface IPhotoOfTheDay {
  photo: AstronomyPhoto
}
function PhotoOfTheDay() {
  const { astronomyPhoto } = useContext(Context)

  return (
    <div className={styles.componentContainer}>
      <div className={styles.photoDetailsContainer}>
        <div>
          <h3 className={astronomyPhoto.title}>Astronomy Photo Of The Day</h3>
          <img src={astronomyPhoto.imageUrl} alt="" />
        </div>
      </div>  

      <div className={styles.backgroundEffect}>
          <img src={astronomyPhoto.imageUrl} alt="Astronomy pic of the day" />
      </div>
    </div>
  )
}

export default PhotoOfTheDay