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

    const { astronomyPhoto, roverPhotos, setRoverPhotos } = useContext(Context)
    const { isLoading, callGet } = http.useGet()
    const [pageNumber, setPageNumber] = useState(0); // Page will be updated here

    
    const getRoverPhotos = async (pageNumber: number) => {
        try {
            // Fetches the rover photos on the page specified in the pageNumber parameter
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

                addPhotosToLocalStorage(formattedRoverPhotos)
            }
        } catch (error) {
            // Errors can be handled here
            console.log(error)
        }
    }

    const addPhotosToLocalStorage = (newPhotos: RoverPhotos) => {
        const photosInLocalStorage = localStorage.getItem('roverPhotos') as string;
        const existingPhotos = photosInLocalStorage ? JSON.parse(photosInLocalStorage) : [];
        
        const stringifiedRoverPhotos = JSON.stringify(existingPhotos.concat(newPhotos));
        localStorage.setItem('roverPhotos', stringifiedRoverPhotos);
    }

    // Function is automatically called when the component mounts
    const fetchMoreDataHandler = () => {
        console.log('testing....')
        const nextPageNumber = pageNumber + 1
        setPageNumber(nextPageNumber) // Change the page for the next request to fetch the rover photos
        getRoverPhotos(nextPageNumber) // Fetch the rover photos on the updated page
    }

    useEffect(() => {
        const savedPhotos = localStorage.getItem('roverPhotos')
        const savedPageNumber = localStorage.getItem('roverPhotosPageNumber');
        // console.log(savedPhotos)
        if (savedPhotos) {
            const parsedSavedPhotos = JSON.parse(savedPhotos)
            setRoverPhotos(parsedSavedPhotos)
        }

        if (savedPageNumber) {
            const formattedPageNumber = Number(JSON.parse(savedPageNumber))
            setPageNumber(formattedPageNumber)
        }
    }, []);
 
    useEffect(() => {
        localStorage.setItem('roverPhotosPageNumber', JSON.stringify(pageNumber));
    }, [pageNumber])

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