let citySearch = JSON.parse(localStorage.getItem('citySearch'))||[];
let cityName = JSON.parse(sessionStorage.getItem('lastSearch'));
let submitButton = document.getElementById('form-submit');
let searchHistory = document.getElementById('search-history');

window.onload = function(){

    if(cityName !== null && cityName !== ''){
        runFetch(cityName);
    }

    for(let i = 0; i < citySearch.length; i++){
        let oldSearch = document.createElement('div');
        oldSearch.textContent = citySearch[i];
        oldSearch.className = 'old-search';
        searchHistory.appendChild(oldSearch);
    }

}

submitButton.addEventListener('click', function(event){

    //event.preventDefault();

   
    cityName = document.getElementById('validationCustom03').value;
    addCity(cityName);
    localStorage.setItem('citySearch',JSON.stringify(citySearch));
    sessionStorage.setItem('lastSearch',JSON.stringify(citySearch));
    console.log(cityName);

    if(cityName !== ''){

        let oldSearch = document.createElement('div');
        oldSearch.textContent = cityName;
        oldSearch.className = 'old-search';

        let searchHistory = document.getElementById('search-history');
        searchHistory.appendChild(oldSearch);
        runFetch(cityName);

        }

});

searchHistory.addEventListener('click', function(event){


    if (event.target.classList.contains('old-search')){
        citySearch = event.target.textContent;
        sessionStorage.setItem('lastSearch',JSON.stringify(citySearch));
        runFetch(cityName);
    }

});

function runFetch(cityName){

    let url ='http://api.openweathermap.org/geo/1.0/direct?q='+cityName+'&limit=1&appid=87f25cdc20ece7fa1b91717bdc086ae6';

    fetch(url,{
        method:'GET',
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        //console.log(data);
       //  weather5 = data;
       //  console.log(data[0].lat);
        let lat1 = data[0].lat;
        let lon1 = data[0].lon;
    
        //console.log(lat1 + ' - ' + lon1);
        let url1 = 'http://api.openweathermap.org/data/2.5/forecast?lat='
        let url2 = 'appid=87f25cdc20ece7fa1b91717bdc086ae6';
        let weather5 = url1 + lat1 + '&lon=' + lon1 + '&'+ url2;
        console.log(weather5);
        //weather5 = 'http://api.openweathermap.org/data/2.5/forecast?lat=lat1&lon=lon1&appid=44d53a879b6605862d3a1b3bdba2a127';
       
    
        fetch(weather5,{
            method: 'GET',
        })
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            cityName = '';
            console.log(data.list[0].weather);
            let icon = data.list[0].weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;
            const iconImg = document.createElement('img');
            iconImg.src = iconUrl;
            //iconImg.style.backgroundColor = 'blue';
            const iconContainer = document.getElementById('card-main-date');
            iconContainer.appendChild(iconImg);
        })
        .catch(function(error){
            console.error('error:',error);
            alert('invalid input');
        });


    })
    .catch(function(error){
        console.error('error:',error);
        alert('invalid input');
    });

}

function addCity(cityToAdd){

    citySearch = cityToAdd.toLowerCase();

    if(citySearch.includes(cityToAdd) === false){
        citySearch.push(cityToAdd);
    }


}