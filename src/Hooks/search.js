import {useQuery} from '@tanstack/react-query'
import requests from "../Requests";
import axios  from "axios";

const fetchSearch = async (searchQuery) =>{
    try {
        const response = await axios.get(requests.requestSearch(searchQuery));
        const data = response.data.results;
        const unique = [...new Map(data.map(item =>
            [item['id'], item])).values()];
        console.log(unique)
        return unique

    } catch (error) {
        return {error: "No Results Found"}
    }
    


}

export function useFetchSearch(query){
    return useQuery({
        queryKey: ['search',query],
        queryFn: () =>  fetchSearch(query),
        retry: 10,
        staleTime: 60000
    })
}