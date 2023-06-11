import React, {useState} from "react";
import "../styles/App.css";

import Weather from "./Weather";
import Header from "./Header";


function App() {
    // набор городов для выбора
    const [pref_cities, setCityList] = useState(['Moscow', 'Rostov', 'Ufa', 'Tomsk']);
    // предпочитаемы город из списка
    const [pref_city, setPrefCity] = useState('');
    // город по геолокации
    const [geo_city, setGeoCity] = useState("");
    //  текущее состояние приложения
    const [status, setStatus] = useState("Получение данных... ");
    // координаты объекта
    const [[lat, long], setCoord] = useState([0, 0]);
    // таймстампы с показателями погоды
    const [ts_list, setTimestamps] = useState([]);
    // режим показа - 24 часа или 5 дней
    const [mode, setMode] = useState('24hours');

    return (<div>
            <h1> Weather APP</h1>
            {/*<p> {status} </p>*/}
            <p> Прогноз погоды для города {pref_city} </p>
            <Header pref_cities={pref_cities} setPrefCity={setPrefCity}/>
            {/*<p> Координаты: latitude {lat}, longitude {long} </p>*/}
            {/*<p> Записей о погоде найдено: {ts_list.length} </p>*/}
            <Weather city={geo_city} setGeoCity={setGeoCity} coord={lat, long} setCoord={setCoord}
                     ts_list={ts_list} setTimestamps={setTimestamps}
                     pref_city={pref_city} setPrefCity={setPrefCity}
                     pref_cities={pref_cities} setCityList={setCityList}
                     mode={mode}
                     setStatus={setStatus}/>
        </div>
    );
}

export default App;