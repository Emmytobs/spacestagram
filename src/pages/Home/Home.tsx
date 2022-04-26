import React, { useEffect, useContext } from 'react'
// Components
import Header from '../../shared/components/Header/Header'
import PhotoGallery from './components/PhotoGallery/PhotoGallery'
import PhotoOfTheDay from './components/PhotoOfTheDay/PhotoOfTheDay'
import { Context, RoverPhotos } from '../../shared/context/Context'
// Styles
import styles from './Home.module.css'
// Hooks
import httpModule from '../../shared/hooks/http'

function Home() {
    const http = httpModule()

    const { astronomyPhoto, roverPhotos, setAstronomyPhoto, setRoverPhotos } = useContext(Context)

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
    
    const getRoverPhotos = async () => {
        const roverPhotos = await callGet({
            url: `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${'2022-01-01'}&page=1&api_key=${process.env.REACT_APP_API_KEY}`
        });
        if (roverPhotos) {
            const formattedRoverPhotos: RoverPhotos = roverPhotos.photos.map((photo: any) => ({
                id: photo.id,
                cameraName: photo.camera.name,
                imageUrl: photo.img_src,
                launchDate: photo.rover.launch_date,
                landingDate: photo.rover.landing_date,
                earthDate: photo.earth_date,
                isLiked: false
            }))
            setRoverPhotos(formattedRoverPhotos)
        }
    }

    useEffect(() => {
        getAstronomyPhotoOfTheDay()
    }, []);
    useEffect(() => {
        getRoverPhotos()
    }, []);

    return (
        <>
        <Header />
        <PhotoOfTheDay />
        <main className={styles.main}>
            {
                isLoading ? 
                <h1>Loading...</h1> :
                <PhotoGallery />
            }
        </main>
        </>
    )
}

export default Home