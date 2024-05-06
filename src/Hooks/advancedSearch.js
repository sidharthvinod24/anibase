import {useInfiniteQuery} from '@tanstack/react-query'
import requests from "../Requests";
import axios  from "axios";

const fetchAdvancedSearch = async (searchQuery,year,season,format,type,genres,pageParam) =>{
    try {
        const response = await axios.get(requests.requestAdvancedSearch(searchQuery,year,season,format,type,genres,pageParam));
        const data = response.data;
        return data

    } catch (error) {
        return {error: "No Results Found"}
    }
    


}

export function useFetchAdvancedSearch (query,year,season,format,type,genres){
    return useInfiniteQuery({
        queryKey: ['search',query,year,season,format,type,genres],
        queryFn: ({pageParam = 1}) =>  fetchAdvancedSearch(query,year,season,format,type,genres,pageParam),
        getNextPageParam: (lastPage) => {
            if (lastPage.hasNextPage === true){
                const nextPage = lastPage.currentPage + 1
                return  nextPage
            }    
        },
        retry: 10,
        staleTime: 60000
    })
}