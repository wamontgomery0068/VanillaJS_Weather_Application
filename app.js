window.addEventListener('load', () => {

    let long;
    // long stands for Longitude
    let lat;
    // lat stands for Latitude

    let locationTimezone = document.querySelector('.location_timezone');
    let temperatureDegree = document.querySelector('.temperature_degree');
    let temperatureDescription = document.querySelector('.temperature_description');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            // console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            // Example Below
            
            // const api = `https://api.darksky.net/forecast/e01894f49ac79a13682b8ef6ea2a989a/37.8267,-122.4233`;
            // 37.8267 stands for the *** Latitude ***
            // -122.4233 stands for the *** Longitude ***
            // In order to get our location we have to modify those two numbers

            // Side Note
            // The API that we are using does not allow us to access the content on our local host.

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/e01894f49ac79a13682b8ef6ea2a989a/${lat},${long}`;

            // API Fetch Request Below

            fetch(api).then(response => {
                return response.json();
            }).then(data => {
                // console.log(data);
                const { temperature, summary } = data.currently;
                // SET DOM Elements from the API
                locationTimezone.textContent = data.timezone;
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;

            });

        });

    }
});