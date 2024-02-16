//access token is current method of authentication
const apiAccessToken='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiM2M2NTAyNGEyZmIzNmI0ZWI1ZjQ3MmY1ZThlYTY5ZCIsInN1YiI6IjY1Y2ZjM2RiMDcyMTY2MDE2MjM4ZmI4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a8Fu3-dZR5oxl04VuFwMzTyaMbJlWCCJ8wQjg505cYY;'
//key can be used inline of http request, couldnt get it to work though
const apiKey='b3c65024a2fb36b4eb5f472f5e8ea69d';
const options={
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer '+ apiAccessToken
}
};

//type can be movie, tv, person
//time can be 'day' or 'week' specifying trending today or this week
async function getTrendingMovies(type: string, time: string){
    try{
        const response = await fetch('https://api.themoviedb.org/3/trending/'+type+'/'+time+'?api_key='+apiKey, options);
        const data = await response.json();
        return data;
    }
    catch(error){
        console.log(error);
    }finally{
        console.log('done');
    }
}


function makePostRequest(url: string, options: object) {
    return fetch(url, options)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
}

function makeGetRequest(url: string, options: object) {
    return fetch(url, options)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
}

makeGetRequest('https://api.themoviedb.org/3/movie/550/credits?api_key='+apiKey, options);








