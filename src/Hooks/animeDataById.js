import {useQuery} from '@tanstack/react-query'
import requests from "../Requests";
import axios  from "axios";
// import NotFoundPage from '../pages/NotFoundPage';
const animeProviders = ['gogoanime','zoro','animepahe','animefox']
const fetchAnimeDataByID = async (id) => {
    for (const provider of animeProviders) {
        try {
            const response = await axios.get(requests.requestAnimeByID(id, provider));
            const data = response.data;
            if (data?.isAdult) {
                continue; // Skip to the next provider if the content is not suitable
            } else {
                return data; // Return the data if suitable and fetched successfully
            }
        } catch (error) {
            console.log(`Failed to fetch data with provider ${provider}:`, error);
            // Optionally handle specific errors or retry logic here
        }
    }
    return { error: "No suitable data found from any provider" };
};


export function useFetchAnimeDataByID(id){
    return useQuery({
        queryKey: ['anime',id],
        queryFn: () => fetchAnimeDataByID(id),
        retry: 10,
        staleTime: 60000
    })
}