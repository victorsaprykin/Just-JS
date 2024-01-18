"use strict";

const headerTitle = document.getElementsByTagName("h1")[0];
const calcBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];
const addScreenBtn = document.querySelector(".screen-btn");
const addServicePercent = document.querySelectorAll(".other-items.percent");
const addServiceNumber = document.querySelectorAll(".other-items.number");
const setRollback = document.querySelector('.rollback [type="range"]');
const rangeRollback = document.querySelector(".rollback .range-value");
const layoutcCostInput = document.getElementsByClassName("total-input")[0];
const screensInput = document.getElementsByClassName("total-input")[1];
const servicesInput = document.getElementsByClassName("total-input")[2];
const totalCostInput = document.getElementsByClassName("total-input")[3];
const rollbackPriceInput = document.getElementsByClassName("total-input")[4];
 
let getScreens = document.querySelectorAll(".screen");



console.log(headerTitle);
console.log(calcBtn);
console.log(resetBtn);
console.log(addScreenBtn);
console.log(addServicePercent);
console.log(addServiceNumber);
console.log(setRollback);
console.log(rangeRollback);
console.log(layoutcCostInput);
console.log(screensInput);
console.log(servicesInput);
console.log(totalCostInput);
console.log(rollbackPriceInput);
console.log(getScreens);

const appData = {
  title: "",
  name: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  servises: {},
  rollback: 5,
  allServicePrices: 0,
  servicePercentPrices: 0,
  fullPrice: 0,

  start: function () {
    appData.asking();
    appData.addPrices();
    appData.getFullPrice();
    appData.getServicePercentPrices();
    appData.getTitle();
    appData.logger();
  },

  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  asking: function () {
    do {
      appData.title = prompt("Как называется Ваш проект?", "Верстка сайта");
    } while (!isNaN(appData.title));

    for (let i = 0; i < 2; i++) {
      do {
        appData.name = prompt("Какие типы экранов нужно разработать?");
      } while (!isNaN(appData.name));

      let price = 0;

      do {
        price = prompt("Сколько будет стоить данная работа?");
      } while (!appData.isNumber(price));

      appData.screens.push({ id: i, name: name, price: price });
    }

    for (let i = 0; i < 2; i++) {
      do {
        appData.name = prompt("Какой дополнительный тип услуги нужен?");
      } while (!isNaN(appData.name));

      let price = 0;

      do {
        price = prompt("Сколько это будет стоить?");
      } while (!appData.isNumber(price));

      appData.servises[name] = +price;
    }

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },

  addPrices: function () {
    appData.screenPrice = appData.screens.reduce(function (sum, obj) {
      return sum + +obj.price;
    }, 0);

    for (let key in appData.servises) {
      appData.allServicePrices += appData.servises[key];
    }
  },

  getFullPrice: function () {
    appData.fullPrice = appData.screenPrice + appData.allServicePrices;
  },

  getServicePercentPrices: function () {
    appData.servicePercentPrices =
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
  },

  getTitle: function () {
    appData.title =
      appData.title.trim()[0].toUpperCase() +
      appData.title.trim().substring(1).toLowerCase();
  },

  getRollbackMessage: function (price) {
    if (price >= 30000) {
      return "Даем скидку в 10%";
    } else if (price >= 15000 && price < 30000) {
      return "Даем скидку в 5%";
    } else if (price >= 0 && price < 15000) {
      return "Скидка не предусмотрена";
    } else {
      return "Что то пошло не так";
    }
  },

  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrices);
  },
};

// appData.start();
