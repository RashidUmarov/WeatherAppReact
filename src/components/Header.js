import React, {useState} from "react";
import "../styles/Header.css";


const Header = (props) => {
  const pref_cities=props.pref_cities;
  const setPrefCity=props.setPrefCity;

  const [open, setOpen] = React.useState(false);

  const handleOpen = (e) => {
    setOpen(!open);
  };

  const handleMenuOne = (e) => {
    // do something
    setOpen(false);
    console.log(e.target.textContent);
    setPrefCity(e.target.textContent);
  };

  const handleMenuTwo = () => {
    // do something
    setOpen(false);
  };

  return (
    <Dropdown
      open={open}
      trigger={<button onClick={handleOpen}>Выбрать город</button>}
      menu={[
        <button onClick={handleMenuOne}>{pref_cities[0]}</button>,
        <button onClick={handleMenuOne}>{pref_cities[1]}</button>,
        <button onClick={handleMenuOne}>{pref_cities[2]}</button>,
        <button onClick={handleMenuOne}>{pref_cities[3]}</button>,
      ]}
    />
  );
};

const Dropdown = ({ open, trigger, menu }) => {
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