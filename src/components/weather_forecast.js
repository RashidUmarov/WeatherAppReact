
function interpolate(left, right, index){
    let delta=right-left;
    return(left+delta/3.0*index);
}

function get_24_hours(array) {
    console.log(`get_24_hours: array length = ${array.length}`);
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

function get_days(array) {
    console.log(`get_days: array length = ${array.length}`);
    const weather_days = [];
    let temp_max = -100;
    let temp_min = +100;
    let wind_max = 0;
    let wind_min = 0;
    let current_day_name = '';
    const first_date = new Date(array[0].dt * 1000)
    const name_size='long'
    let prev_day_name = first_date.toLocaleString("en", {weekday: name_size},{ timeZone: 'UTC' });
    let day_count = 0;
    let clouds_sum = 0;
    let dayname = '';
    array.forEach(elem => {
            const date = new Date(elem.dt * 1000);
            dayname = date.toLocaleString("en", {weekday: name_size},{ timeZone: 'UTC' });
            console.log(`day ${dayname}`);
            day_count++;
            // новый день недели
            if (dayname !== prev_day_name) {
                // создаем объект
                const day_weather = {
                    day: prev_day_name,
                    temp_max: Number(temp_max.toFixed(0)),
                    temp_min: Number(temp_min.toFixed(0)),
                    wind_max: Number(wind_max.toFixed(0)),
                    wind_min: Number(wind_min.toFixed(0)),
                    clouds: Number((clouds_sum / day_count).toFixed(0)),
                }
                weather_days.push(day_weather);
                // сбросим в исходной состояние
                temp_max = -100;
                temp_min = +100;
                wind_max = 0;
                wind_min = 0;
                clouds_sum = 0;
                day_count = 0;
                // запомним последний день
                prev_day_name = dayname;
            }
            temp_max = Math.max(temp_max, elem.main.temp_max);
            temp_min = Math.min(temp_min, elem.main.temp_min);
            clouds_sum += elem.clouds.all;
            wind_max = Math.max(wind_max, elem.wind.speed);
            wind_min = Math.min(wind_min, elem.wind.speed);
        }
    );
    // допишем хвост
    const day_weather = {
        day: prev_day_name,
        temp_max: Number(temp_max.toFixed(0)),
        temp_min: Number(temp_min.toFixed(0)),
        wind_max: Number(wind_max.toFixed(0)),
        wind_min: Number(wind_min.toFixed(0)),
        clouds: Number((clouds_sum / (day_count+1)).toFixed(0)),
    }
    weather_days.push(day_weather);
    // массив дней погоды
    return (weather_days);
}

 export {get_24_hours, get_days};

