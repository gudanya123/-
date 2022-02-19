/**
 * 设计哈希函数
 *  1.将字符串转成比较大的数字:hashCode
 *  2.将大的数字hashCode压缩到数组范围(大小)之内
 */
function hashFunc(str, size) {
    //1.定义hashCode变量
    let hashCode = 0

    //2.霍纳算法,来计算hashCode的值
    //cats -> Unicode编码
    for (let i = 0; i < str.length; i++) {
        hashCode = 37 * hashCode + str.charCodeAt(i)
    }
    //3.取余操作
    let index = hashCode % size

    return index

}

//测试哈希函数

console.log(hashFunc('abc', 7))
console.log(hashFunc('cba', 7))
console.log(hashFunc('nba', 7))
console.log(hashFunc('xyz', 7))