"use strict";

let title;
let screens;
let screenPrice;
let adaptive;
let addServise1;
let servicePrice1;
let addServise2;
let servicePrice2;
let rollback = 5;
let allServicePrices;
let servicePercentPrices;
let fullPrice;


const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
  title = prompt("Как называется Ваш проект?", "Верстка сайта");
  screens = prompt("Какие типы экранов нужно разработать?", "Полные и Макси");
 

  do {
    screenPrice = +prompt("Сколько будет стоить данная работа?");
  } while (!isNumber(screenPrice));
  adaptive = confirm("Нужен ли адаптив на сайте?");
};

const getAllServicePrices = function () {
  let sum = 0

  for (let i = 0; i < 2; i++) {

    if (i === 0) {
      addServise1 = prompt(
        "Какой дополнительный тип услуги нужен?",
        "service1"
      );
    } else if (i === 1) {
      addServise2 = prompt(
        "Какой дополнительный тип услуги нужен?",
        "service2"
      );
    }
    
      sum += +prompt("Сколько это будет стоить?");
     while (!isNumber(sum)) {
      sum = +prompt("Введите число!");
     }
    
  }

  return sum

};

function getFullPrice() {
  return screenPrice + allServicePrices;
}

const getTitle = function (str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1).toLowerCase();
};

const getServicePercentPrices = function () {
  return Math.ceil(fullPrice - rollback);
};

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getRollbackMessage = function (price) {
  if (screenPrice <= 0) {
    return "Что то пошло не так";
  }
  if (price >= 30000) {
    return "Даем скидку в 10%";
  }
  if (price >= 15000 && price < 30000) {
    return "Даем скидку в 5%";
  }
  if (price > 0 && price < 15000) {
    return "Скидка не предусмотрена";
  }
};

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrices = getServicePercentPrices();
showTypeOf(screens);
showTypeOf(servicePercentPrices);

console.log('allServicePrices', allServicePrices);

console.log(screenPrice);
console.log(getTitle(title));
console.log(getRollbackMessage(fullPrice));

console.log("Стоимость верстки экранов " + screenPrice + " руб и Стоимость разработки сайта " + fullPrice + " руб");
