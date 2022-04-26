import React, { useContext } from 'react'
// Stylesheet
import styles from './Card.module.css'
// Images
import { Context, RoverPhoto } from '../../../shared/context/Context'
import { LikeButton, UnlikeButton } from '../Buttons/Buttons';

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
            <LikeButton onClick={() => toggleRoverPhotoLiked(props.id)}/> 
            :
            <UnlikeButton onClick={() => toggleRoverPhotoLiked(props.id)}/>
          }
        </div>
      </div>
      <div className={styles.cardContent}>
        <div>
          <h4 className={styles.title}>{props.cameraName}</h4>
        </div>
      </div>
      <div className={styles.cardFooter}>
            <span>Launched on: {props.launchDate}</span>
            <span>Landed on: {props.landingDate}</span>
      </div>
    </div>
  )
}

