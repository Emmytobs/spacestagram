import React, { useContext } from 'react'
import { Context, RoverPhoto } from '../../../shared/context/Context'
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
    const roverPhoto = _roverPhotos.find((_, index) => index === photoId) as RoverPhoto
    roverPhoto.isLiked = !roverPhoto.isLiked

    updatePhotoIDsInStorage(roverPhoto)
    setRoverPhotos([..._roverPhotos])
  }

  const updatePhotoIDsInStorage = (roverPhoto: RoverPhoto) => {
    let likedPhotoIDs: string[] = JSON.parse(localStorage.getItem('likedPhotoIDs') as string);
    const photoIsLiked = roverPhoto.isLiked === true;

    /* 
      LikedPhotoIDs may not exist, in which case an entry will be created in local storage.
      This is done only when the use attempts to like an image
    */
    if (!likedPhotoIDs) {
      localStorage.setItem('likedPhotoIDs', '');
      likedPhotoIDs = []
    }

    if (photoIsLiked) {
      // add photo id to local storage
      likedPhotoIDs.push(roverPhoto.id.toString());
    } else {
      // remove photo id from local storage
      const updatedPhotoIDs = likedPhotoIDs.filter(photoId => Number(photoId) !== roverPhoto.id)
      likedPhotoIDs = [...updatedPhotoIDs]
    }

    localStorage.setItem('likedPhotoIDs', JSON.stringify(likedPhotoIDs))
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
            <div title="Lauch date">
              <img src={launchedIcon} alt="Date of launch" width="14px" height="14px" />
              <span>{props.launchDate}</span>
            </div>
            <div title="Landing date">
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

