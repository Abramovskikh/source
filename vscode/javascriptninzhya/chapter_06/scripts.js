let clc = require("cli-color");

let error = clc.red.bold;
let wran = clc.yellow;
let notice = clc.green;

let assert = function(value, note) {
    note = value ? notice(note) : error(note);
    console.log(note);
}; 

let report = function(note) {
    assert(true, note);
}

/* Работа с книгой */

function* WeaponGenerator() {
    yield "Katana";
    yield "Wakizashi";
    yield "Kusarigama";
}

for(let weapon of WeaponGenerator()) {
    assert(weapon !== undefined, weapon);
}

// Функция генератор
function* FoodGenerator() {
    yield "Хлеб";
    yield "Яблоко";
    yield "Молоко";
    yield "Печенье";
    yield "Масло";
}

// Результат вызова генератора создает итератор
const getFood = FoodGenerator();

let food = getFood.next();
assert(typeof food === 'object' && food.value === "Хлеб", "Генереация успешна: " + food.value);

food = getFood.next();
assert(typeof food === 'object' && food.value === "Яблоко", "Генереация успешна: " + food.value);

getFood.next();  // Молоко
getFood.next();  // Печенье

food = getFood.next();
assert(typeof food === 'object' && food.value === "Масло", "Генереация успешна: " + food.value);

