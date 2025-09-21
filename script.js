var city = document.querySelector('#city')
var search = document.querySelector('#search')
var weatherType = document.querySelector('#weatherType')
var temprature = document.querySelector('#temprature')
var cityname = document.querySelector('#cityname')
var humidity = document.querySelector('#humidity')
var speed = document.querySelector('#speed')
var loader1 = document.querySelector('#loader1')

loader1.style.display = 'none'
city.value =''
weatherType.innerHTML=''
temprature.innerHTML=''
cityname.innerHTML=''
humidity.innerHTML=''
speed.innerHTML=''

search.addEventListener('click', () => {
    if (city.value == '') {
        alert('Enter city name');
        return;
    }
    loader1.style.display = 'flex';
    setTimeout(async () => {
        let apiURL= `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=db22ec1c587afa5f70bcf97ba43b8480;`
        const rawRes = await fetch(apiURL);
        const res = await rawRes.json();

       
        weatherType.innerHTML = res.weather[0].description
        
        temprature.innerHTML = tempCelsius + " °C"
        cityname.innerHTML = res.name
        speed.innerHTML = res.wind.speed + " m/s"
        humidity.innerHTML = res.main.humidity + " %"

        loader1.style.display = 'none'
        console.log(res)
    }, 1000);
});