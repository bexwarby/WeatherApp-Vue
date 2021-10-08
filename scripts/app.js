/* Weather display main component */
const Weather = {
    // Data
    data() {
        return {
            // main weather statistics
            cityName: "London",
            iconID: "",
            dateToday: "",
            minTemp: 0,
            maxTemp: 0,
            windSpeed: 0,
            description: "",
            typedCityName: "",
            // weather array to stock different days
            weatherForecast: [],
        }
    },
    // on mount, load weather data for next 5 days in Nice
    async mounted() {

        let res = await fetch('https://api.openweathermap.org/data/2.5/forecast?q=london&appid=0b626d564aefeb00bdbd2c294ee1df75&units=metric')
        let data = await res.json();
        console.log(data);

        for (i = 0; i < 26; i++) {
            const newDay = {
                dateToday: data.list[i].dt_txt,
                minTemp: data.list[i].main.temp_min,
                maxTemp: data.list[i].main.temp_max,
                windSpeed: data.list[i].wind.speed,
                description: data.list[i].weather[0].description,
                iconID: data.list[i].weather[0].icon,
            };
            console.log(newDay);
            this.weatherForecast.push(newDay);
        };
    },
    // computed values
    /* computed: { */
    // function to display date as 07/10/2021 at 04.20 pm
    /* todayDate() {
        // index will be used to related the following day/month words
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        // Calculate all necessary measurements
        const time = new Date();
        const month = time.getMonth();
        const date = time.getDate();
        const day = time.getDay();
        const hour = time.getHours();
        const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour
        const minutes = time.getMinutes();
        const ampm = hour >= 12 ? 'PM' : 'AM'
        // create time and date displays
        const timeNow = (hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + `${ampm}`
        const dateToday = days[day] + ', ' + date + ' ' + months[month]
        // create final date stamp
        this.dateStamp = dateToday + " at " + timeNow
        return this.todayDate
    }, */
    // Methods
    methods: {
        // on click, load weather data for geo localisation
        geoLocalisation() {
            /* getPosition to get lat and lon by calling getPosition() method */
            navigator.geolocation.getCurrentPosition(async ({ coords }) => {
                /* fetch weather data for specific location */
                const res = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&appid=0b626d564aefeb00bdbd2c294ee1df75&units=metric`
                );
                /* reads object JSON */
                const data = await res.json();
                console.log(data)
                /* display data in cards */
                for (i = 0; i < 26; i++) {
                    const newDay = {
                        minTemp: data.list[i].main.temp_min,
                        maxTemp: data.list[i].main.temp_max,
                        windSpeed: data.list[i].wind.speed,
                        description: data.list[i].weather[0].description
                    };
                    console.log(newDay);
                    this.weatherForecast.push(newDay);
                };
            });
        },
        // function called when input city name is added
        async typedName() {
            const url = "https://api.openweathermap.org/data/2.5/weather?q="
                + this.typedCityName
                + "&appid=0b626d564aefeb00bdbd2c294ee1df75&units=metric";
            const res = await fetch(url);
            /* reads object JSON */
            const data = await res.json();
            console.log(data);
            /* display data in cards */
            for (i = 0; i < 5; i++) {
                const newDay = {
                    minTemp: data.list[i].main.temp_min,
                    maxTemp: data.list[i].main.temp_max,
                    windSpeed: data.list[i].wind.speed,
                    description: data.list[i].weather[i].description
                };
                console.log(newDay);
                this.weatherForecast.push(newDay);
            };
        },
    },
    template: `
        <div>    
            <div class="header">
                <h1 class="leftContent">Bex's Weather</h1>
                <p class="rightContent">Five Day Forecast</p>
                <button class="findButton" @click="geoLocalisation">Get My Location</button>
                <label class="dateDisplay labelTyped" for="typedCityName">Type your city:</label>
                <input v-model="typedCityName" class="typedCityInput" name="typedCityName" @keyup.enter="typedName"/>
            </div>
             
            <h2>{{ cityName }}</h2>
            <div class="cards">
                <div class="card" v-for="(weatherDay, index) in weatherForecast" :key="index">
                    <p class="dateDisplay">{{ weatherDay.dateToday }}</p>   
                    <img style="icon" :src="'http://openweathermap.org/img/wn/' + weatherDay.iconID + '@2x.png'">
                    <div class="container">
                        <p class="weatherData">
                            <ion-icon name="thermometer-outline" size="large"></ion-icon> 
                            <span class="blueText">{{ weatherDay.minTemp }}°c</span> 
                            <ion-icon name="thermometer-outline" size="large"></ion-icon> 
                            <span class="redText">{{ weatherDay.maxTemp }}°c</span> 
                        </p> 
                        <p class="weatherData">
                            <ion-icon class="wind" name="finger-print"></ion-icon>
                            <span class="darkBlueText">Wind: {{ weatherDay.windSpeed }}km/h</span>
                        </p> 
                        <p class="weatherData">
                            <ion-icon class="description" name="help-circle-outline"></ion-icon>
                            <span class="darkBlueLargerText">{{ weatherDay.description }}</span>
                        </p> 
                    </div>
                </div>
            </div>
        </div>
    `,
}

/* Footer component */
const Footer = {
    template: `
        <div class="footer">
            <p class="leftText"><b>&copy; Bex's Weather</b></p>
        </div>  
    `,
}

/* MAIN COMPONENT */
const MainComponent = {
    // Components
    components: {
        "weather": Weather,
        "add-footer": Footer
    },

}

const app = Vue.createApp(MainComponent);
app.config.isCustomElement = tag => tag.startsWith('ion-');
const vm = app.mount('#go');