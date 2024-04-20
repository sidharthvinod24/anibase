import {useQuery} from '@tanstack/react-query'
import requests from "../Requests";
import axios  from "axios";
// import NotFoundPage from '../pages/NotFoundPage';

const fetchMangaDataByID = async (id) =>{
    try {
        const response = await axios.get(requests.requestMangaByID(id))
        const data = response.data
            if (data?.title?.romaji === null){
                return { 
                    error: "Not Available"
                };
            }
            else{
                return data
        
            }
    } catch (error) {
        return {error: error}
    }

}


export function useFetchMangaDataByID(id){
    return useQuery({
        queryKey: ['manga',id],
        queryFn: () => fetchMangaDataByID(id),
        retry: 20,
        staleTime: 60000
    })
}