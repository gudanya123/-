/**
 * 封装函数:判断传入的数字是否是质数
 * 只能被1和自己整除,不能被2到num-1之间数字整除
 */
function isPrime(num) {
    let temp = parseInt(Math.sqrt(num))
    for (let i = 2; i <= temp; i++) {
        if (num % i == 0) {
            return false
        }
    }
    return true
}

console.log(isPrime(41))
console.log(isPrime(28))