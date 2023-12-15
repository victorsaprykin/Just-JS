const title = "Project";
const screens = "Simple, Complex, Interactive";
const screenPrice = 15;
const rollback = true;
const fullPrice = 1000;
const adaptive = false;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log(screenPrice);
console.log(fullPrice);
console.log(screens.toLowerCase().split(", "));
console.log(fullPrice * (rollback / 100));
