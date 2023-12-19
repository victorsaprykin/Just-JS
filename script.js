"use strict";

const title = prompt("Как называется Ваш проект?");

const screens = prompt("Какие типы экранов нужно разработать?");

const screenPrice = prompt("Сколько будет стоить данная работа?");

const adaptive = confirm("Нужен ли адаптив на сайте?");

const addServise1 = prompt("Какой дополнительный тип услуги нужен?", "service1");

const servicePrice1 = prompt("Сколько это будет стоить?");

const addServise2 = prompt("Какой дополнительный тип услуги нужен?", "service2");

const servicePrice2 = prompt("Сколько это будет стоить?");

const fullPrice =
  Number(screenPrice) + Number(servicePrice1) + Number(servicePrice2);
console.log(fullPrice);
const rollback = 5;
const percentPrice = (fullPrice * rollback) / 100;

const servicePercentPrice = Math.ceil(fullPrice - percentPrice);

if (isNaN(servicePercentPrice)) {
  console.log("Косяк, однако!");
} else {
  console.log(servicePercentPrice);
}

if (fullPrice > 30000) {
  console.log("Даем скидку в 10%");
} 
if (fullPrice >= 15000 && fullPrice <= 30000) {
  console.log("Даем скидку в 5%");
} 
if (fullPrice >= 0 && fullPrice < 15000) {
  console.log("Скидка не предусмотрена");
} if (fullPrice < 0) { 
  console.log("Что то пошло не так");
}
