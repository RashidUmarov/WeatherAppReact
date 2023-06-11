
function interpolate(left, right, index){
    let delta=right-left;
    return(left+delta/3.0*index);
}

export function get_24_hours(array) {
    console.log(`array length = ${array.length}`);
    const weather_24_hours = [];
    weather_24_hours.length = 25;
    //let count=0;
    let ind = 0;
    array.forEach(elem => {
            const date = new Date(elem.dt * 1000);
            const hours = date.getUTCHours();
            const t = elem.main.temp_max;//Math.round(elem.main.temp_max);
            const clouds = elem.clouds.all;
            const wind = elem.wind.speed;
            const hour_weather = {
                hour: hours,
                temp: t,
                clouds: clouds,
                wind: wind
            }
            weather_24_hours[ind] = hour_weather;
            ind += 3;
        }
    );
    // теперь заполним пустые ячейки - их по 2 между непустыми элементами
    for (let i = 0; i < 25; i++) {
        // пропускаем элементы, четные 3-м
        const rest = i % 3;
        if (rest === 0) {
            continue;
        }
        // индексы предыдущего и последующего непустых элементов
        let left = i - 1;
        let right = i + 2;
        // если текущий индекс четный, значит поправим индексы
        if (rest == 2) {
            left--;
            right--;
        }
        // создаем элементы, вычисляем его поля на основе значений соседних непустых элементов
        const prev=weather_24_hours[left];
        const next=weather_24_hours[right];
        let hour=prev.hour+rest;
        if (hour==24){
            hour=0;
        }
        const hour_weather = {
            hour: hour,
            temp: Number(interpolate(prev.temp,next.temp, rest).toFixed(1)),
            clouds: Number(interpolate(prev.clouds,next.clouds, rest).toFixed(0)),
            wind: Number(interpolate(prev.wind,next.wind, rest).toFixed(2))
        }
        weather_24_hours[i]=hour_weather;
    }
    console.log(`done, we have array with ${weather_24_hours.length} elements`);
    return (weather_24_hours.slice(0, -1));
}

export default get_24_hours;

// const weather_hourly = get_24_hours(periods.slice(0, 9));
// console.log(weather_hourly);
