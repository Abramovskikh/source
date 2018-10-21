function store() {
    return this.name;
}
store.name = "no name";
let stock = {
    name: "name stock"
}
stock.getter = store;
console.log("start");
console.log(store());
console.log(stock.getter());
console.log(store.name);