import { useQuery } from "@tanstack/react-query";
import requests from "../Requests";
import axios  from "axios";
const fetchData = async (fetchUrl) =>{
    const response = await axios.get(fetchUrl)
    const data = response.data.results
    
    const unique = [...new Map(data.map(item =>
        [item['id'], item])).values()];
    return unique

}


export function usefetchData(fetchUrl,key){
    return useQuery({
        queryKey: [key],
        queryFn: () => fetchData(fetchUrl),
        retry: 5,
        staleTime: 60000
    })
}