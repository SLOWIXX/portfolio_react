async function Gulli() {
let key = "258297e0076ff6cd4c764167a9051b09"
let image = null
let Ville = ""

let met=document.querySelector(".meteo");

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(async (pos) => {
    var lat = pos.coords.latitude;
    var lon = pos.coords.longitude;
    console.log("Latitude:", lat);
    console.log("Longitude:", lon);

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`);
    const meteo = await response.json();
    console.log(meteo);

    image = meteo.weather[0].icon
    temperature = meteo.main.temp
    console.log("temp ",temperature)
    Ville =  meteo.name
    console.log(Ville)

    met.innerHTML += `<p>${temperature}°C</p>`;
    met.innerHTML += `<img src="https://openweathermap.org/img/wn/${image}.png">`;

    })

}


}


Gulli() 

