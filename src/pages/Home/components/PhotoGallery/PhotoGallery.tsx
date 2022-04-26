import React, { useContext } from 'react'
import Card from '../../../../shared/components/Card/Card'
import { Context, RoverPhotos } from '../../../../shared/context/Context'

// Stylesheet
import styles from './PhotoGallery.module.css'

function PhotoGallery() {
  const { roverPhotos } = useContext(Context)

  return (
    <div className={styles.componentContainer}>
      {
        roverPhotos
          .map(photo => 
            <Card
              key={photo.id}
              id={photo.id}
              cameraName={photo.cameraName}
              imageUrl={photo.imageUrl}
              earthDate={photo.earthDate}
              landingDate={photo.landingDate}
              launchDate={photo.launchDate}
              isLiked={photo.isLiked}
            />
          )
      }
    </div>
  )
}

export default PhotoGallery