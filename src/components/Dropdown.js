import React, {useState} from "react";
import "../styles/Dropdown.css"

const Dropdown = ({open, trigger, menu}) => {
    return (
        <div className="dropdown.drop">
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

export default Dropdown;