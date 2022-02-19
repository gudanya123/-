/**
    封装集合类
    add(value) 向集合添加一个新的项
    remove(value) 从集合移除一个值
    has(value): 如果值在集合中,返回true,否则返回false
    clear() 移除集合中的所有项
    size() 返回元素数量
    values()  返回一个包含集合中所有值的数组
    ...
 */

function Set() {
    //属性
    this.items = {};
    //方法
    //1.add(value)
    Set.prototype.add = function(value) {
        //判断当前集合中是否已经包含了该元素
        if (this.has(value)) {
            return false;
        }
        //将元素添加到集合中
        this.items[value] = value
        return true
    };
    //2.has方法
    Set.prototype.has = function(value) {
        return this.items.hasOwnProperty(value);
    };

    //3.remove()方法
    Set.prototype.remove = function(value) {
        //1.判断该集合中是否包含该元素
        if (!this.has(value)) {
            return false
        }

        //2.将元素从属性中删除
        delete this.items[value]
        return true
    }

    //4.clear()方法
    Set.prototype.clear = function() {
        this.items = {}
    }

    //5.size()
    Set.prototype.size = function() {
        return Object.keys(this.items).length
    }

    //6.获取集合中所有的值
    Set.prototype.values = function() {
        return Object.keys(this.items)
    }

    //集合间的操作
    //并集
    Set.prototype.union = function(otherSet) {
        //this  集合对象A
        //otherSet 集合对象B
        //1.创建新的集合
        let unionSet = new Set()

        //2.将A集合中所有元素添加到新集合中
        let values = this.values()
        for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i])
        }

        //3.取出B集合中的元素,判断是否需要加到新集合中
        values = otherSet.values()
        for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i])
        }

        return unionSet

    }

    //交集
    Set.prototype.interSection = function(otherSet) {

        //1.创建新的集合
        let intersection = new Set()

        //2.从A中取出一个个元素,判断是否同时存在于集合B
        //存在放入新集合中
        let values = this.values()
        for (let i = 0; i < values.length; i++) {
            let item = values[i]
            if (otherSet.has(item)) {
                intersection.add(item)
            }
        }
        return intersection
    }

    //差集
    Set.prototype.difference = function(otherSet) {
        //1.创建新的集合
        let diffSet = new Set()

        //2.取出A集合一个个元素,判断是否同时存在于B中,不存在B中,则添加到新集合
        let values = this.values()
        for (let i = 0; i < values.length; i++) {
            if (!otherSet.has(values[i])) {
                diffSet.add(values[i])
            }
        }
        return diffSet
    }

    //子集
    Set.prototype.subset = function(otherSet) {

        let values = this.values()
        for (let i = 0; i < values.length; i++) {
            if (!otherSet.has(values[i])) {
                return false
            }
        }
        return true
    }

}


let set = new Set()
set.add(1)
set.add(2)

let set1 = new Set()
set1.add(1)

console.log(set.union(set1).values())
console.log(set.interSection(set1).values())
console.log(set.difference(set1).values())
console.log(set1.subset(set))