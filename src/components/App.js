import React, {useState} from "react";
import "../styles/App.css";

import Weather from "./Weather";
import Header from "./Header";

function App() {
    // набор городов для выбора
    const [pref_cities, setCityList] = useState(['Moscow', 'Rostov', 'Ufa', 'Kazan']);
    // предпочитаемы город из списка
    const [pref_city, setPrefCity] = useState('');
    // режим показа - 24 часа или 5 дней
    const [mode, setMode] = useState(1);


    return (<div>
            <h1> Weather APP</h1>
            <p> Прогноз погоды для города {pref_city} </p>
            <Header pref_cities={pref_cities} setPrefCity={setPrefCity}/>
            <Weather pref_city={pref_city} setPrefCity={setPrefCity}
                     pref_cities={pref_cities} setCityList={setCityList}
                     mode={mode==0}
                     />
        </div>
    );
}

export default App;