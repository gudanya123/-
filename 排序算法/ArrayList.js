/**
 * 封装列表类
 */

function ArrayList() {
    //属性
    this.array = []

    //方法
    //将数据可以插入到数组中的方法
    ArrayList.prototype.insert = function(item) {
        this.array.push(item)
    }

    //toString
    ArrayList.prototype.toString = function() {
        return this.array.join(' ')
    }

    //交换两个位置的数据
    ArrayList.prototype.swap = function(m, n) {
        let temp = this.array[m]
        this.array[m] = this.array[n]
        this.array[n] = temp
    }

    //实现排序算法

    //冒泡排序
    ArrayList.prototype.bubbleSort = function() {
        //1.获取数组长度
        let length = this.array.length

        for (let i = length - 1; i >= 0; i--) {
            for (let j = 0; j < i; j++) {
                if (this.array[j] > this.array[j + 1]) {
                    //交换两个数据
                    this.swap(j, j + 1)
                }
            }
        }
    }

    //选择排序
    ArrayList.prototype.selectSort = function() {
        let length = this.array.length

        //1.外层循环:从0位置开始取数据
        for (let i = 0; i < length - 1; i++) {
            //2.内层循环:从j+1位置开始,和后面的数据进行比较
            let min = i
            for (let j = min + 1; j < length; j++) {
                if (this.array[min] > this.array[j]) {
                    min = j
                }
            }
            this.swap(min, i)
        }
    }

    //插入排序
    ArrayList.prototype.insertionSort = function() {
        let length = this.array.length

        //外层循环:从第1个位置开始获取数据,向前面局部有序进行插入
        for (let i = 0; i < length; i++) {
            //内层循环:获取i位置的元素,和前面的数据依次进行比较
            let temp = this.array[i]
            let j = i
            while (this.array[j - 1] > temp && j > 0) {
                this.array[j] = this.array[j - 1]
                j--
            }

            this.array[j] = temp

        }

    }

    //希尔排序
    ArrayList.prototype.shellSort = function() {
        //1.获取数组的长度
        let length = this.array.length

        //2.初始化的增量(gap -> 间隔/间隙)
        let gap = Math.floor(length / 2)

        //3.while循环(gap不断的减小)
        while (gap >= 1) {
            //4.以gap作为间隔,进行分组,对分组进行插入排序
            for (let i = gap; i < length; i++) {
                let temp = this.array[i]
                let j = i
                while (this.array[j - gap] > temp && j > gap - 1) {
                    this.array[j] = this.array[j - gap]
                    j -= gap
                }

                //5.将j位置的元素赋值temp
                this.array[j] = temp
            }
            gap = Math.floor(gap / 2)
        }
    }


    //快速排序
    //1.选择枢纽
    ArrayList.prototype.media = function(left, right) {
        //1.1取出中间的位置
        let center = Math.floor((left + right) / 2)

        //1.2判断大小,并且进行交换
        if (this.array[left] > this.array[center]) {
            this.swap(left, center)
        }
        if (this.array[center] > this.array[right]) {
            this.swap(center, right)
        }
        if (this.array[left] > this.array[right]) {
            this.swap(left, right)
        }

        //3.将center换到right-1的位置
        this.swap(center, right - 1)

        return this.array[right - 1]

    }

    //2.快速排序
    ArrayList.prototype.quickSort = function() {
        this.quick(0, this.array.length - 1)
    }

    ArrayList.prototype.quick = function(left, right) {
        //1.结束条件
        if (left >= right) return

        //2.获取枢纽
        let pivot = this.media(left, right)

        //3.定义变量,用于记录当前找到的位置
        let i = left
        let j = right - 1

        //4.开始进行交换
        while (true) {
            while (this.array[++i] < pivot) {
                while (this.array[--j] > pivot) {
                    if (i < j) {
                        this.swap(i, j)
                    } else {
                        break
                    }
                }
            }
        }

        //5.将枢纽位置放置在正确的位置,i的位置
        this.swap(i, right - 1)

        //6.分而治之
        this.quick(left, i - 1)
        this.quick(i + 1, right)



    }

}

//测试
let list = new ArrayList()
list.insert(8)
list.insert(24)
list.insert(3)
list.insert(1)
list.insert(9)
    // list.bubbleSort()
    // list.selectSort()
    // list.insertionSort()
    // list.shellSort()
list.quickSort()
console.log(list.toString())