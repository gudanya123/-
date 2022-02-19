/**
 * 封装图结构
 */
const Dictionary = require('../字典/Dictionary')
const Queue = require('../队列/Queue')

function Graph() {
    //属性: 顶点(数组)/边(字典)
    this.vertexes = [] //顶点
    this.edges = new Dictionary() //边

    //方法

    //1.添加顶点的方法
    Graph.prototype.addVertex = function(v) {
        this.vertexes.push(v)
        this.edges.set(v, [])
    }

    //2.添加边的方法
    Graph.prototype.addEdge = function(v1, v2) {
        this.edges.get(v1).push(v2)
        this.edges.get(v2).push(v1)
    }

    //实现toString方法
    Graph.prototype.toString = function() {
        //1.定义字符串,保存最终的结果
        let resultString = ''

        //2.遍历所有的顶点,以及顶点对应的边
        for (let i = 0; i < this.vertexes.length; i++) {
            resultString += this.vertexes[i] + '->'
            let vEdges = this.edges.get(this.vertexes[i])
            for (let i = 0; i < vEdges.length; i++) {
                resultString += vEdges[i] + ' '
            }
            resultString += '\n'
        }
        return resultString
    }

    //初始化状态颜色
    Graph.prototype.initializeColor = function() {
        let colors = []
        for (let i = 0; i < this.vertexes.length; i++) {
            colors[this.vertexes[i]] = 'white'
        }
        return colors
    }

    //广度优先搜索(BFS)
    Graph.prototype.bfs = function(initV, handler) {
        //1.初始化颜色
        let colors = this.initializeColor()

        //2.创建队列
        let queue = new Queue()

        //3.将顶点加入队列中
        queue.enqueue(initV)

        //4.循环从队列中取出元素
        while (!queue.isEmpty()) {
            //4.1从队列取出一个顶点
            let v = queue.dequeue()

            //4.2获取和顶点相连的另外顶点
            let vLists = this.edges.get(v)

            //4.3将v的颜色设置成灰色
            colors[v] = 'gray'

            //4.4遍历所有的顶点,并且加入到队列中
            for (let i = 0; i < vLists.length; i++) {
                let e = vLists[i]
                if (colors[e] == 'white') {
                    colors[e] = 'gray'
                    queue.enqueue(e)
                }
            }

            //4.5访问顶点
            handler(v)

            //4.6将顶点设置为黑色
            colors[v] = 'black'
        }

    }

    //深度优先搜索(DFS)
    Graph.prototype.dfs = function(initV, handler) {
        //1.初始化颜色
        let colors = this.initializeColor()

        //2.从某个顶点开始依次递归访问
        this.dfsVisit(initV, colors, handler)
    }

    Graph.prototype.dfsVisit = function(v, colors, handler) {
        //1.将颜色设置为灰色
        colors[v] = 'gray'

        //2.处理v顶点
        handler(v)

        //3.访问v相连的顶点
        let vLists = this.edges.get(v)
        for (let i = 0; i < vLists.length; i++) {
            let e = vLists[i]
            if (colors[e] == 'white') {
                this.dfsVisit(e, colors, handler)
            }
        }
        //4.将v设置为黑色
        colors[v] = 'black'
    }
}

//测试代码

//1.创建图结构
let graph = new Graph()

//2.添加顶点
let myVertexes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
for (let i = 0; i < myVertexes.length; i++) {
    graph.addVertex(myVertexes[i])
}

//3.添加边
graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('C', 'D')
graph.addEdge('C', 'G')
graph.addEdge('D', 'G')
graph.addEdge('D', 'H')
graph.addEdge('B', 'E')
graph.addEdge('B', 'F')
graph.addEdge('E', 'I')

console.log(graph.toString())
let result = ''
let result1 = ''
graph.bfs(graph.vertexes[0], function(v) {
    result += v + ' '
})

graph.dfs(graph.vertexes[0], function(v) {
    result1 += v + ' '
})

console.log(result)
console.log(result1)