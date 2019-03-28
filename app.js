window.addEventListener('load', () => {

    let long;
    // long stands for Longitude
    let lat;
    // lat stands for Latitude

    let locationTimezone = document.querySelector('.location_timezone');
    let temperatureDegree = document.querySelector('.temperature_degree');
    let temperatureDescription = document.querySelector('.temperature_description');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

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

                const { temperature, summary, icon } = data.currently;

                // SET DOM Elements from the API

                locationTimezone.textContent = data.timezone;
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;

                // Formula For Celsius

                let celsius = (temperature - 32 ) * (5/9);

                // Set Icon

                setIcons(icon, document.querySelector('.icon'));

                // Change temperature to Celsius/Farenheit

                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    } else {
                        temperatureSpan.textContent = "F";
                    }
                })

            });
        });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});