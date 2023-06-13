import React from "react";
import "../styles/Mode.css"

function Mode(props) {
    const mode=props.mode;
    const setMode=props.setMode;

    return (
        <div className={'mode_container'}>
            <div className={mode==0?'mode selected':'mode'} onClick={()=> setMode(0)}> Прогноз на 24 часа</div>
            <div className={mode==1?'mode selected':'mode'} onClick={()=> setMode(1)}> Прогноз на 5 дней</div>
        </div>
    );
}

export default Mode;