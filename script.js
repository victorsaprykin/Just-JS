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
  if (price <= 0) {
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


allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice();
servicePercentPrices = getServicePercentPrices();
showTypeOf(screens);
showTypeOf(servicePercentPrices);

console.log(getTitle(title));
console.log(getRollbackMessage(fullPrice));
