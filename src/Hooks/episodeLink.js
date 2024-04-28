import {useQuery} from '@tanstack/react-query'
import requests from "../Requests";
import axios  from "axios";


const fetchEpisodeLink = async (mapping)=>{
    try {
        const response = await axios.get(requests.requestEpisodeLink(mapping));
        const data = response.data;
        return data


    } catch (error) {
        return {error: error}
    }
}

export function useFetchEpisodeLink(mapping){
    return useQuery({
        queryKey: ['watch',mapping],
        queryFn: () => fetchEpisodeLink(mapping),
        retry: 10,
        staleTime: 60000
    })
}