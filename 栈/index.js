const Stack = require('./Stack')

function decToBin(num) {
    let stack = new Stack()
    while (num > 0) {
        stack.push(num % 2)
        num = Math.floor(num / 2)
    }

    let binString = ''
    while (stack.items.length != 0) {
        binString += stack.pop()
    }
    return binString
}

console.log(decToBin(100))