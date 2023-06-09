import React from "react";
import axios from "axios";

const APIkey='5c2e7f3e4a8a4a01d51ab2c331473b6f'
let latitude=55;
let longitude=45;
let count=0;
let selected_city='';

function Weather(props){



    const pref_city = props.pref_city;
    const setPrefCity=props.setPrefCity;
    const setStatus=props.setStatus;
    const setGeoCity=props.setGeoCity;
    const setTimestamps=props.setTimestamps;
    const setCoord=props.setCoord;

    // Функция, выводящая текст об ошибке
    const error = () => {
      console.log('Информация о местоположении недоступна');
      setStatus('Информация о местоположении недоступна');
    }

    // Функция, срабатывающая при успешном получении геолокации
    const success = (position) => {
        console.log('position', position);
        latitude  = position.coords.latitude;
        longitude = position.coords.longitude;

        console.log(`Широта: ${latitude} °, Долгота: ${longitude} °`);
        const request = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIkey}&units=metric&lang=ru`
        console.log('request=',request);
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIkey}&units=metric`).then(res => {
            console.log("res:",res);
            console.log("data:",res.data);
            let array=res.data.list;
            console.log("list:",array);

            setTimestamps(array);
            console.log('city in response:', res.data.city.name);
            setGeoCity(res.data.city.name);
            console.log('city in state:', props.city);
            setStatus(`Вы в ${res.data.city.name}`);
            setCoord([latitude,longitude]);
            if(!pref_city){
                setPrefCity(res.data.city.name);
            }
        });
    }
    // если указан город
    console.log("Выбран город ", pref_city);

    // если город еще не задан
    if(!props.city){
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


    if(pref_city && count<3){
        if(pref_city!=selected_city){
            console.log(`pref_city = ${pref_city}, selected_city = ${selected_city}`);
            selected_city=pref_city;
            console.log(`selected_city changed, now ${selected_city}`);
            // получить погоду для выбранного города
            const request=`https://api.openweathermap.org/data/2.5/forecast?q=${selected_city}&appid=${APIkey}&units=metric`;
            axios.get(request).then(res => {
                console.log("res:",res);
                console.log("data:",res.data);
                let array=res.data.list;
                console.log("list:",array);

                setTimestamps(array);
                console.log('city in response:', res.data.city.name);
            });
            count++;
            console.log(`count=${count}`);
        }
    }

    return(
        <p> Выбран город {pref_city} </p>
    )
}

export default Weather;