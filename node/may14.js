// Подключение возможности менять цвет текста в консоли
let color = require("cli-color");

// Функция позволяет выводить тект в зависимости от результата значения
let assert = function(value, desc) {
    desc = value ? color.green(desc) : color.red("false " + desc);
    console.log(desc);
};

// Вывод в консоль
let report = function(text) {
    assert(true, text);
}

// Пример обратного вызова функции
function useless(callback) { return callback(); }
let text = "Проверка обратного вызова!";
function getText() { return text; }
assert(useless(getText) === text, "Проверка на обратный вызов!");

// Пример "запоминания". Возможность обращения к функции как к объекту
function isPrime(value) {
    if (!isPrime.answer) { isPrime.answer = {}; }    // Создание кэш
    if (isPrime.answer[value] !== undefined) { return isPrime.answer[value]; }  // ПРоврека кэш
    report("Запуск проверки! В кэше нет этого значения");
    let prime = value !== 0 && value !== 1;
    for(let i = 2; i < value; i++) {
        if (value % i === 0) prime = false; break; // Число не натуральное
    }
    return isPrime.answer[value] = prime;
}

assert(isPrime(5), "5 натуральное число");
assert(isPrime(6), "6 натуральное число");
assert(isPrime(6), "6 натуральное число");
