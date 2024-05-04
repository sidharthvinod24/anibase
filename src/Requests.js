//Anime to display
// Trending Anime
// Popular this season
// Next Season
// Top of all time
// All time Favourites

// Get Current Season

const getCurrentSeason = () =>{
    const d = new Date()
    let month = d.getMonth()
    let year = d.getFullYear()
    if (month <= 2){
        return ['WINTER',year]
    }
    else if(month > 2  && month < 6){
        return ['SPRING',year]
    }
    else if (month >= 6 && month < 9){
        return ['SUMMER',year]
    }
    else{
        return ['FALL',year]
    }
}

const [season,year] = getCurrentSeason()

const getNextSeason = (currentSeason) => {
    const seasons = ['WINTER', 'SPRING', 'SUMMER', 'FALL'];
    let currentIndex = seasons.indexOf(currentSeason);
    let nextIndex = (currentIndex + 1) % seasons.length;
    return seasons[nextIndex];
}

const nextSeason = getNextSeason(season)

const requests = {
    requestTrending:"https://anime-api-nine-ochre.vercel.app/meta/anilist/trending?perPage=25",
    requestAiringThisSeason: `https://anime-api-nine-ochre.vercel.app/meta/anilist/advanced-search?season=${season}&year=${year}`,
    requestNextSeason: `https://anime-api-nine-ochre.vercel.app/meta/anilist/advanced-search?season=${nextSeason}&year=${year}`,
    requestTopAnime: 'https://anime-api-nine-ochre.vercel.app/meta/anilist/advanced-search?sort=["SCORE_DESC"]',
    requestPopularAnime: 'https://anime-api-nine-ochre.vercel.app/meta/anilist/advanced-search?sort=["POPULARITY_DESC"]',
    requestAnimeByID: (query,provider) => `https://anime-api-nine-ochre.vercel.app/meta/anilist/info/${query}?provider=${provider}`,
    requestMangaByID: (query,provider) => `https://anime-api-nine-ochre.vercel.app/meta/anilist-manga/info/${query}?provider=${provider}`,
    requestEpisodesByID: (query,provider) => `https://anime-api-nine-ochre.vercel.app/meta/anilist/episodes/${query}?provider=${provider}`,
    requestSearch: (query,type) => `https://anime-api-nine-ochre.vercel.app/meta/anilist/advanced-search?query=${query}&type=${type}&perPage=10`,
    requestAdvancedSearch: (query,year,season,format,type,genres,pageParam) => {
        let url = `https://anime-api-nine-ochre.vercel.app/meta/anilist/advanced-search?type=${type}&sort=["POPULARITY_DESC"]&perPage=25&page=${pageParam}`;
        if (query) url += `&query=${query}`
        if (genres) url += `&genres=${genres}`;
        if (year) url += `&year=${year}`;
        if (season) url += `&season=${season}`;
        if (format) url += `&format=${format}`;
        return url;
    }



    // requestRelatedImageByID: (query) => `https://anime-api-nine-ochre.vercel.app/meta/anilist/info/${query}`

    // requestSearch:`https://my-consumet-api.vercel.app/anime/gogoanime/${query}?page=${pageNumber}`
}

export default requests