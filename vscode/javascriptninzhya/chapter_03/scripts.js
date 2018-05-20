// Подключение возможности менять цвет текста в консоли
let color = require("cli-color");

// Функция позволяет выводить тект в зависимости от результата значения
let assert = (value, desc) => {
    desc = value ? color.green(desc) : color.red("false " + desc);
    console.log(desc);
};

// Вывод в консоль
let report = text => assert(true, text);

/* Изучение параметра arguments */
function whatever(a, b, c) {

    assert(a === 1, "Значение a равно 1");
    assert(b === 2, "Значение a равно 2");
    assert(c === 3, "Значение a равно 3");

    assert(arguments.length === 5, "Кол-во переданных аргументов в функцию равно 5");

    for(var i = 0; i < arguments.length; i++) {
        assert(arguments[i] === i + 1, "значение " + arguments[i] + " аргумента === " + i);
    }

}

whatever(1, 2, 3, 4, 5);