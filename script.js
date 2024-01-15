"use strict";

const appData = {
  title: "",
  screens: "",
  screenPrice: 0,
  adaptive: true,
  addServise1: "",
  addServise2: "",
  rollback: 5,
  allServicePrices: 0,
  servicePercentPrices: 0,
  fullPrice: 0,

  start: function () {
    appData.isNumber();
    appData.asking();
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice();
    appData.servicePercentPrices = appData.getServicePercentPrices();
    appData.title = appData.getTitle();
    appData.logger();
  },

  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  asking: function () {
    appData.title = prompt("Как называется Ваш проект?", "Верстка сайта");
    appData.screens = prompt(
      "Какие типы экранов нужно разработать?",
      "Полные и Макси"
    );

    do {
      appData.screenPrice = +prompt("Сколько будет стоить данная работа?");
    } while (!isNumber(appData.screenPrice));
    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },

  getTitle: function () {
    return (
      appData.title.trim()[0].toUpperCase() +
      appData.title.trim().substring(1).toLowerCase()
    );
  },

  getAllServicePrices: function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
      let price = 0;

      if (i === 0) {
        appData.addServise1 = prompt(
          "Какой дополнительный тип услуги нужен?",
          "service1"
        );
      } else if (i === 1) {
        appData.addServise2 = prompt(
          "Какой дополнительный тип услуги нужен?",
          "service2"
        );
      }

      do {
        price = prompt("Сколько это будет стоить?");
      } while (!isNumber(price));

      sum += +price;
    }

    return sum;
  },

  getFullPrice: function () {
    return appData.screenPrice + appData.allServicePrices;
  },

  getServicePercentPrices: function () {
    return appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
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
    for (const key in appData) {
      console.log(`${key} - ${appData[key]}`);
    }
  },
};

appData.start();
