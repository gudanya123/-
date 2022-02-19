/**
 * 封装二叉搜索树
 * insert(key) 向树中插入一个新的键
 * search(key) 在树中查找一个键,如果节点存在,则返回true;如果不存在,则返回false
 * inOrderTraverse: 通过中序遍历方式遍历所有节点
 * preOrderTraverse: 通过先序遍历方式遍历所有节点
 * postOrderTraverse: 通过后序遍历方式遍历所有节点
 * 
 * min: 返回树中最小的值/键
 * max: 返回树中最大的值/键
 * remove(key) 从树中移除某个键
 * 
 * 
 */

function BinarySearchTree() {

    function Node(key) {
        this.key = key
        this.left = null
        this.right = null
    }
    //属性 
    this.root = null

    //插入数据方法:对外给用户调用的方法
    BinarySearchTree.prototype.insert = function(key) {
        //1.根据key创建节点
        let newNode = new Node(key)

        //2.判断根节点是否有值
        if (this.root == null) {
            this.root = newNode
        } else {
            this.insertNode(this.root, newNode)
        }
    }

    BinarySearchTree.prototype.insertNode = function(node, newNode) {
        if (newNode.key < node.key) { //向左查找
            if (node.left == null) {
                node.left = newNode
            } else {
                this.insertNode(node.left, newNode)
            }
        } else { //向右查找
            if (node.right == null) {
                node.right = newNode
            } else {
                this.insertNode(node.right, newNode)
            }
        }
    }

    //树的遍历
    //1.先序遍历
    BinarySearchTree.prototype.preOrderTraversal = function(handler) {
        this.preOrderTraversalNode(this.root, handler)
    }

    BinarySearchTree.prototype.preOrderTraversalNode = function(node, handler) {
        if (node != null) {
            //1.处理经过的节点
            handler(node.key)

            //2.处理经过节点的左子节点
            this.preOrderTraversalNode(node.left, handler)

            //3.处理经过节点的右子节点
            this.preOrderTraversalNode(node.right, handler)
        }
    }

    //2.中序遍历
    BinarySearchTree.prototype.midOrderTraversal = function(handler) {
        this.midOrderTraversalNode(this.root, handler)
    }

    BinarySearchTree.prototype.midOrderTraversalNode = function(node, handler) {
        if (node != null) {
            //1.查找左子树中的节点
            this.midOrderTraversalNode(node.left, handler)

            //2.处理节点
            handler(node.key)

            //3查找右子树中的节点
            this.midOrderTraversalNode(node.right, handler)
        }
    }

    //3.后序遍历
    BinarySearchTree.prototype.postOrderTraversal = function(handler) {
        this.postOrderTraversalNode(this.root, handler)
    }

    BinarySearchTree.prototype.postOrderTraversalNode = function(node, handler) {
        if (node != null) {
            //1.查找左子树中的节点
            this.postOrderTraversalNode(node.left, handler)

            //2.查找右子树中的节点
            this.postOrderTraversalNode(node.right, handler)

            //3.处理节点
            handler(node.key)
        }
    }


    //寻找最大值
    BinarySearchTree.prototype.max = function() {
        //1.获取根节点
        let node = this.root
        let key = null

        //2.依次向右不断的查找,直到节点为null
        while (node != null) {
            key = node.key
            node = node.right
        }

        return key
    }

    //寻找最小值
    BinarySearchTree.prototype.min = function() {
        //1.获取根节点
        let node = this.root
        let key = null

        //2.依次向左不断的查找,直到节点为null
        while (node != null) {
            key = node.key
            node = node.left
        }

        return key
    }

    //搜索特定的值 某一个key
    BinarySearchTree.prototype.search = function(key) {
        //1.获取根节点
        let node = this.root

        //2.循环搜索key
        while (node != null) {
            if (key > node.key) {
                node = node.right
            } else if (key < node.key) {
                node = node.left
            } else {
                return true
            }
        }

        return false
    }


    /**
     * 
     * 二叉搜索树的删除
     *  1.先找到要删除的节点,如果没有找到,不需要删除
     *  2.找到要删除的节点
     *      1.删除叶子节点(没有左子节点和右子节点)
     *      2.删除只有一个子节点的节点
     *      3.删除有两个子节点的节点
     */
    //删除节点
    BinarySearchTree.prototype.remove = function(key) {
        //1.寻找要删除的节点
        //1.1定义变量,保存一些信息
        let current = this.root
        let parent = null
        let isLeftChild = true

        //1.2开始寻找删除的节点
        while (current.key != key) {
            parent = current
            if (key < current.key) {
                isLeftChild = true
                current = current.left
            } else {
                isLeftChild = false
                current = current.right
            }

            //某种情况:已经找到了最后的节点,依然没有找到key
            if (current == null) {
                return false
            }
        }
        //2.根据对应的情况删除节点
        //2.1删除的节点是叶子节点(没有子节点)
        if (current.left == null && current.right == null) {
            if (current == this.root) {
                this.root = null
            } else if (isLeftChild) {
                parent.left = null
            } else {
                parent.right = null
            }
        } else if (current.right == null) { //2.2删除的节点有一个子节点(左子节点或右子节点)
            if (current == this.root) {
                this.root = current.left
            } else if (isLeftChild) {
                parent.left = current.left
            } else {
                parent.right = current.left
            }
        } else if (current.left == null) {
            if (current == this.root) {
                this.root = current.right
            } else if (isLeftChild) {
                parent.left = current.right
            } else {
                parent.right = current.right
            }
        } else { //2.3删除的节点有两个子节点
            //1.获取后继节点
            let successor = this.getSuccessor(current)

            //2.判断是否根节点
            if (current == this.root) {
                this.root = successor
            } else if (isLeftChild) {
                parent.left = successor
            } else {
                parent.right = successor
            }

            //3.将后继的左子节点改为被删除节点的左子节点
            successor.left = current.left
        }
    }

    //封装查找后继的方法
    BinarySearchTree.prototype.getSuccessor = function(delNode) {
        //1.定义变量,保存找到的后继
        let successor = delNode
        let current = delNode.right
        let successorParent = delNode

        //2.循环查找current的右子树节点 
        while (current != null) {
            successorParent = successor
            successor = current
            current = current.left
        }

        //3.判断寻找到的后继节点是否直接就是删除节点的right节点
        if (successor != delNode.right) {
            successorParent.left = successor.right
            successor.right = delNode.right
        }
        return successor
    }

}

//测试

let bst = new BinarySearchTree()
bst.insert(11)
bst.insert(7)
bst.insert(15)
bst.insert(5)
bst.insert(3)
bst.insert(9)
bst.insert(8)
bst.insert(10)
bst.insert(13)
bst.insert(12)
bst.insert(14)
bst.insert(20)
bst.insert(18)
bst.insert(25)
bst.insert(6)

//测试遍历
let resultString1 = ''
let resultString2 = ''
let resultString3 = ''
bst.preOrderTraversal(function(key) {
    resultString1 += key + ' '
})

bst.midOrderTraversal(function(key) {
    resultString2 += key + ' '
})
bst.postOrderTraversal(function(key) {
    resultString3 += key + ' '
})

console.log(resultString1)
resultString1 = ''
console.log(resultString2)
console.log(resultString3)

console.log(bst.max())
console.log(bst.min())

console.log(bst.search(5))

console.log('-------------------')
bst.remove(9)
bst.remove(15)

bst.preOrderTraversal(function(key) {
    resultString1 += key + ' '
})

console.log(resultString1)