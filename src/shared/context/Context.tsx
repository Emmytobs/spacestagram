import React, { useState, createContext, useEffect } from 'react'

export interface AstronomyPhoto {
    title: string
    imageUrl: string
    date: string
    explanation?: string
}
export interface RoverPhoto {
    id: number
    cameraName: string
    imageUrl: string
    launchDate: string
    landingDate: string
    earthDate: string,
    isLiked: boolean
}
export type RoverPhotos = RoverPhoto[]

interface IContextValue {
    astronomyPhoto: AstronomyPhoto,
    roverPhotos: RoverPhotos,
    setAstronomyPhoto: React.Dispatch<React.SetStateAction<AstronomyPhoto>>,
    setRoverPhotos: React.Dispatch<React.SetStateAction<RoverPhotos>>,
}

export const Context = createContext<IContextValue>({} as IContextValue)

function Provider(props: any) {
    
    const [astronomyPhoto, setAstronomyPhoto] = useState<AstronomyPhoto>({
        title: '',
        imageUrl: '',
        date: '',
        explanation: ''
    })
    const [roverPhotos, setRoverPhotos] = useState<RoverPhotos>([])
    const [likedRoverPhotos, setLikedRoverPhotos] = useState<RoverPhotos>([])

    // useEffect(() => {

    // }, [roverPhotos])

    return (
        <Context.Provider value={{
            astronomyPhoto,
            roverPhotos,
            setAstronomyPhoto,
            setRoverPhotos
        }}>
            {props.children}
        </Context.Provider>
    )
}

export default Provider