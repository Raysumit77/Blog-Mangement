// const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// const page = 3;
// const limit = 2;

// const startIndex = (page - 1) * limit;
// const endIndex = startIndex + limit;
// const result = data.slice(startIndex, endIndex);

const events = require("events");
const { totalmem } = require("os");

const eventEmitter = new events.EventEmitter();

//function
const calculateTax = (totalAmt) => {
    const tax = 0.13 * +totalAmt;
    console.log(`you need to total of ${tax} amount in orfer to pay 13% tax`)
    eventEmitter.emit("orderNow", totalAmt);
};

const buyNow = async ( cart) => {
    const totalAmt = cart.reduce((acc , current) => {
        return acc + current.price;
    },0);
    console.log({ totalAmt });
    eventEmitter.emit("calculator");
};

const orderNow = async( tax, totalAmt) => {
    console.log(`your total amount is ${tax + totalAmt}`);
}
//definig events
 eventEmitter.on(" calculateTax", totalAmt) => {
    calculateTax(totalAmt);
 };

 eventEmitter.on(" orderNow", totalAmt) => {
   orderNow(totalAmt);
 };
 //User interface

 const cart = [
    { name: "tv",price:2000},
    { name:"laptop",price:80000},
 ];
 buyNow(cart);
