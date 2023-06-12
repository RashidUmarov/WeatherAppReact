import React from "react";
import "../styles/Forecast.css";

const Forecast = (props) => {
    const forecast_hours = props.forecast_hours;
    const forecast_days = props.forecast_days;
    return (
        props.mode ? (
            <div className={'forecast_container'}>
                {forecast_hours ? (forecast_hours.map(period => (
                        <div className={'forecast_hour'}>
                            {period.hour}:00<br/>
                            t={period.temp.toFixed(0)}° C<br/>
                            clouds:{period.clouds}<br/>
                            wind:{period.wind.toFixed(0)} m/sec<br/>
                        </div>
                    ))
                ) : null}
            </div>
        ) : (forecast_days.map(day => (
                <div className={'forecast_hour'}>
                    {day.day}<br/>
                    t = {day.temp_min} - {day.temp_max}° C<br/>
                    clouds: {day.clouds}<br/>
                    wind: {day.wind_min} - {day.wind_max} m/sec<br/>
                </div>
            ))
        )
    );
};

export default Forecast;