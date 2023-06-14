import React, {useState} from "react";
import axios from "axios";

import "../styles/Weather.css";

import {get_24_hours, get_days} from "./weather_forecast"

const APIkey = '9088d9c761bd148682fb6518d5bfc0c1'
let latitude = 55;
let longitude = 45;
let count = 0;
let selected_city = '';


// сюда будем записывать прогноз погоды
let forecast_periods;

function Weather(props) {
    // координаты объекта
    const [[lat, long], setCoord] = useState([0, 0]);

    const [forecast_hours, setForecastHours] = useState([])
    const [forecast_days, setForecastDays] = useState([])

    const mode = props.mode;
    const setCityList = props.setCityList;
    const getPrefCity=props.getPrefCity;
    const pref_city = getPrefCity();
    const setPrefCity = props.setPrefCity;

    const getCities=props.getCities;
    const pref_cities=getCities();

    console.log(`mode=${mode}`);
    // Функция, выводящая текст об ошибке
    const error = () => {
        console.log('Информация о местоположении недоступна');
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

            // сделаем расчет погоды на 24 часа из 9 таймстампов по 3 часа
            const forecast_hours = get_24_hours(array.slice(0, 9));
            setForecastHours(forecast_hours);
            console.log('24 hours:', forecast_hours);

            // сделаем расчет погоды на 5 дней из 40 таймстампов по 3 часа
            const forecast_days = get_days(array);
            setForecastDays(forecast_days);
            console.log('5 days:', forecast_days);

            console.log('city in response:', res.data.city.name);
            console.log('city in state:', props.city);
            setCoord([latitude, longitude]);
            if (!pref_city) {
                setPrefCity(res.data.city.name);
            }
            // если города еще нет в списке, то добавим
            if (!pref_cities.includes(res.data.city.name)) {
                setCityList([...pref_cities, res.data.city.name])
            }
        });
    }
    // если указан город
    console.log("Выбран город ", pref_city);

    // если город еще не задан
    if (!pref_city) {
        if ("geolocation" in navigator) {
            console.log("Geolocation available");
        } else {
            console.log("Geolocation is not Available");
        }

        if (!navigator.geolocation) {
            console.log('Информация о местоположении недоступна');
        } else {
            console.log('Определение местоположения…');
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

    // let show_mode = <p>Прогноз на 5 дней:</p>;
    // if (mode) {
    //     show_mode = <p>Прогноз на 24 часа:</p>;
    // }

    return (
        <>
            {/*{show_mode}*/}
            {mode ? (
                <div className={'forecast_container'}>
                    {forecast_hours ? (forecast_hours.map((period,index) => (
                            <div className={'forecast_hour'} key={index}>
                                {period.hour}:00<br/>
                                t={period.temp.toFixed(0)}° C<br/>
                                clouds:{period.clouds}<br/>
                                wind:{period.wind.toFixed(0)} m/sec<br/>
                            </div>
                        ))
                    ) : null}
                </div>
            ) : (
                <div className={'forecast_container'}>
                    {forecast_days.map((day,index) => (
                        <div className={'forecast_hour'} key={index}>
                            {day.day}<br/>
                            t = {day.temp_min} - {day.temp_max}° C<br/>
                            clouds: {day.clouds}<br/>
                            wind: {day.wind_min} - {day.wind_max} m/sec<br/>
                        </div>
                    ))}
                </div>
            )
            }
        </>
    );
}

export default Weather;