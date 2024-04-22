let submitButton = document.getElementById('form-submit');

submitButton.addEventListener('click', function(event){

   event.preventDefault();

    let cityName = document.getElementById('validationCustom03').value;
    console.log(cityName);

});

/*

let city = document.getElementById('validationCustom03').value;
console.log(city);
let url ='http://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit=1&appid=87f25cdc20ece7fa1b91717bdc086ae6';

fetch(url,{
    method:'GET',
})
.then(function(response){
    return response.json();
})
.then(function(data){
  //  console.log(data);
    // weather5 = data;
    // console.log(data[0].lat);
    let lat1 = data[0].lat;
    let lon1 = data[0].lon;

  //  console.log(lat1 + ' - ' + lon1);
    let url1 = 'http://api.openweathermap.org/data/2.5/forecast?lat='
    let url2 = 'appid=87f25cdc20ece7fa1b91717bdc086ae6';
    let weather5 = url1 + lat1 + '&lon=' + lon1 + '&'+ url2;
   // console.log(weather5);
    // let weather5 = 'http://api.openweathermap.org/data/2.5/forecast?lat=lat1&lon=lon1&appid=44d53a879b6605862d3a1b3bdba2a127';
   // const icon = data.weather[0].icon;

    fetch(weather5,{
        method: 'GET',
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })
    .catch(function(error){
        console.error('error:',error)
    });
    // const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;
    // const iconImg = document.createElement('img');
    // iconImg.src = iconUrl;
    // // iconImg.style.backgroundColor = 'blue';
    // const iconContainer = document.getElementById('card-main-date');
    // iconContainer.appendChild(iconImg);
})
.catch(function(error){
    console.error('error:',error)
})

*/