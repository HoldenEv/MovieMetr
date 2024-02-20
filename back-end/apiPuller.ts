import axios from 'axios';
//access token is current method of authentication
const apiAccessToken='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiM2M2NTAyNGEyZmIzNmI0ZWI1ZjQ3MmY1ZThlYTY5ZCIsInN1YiI6IjY1Y2ZjM2RiMDcyMTY2MDE2MjM4ZmI4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a8Fu3-dZR5oxl04VuFwMzTyaMbJlWCCJ8wQjg505cYY;'
//key can be used inline of http request, couldnt get it to work though
const apiKey='b3c65024a2fb36b4eb5f472f5e8ea69d';

const searchMovies = async (searchString: string) => {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key='+apiKey+'&query='+searchString;
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+apiAccessToken
        }
    };
    try{
        const response = await axios.get(url, options);
        const movies = response.data.results.map((movie: any) => ({
            id:movie.id,
            title:movie.title,
            image:movie.poster_path,
            summary:movie.overview,
        }));
        return movies;
    }
    catch(error){
        console.error('Error searching movies', error);
        throw error;
    }
}    

export {searchMovies};
//type can be movie, tv, person
//time can be 'day' or 'week' specifying trending today or this week
// async function getTrendingMovies(type: string, time: string){
//     try{
//         const response = await fetch('https://api.themoviedb.org/3/trending/'+type+'/'+time+'?api_key='+apiKey, options);
//         const data = await response.json();
//         return data;
//     }
//     catch(error){
//         console.log(error);
//     }finally{
//         console.log('done');
//     }
// }









