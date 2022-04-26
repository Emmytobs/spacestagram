import React, { useState } from 'react';

// import {
//     NoResponse,
//     TokenExpired,
//     NotFound
// } from './httpErrors'

interface UseGetProps {
    url: string
}
type UseGetErrors = any
    // | typeof NoResponse
    // | typeof TokenExpired

interface UseGetResponse {
    isLoading: boolean
    callGet: <T=any>(props: UseGetProps) => Promise<T>,
    error: UseGetErrors
}
interface StateProps {
    isLoading: boolean,
    error: any | null
}

function useGet(): UseGetResponse { // The generic type should be set on the callGet function
    const initialState = {
        isLoading: false,
        error: null,
    }
    const [state, setState] = useState<StateProps>(initialState);
    
    // This inner function returns the data
    const callGet = async <T=any>(getProps: UseGetProps): Promise<T>  => {
        setState({
            ...initialState,
            isLoading: true
        })
        let data = null;
        try {
            const response = await fetch(getProps.url);
            data = await response.json();
        } catch (error: any) {
            // Set the error type appropriately depenfing on the specific conditions
            // let errorType: UseGetErrors | null = null
            console.log(error);
            setState({
                ...state,
                error
            })
        } finally {
            // Stops the loading
            setState({
                ...state,
                isLoading: false
            })
        }

        return data;
    }

    return {
        callGet,
        ...state
    };
}

function httpModule() {
    return {
        useGet
    }
}

export default httpModule;