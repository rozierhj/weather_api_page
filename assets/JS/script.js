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
        let cityNameCap = citySearch[i];
        cityNameCap = cityNameCap.charAt(0).toUpperCase() + cityNameCap.slice(1); 
        oldSearch.textContent = cityNameCap;
        oldSearch.className = 'old-search';
        searchHistory.appendChild(oldSearch);
    }

}

submitButton.addEventListener('click', function(event){

    //event.preventDefault();

   
    cityName = document.getElementById('validationCustom03').value;
    addCity(cityName);
    localStorage.setItem('citySearch',JSON.stringify(citySearch));
    sessionStorage.setItem('lastSearch',JSON.stringify(cityName));
    console.log(cityName);

    if(cityName !== ''){

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
            loadMain(data);
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

    cityToAdd = cityToAdd.toLowerCase();

    if(citySearch.includes(cityToAdd) === false){
        citySearch.push(cityToAdd);
    }


}

function loadMain(data){

    let mainDate = document.getElementById('card-main-date');
    let mainTemp = document.getElementById('card-main-temp');
    let mainWind = document.getElementById('card-main-wind');
    let mainHumid = document.getElementById('card-main-humid');
    let dot = document.createElement('i');
    dot.className = 'bi';
    dot.classList.add('bi-circle');


    let tempDate = new Date(data.list[0].dt_txt);
    let newDate = tempDate.getMonth() + '/' + tempDate.getDate() + '/' + tempDate.getFullYear();
    let tempKelvin = data.list[0].main.temp;
    let tempFarnHt = (tempKelvin - 273.15)*9/5 + 32;
    let windSpeed = (data.list[0].wind.speed)*2.23694;

    mainDate.innerHTML = data.city.name + ' (' + newDate + ')';
    console.log(mainDate);
    mainTemp.innerHTML = 'Temp: ' + tempFarnHt.toFixed(2) + ' &degF';
    console.log(mainTemp);
    mainWind.innerHTML = 'Wind: ' + windSpeed.toFixed(2) + ' MPH';
    console.log(mainWind);
    mainHumid.innerHTML = 'Humidity: ' + data.list[0].main.humidity + ' %';
    console.log(mainHumid);

}