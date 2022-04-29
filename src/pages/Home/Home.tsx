import React, { useEffect, useState, useContext } from 'react'
// Components
import Header from '../../shared/components/Header/Header'
import PhotoGallery from './components/PhotoGallery/PhotoGallery'
import PhotoOfTheDay from './components/PhotoOfTheDay/PhotoOfTheDay'
import { Context, RoverPhotos } from '../../shared/context/Context'
// Depdendencies
import dayjs from 'dayjs'
// Styles
import styles from './Home.module.css'
// Hooks
import httpModule from '../../shared/hooks/http'

function Home() {
    const http = httpModule()

    const { roverPhotos, setRoverPhotos } = useContext(Context)
    const { callGet } = http.useGet()
    const [pageNumber, setPageNumber] = useState(0); // Page will be updated here

    const getPhotoIdInLikedPhotoIDs = (photoId: number): string | undefined => {
        const likedPhotoIDs: string[] = JSON.parse(localStorage.getItem('likedPhotoIDs') as string);
        // likedPhotoIDs will not be in local storage when the page loads for the first time
        if (likedPhotoIDs) {
            const photoIdInStorage = likedPhotoIDs.find(likedPhotoId => Number(likedPhotoId) === Number(photoId))
            return photoIdInStorage
        }
    }

    const getRoverPhotos = async (pageNumber: number) => {
        try {
            // Fetches the rover photos on the page specified in the pageNumber parameter
            const roverPhotosFromApi = await callGet({
                url: `
                    https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${'2022-01-01'}&page=${pageNumber}&api_key=${process.env.REACT_APP_API_KEY}
                `
            });
            if (roverPhotosFromApi) {
                const formattedRoverPhotos: RoverPhotos = roverPhotosFromApi.photos.map((photo: any) => {
                    const photoHasBeenLiked = !!getPhotoIdInLikedPhotoIDs(photo.id)

                    return {
                        id: photo.id,
                        cameraName: photo.camera.name,
                        imageUrl: photo.img_src,
                        launchDate: dayjs(photo.rover.launch_date).format('MMM D, YYYY'),
                        landingDate: dayjs(photo.rover.landing_date).format('MMM D, YYYY'),
                        earthDate: dayjs(photo.earth_date).format('MMM D, YYYY'),
                        isLiked: photoHasBeenLiked
                    }
                })
                setRoverPhotos([
                    ...roverPhotos,
                    ...formattedRoverPhotos
                ])

                // addPhotosToLocalStorage(formattedRoverPhotos)
            }
        } catch (error) {
            // Errors can be handled here
            console.log(error)
        }
    }

    // Function is automatically called when the component mounts
    const fetchMoreDataHandler = () => {
        console.log('testing....')
        const nextPageNumber = pageNumber + 1
        setPageNumber(nextPageNumber) // Change the page for the next request to fetch the rover photos
        getRoverPhotos(nextPageNumber) // Fetch the rover photos on the updated page
    }
    
    return (
        <>
        <Header />
        <PhotoOfTheDay />
        <main className={styles.main}>
            {
                <PhotoGallery fetchMoreDataHandler={fetchMoreDataHandler} />
            }
        </main>
        </>
    )
}

export default Home