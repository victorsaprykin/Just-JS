"use strict";

let title = prompt("Как называется Ваш проект?");
let screens = prompt("Какие типы экранов нужно разработать?");
let screenPrice = Number(prompt("Сколько будет стоить данная работа?"));
let adaptive = confirm("Нужен ли адаптив на сайте?");
let addServise1 = prompt("Какой дополнительный тип услуги нужен?", "service1");
let servicePrice1 = Number(prompt("Сколько это будет стоить?"));
let addServise2 = prompt("Какой дополнительный тип услуги нужен?", "service2");
let servicePrice2 = Number(prompt("Сколько это будет стоить?"));
let rollback = 5;
let allServicePrices;
let servicePercentPrices;
let fullPrice;

const getAllServicePrices = function (servicePrice1, servicePrice2) {
  return servicePrice1 + servicePrice2;
};

allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);

function getFullPrice() {
  return screenPrice + allServicePrices;
}

fullPrice = getFullPrice();

const getTitle = function (str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1).toLowerCase();
};

const getServicePercentPrices = function () {
  return Math.ceil(fullPrice - rollback);
};

servicePercentPrices = getServicePercentPrices();

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getRollbackMessage = function () {
  if (fullPrice >= 30000) {
    return "Даем скидку в 10%";
  }
  if (fullPrice >= 15000 && fullPrice < 30000) {
    return "Даем скидку в 5%";
  }
  if (fullPrice >= 0 && fullPrice < 15000) {
    return "Скидка не предусмотрена";
  } else {
    return "Что то пошло не так";
  }
};

showTypeOf(screens);
showTypeOf(servicePercentPrices);

console.log(getTitle(title));
console.log(getRollbackMessage());
