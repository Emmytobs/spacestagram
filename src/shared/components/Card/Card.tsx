import React, { useContext } from 'react'
import { Context, RoverPhoto } from '../../../shared/context/Context'
import Button from '../Buttons/Buttons';
// Stylesheet
import styles from './Card.module.css'
// Images
import landedIcon from '../../../shared/icons/landed.png';
import launchedIcon from '../../../shared/icons/launched.png';
import cameraIcon from '../../../shared/icons/camera.png';
interface ICardProps extends RoverPhoto {
}

export default function Card(props: ICardProps) {
  const { roverPhotos, setRoverPhotos } = useContext(Context);
  const toggleRoverPhotoLiked = (photoId: number) => {
    const roverPhoto = roverPhotos.find(photo => photo.id === photoId) as RoverPhoto
    roverPhoto.isLiked = !roverPhoto.isLiked
    setRoverPhotos([...roverPhotos, roverPhoto])
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
          <h4 className={styles.title}>{props.cameraName}</h4>
        </div>
      </div>
      <div className={styles.cardFooter}>
        <div>
          <img src={cameraIcon} alt="Date of capture" width="16px" height="16px" />
          <span>Captured on: {props.earthDate}</span>
        </div>
        <div>
          <img src={launchedIcon} alt="Date of launch" width="16px" height="16px" />
          <span>Launched on: {props.launchDate}</span>
        </div>
        <div>
          <img src={landedIcon} alt="Date of landing" width="16px" height="16px" />
          <span>Landed on: {props.landingDate}</span>
        </div>
      </div>
    </div>
  )
}

