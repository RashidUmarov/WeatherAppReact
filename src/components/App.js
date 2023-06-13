import React, {useState} from "react";
import "../styles/App.css";

import Weather from "./Weather";
import Header from "./Header";
import Mode from "./Mode";

function App() {
    // набор городов для выбора
    const [pref_cities, setCityList] = useState(['Moscow', 'Rostov', 'Ufa', 'Kazan']);
    // предпочитаемый город из списка
    const [pref_city, setPrefCity] = useState('');
    // режим показа - 24 часа или 5 дней
    const [mode, setMode] = useState(1);

    const getCities = () => {
        return (pref_cities);
    }

    const getPrefCity = () => {
        return (pref_city);
    }

    return (<div>
            <h1> Weather APP</h1>
            <p> Прогноз погоды для города {pref_city} </p>
            <Header setPrefCity={setPrefCity} getCities={getCities}/>
            <Mode mode={mode} setMode={setMode}/>
            <Weather getPrefCity={getPrefCity} setPrefCity={setPrefCity}
                     getCities={getCities} setCityList={setCityList}
                     mode={mode == 0}
            />
        </div>
    );
}

export default App;