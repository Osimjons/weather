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
    `http://api.openweathermap.org/data/2.5/forecast?q=${inpCity}&appid=${api}&lang=${lang}&units=metric`
  )
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      document.querySelector('.nav-city').textContent = data.city.name; //Город
      document.querySelector('.main__temp-desc').textContent =
        data.list[0].weather[0]['description']; //состояние погоды

      /*картинки */
      if (data.list[0].weather[0].description === 'облачно с прояснениями') {
        document.querySelector(
          '.main__img'
        ).src = `../img/cloudy.svg`;
      }

      document.querySelector('.main__temp').innerHTML =
        Math.floor(data.list[0].main.temp) + '&deg';

      // document.querySelector('#humidity').textContent =
      //   data.list[0].main.humidity + '%';
      // document.querySelector('#wind-speed').textContent =
      //   Math.round(data.list[0].wind.speed) + ' м.с';
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
