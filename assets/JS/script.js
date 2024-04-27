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
        let cityNameString = cityNameCap.split(' ');
        console.log(cityNameString);
        if(cityNameString.length > 0){
            cityNameCap = '';
            for(let k = 0; k < cityNameString.length; k++){
                let names = cityNameString[k]
                if(k < cityNameString.length - 1){
                    cityNameCap = cityNameCap + names.charAt(0).toUpperCase() + names.slice(1) + ' ';
                }else{
                    cityNameCap = cityNameCap + names.charAt(0).toUpperCase() + names.slice(1);
                }
                
                //console.log(cityNameCap);
            }
            oldSearch.textContent = cityNameCap;
            oldSearch.className = 'old-search';
            searchHistory.appendChild(oldSearch);
        }
        // cityNameCap = cityNameCap.charAt(0).toUpperCase() + cityNameCap.slice(1); 
        // oldSearch.textContent = cityNameCap;
        // oldSearch.className = 'old-search';
        // searchHistory.appendChild(oldSearch);
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
        cityName = event.target.textContent;
        sessionStorage.setItem('lastSearch',JSON.stringify(cityName));
        clearFiveDay();
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
       if(data.length < 1){
        alert('Bad search input, please try again');
        return;
       }
       else{
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
            loadFiveDay(data);
            cityName = '';
            console.log(data.list[0].weather);

        })
        .catch(function(error){
            console.error('error:',error);
            // if(error === true)
            // alert('invalid city input');
         //   alert('invalid input');
        });


        }
    })
    .catch(function(error){
        console.error('error:',error);
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
    // let dot = document.createElement('i');
    // dot.className = 'bi';
    // dot.classList.add('bi-circle');

    let tempDate = new Date(data.list[0].dt_txt);
    let newDate = tempDate.getMonth() + '/' + tempDate.getDate() + '/' + tempDate.getFullYear();
    let tempKelvin = data.list[0].main.temp;
    let tempFarnHt = (tempKelvin - 273.15)*9/5 + 32;
    let windSpeed = (data.list[0].wind.speed)*2.23694;

    mainDate.innerHTML = data.city.name + ' (' + newDate + ')';
    // console.log(mainDate);
    mainTemp.innerHTML = 'Temp: ' + tempFarnHt.toFixed(2) + ' &degF';
    // console.log(mainTemp);
    mainWind.innerHTML = 'Wind: ' + windSpeed.toFixed(2) + ' MPH';
    // console.log(mainWind);
    mainHumid.innerHTML = 'Humidity: ' + data.list[0].main.humidity + ' %';
    // console.log(mainHumid);

    let icon = data.list[0].weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;
    const iconImg = document.createElement('img');
    iconImg.src = iconUrl;
    //iconImg.style.backgroundColor = 'blue';
    //const iconContainer = document.getElementById('card-main-date');
    mainDate.appendChild(iconImg);

}

function loadFiveDay(data){

    let tempFirstDay = new Date(data.list[0].dt_txt);
    let oldDay = tempFirstDay.getDate();
    let cardNum = 1;


    let i = 0;
    while(i < data.list.length && cardNum < 6){
    //dayCount = dayCount + 8;

    let newTempDay = new Date(data.list[i].dt_txt);
    let newDay = newTempDay.getDate();

if(newDay !== oldDay){

    oldDay = newDay;
    let day = document.createElement('div');
    let dayDate = document.createElement('h4');
    let dayIcon = document.createElement('img');
    let dayTemp = document.createElement('p');
    let dayWind = document.createElement('p');
    let dayHum = document.createElement('p');
    day.className = 'card';

    let tempDate = new Date(data.list[i].dt_txt);
    let newDate = tempDate.getMonth() + '/' + tempDate.getDate() + '/' + tempDate.getFullYear();
    let tempKelvin = data.list[i].main.temp;
    let tempFarnHt = (tempKelvin - 273.15)*9/5 + 32;
    let windSpeed = (data.list[i].wind.speed)*2.23694;

        console.log(windSpeed);
        
    dayDate.innerHTML = newDate;
    dayTemp.innerHTML = 'Temp: ' + tempFarnHt.toFixed(2) + ' &degF';
    dayWind.innerHTML = 'Wind: ' + windSpeed.toFixed(2) + ' MPH';
    dayHum.innerHTML = 'Humidity: ' + data.list[i].main.humidity + ' %';

    let icon = data.list[i].weather[0].icon;
    let iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;
    dayIcon.src = iconUrl;

    let dayCard = document.getElementById('weather-card'+cardNum);
    day.appendChild(dayDate);
    day.appendChild(dayIcon);
    day.appendChild(dayTemp);
    day.appendChild(dayWind);
    day.appendChild(dayHum);
    dayCard.appendChild(day);
    cardNum++;
    }
    i++;
    }

}

function clearFiveDay(){

    let weatherCard1 = document.getElementById('weather-card1');
    let weatherCard2 = document.getElementById('weather-card2');
    let weatherCard3 = document.getElementById('weather-card3');
    let weatherCard4 = document.getElementById('weather-card4');
    let weatherCard5 = document.getElementById('weather-card5');

    weatherCard1.innerHTML = '';
    weatherCard2.innerHTML = '';
    weatherCard3.innerHTML = '';
    weatherCard4.innerHTML = '';
    weatherCard5.innerHTML = '';

}