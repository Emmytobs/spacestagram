import React, { useContext } from 'react'
import Card from '../../../../shared/components/Card/Card'
import { Context } from '../../../../shared/context/Context'
import InfiniteScroll from 'react-infinite-scroll-component'
import ScaleLoader from "react-spinners/ScaleLoader"
// Stylesheet
import styles from './PhotoGallery.module.css'

interface IPhotoGallery {
  fetchMoreDataHandler: () => any
}

function PhotoGallery(props: IPhotoGallery) {
  const { roverPhotos } = useContext(Context)

  return (
    <>
      <h2 className={styles.componentTitle}>Rover Photos from Jan 1, 2022</h2>
      <InfiniteScroll
          dataLength={roverPhotos.length}
          next={props.fetchMoreDataHandler}
          hasMore={true}
          loader={
            <div className={styles.loaderContainer}>
              <ScaleLoader />
            </div>
          }
        >
        <div className={styles.componentContainer}>
          {
            roverPhotos
              .map((photo, index) => 
                <Card
                  key={index}
                  id={index}
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
      </InfiniteScroll>
    </>
  )
}

export default PhotoGallery