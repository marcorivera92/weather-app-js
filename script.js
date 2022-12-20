/* ------ DOM ELEMENTS ------ */
const cardsWrapper = document.querySelector(".city_cards");
const weatherDetails = document.querySelector(".weather_details");
const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const btnSearch = document.querySelector(".btn_search");

/* ------ FETCH API------ */

const singleCityWeather = (city) => {
  cardsWrapper.innerHTML = "";
  weatherDetails.innerHTML = "";
  const apiKey = "f64789bc2ca57c43cbd4b17a82227510";
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`
  )
    .then((res) => res.json())
    .then((data) => weatherCard(data));
};

// SEARCHBAR

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let str1 = input.value.charAt(0).toUpperCase();
  let str2 = input.value.slice(1);
  singleCityWeather(str1 + str2);
});

btnSearch.addEventListener("click", (event) => {
  event.preventDefault();
  let str1 = input.value.charAt(0).toUpperCase();
  let str2 = input.value.slice(1);
  singleCityWeather(str1 + str2);
});

// DISABLE BUTTON if input has less than 3 characters
input.addEventListener("input", function () {
  if (input.value.length <= 1) {
    btnSearch.classList.remove("active");
    btnSearch.disabled = "disabled";
  } else {
    btnSearch.classList.add("active");
    btnSearch.disabled = "";
  }
});

/* ------ WEATHER CARD ------ */
const weatherCard = (data) => {
  const cardElm = document.createElement("div");
  cardElm.className = "card";

  const imageBox = document.createElement("div");
  imageBox.className = "image_box";

  const cardImage = document.createElement("img");
  cardImage.className = "card_image";

  const cardTexture = document.createElement("img");
  cardTexture.className = "card_texture";

  const cardTitle = document.createElement("div");
  cardTitle.className = "card_title";

  const country_city = document.createElement("div");
  country_city.className = "country_city_wrapper";

  const cityName = document.createElement("h3");
  cityName.className = "city_name";

  const country = document.createElement("h3");
  country.className = "country_name";

  const divider = document.createElement("span");
  divider.className = "description_divider";

  const cardDescription = document.createElement("div");
  cardDescription.className = "card_description";

  const cardForecast = document.createElement("h6");

  const cardInfo = document.createElement("div");
  cardInfo.className = "card_info";

  const cityDegree = document.createElement("p");
  cityDegree.className = "city_degree";

  const tempRange = document.createElement("div");
  tempRange.className = "city_temprange";

  const tempMinMax = document.createElement("h6");
  tempMinMax.className = "temp_minmax";

  const tempRangeIcon = document.createElement("img");
  tempRangeIcon.className = "temp_range_icon";

  const tempRangeLabel = document.createElement("p");
  tempRangeLabel.className = "temp_range_label";

  const windBox = document.createElement("div");
  windBox.className = "wind_box";

  const windIcon = document.createElement("img");
  windIcon.className = "wind_icon";

  const windValue = document.createElement("h6");
  windValue.className = "wind_value";

  const windLabel = document.createElement("p");
  windLabel.className = "wind_label";

  const humidityBox = document.createElement("div");
  humidityBox.className = "humidity_box";

  const humidityIcon = document.createElement("img");
  humidityIcon.className = "humidity_icon";

  const humidityValue = document.createElement("h6");
  humidityValue.className = "humidity_value";

  const humidityLabel = document.createElement("p");
  humidityLabel.className = "humidity_label";

  // DOM VALUES
  cityName.textContent = data.name;
  cityDegree.textContent = Math.floor(data.main.temp) + "°";
  cardForecast.textContent = data.weather[0].description;
  country.textContent = data.sys.country;
  tempMinMax.textContent =
    Math.floor(data.main.temp_min) +
    "°" +
    " " +
    Math.floor(data.main.temp_max) +
    "°";
  tempRangeIcon.setAttribute("src", "./_icons/thermometer.png");
  tempRangeLabel.textContent = "L" + " / " + "H";
  windValue.textContent = Math.floor(data.wind.speed) + "km/h";
  windIcon.setAttribute("src", "./_icons/wind.png");
  windLabel.textContent = "Wind";
  humidityValue.textContent = data.main.humidity + "%";
  humidityIcon.setAttribute("src", "./_icons/humidity.png");
  humidityLabel.textContent = "Humidity";

  // APPEND
  cardTitle.append(cardForecast, cityDegree);
  country_city.append(cityName, country);
  cardDescription.append(cardTitle, divider, country_city);
  imageBox.append(cardImage, cardTexture);
  cardInfo.append(imageBox);
  tempRange.append(tempRangeIcon, tempMinMax, tempRangeLabel);
  windBox.append(windIcon, windValue, windLabel);
  humidityBox.append(humidityIcon, humidityValue, humidityLabel);
  weatherDetails.append(windBox, humidityBox, tempRange);
  cardElm.append(cardDescription, cardInfo);
  cardsWrapper.append(cardElm);

  // BACKGROUND CHANGE
  const weatherMain = data.weather[0].main;
  switch (weatherMain) {
    case "Clouds":
      cardElm.style = `background: linear-gradient(to right, #2f53ef 0%, #9f79d9 100%) fixed `;
      cardImage.setAttribute("src", "./_images/cloudy.png");
      cardTexture.setAttribute("src", "./_pattern/mist.png");
      // purple
      break;
    case "Drizzle":
      cardElm.style = `background: linear-gradient(to right, #188701  0%, #0f5402 100%) fixed `;
      cardImage.setAttribute("src", "./_images/rain.png");
      // green
      break;
    case "Rain":
      cardElm.style = `background: linear-gradient(to right, #188701  0%, #0f5402 100%) fixed `;
      cardImage.setAttribute("src", "./_images/rain.png");
      // green
      break;
    case "Snow":
      cardElm.style = `background: linear-gradient(to right, #197a04 0%, #485461 100%) fixed `;
      cardImage.setAttribute("src", "./_images/snow.png");
      cardTexture.setAttribute("src", "./_pattern/snow.png");
      // green - grey
      break;
    case "Thunderstorm":
      cardElm.style = `background: linear-gradient(to right, #28313B 0%, #485461 100%) fixed`;
      cardImage.setAttribute("src", "./_images/thunderstorm.png");
      cardTexture.setAttribute("src", "./_pattern/mist.png");
      // grey
      break;
    case "Mist":
      cardElm.style = `background: linear-gradient(to right, #AF2106 0%, #FF4451 100%) fixed `;
      cardImage.setAttribute("src", "./_images/mist.png");
      cardTexture.setAttribute("src", "./_pattern/mist.png");
      // red
      break;
    case "Smoke":
      cardElm.style = `background: linear-gradient(to right, #AF2106 0%, #FF4451 100%) fixed `;
      cardImage.setAttribute("src", "./_images/mist.png");
      cardTexture.setAttribute("src", "./_pattern/mist.png");
      break;
    case "Haze":
      cardElm.style = `background: linear-gradient(to right, #AF2106 0%, #FF4451 100%) fixed `;
      cardImage.setAttribute("src", "./_images/mist.png");
      cardTexture.setAttribute("src", "./_pattern/mist.png");
      break;
    case "Dust":
      cardElm.style = `background: linear-gradient(to right, #AF2106 0%, #FF4451 100%) fixed `;
      cardImage.setAttribute("src", "./_images/mist.png");
      cardTexture.setAttribute("src", "./_pattern/mist.png");
      break;
    case "Fog":
      cardElm.style = `background: linear-gradient(to right, #AF2106 0%, #FF4451 100%) fixed `;
      cardImage.setAttribute("src", "./_images/mist.png");
      cardTexture.setAttribute("src", "./_pattern/mist.png");
      break;
    case "Ash":
      cardElm.style = `background: linear-gradient(to right, #AF2106 0%, #FF4451 100%) fixed `;
      cardImage.setAttribute("src", "./_images/mist.png");
      cardTexture.setAttribute("src", "./_pattern/mist.png");
      break;
    case "Sand":
      cardElm.style = `background: linear-gradient(to right, #AF2106 0%, #FF4451 100%) fixed `;
      cardImage.setAttribute("src", "./_images/mist.png");
      cardTexture.setAttribute("src", "./_pattern/mist.png");
      break;
    case "Squall":
      cardElm.style = `background: linear-gradient(to right, #AF2106 0%, #FF4451 100%) fixed `;
      cardImage.setAttribute("src", "./_images/mist.png");
      cardTexture.setAttribute("src", "./_pattern/mist.png");
      break;
    case "Tornado":
      cardElm.style = `background: linear-gradient(to right, #AF2106 0%, #FF4451 100%) fixed `;
      cardImage.setAttribute("src", "./_images/tornado.png");
      cardTexture.setAttribute("src", "./_pattern/mist.png");
      break;
    case "Clear":
      cardElm.style = `background: linear-gradient(to right, #2288fb 30%, #77c1fb 90%, #98d3fd 100%) fixed `;
      cardImage.setAttribute("src", "./_images/sun.png");
      // light blue

      break;
  }
};

/* ------ FUNCTIONS  ------ */

singleCityWeather();
