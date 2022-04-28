import React, { useContext } from 'react'
import { Context, RoverPhoto, RoverPhotos } from '../../../shared/context/Context'
import Button from '../Buttons/Buttons';
// Stylesheet
import styles from './Card.module.css'
// Images
import landedIcon from '../../../shared/icons/landed.png';
import launchedIcon from '../../../shared/icons/launched.png';

interface ICardProps extends RoverPhoto {}

export default function Card(props: ICardProps) {
  const { roverPhotos, setRoverPhotos } = useContext(Context);
  const _roverPhotos = [...roverPhotos]
  
  const toggleRoverPhotoLiked = (photoId: number) => {
    const roverPhoto = _roverPhotos.find((photo, index) => index === photoId) as RoverPhoto
    roverPhoto.isLiked = !roverPhoto.isLiked
    updateRoverPhotosInStorage(roverPhotos)
    setRoverPhotos([..._roverPhotos])
  }

  const updateRoverPhotosInStorage = (roverPhotos: RoverPhotos) => {
    console.log(roverPhotos.length)
    localStorage.setItem('roverPhotos', JSON.stringify(roverPhotos))
  }

  return (
    <div className={styles.componentContainer}>
      <div className={styles.cardHeader}>
        <img src={props.imageUrl} alt="" />
        <div className={styles.likeButtonContainer}>
          {
            props.isLiked ? 
            <Button type="LIKE" onClick={() => toggleRoverPhotoLiked(props.id)}/>  
            :
            <Button type="UNLIKE" onClick={() => toggleRoverPhotoLiked(props.id)}/>
          }
        </div>
      </div>
      <div className={styles.cardContent}>
        <div>
          <p className={styles.title}>{props.cameraName}</p>
          <div className={styles.launchAndLandDate}>
            <div>
              <img src={launchedIcon} alt="Date of launch" width="14px" height="14px" />
              <span>{props.launchDate}</span>
            </div>
            <div>
              <img src={landedIcon} alt="Date of landing" width="16px" height="16px" />
              <span>{props.landingDate}</span>
            </div>
          </div>
        </div>
        <p className={styles.captureDate}>Captured on {props.earthDate}</p>
      </div>
    </div>
  )
}

