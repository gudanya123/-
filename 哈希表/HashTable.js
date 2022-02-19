/**
 * 这里采用链地址法来实现哈希表
 * 封装哈希表类
 */
function HashTable() {
    //属性
    this.storage = []
    this.count = 0
    this.limit = 7

    //方法
    //哈希函数
    HashTable.prototype.hashFunc = function(str, size) {
        //1.定义hashCode变量
        let hashCode = 0;

        //2.霍纳算法,来计算hashCode的值
        //cats -> Unicode编码
        for (let i = 0; i < str.length; i++) {
            hashCode = 37 * hashCode + str.charCodeAt(i);
        }
        //3.取余操作
        let index = hashCode % size;

        return index;
    }

    //插入&修改操作
    /**
     * 1.根据key获取索引值
     *      目的:将数据插入到对应的位置
     * 2.根据索引值取出bucket
     *      a.如果桶不存在,创建桶,并且防止在该索引的位置
     * 3.判断新增还是修改原来的值
     *      如果已经有值了,那么就修改值
     *      如果没有,执行后续的添加操作
     * 4.新增操作
     */
    HashTable.prototype.put = function(key, value) {
        //1.根据key获取对应的index
        let index = this.hashFunc(key, this.limit);

        //2.根据index取出对应的bucket
        let bucket = this.storage[index];

        //3.判断该bucket是否为null
        if (bucket == null) {
            bucket = [];
            this.storage[index] = bucket;
        }
        //4.判断是否是修改数据
        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i];
            if (tuple[0] == key) {
                tuple[1] = value;
                return;
            }
        }
        //5.添加数据
        bucket.push([key, value]);
        this.count += 1;

        //6.判断是否需要扩容操作
        if (this.count > this.limit * 0.75) {
            let newSize = this.limit * 2
            let newPrime = this.getPrime(newSize)
            this.resize(newPrime)
        }
    }

    /**
     * 获取方法
     * 1.根据key获取对应的index
     * 2.根据index获取对应的bucket
     * 3.判断bucket是否为null
     *      如果为null,直接返回null
     * 4.线性查找bucket中每一个key是否等于传入的key
     *      如果等于,那么直接返回对应的value
     * 5.遍历完后,依然没有找到对应的key
     *      直接return null
     *
     */
    HashTable.prototype.get = function(key) {
        //1.根据key获取对应的index
        let index = this.hashFunc(key, this.limit)

        //2.根据index获取对应的bucket
        let bucket = this.storage[index];

        //3.判断bucket是否为null
        if (bucket == null) {
            return null;
        }

        //4.有bucket,那么就进行线性查找
        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i];
            if (key == tuple[0]) {
                return tuple[1];
            }
        }
        //5.依然没有找到,返回null
        return null;
    }

    /**
     * 删除操作
     * 1.根据key获取对应的index
     * 2.根据index获取对应的bucket
     * 3.判断bucket是否为null
     *      如果为null,直接返回null
     * 4.线性查找bucket,寻找对应的数据,并且删除
     * 5.遍历完后,依然没有找到return null
     */
    HashTable.prototype.remove = function(key) {
        //1.根据key获取对应的index
        let index = this.hashFunc(key, this.limit)

        //2.根据index获取对应的bucket
        let bucket = this.storage[index];

        //3.判断bucket是否为null
        if (bucket == null) {
            return null;
        }

        //4.有bucket,那么就进行线性查找,
        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i];
            if (key == tuple[0]) {
                bucket.splice(i, 1);
                this.count--;
                return tuple[1];

                //缩小容量
                if (this.limit > 7 && this.count < this.limit * 0.25) {
                    let newSize = Math.floor(this.limit / 2)
                    let newPrime = this.getPrime(newSize)
                    this.resize(newPrime)
                }
            }
        }
        //5.依然没有找到,那么返回null
        return null;
    }

    HashTable.prototype.isEmpty = function() {
        return this.count == 0
    }

    HashTable.prototype.size = function() {
        return this.count
    }

    //哈希表扩容/缩容
    HashTable.prototype.resize = function(newLimit) {
        //1.保存旧的数组内容
        let oldStorage = this.storage

        //2.重置所有的属性
        this.storage = []
        this.count = 0
        this.limit = newLimit

        //3.遍历oldStorage中所有的bucket
        for (let i = 0; i < oldStorage.length; i++) {
            //3.1取出对应的bucket
            let bucket = oldStorage[i]

            //3.2判断bucket是否为null
            if (bucket == null) {
                continue
            }

            //3.3bucket中有数据,那么取出数据,重新插入
            for (let i = 0; i < bucket.length; i++) {
                let tuple = bucket[i]
                this.put(tuple[0], tuple[1])
            }

        }
    }

    /**
     * 封装函数:判断传入的数字是否是质数
     * 只能被1和自己整除,不能被2到num-1之间数字整除
     */
    HashTable.prototype.isPrime = function(num) {
        let temp = parseInt(Math.sqrt(num))
        for (let i = 2; i <= temp; i++) {
            if (num % i == 0) {
                return false
            }
        }
        return true
    }

    HashTable.prototype.getPrime = function(num) {
        while (!this.isPrime(num)) {
            num++
        }
        return num
    }

}


let hashTable = new HashTable()
hashTable.put('name', 'zhangsan')
hashTable.put('age', 18)
hashTable.put('age', 20)
hashTable.remove('age')
console.log(hashTable.get('age'))
console.log(hashTable.get('name'))