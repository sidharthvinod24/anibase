import {useQuery} from '@tanstack/react-query'
import requests from "../Requests";
import axios  from "axios";
// import NotFoundPage from '../pages/NotFoundPage';

const fetchEpisodesByID = async (id) =>{
    try {
        const response = await axios.get(requests.requestEpisodesByID(id))
        const data = response.data
        return data


    } catch (error) {
        return {error: error}
    }

}


export function useFetchEpisodesByID(id){
    return useQuery({
        queryKey: ['episode',id],
        queryFn: () => fetchEpisodesByID(id),
        retry: 20,
        staleTime: 60000
    })
}