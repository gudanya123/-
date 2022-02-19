/**
 * 封装列表类
 */

function ArrayList() {
    //属性
    this.array = []

    //方法
    //将数据可以插入到数组中的方法
    ArrayList.prototype.inset = function(item) {
        this.array.push(item)
    }

    //toString
    ArrayList.prototype.toString = function() {
        return this.array.join(' ')
    }

    //实现排序算法

    //冒泡排序


    //选择排序


    //插入排序


    //希尔排序


    //快速排序
}

//测试
let list = new ArrayList()
list.inset(1)
list.inset(3)
list.inset(7)
list.inset(5)
list.inset(9)

console.log(list.toString())