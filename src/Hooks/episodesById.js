import {useQuery} from '@tanstack/react-query'
import requests from "../Requests";
import axios  from "axios";
// import NotFoundPage from '../pages/NotFoundPage';
const epProvider = ['zoro','gogoanime','animepahe','animefox']
const fetchEpisodesByID = async (id) =>{
    for (const provider of epProvider) {
        try {
            const response = await axios.get(requests.requestEpisodesByID(id, provider));
            if (response && response.data) {
                return response.data; // Return the data as soon as a successful response is received
            }
        } catch (error) {
            console.log(`Failed to fetch from provider ${provider}:`, error);
            // Optionally handle the error, e.g., logging or conditional re-throwing
        }
    }
    return { error: "No providers returned a successful response." };
}


export function useFetchEpisodesByID(id){
    return useQuery({
        queryKey: ['episode',id],
        queryFn: () => fetchEpisodesByID(id),
        retry: 20,
        staleTime: 60000
    })
}