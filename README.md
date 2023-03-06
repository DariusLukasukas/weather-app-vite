# Weather App ✨

This is a simple weather application built with React and Vite. It allows users to search for a city and get the current weather conditions for that location.

<img width="1702" alt="Screenshot-dark-mode" src="https://user-images.githubusercontent.com/64962012/223087582-f94a7e11-6dfa-47ec-a272-a78fc857fbe1.png">

[**View demo**](https://dariuslukasukas.github.io/weather-app-vite/) 

## Features

* Search for weather information by city name or ZIP code
* View current weather information, including temperature, humidity, wind speed, and more
* View a 10-day forecast for the selected location
* View a map of the selected location using Leaflet
* View chart of probability of precipitation over the next 6 hours using Chart.js

## Dependencies

This project uses the following dependencies:

### Front-end 🎨
* tailwind CSS - A utility-first CSS framework packed with classes.
* headlessui/react - A set of completely unstyled, fully accessible UI components for React.
* react-redux - A package that provides bindings for React to use Redux.
* reduxjs/toolkit - A package that provides utilities to simplify common Redux use cases, including store setup, creating reducers and actions, and creating middleware.
* react-router-dom - A package that provides DOM bindings for React Router.
* axios - A Promise-based HTTP client for the browser.
* chart.js - A simple yet flexible JavaScript charting library that allows you to create a wide range of chart types.
* classnames - A JavaScript utility for conditionally joining classNames together.
* react-icons - A set of free icons for React projects.
* heroicons/react - A set of free icons for React projects.
* use-places-autocomplete - A React hook for implementing Google Places Autocomplete in application.
* leaflet - A JavaScript library for mobile-friendly interactive maps.

### Back-end ⚒️
* Github Pages

### APIs Used

This project uses the following APIs:

* Google Places API - used to search for locations and autocomplete
* OpenWeather API - used to retrieve weather data and map layer for a given location
* OpenMeteo API - used to retrieve UV Index data for a given location
* Stadia Maps API - used to style map tiles.

## Installation

To run this application locally, you'll need to have Node.js and npm installed on your machine. Once you've cloned this repository, navigate to the project directory and run the following commands:

* npm install
* npm run dev

This will install the necessary dependencies and start a local development server.

## Usage

To use this application, simply enter the name of a city in the search bar and press the "Enter" key. The current weather conditions for that city will be displayed.

## Contributing

If you'd like to contribute to this project, please open an issue or submit a pull request. Contributions are always welcome!

## License

This project is licensed under the MIT License.
