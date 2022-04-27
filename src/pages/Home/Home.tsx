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

    const { astronomyPhoto, roverPhotos, setAstronomyPhoto, setRoverPhotos } = useContext(Context)
    const { isLoading, callGet } = http.useGet()
    const [pageNumber, setPageNumber] = useState(0);

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
    
    const getRoverPhotos = async (pageNumber: number) => {
        try {
            const roverPhotosFromApi = await callGet({
                url: `
                    https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${'2022-01-01'}&page=${pageNumber}&api_key=${process.env.REACT_APP_API_KEY}
                `
            });
            if (roverPhotosFromApi) {
                const formattedRoverPhotos: RoverPhotos = roverPhotosFromApi.photos.map((photo: any) => ({
                    id: photo.id,
                    cameraName: photo.camera.name,
                    imageUrl: photo.img_src,
                    launchDate: dayjs(photo.rover.launch_date).format('MMM D, YYYY'),
                    landingDate: dayjs(photo.rover.landing_date).format('MMM D, YYYY'),
                    earthDate: dayjs(photo.earth_date).format('MMM D, YYYY'),
                    isLiked: false
                }))
                setRoverPhotos([
                    ...roverPhotos,
                    ...formattedRoverPhotos
                ])
            }
        } catch (error) {
        }
    }

    const fetchMoreDataHandler = () => {
        // console.log('from fetchMoreDataHandler')
        const nextPageNumber = pageNumber + 1
        setPageNumber(nextPageNumber)
        getRoverPhotos(nextPageNumber)
    }

    useEffect(() => {
        getAstronomyPhotoOfTheDay()
    }, []);
    useEffect(() => {
        // getRoverPhotos(pageNumber)
    }, []);

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