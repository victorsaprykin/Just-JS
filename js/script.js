"use strict";

const headerTitle = document.getElementsByTagName("h1")[0];
const calcBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];
const addScreenBtn = document.querySelector(".screen-btn");
const addServicePercent = document.querySelectorAll(".other-items.percent");
const addServiceNumber = document.querySelectorAll(".other-items.number");
const setRollback = document.querySelector('.rollback [type="range"]');
const rangeRollback = document.querySelector(".rollback .range-value");
const total = document.getElementsByClassName("total-input")[0];
const totalScreens = document.getElementsByClassName("total-input")[1];
const totalServices = document.getElementsByClassName("total-input")[2];
const fullTotalCost = document.getElementsByClassName("total-input")[3];
const rollbackPriceInput = document.getElementsByClassName("total-input")[4];

let screens = document.querySelectorAll(".screen");

const appData = {
  title: "",
  name: "",
  screens: [],
  isError: true,
  screenPrice: 0,
  adaptive: true,
  servisesPercent: {},
  servisesNumber: {},
  rollback: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  servicePercentPrices: 0,
  fullPrice: 0,
  init: function () {
    appData.addTitle();
    calcBtn.addEventListener("click", () => {
      appData.start();
    });
    addScreenBtn.addEventListener("click", appData.addScreenBlock);
    setRollback.addEventListener("change", appData.getRollback);
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  getRollback: function (e) {
    console.log(e.type);
    rangeRollback.textContent = e.target.value + "%";
    appData.rollback = e.target.value;
    console.log("Откат:" + appData.rollback);
  },

  checkInputs: function () {
    screens = document.querySelectorAll(".screen");
    screens.forEach((screen) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      if (select.value.trim().length === 0 || input.value.trim().length === 0) {
        appData.isError = false;
        console.log("isError в функции checkInputs: " + this.isError);
      }
      select.addEventListener("change", this.checkInputs);
    });
  },

  start: function () {
    this.checkInputs();

    console.log("isError в функции Start;" + this.isError);

    appData.addScreens();
    appData.addServices();

    appData.addPrices();

    console.log(appData);
    appData.showResult();
  },

  showResult: function () {
    total.value = appData.screenPrice;
    totalServices.value =
      appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCost.value = appData.fullPrice;
    rollbackPriceInput.value = appData.servicePercentPrices;
    totalScreens.value = appData.screenCount;
  },

  addScreens: function () {
    screens = document.querySelectorAll(".screen");

    screens.forEach(function (screen, index) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: input.value,
      });

      console.dir(screens);
    });

    console.log(appData.screens);
  },

  addServices: function () {
    addServicePercent.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servisesPercent[label.textContent] = +input.value;
      }
    });
    addServiceNumber.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servisesNumber[label.textContent] = +input.value;
      }
    });
  },

  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);

    console.log(cloneScreen);
    screens[screens.length - 1].after(cloneScreen);
  },

  addPrices: function () {
    appData.screenCount = appData.screens.reduce(function (sum, obj) {
      return sum + +obj.count;
    }, 0);
    appData.screenPrice = appData.screens.reduce(function (sum, obj) {
      return sum + +obj.price;
    }, 0);

    for (let key in appData.servisesNumber) {
      appData.servicePricesNumber += appData.servisesNumber[key];
    }

    for (let key in appData.servisesPercent) {
      appData.servicePricesPercent +=
        appData.screenPrice * (appData.servisesPercent[key] / 100);
    }

    appData.fullPrice =
      +appData.screenPrice +
      appData.servicePricesPercent +
      appData.servicePricesNumber;

    appData.servicePercentPrices =
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
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

appData.init();
