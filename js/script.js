"use strict";

const headerTitle = document.getElementsByTagName("h1")[0];
const calcBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];
const addScreenBtn = document.querySelector(".screen-btn");
const addServicePercent = document.querySelectorAll(".other-items.percent");
const addServiceNumber = document.querySelectorAll(".other-items.number");
const cmsServce = document.querySelector("#cms-open");
const setRollback = document.querySelector('.rollback [type="range"]');
const rangeRollback = document.querySelector(".rollback .range-value");
const total = document.getElementsByClassName("total-input")[0];
const totalScreens = document.getElementsByClassName("total-input")[1];
const totalServices = document.getElementsByClassName("total-input")[2];
const fullTotalCost = document.getElementsByClassName("total-input")[3];
const rollbackPriceInput = document.getElementsByClassName("total-input")[4];

console.dir(cmsServce);
console.dir(calcBtn);
let screens = document.querySelectorAll(".screen");

const cloneScreen = screens[0].cloneNode(true);

const appData = {
  title: "",
  name: "",
  screens: [],
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
    this.addTitle();
    calcBtn.addEventListener("click", () => {
      this.start();
      appData.blockInputs();
    });
    addScreenBtn.addEventListener("click", appData.addScreenBlock);
    setRollback.addEventListener("change", appData.getRollback);
    resetBtn.addEventListener("click", () => {
      appData.restart();
      console.log("restart");
    });
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
    appData.isError = false;
    screens.forEach((screen) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      if (select.value.trim().length === 0 || input.value.trim().length === 0) {
        appData.isError = true;
        console.log("isError в функции checkInputs: " + this.isError);
      }
      select.addEventListener("change", this.checkInputs);
    });
  },

  start: function () {
    this.checkInputs();

    console.log("isError в функции Start;" + this.isError);

    if (!appData.isError) {
      this.addScreens();
      this.addServices();

      this.addPrices();

      console.log(appData);
      this.showResult();
    }
  },

  showResult: function () {
    total.value = this.screenPrice;
    totalServices.value = this.servicePricesPercent + this.servicePricesNumber;
    fullTotalCost.value = this.fullPrice;
    rollbackPriceInput.value = this.servicePercentPrices;
    totalScreens.value = this.screenCount;
  },

  addScreens: function () {
    screens = document.querySelectorAll(".screen");

    screens.forEach(function (screen, index) {
      let select = screen.querySelector("select");
      let input = screen.querySelector("input");
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
    console.dir(cloneScreen);

    screens[screens.length - 1].after(cloneScreen);
  },

  blockInputs: function () {
    screens = document.querySelectorAll(".screen");
    screens.forEach(function (screen, index) {
      let select = screen.querySelector("select");
      let input = screen.querySelector("input");
      select.disabled = true;
      input.disabled = true;

      console.dir(select);
      console.dir(input);
    });
    addScreenBtn.disabled = true;
    calcBtn.style.display = "none";
    resetBtn.style.display = "block";

    console.dir(calcBtn);
  },

  restart: function () {
    screens.forEach(function (screen, index) {
      let select = screen.querySelector("select");
      let input = screen.querySelector("input");

      console.dir(screens);
      console.log(screens);

      select.disabled = false;
      input.disabled = false;
      input.value = "";
      select.value = "";

      console.dir(select);
      console.dir(input);
    });
    screens.slice(0, 1);
    addServicePercent.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");

      check.checked = false;
    });

    addServiceNumber.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");

      check.checked = false;
    });

    addScreenBtn.disabled = false;
    calcBtn.style.display = "block";
    resetBtn.style.display = "none";
    cmsServce.checked = false;

    totalScreens.value = "";
    totalServices.value = "";
    total.value = "";
    fullTotalCost.value = "";
    rollbackPriceInput.value = "";

    setRollback.value = "";
    rangeRollback.textContent = "0%";

    console.dir(addScreenBtn);
  },

  addPrices: function () {
    this.screenCount = this.screens.reduce(function (sum, obj) {
      return sum + +obj.count;
    }, 0);
    this.screenPrice = this.screens.reduce(function (sum, obj) {
      return sum + +obj.price;
    }, 0);

    for (let key in this.servisesNumber) {
      this.servicePricesNumber += this.servisesNumber[key];
    }

    for (let key in this.servisesPercent) {
      this.servicePricesPercent +=
        this.screenPrice * (this.servisesPercent[key] / 100);
    }

    this.fullPrice =
      +this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;

    this.servicePercentPrices =
      this.fullPrice - this.fullPrice * (this.rollback / 100);
  },

  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrices);
  },
};

appData.init();
