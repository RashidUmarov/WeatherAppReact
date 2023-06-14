import React, {useState} from "react";
import Dropdown from "./Dropdown";

import "../styles/Header.css";


const Header = (props) => {
    const pref_cities = props.pref_cities;
    const setPrefCity = props.setPrefCity;

    const getCities=props.getCities;
    const cities=getCities();

    const [open, setOpen] = React.useState(false);

    const handleOpen = (e) => {
        setOpen(!open);
    };

    const handleMenuClick = (e) => {
        // do something
        setOpen(false);
        console.log(e.target.textContent);
        setPrefCity(e.target.textContent);
    };

    return (
        <Dropdown
            open={open}
            trigger={<button className={'select_city'} onClick={handleOpen}>Выбрать город</button>}
            menu={cities.map(city => <button
                    onClick={handleMenuClick}>{city}
                </button>
            )}
        />
    );
}

export default Header;