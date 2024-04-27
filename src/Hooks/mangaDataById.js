import {useQuery} from '@tanstack/react-query'
import requests from "../Requests";
import axios  from "axios";
// import NotFoundPage from '../pages/NotFoundPage';
const mangaProviders = ['mangadex','mangahere','mangakakalot','mangapark','mangapill','mangareader','mangasee123']
const fetchMangaDataByID = async (id) =>{
    for (const provider of mangaProviders) {
        try {
            const response = await axios.get(requests.requestMangaByID(id, provider));
            const data = response.data;
            if (data && data.title && data.title.romaji) {
                return data; // Return the first non-null data
            }
        } catch (error) {
            console.error(`Error fetching data with provider ${provider}:`, error);
        }
    }
    return { error: "Not Available" }; 
}


export function useFetchMangaDataByID(id){
    return useQuery({
        queryKey: ['manga',id],
        queryFn: () => fetchMangaDataByID(id),
        retry: 20,
        staleTime: 60000
    })
}