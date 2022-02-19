/**
 * 封装队列类
 * enqueue(element): 向队列尾部添加一个(或多个)新的项
 * dequeue()  移除队列的第一(即排在队列最前面的)项,并返回被移除的元素
 * front() 返回队列中第一个元素---最先被添加,也将是最先被移除的元素  
 *          队列不做任何改动(不移除元素,只返回元素信息--与Stack类的peek方法类似)
 * isEmpty(): 如果队列中不包含任何元素,返回true,否则返回false
 * size() 返回队列包含的元素个数
 * toString()  将队列中的内容,转成字符串形式
 */
class Queue {
    constructor() {
        this.items = []
    }
    enqueue(element) {
        this.items.push(element)
    }
    dequeue() {
        return this.items.shift()
    }

    front() {
        return this.items[0]
    }
    isEmpty() {
        return this.items.length == 0
    }

    size() {
        return this.items.length
    }

    toString() {
        let resultString = ''
        for (const item of this.items) {
            resultString += item + ' '
        }
        return resultString
    }
}

module.exports = Queue;