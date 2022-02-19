/**
 * 封装链表类 单向链表
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
 */


function LinkedList() {

    //内部类:节点类
    function Node(data) {
        this.data = data
        this.next = null
    }

    this.head = null
    this.length = 0

    //1.追加方法
    LinkedList.prototype.append = function(data) {
        //1.创建新的节点
        let newNode = new Node(data)

        //2.判断添加的是否是第一个节点
        if (this.length == 0) { //是第一个节点
            this.head = newNode
        } else {
            let current = this.head
            while (current.next) {
                current = current.next
            }
            current.next = newNode
        }
        this.length += 1
    }

    //2.toString()方法
    LinkedList.prototype.toString = function() {
        //1.定义变量
        let current = this.head
        let listString = ''

        //2.循环获取一个个的节点
        while (current) {
            listString += current.data + ' '
            current = current.next
        }

        return listString
    }

    //3.insert()方法
    LinkedList.prototype.insert = function(position, data) {
        //1.对position进行越界判断
        if (position < 0 || position > this.length) {
            return false
        }

        //2.创建节点
        let newNode = new Node(data)

        //3.判断插入的位置是否是第一个
        if (position == 0) {
            //获取原来的第一个节点
            // this.head = node
            // this.head = newNode
            // newNode.next = node
            newNode.next = this.head
            this.head = newNode
        } else {
            let index = 0
            let current = this.head
            let previous = null
            while (index++ < position) {
                previous = current
                current = current.next
            }
            newNode.next = current
            previous.next = newNode

        }
        //4.length+1
        this.length += 1

        return true


    }

    //4.get(position)方法
    LinkedList.prototype.get = function(position) {
        //1.越界判断
        if (position < 0 || position >= this.length) {
            return null
        }
        //2.获取对应的data
        let index = 0
        let current = this.head
        while (index++ < position) {
            current = current.next
        }
        return current.data
    }

    //5.indexOf(element)
    LinkedList.prototype.indexOf = function(data) {
        let index = 0
        let current = this.head
        while (current) {
            if (current.data == data) {
                return index
            }
            current = current.next
            index++

        }

        return -1
    }

    //6.update(position)
    LinkedList.prototype.update = function(position, data) {
        //1.越界判断
        if (position < 0 || position >= this.length) {
            return false
        }
        //2.查找正确的节点
        let index = 0
        let current = this.head
        while (index++ < position) {
            current = current.next
        }
        current.data = data
        return true
    }

    //7.removeAt(position)
    LinkedList.prototype.removeAt = function(position) {
        if (position < 0 || position >= this.length) {
            return null
        }
        let current = this.head
        if (position == 0) {
            this.head = this.head.next
        } else {

            let index = 0;
            let previous = null
            while (index++ < position) {
                previous = current
                current = current.next
            }
            previous.next = current.next
        }
        //删除节点长度-1
        this.length -= 1

        return current.data

    }

    //8.remove(data)
    LinkedList.prototype.remove = function(data) {
        // let current = this.head
        // let previous = null
        // while (current) {
        //     if (data == current.data) {
        //         previous.next = current.next
        //         return true
        //     }
        //     previous = current
        //     current = current.next
        // }
        // return false
        //根据data查找索引
        const index = this.indexOf(data)

        //根据索引删除元素
        this.removeAt(index)
    }

    //9.isEmpty()
    LinkedList.prototype.isEmpty = function() {
        return this.length == 0
    }

    //10.size()
    LinkedList.prototype.size = function() {
        return this.length
    }

}

/**
 * 测试
 */

let linkList = new LinkedList()

linkList.append(3)
linkList.append(5)
linkList.append(9)

linkList.insert(1, 2)
linkList.insert(1, 4)
linkList.update(1, 10)
linkList.removeAt(4)
linkList.remove(2)

console.log(linkList.isEmpty())
console.log(linkList.size())

console.log(linkList.toString())