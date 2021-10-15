
/* Global Variables */
let lat,lon;
// Create a new date instance dynamically with JS
const d = new Date();
const newDate = (d.getMonth() + 1)+'.'+ d.getDate()+'.'+ d.getFullYear();
const apiKey = "69679e6f0ff1a1a2d5fd3a3b7258d171";
const generateBtn = document.getElementById('generate');
const zipInp    = document.getElementById('zip');
const feelings = document.getElementById('feelings');
let urlAPI;
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos)=>{
        lat = pos.coords.latitude;
        lon= pos.coords.longitude;
        urlAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        generateBtn.addEventListener('click', () => {
            getPost(urlAPI, `Zip Code: ${zipInp.value}<br>Feelings: ${feelings.value}`);
        });
    });
}else {
    console.log(Error("Geolocation is not supported by this browser."));
}
/***** 
Main Functions
*****/
// Get Weather Data API
async function getData (url) {
    const data = await fetch(url);
    try{
        const fData = await data.json();
        // temp = fData.main.temp;
        return fData.main.temp;
    }catch(e){console.log(Error(`Error: ${e}`))}
}
// Post Data To Server
async function postRequest (url, data={}){
    const result = await fetch(url,data=
        {
            method : "POST",
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }
    );
}
// Update UI
async function updateUI(url){
    const response = await fetch(url);
    try{
        const responseData = await response.json();
        console.log(responseData);
        document.getElementById("date").innerHTML = `Date: ${responseData.date}`;
        document.getElementById("temp").innerHTML = `Temprature: ${responseData.temp}`;
        document.getElementById("content").innerHTML = responseData.userResponse;
        return responseData;
    }catch(e){`error: ${e}`}
}
// Combine GET & POST together
async function getPost(urlAPI, userInp){
    getData(urlAPI).then(function(data){
        postRequest('/postRequest', {temp: data, date: newDate, userResponse: userInp});
        updateUI('/getData');
    });
}