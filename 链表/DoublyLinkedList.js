/**
 * 双向链表类的封装
 * append(element)  向链表尾部添加一个新的项
 * insert(position,element)  向链表的特定位置插入一个新的项
 * get(position)  获取对应位置的元素
 * indexOf(element) 返回元素在链表中的索引,如果链表没有该元素则返回-1
 * update(position) 膝盖某个位置的元素
 * removeAt(position)   从链表的特定位置移除一项
 * remove(element)  从链表中移除一项
 * isEmpty() 如果链表中不包含任何元素,返回true,如果链表长度大于0返回false
 * size()   返回链表包含的元素个数  
 * toString()  由于链表项使用了Node类,就需要重写继承自js对象默认的toString()方法,让其只输出元素的值
 * 
 * forwardString(): 返回反向遍历的节点字符串形式
 * backwardString() 返回正向遍历的节点字符串形式
 */

function DoublyLinkedList() {
    //内部类:节点类
    function Node(data) {
        this.data = data
        this.prev = null
        this.next = null
    }

    this.head = null
    this.tail = null
    this.length = 0

    //1.append()
    DoublyLinkedList.prototype.append = function(data) {

        //创建新的节点
        let newNode = new Node(data)

        //判断添加的是否是第一个节点
        if (this.length == 0) {
            this.head = newNode
            this.tail = newNode
        } else {
            newNode.prev = this.tail
            this.tail.next = newNode
            this.tail = newNode
        }
        //3.length + 1
        this.length += 1
    }

    //2.forwardString()
    DoublyLinkedList.prototype.forwardString = function() {
        //1.定义变量
        let current = this.tail
        let resultString = ''

        //依次向前遍历,获取每一个节点
        while (current) {
            resultString += current.data + ' '
            current = current.prev
        }
        return resultString
    }

    //3.backwardString()
    DoublyLinkedList.prototype.backwardString = function() {
        //1.定义变量
        let resultString = ''
        let current = this.head

        //依次向后遍历,获取每一个节点
        while (current) {
            resultString += current.data + ' '
            current = current.next
        }
        return resultString
    }

    //4.toString()
    DoublyLinkedList.prototype.toString = function() {
        return this.backwardString()
    }

    //5.insert(position,data)
    DoublyLinkedList.prototype.insert = function(position, data) {
        //1.越界判断
        if (position < 0 || position > this.length) {
            return false
        }
        //2.创建新的节点
        let newNode = new Node(data)

        //3.判断原来的链表是否为空
        if (this.length == 0) {
            this.head = newNode
            this.tail = newNode
        } else {
            if (position == 0) { //3.1判断position是否为0 
                this.head.prev = newNode
                newNode.next = this.head
                this.head = newNode
            } else if (position == this.length) { //3.2 position == length
                this.tail.next = newNode
                newNode.prev = this.tail
                this.tail = newNode
            } else { //3.3 其他情况
                let current = this.head
                let index = 0
                while (index++ < position) {
                    current = current.next
                }
                //修改指针
                newNode.next = current
                newNode.prev = current.prev
                current.prev.next = newNode
                current.prev = newNode

            }
        }
        //4.length +1
        this.length += 1

        return true
    }

    //6.get(position)
    DoublyLinkedList.prototype.get = function(position) {
        if (position < 0 || position >= this.length) {
            return null
        }
        // this.length / 2 > position ? 从前向后遍历
        // this.length / 2 < position从后向前遍历
        let current = null
        let index = 0

        //this.length / 2 > position:从头开始遍历
        if ((this.length / 2) > position) {
            current = this.head
            while (index++ < position) {
                current = current.next
            }
        } else {
            current = this.tail
            index = this.length - 1
            while (index-- > position) {
                current = current.prev
            }
        }
        return current.data

    }

    //7.indexOf(data)
    DoublyLinkedList.prototype.indexOf = function(data) {
        let current = this.head
        let index = 0
        while (current) {
            if (data == current.data) {
                return index
            }
            current = current.next
            index++
        }
        return -1
    }

    //8.update(position,data)
    DoublyLinkedList.prototype.update = function(position, data) {
        if (position < 0 || position >= this.length) {
            return false
        }
        // this.length / 2 > position ? 从前向后遍历
        // this.length / 2 < position从后向前遍历
        let current = null
        let index = 0

        //this.length / 2 > position:从头开始遍历
        if (this.length / 2 > position) {
            current = this.head
            while (index++ < position) {
                current = current.next
            }
        } else {
            current = this.tail
            index = this.length - 1
            while (index-- > position) {
                current = current.prev
            }
        }
        current.data = data
        return true
    }

    //9.removeAt(position)
    DoublyLinkedList.prototype.removeAt = function(position) {
        if (position < 0 || position >= this.length) {
            return null
        }
        let current = this.head
        if (this.length == 1) { //如果只存在一个节点
            this.head = null
            this.tail = null
        } else {
            if (position == 0) {
                this.head = this.head.next
                this.head.next.prev = null
            } else if (position == this.length - 1) {
                current = this.tail
                this.tail.prev.next = null
                this.tail = this.tail.prev
            } else {
                let index = 0
                while (index++ < position) {
                    current = current.next
                }
                current.prev.next = current.next
                current.next.prev = current.prev
            }

        }

        this.length -= 1

        return current.data

    }

    //10.remove(data)
    DoublyLinkedList.prototype.remove = function(data) {
        let index = this.indexOf(data)
        this.removeAt(index)
    }

    DoublyLinkedList.prototype.isEmpty = function() {
        return this.length == 0
    }

    DoublyLinkedList.prototype.size = function() {
        return this.length
    }

    DoublyLinkedList.prototype.getFirst = function() {
        return this.head.data
    }

    DoublyLinkedList.prototype.getLast = function() {
        return this.tail.data
    }

}

/**
 * 测试
 */

let doubleList = new DoublyLinkedList()

doubleList.append(1)
doubleList.append(5)
doubleList.append(8)
doubleList.append(3)
doubleList.append(7)

doubleList.remove(7)

console.log(doubleList.backwardString())
console.log(doubleList.forwardString())