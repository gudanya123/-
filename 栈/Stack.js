/**
 * 封装一个栈类
 * 栈常见的操作
 *  push(element) 添加一个新元素到栈顶位置
 * pop() 移除栈顶的元素,同时返回被移除的元素
 * peek() 返回栈顶的元素,不对栈做任何修改(这个方法不会移除栈顶的元素,仅仅返回它)
 * isEmpty()  
 * size()
 * toString()  将栈结构的内容以字符串形式返回
 * 
 */
class Stack {
    constructor() {
        this.items = []
    }

    push(element) {
        this.items.push(element)
    }

    pop() {
        return this.items.pop()
    }

    peek() {
        return this.items[this.items.length - 1]
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


module.exports = Stack