/**
 * 优先级队列类封装
 */

function PriorityQueue() {
    //在PriorityQueue重新创建了一个类,可以理解为 内部类
    function QueueElement(element, priority) {
        this.element = element
        this.priority = priority
    }
    //封装属性
    this.items = []


    //实现插入方法
    PriorityQueue.prototype.enqueue = function(element, priority) {
        //1.创建QueueElement
        let queueElement = new QueueElement(element, priority)

        //2.判断队列是否为空
        if (this.items.length == 0) {
            this.items.push(queueElement)
        } else {
            let added = false
            for (let i = 0; i < this.items.length; i++) {
                if (queueElement.priority < this.items[i].priority) {
                    this.items.splice(i, 0, queueElement)
                    added = true
                    break
                }
            }
            if (!added) {
                this.items.push(queueElement)
            }
        }
    }

    PriorityQueue.prototype.dequeue = function() {
        return this.items.shift()
    }

    PriorityQueue.prototype.front = function() {
        return this.items[0]
    }
    PriorityQueue.prototype.isEmpty = function() {
        return this.items.length == 0
    }
    PriorityQueue.prototype.toString = function() {
        let resultString = ''
        for (const item of this.items) {
            resultString += item.element + '-' + item.priority + ' '
        }
        return resultString
    }
}
let pq = new PriorityQueue()

pq.enqueue('aaa', 111)
pq.enqueue('bbb', 20)
pq.enqueue('ccc', 120)

console.log(pq.toString())