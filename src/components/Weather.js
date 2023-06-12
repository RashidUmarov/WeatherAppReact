import React from "react";
import axios from "axios";

import {get_24_hours, get_days} from "./weather_forecast"

const APIkey = '9088d9c761bd148682fb6518d5bfc0c1'
let latitude = 55;
let longitude = 45;
let count = 0;
let selected_city = '';


// сюда будем записывать прогноз погоды
let forecast_periods;

function Weather(props) {
    const mode = props.mode;
    const setCityList = props.setCityList;
    const pref_city = props.pref_city;
    const setPrefCity = props.setPrefCity;
    const setStatus = props.setStatus;
    const setGeoCity = props.setGeoCity;
    const setTimestamps = props.setTimestamps;
    const setCoord = props.setCoord;

    const setForecastHours = props.setForecastHours;
    const setForecastDays = props.setForecastDays;

    console.log(`mode=${mode}`);
    // Функция, выводящая текст об ошибке
    const error = () => {
        console.log('Информация о местоположении недоступна');
        setStatus('Информация о местоположении недоступна');
    }

    // Функция, срабатывающая при успешном получении геолокации
    const success = (position) => {
        console.log('position', position);
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        console.log(`Широта: ${latitude} °, Долгота: ${longitude} °`);
        const request = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIkey}&units=metric&lang=ru`
        console.log('request=', request);
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIkey}&units=metric`).then(res => {
            console.log("res:", res);
            console.log("data:", res.data);
            let array = res.data.list;
            console.log("list:", array);

            setTimestamps(array);
            // сделаем расчет погоды на 24 часа из 9 таймстампов по 3 часа
            const forecast_hours = get_24_hours(array.slice(0, 9));
            setForecastHours(forecast_hours);
            console.log('24 hours:', forecast_hours);

            // сделаем расчет погоды на 5 дней из 40 таймстампов по 3 часа
            const forecast_days = get_days(array);
            setForecastDays(forecast_days);
            console.log('5 days:', forecast_days);

            console.log('city in response:', res.data.city.name);
            setGeoCity(res.data.city.name);
            console.log('city in state:', props.city);
            setStatus(`Вы в ${res.data.city.name}`);
            setCoord([latitude, longitude]);
            if (!pref_city) {
                setPrefCity(res.data.city.name);
            }
            // если города еще нет в списке, то добавим
            if (!props.pref_cities.includes(res.data.city.name)) {
                setCityList([...props.pref_cities, res.data.city.name])
            }
        });
    }
    // если указан город
    console.log("Выбран город ", pref_city);

    // если город еще не задан
    if (!props.city) {
        if ("geolocation" in navigator) {
            console.log("Geolocation available");
            setStatus("Geolocation available");
        } else {
            console.log("Geolocation is not Available");
            setStatus("Geolocation is not Available");
        }

        if (!navigator.geolocation) {
            console.log('Информация о местоположении недоступна');
            setStatus('Информация о местоположении недоступна');
        } else {
            console.log('Определение местоположения…');
            setStatus('Определение местоположения…');
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }

    // защита от зацикливания по ошибке
    if (pref_city && count < 10) {
        // если сменился выбранный город
        if (pref_city != selected_city) {
            console.log(`pref_city = ${pref_city}, selected_city = ${selected_city}`);
            selected_city = pref_city;
            console.log(`selected_city changed, now ${selected_city}`);
            // получить погоду для выбранного города
            const request = `https://api.openweathermap.org/data/2.5/forecast?q=${selected_city}&appid=${APIkey}&units=metric`;
            axios.get(request).then(res => {
                console.log("res:", res);
                console.log("data:", res.data);
                let array = res.data.list;
                console.log("list:", array);

                setTimestamps(array);
                // сделаем расчет погоды на 24 часа из 9 таймстампов по 3 часа
                const forecast_hours = get_24_hours(array.slice(0, 9));
                setForecastHours(forecast_hours);
                console.log('24 hours:', forecast_hours);

                // сделаем расчет погоды на 5 дней из 40 таймстампов по 3 часа
                const forecast_days = get_days(array);
                setForecastDays(forecast_days);
                console.log('5 days:', forecast_days);

                console.log('city in response:', res.data.city.name);
            });
            count++;
            console.log(`count=${count}`);
        }
    }

    let show_mode = <p>Прогноз на 5 дней:</p>;
    if (mode==0) {
        show_mode = <p>Прогноз на 24 часа:</p>;
    }

    return (
        <>
            {/*<p> Выбран город {pref_city} </p>*/}
            {show_mode}
        </>
    );
}

export default Weather;