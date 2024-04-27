import {useQuery} from '@tanstack/react-query'
import requests from "../Requests";
import axios  from "axios";
// import NotFoundPage from '../pages/NotFoundPage';

const fetchAnimeDataByID = async (id) =>{
    try {
        const response = await axios.get(requests.requestAnimeByID(id))
        const data = response.data
            if (data?.isAdult){
                return { 
                    error: "Not suitable for display"
                };
            }
            // else if (data?.description === null || (data?.description).length <= 20){
            //     return { 
            //         error: "Not Available"
            //     };
            // }
            else{
                return data
        
            }


    } catch (error) {
        return {error: error}
    }

}


export function useFetchAnimeDataByID(id){
    return useQuery({
        queryKey: ['anime',id],
        queryFn: () => fetchAnimeDataByID(id),
        retry: 10,
        staleTime: 60000
    })
}