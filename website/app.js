/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear(); //  +1 cause getMonth start from 0  
//const zipCode=0;
//const apiURL = "https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric"; // apiURL
const apiKey = "25e8bd57eb6670d52f4171cbd8675e77"; //api key
const button = document.querySelector("#generate"); //select the button (#generate) 

const dataReturn = 0;
//const zipCode= 0 ;

async function temperatureReturn() {
    const zipCode = document.querySelector("#zip").value;

    if (!zipCode) {
        alert("zip code is empty!")
    }
    // event listen for the click on the button and select value of (zipCode & feelings)
    const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`);
    const dataReturn = await result.json();
    const temperature = dataReturn.main.temp;
    console.log(dataReturn);
    return temperature;
}
async function updateUI(result) {
    document.getElementById("date").innerHTML = result.date;
    document.getElementById("temp").innerHTML = result.temp;
    document.getElementById("content").innerHTML = result.feelings;
}


button.addEventListener("click", async function values() { //function to get value of zipCode & feelings
    const feelings = document.getElementById('feelings').value;


    temperatureReturn() //make promise for dataReturn
        .then((result) =>
            serverDataSend(result, feelings)
        ).then(() =>
            weatherDataReturn())
        .then((result) => {
            updateUI(result);
        })
        .catch(error => {
            console.log(error);
        })
})

async function weatherDataReturn() { //function for weatherDataReturn
    const weatherReturn = await fetch('/getData', {
        credentials: "same-origin",
    })
    const weatherReturnSave = await weatherReturn.json();
    return weatherReturnSave;
}

async function serverDataSend(temp, feelings) { // function for send data to the server
    await fetch('/postData', {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            date: newDate,
            temp: temp,
            feelings: feelings
        })
    })
}