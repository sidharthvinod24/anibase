import {useQuery} from '@tanstack/react-query'
import requests from "../Requests";
import axios  from "axios";

const fetchSearch = async (searchQuery,type) =>{
    try {
        const response = await axios.get(requests.requestSearch(searchQuery,type));
        const data = response.data.results;
        const unique = [...new Map(data.map(item =>
            [item['id'], item])).values()];
        console.log(unique)
        return unique

    } catch (error) {
        return {error: "No Results Found"}
    }
    


}

export function useFetchSearch(query,type){
    return useQuery({
        queryKey: ['search',query,type],
        queryFn: () =>  fetchSearch(query,type),
        retry: 10,
        staleTime: 60000
    })
}