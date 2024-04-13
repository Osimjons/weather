'use strict';

// const API = '61dc1a61284946aa730345e4647fb62d';

// fetch(`http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${API}`);

//https://openweathermap.org/img/wn/02d@2x.png   ссылка на иконки работает

const api = '61dc1a61284946aa730345e4647fb62d';
const lang = 'ru';
const btn = document.querySelector('.inp-block__button');
// let inpCity = document.querySelector('.inp-block__input');

const getValue = () => {
  let inputElement = document.querySelector('.inp-block__input');
  let inpCity = inputElement.value.trim();
  // btn.addEventListener('click', () => {
  if (!inpCity) return alert('Что-то пошло не так, попробуйте снова');
  addCityInput(inpCity);
  setTimeout(() => {
    document.querySelector('.nav').classList.remove('hiden');
  }, 300);
  document.querySelector('.inp-block').classList.remove('active');
  inputElement.value = '';
  // });
};
btn.addEventListener('click', getValue);
const addCityActions = () => {
  const add = document.querySelector('#add-city');
  add.addEventListener('click', () => {
    document.querySelector('.nav').classList.toggle('hiden');
    setTimeout(() => {
      document.querySelector('.inp-block').classList.toggle('active');
    }, 300);
    // getValue();
  });
};
addCityActions();

const addCityInput = (inpCity) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${inpCity}&appid=${api}&lang=${lang}&units=metric`
  )
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      document.querySelector('.nav-city').textContent = data.city.name; //Город
      document.querySelector('.main__temp-desc').textContent =
        data.list[0].weather[0]['description']; //состояние погоды

      /*картинки */
      if (data.list[0].weather[0].icon === '01d') {
        document.querySelector('.main__img').src = `./img/01d.svg`;
      }
      if (data.list[0].weather[0].icon === '01n') {
        document.querySelector('.main__img').src = `./img/01n.svg`;
      }
      if (data.list[0].weather[0].icon === '02d') {
        document.querySelector('.main__img').src = `./img/02d.svg`;
      }
      if (data.list[0].weather[0].icon === '02n') {
        document.querySelector('.main__img').src = `./img/02n.svg`;
      }
      if (
        data.list[0].weather[0].icon === '03d' ||
        data.list[0].weather[0].icon === '03n'
      ) {
        document.querySelector('.main__img').src = `./img/03.svg`;
      }
      if (
        data.list[0].weather[0].icon === '04d' ||
        data.list[0].weather[0].icon === '04n'
      ) {
        document.querySelector('.main__img').src = `./img/04d.svg`;
      }
      if (
        data.list[0].weather[0].icon === '09d' ||
        data.list[0].weather[0].icon === '09n'
      ) {
        document.querySelector('.main__img').src = `./img/09.svg`;
      }
      if (data.list[0].weather[0].icon === '10d') {
        document.querySelector('.main__img').src = `./img/10d.svg`;
      }
      if (data.list[0].weather[0].icon === '10n') {
        document.querySelector('.main__img').src = `./img/10n.svg`;
      }
      if (data.list[0].weather[0].icon === '11d') {
        document.querySelector('.main__img').src = `./img/11d.svg`;
      }
      if (data.list[0].weather[0].icon === '11n') {
        document.querySelector('.main__img').src = `./img/11n.svg`;
      }
      if (data.list[0].weather[0].icon === '13d') {
        document.querySelector('.main__img').src = `./img/13d.svg`;
      }
      if (data.list[0].weather[0].icon === '13n') {
        document.querySelector('.main__img').src = `./img/13n.svg`;
      }
      if (data.list[0].weather[0].icon === '50d') {
        document.querySelector('.main__img').src = `./img/50d.svg`;
      }
      if (data.list[0].weather[0].icon === '50n') {
        document.querySelector('.main__img').src = `./img/50n.svg`;
      }
      /*Температура*/
      document.querySelector('.main__temp').innerHTML =
        Math.floor(data.list[0].main.temp) + '&deg';

      /*Скорость ветра*/
      document.querySelector('#wind-speed').textContent =
        data.list[0].wind.speed + ' м/с';

      /*Влажность */
      document.querySelector('#humidity').textContent =
        data.list[0].main.humidity + '%';

      /**Ощущение */
      document.querySelector('#feels_like').textContent =
        data.list[0].main.feels_like;

      /*Восход */
      document.querySelector('#tempMin').innerHTML =
        'Восход: ' + Math.floor(data.sity.sunrise) + '&deg';
        
      /*Закат */
      document.querySelector('#tempMax').innerHTML =
        'Закат: ' + Math.floor(data.list[0].main.temp_max) + '&deg';
    });
};



// fetch(
//   `http://api.openweathermap.org/data/2.5/forecast?q=${inpCity}&appid=${api}&lang=${lang}&units=metric`
// )
//   .then(function (resp) {
//     return resp.json();
//   })
//   .then(function (data) {
//     document.querySelector('.nav-city').textContent = data.city.name; //Город
//     document.querySelector('.main__temp-desc').textContent =
//       data.list[0].weather[0]['description'].toUpperCase(); //состояние погоды
//     // document.querySelector('.main__top-wrap img').src = './img/sun.svg';

//     // ).src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`);

//     document.querySelector('.main__temp').innerHTML =
//       Math.floor(data.list[0].main.temp) + '&deg';

//     // document.querySelector('#humidity').textContent =
//     //   data.list[0].main.humidity + '%';
//     // document.querySelector('#wind-speed').textContent =
//     //   Math.round(data.list[0].wind.speed) + ' м.с';
//   });
