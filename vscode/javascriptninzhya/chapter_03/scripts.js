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

    // Не в строгом режиме, при смене значения параметра arguments меняется значение самого параметра
    arguments[0] = -1;

    assert(a === -1, "Значение параметра поменялось");

}

whatever(1, 2, 3, 4, 5);

function getThis() { return this; }

assert(getThis() === global, "this в не строгом режиме равно глобальному объекту");


function whatsMyContext() {
    return this;
}

assert(whatsMyContext() === global, "Контекст this при вызове как функции равен global");
let getMyThis = whatsMyContext;
assert(getMyThis() === global, "Контекст this при вызове как функции равен global");
let objThis = {
    getMyThis: whatsMyContext
}
assert(objThis.getMyThis() === objThis, "Контекст this при вызове как метода равен объекту из которого он вызван");

let puppet = {
    rules: false
};

function Emperor() {
    this.rules = true;
    // Конструктор вернет объекет puppet!!!
    return puppet;
}

let emperor = new Emperor();

assert(emperor === puppet, "Конструктор объекта вернул объект локальный");
assert(emperor.rules === false, "Прсвоенный объект не знает про свойство");

//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
// При вызове как функцию не как конструктор в глобальной облати появится v()!
function fooWithThis() {
    this.v = function() {
        return this;
    };
}
fooWithThis();
console.log(v);

