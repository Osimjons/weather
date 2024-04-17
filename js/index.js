'use strict';

/*Константы */
const api = '61dc1a61284946aa730345e4647fb62d';
const lang = 'ru';
const titleCity = document.querySelector('.nav-city');
const addCityBtn = document.querySelector('.nav__add-city');
const resetButton = document.querySelector('.nav-city__reset-btn');
const inputValue = document.querySelector('.inp-block__input');
const searchBtn = document.querySelector('.inp-block__button');
const inputBlock = document.querySelector('.inp-block');
// const storageCity = localStorage.getItem('storageCity');
// console.log('storageCity: ', storageCity);
let city = inputValue.value;
/*
должен быть объектый литерал
let errorInfo = {
  404: 'Город введен не корректно. Попробуйте снова',
};
*/

/*Запуск программы из localStorage */
document.addEventListener('DOMContentLoaded', localOutput);

/*Функция добавляет классы */
const addClassList = (selectorName, classList) => {
  selectorName.classList.toggle(classList);
};
/*Функция удаляет классы */
const removeClassList = (selectorName, classList) => {
  selectorName.classList.remove(classList);
};

/**Добавление классов */
addCityBtn.addEventListener('click', () => {
  addClassList(addCityBtn, 'active');
  addClassList(titleCity, 'hiden');
  addClassList(inputBlock, 'active');
});

/*Функция получения значение из input и убираем лишние классы */
const searchClickFunctions = () => {
  city = inputValue.value.trim();
  if (!city) return alert('Вы не ввели название города, попробуйте снова');
  addClassList(addCityBtn, 'active');
  addClassList(titleCity, 'hiden');
  addClassList(inputBlock, 'active');
  getInfo(city);
  inputValue.value = '';
};
/*По клику получаем значение из input и убираем лишние классы */
searchBtn.addEventListener('click', searchClickFunctions);


/*Ввод по Enter */
inputValue.addEventListener('keypress', (e) => {
  if (e.code === 'Enter') {
    searchClickFunctions();
  }
});

/**Обновить данные */
resetButton.addEventListener('click', function () {
  addClassList(resetButton, 'active');
  removeClassList(addCityBtn, 'active');
  removeClassList(titleCity, 'hiden');
  removeClassList(inputBlock, 'active');
  setTimeout(() => {
    removeClassList(resetButton, 'active');
  }, 300);
  getInfo(localStorage.getItem('storageCity'));
});

const getInfo = (city) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api}&lang=${lang}&units=metric`
  )
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      /**Обратобка ошибки */
      if (data.cod === '404')
        return alert('Город введен неправльно, попробуйте снова');
      if (data.cod === '400') return alert('Сначало введите город');
      outputOnDisplay(data);
      sunriseSunset(data);
    });
};

/*Вывод информации на экран */
const outputOnDisplay = (data) => {
  let saveCity = data.city.name;
  window.localStorage.setItem('storageCity', saveCity);
  // console.log('storageCity: ', storageCity);
  // console.log('saveCity: ', saveCity);

  /*Город */
  document.querySelector('.nav-city').textContent = data.city.name;

  /**Вывод картинки */
  outputIconsOnDisplay(data);

  /*Температура*/
  document.querySelector('.main__temp').innerHTML =
    Math.floor(data.list[0].main.temp) + '&deg';

  /*состояние погоды */
  document.querySelector('.main__temp-desc').textContent =
    data.list[0].weather[0].description; //

  /*Скорость ветра*/
  document.querySelector('#wind-speed').textContent =
    data.list[0].wind.speed + ' м/с';

  /*Влажность */
  document.querySelector('#humidity').textContent =
    data.list[0].main.humidity + '%';

  /**Ощущение */
  document.querySelector('#feels_like').innerHTML =
    Math.floor(data.list[0].main.feels_like) + '&deg';
};

/*Вывод картинки */
const outputIconsOnDisplay = (data) => {
  const map = {
    '01d': `./img/01d.svg`,
    '01n': `./img/01n.svg`,
    '02d': `./img/02d.svg`,
    '02n': `./img/02n.svg`,
    '03d': `./img/03.svg`,
    '03n': `./img/03.svg`,
    '04d': `./img/04d.svg`,
    '04n': `./img/04d.svg`,
    '09d': `./img/09.svg`,
    '09n': `./img/09.svg`,
    '10d': `./img/10d.svg`,
    '10n': `./img/10n.svg`,
    '11d': `./img/11d.svg`,
    '11n': `./img/11n.svg`,
    '13d': `./img/13n.svg`,
    '13d': `./img/13d.svg`,
    '50d': `./img/50d.svg`,
  };
  const icon = data.list[0].weather[0].icon;
  const src = map[icon];
  document.querySelector('.main__img').src = src;
};

/*Расчет Восхода и Заката */
const sunriseSunset = (data) => {
  const sunrise = data.city.sunrise;
  const sunset = data.city.sunset;

  // Преобразование timestamp в объект Date
  const sunriseTime = new Date(sunrise * 1000);
  const sunsetTime = new Date(sunset * 1000);

  // Вывод времени восхода солнца
  const formattedSunrise = formatTime(sunriseTime);

  // Вывод времени заката солнца
  const formattedSunset = formatTime(sunsetTime);
  /*Конец Расчет Восхода и Заката */

  /*Восход */
  document.querySelector('#sunrise').innerHTML = 'Восход: ' + formattedSunrise;

  /*Закат */
  document.querySelector('#sunset').innerHTML =
    'Закат :' + ' ' + formattedSunset;
};

// Функция для форматирования времени с учетом локализации
const formatTime = (time) => {
  return time.toLocaleTimeString('ru-Ru', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

function localOutput() {
  const storageCity = localStorage.getItem('storageCity');
  if (!storageCity) {
    return;
  } else {
    localStorage.getItem(storageCity);
    getInfo(storageCity);
  }
}
