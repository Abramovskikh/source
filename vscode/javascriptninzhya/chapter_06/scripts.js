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
    yield (function(){report("Генерация"); return "Генератор";})();
}

// Результат вызова генератора создает итератор
const getFood = FoodGenerator();

// Метод next() возвращает объект, содержащий значение, вычисленное генератором
let food = getFood.next();
assert(typeof food === 'object' && food.value === "Хлеб", "Генерация успешна: " + food.value);

food = getFood.next();
assert(typeof food === 'object' && food.value === "Яблоко", "Генерация успешна: " + food.value);

getFood.next();  // Молоко
getFood.next();  // Печенье

food = getFood.next();
assert(typeof food === 'object' && food.value === "Масло", "Генерация успешна: " + food.value);

let gen = getFood.next();  // Генерация
for(let p in gen) report(p + ": " + gen[p]);

176