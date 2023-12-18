"use strict";

let title = prompt("Как называется Ваш проект?");

let screens = prompt("Какие типы экранов нужно разработать?");

let screenPrice = prompt("Сколько будет стоить данная работа?");

let adaptive = confirm("Нужен ли адаптив на сайте?");

let addServise1 = prompt("Какой дополнительный тип услуги нужен?", "service1");

let servicePrice1 = prompt("Сколько это будет стоить?");

let addServise2 = prompt("Какой дополнительный тип услуги нужен?", "service2");

let servicePrice2 = prompt("Сколько это будет стоить?");

let fullPrice =
  Number(screenPrice) + Number(servicePrice1) + Number(servicePrice2);
console.log(fullPrice);
let percent = 5;
let percentPrice = (fullPrice * percent) / 100;

let servicePercentPrice = Math.ceil(fullPrice - percentPrice);

if (isNaN(servicePercentPrice)) {
  console.log("Косяк, однако!");
} else {
  console.log(servicePercentPrice);
}

if (fullPrice > 30000) {
  console.log("Даем скидку в 10%");
} else if (fullPrice >= 15000 && fullPrice <= 30000) {
  console.log("Даем скидку в 10%");
} else if (fullPrice >= 0 && fullPrice < 15000) {
  console.log("Скидка не предусмотрена");
} else {
  console.log("Что то пошло не так");
}
