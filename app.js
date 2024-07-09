const button = document.querySelector("button");

button.addEventListener("click", () => {
    if(navigator.geolocation) { //if browser support geolocation api
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
        button.innerText = "Allow to detect location"
    }else{
        button.innerText = "Your browser is not supported";
    }
});

function onSuccess(position) {
    button.innerText = "Detecting your location..."
    let {latitude, longitude} = position.coords;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=1524e6a1caa5407ebc27de47208215c3`)
    .then(response => response.json()).then(result => {
        let allDetails = result.results[0].components;
        let {county, postcode, country} = allDetails;
        button.innerText = `${county}, ${postcode}, ${country}`;
        console.table(allDetails);
    }).catch(() =>{
        button.innerText = "Something went wrong";
    }) 
};

function onError(error){
    if(error.code == 1){
        button.innerText = "You denied the request";
    }
    else if(error.code == 2){
        button.innerText = "Location not available";
    }
    else{
        button.innerText = "Something went wrong";
    }
    button.setAttribute("disabled", "true");
};