import React, {useState} from "react";
import "../styles/Header.css";


const Header = (props) => {
    const pref_cities = props.pref_cities;
    const setPrefCity = props.setPrefCity;

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
            trigger={<button onClick={handleOpen}>Выбрать город</button>}
            menu={pref_cities.map(city => <button
                    onClick={handleMenuClick}>{city}
                </button>
            )}
        />
    );
};

const Dropdown = ({open, trigger, menu}) => {
    return (
        <div className="dropdown">
            {trigger}
            {open ? (
                <ul className="menu">
                    {menu.map((menuItem, index) => (
                        <li key={index} className="menu-item">{menuItem}</li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};

export default Header;