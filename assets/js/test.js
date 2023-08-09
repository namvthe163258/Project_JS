
const mockAPI1 = "https://run.mocky.io/v3/a8bafe4b-78ad-4c32-b561-3944104b4adf";


// fetch(mockAPI1)
// .then(function (response){
//     return response.json();
// })
// .then(function (post){
//     console.log(post,'das')
//     // console.log(post);
//     console.log(fetch,'abc');
//     return fetch(mockAPI2);
// }).then(function(data){
//     console.log(data);
    
// })



async function fetchAPI(){
    const result = await fetch(mockAPI1);
    console.log(await result.json());
    return result;
}

fetchAPI()

