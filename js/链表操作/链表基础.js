/**
 * @Description  :
 * @Version      : 1.0
 * @Author       : mingfei.yao
 * @Date         : 2023-01-28 15:35:25
 * @LastEditors  : mingfei.yao
 * @LastEditTime : 2023-01-28 15:59:02
 * @FilePath     : \\js_frame_work\\js\\链表操作\\链表基础.js
 * @Copyright (C) 2023 mingfei.yao. All rights reserved.
 */
/**
 * Node类
 * Node类包含连个属性： element 用来保存节点上的数据，next 用来保存指向下一个节点的链接，具体实现如下：
 */
//节点
function Node(element) {
  this.element = element; //当前节点的元素
  this.next = null; //下一个节点链接
}

/**
 * LinkedList类
 * LinkedList类提供了对链表进行操作的方法，包括插入删除节点，查找给定的值等。值得注意的是，它只有一个 属性，那就是使用一个 Node 对象来保存该链表的头节点。
 */
//链表类
function LList() {
  this.head = new Node('head'); //头节点
  this.find = find; //查找节点
  this.insert = insert; //插入节点
  this.remove = remove; //删除节点
  this.findPrev = findPrev; //查找前一个节点
  this.display = display; //显示链表
}

/**
 * head节点的next属性初始化为 null ，当有新元素插入时，next会指向新的元素。
  接下来，我们来看看具体方法的实现。
  insert：向链表插入一个节点
  我们先分析分析insert方法，想要插入一个节点，我们必须明确要在哪个节点的前面或后面插入。我们先来看看，如何在一个已知节点的后面插入一个节点。
  在一个已知节点后插入新节点，我们首先得找到该节点，为此，我们需要一个 find 方法用来遍历链表，查找给定的数据。如果找到，该方法就返回保存该数据的节点。那么，我们先实现 find 方法。

 */

//查找给定节点

function find(item) {
  var currNode = this.head;
  while (currNode.element != item) {
    currNode = currNode.next;
  }
  return currNode;
}

/**
 * find 方法同时展示了如何在链表上移动。
 * 首先，创建一个新节点，将链表的头节点赋给这个新创建的节点，然后在链表上循环，如果当前节点的 element 属性和我们要找的信息不符，
 * 就将当前节点移动到下一个节点，如果查找成功，该方法返回包含该数据的节点；否则，就会返回null。
 */

//插入节点

function insert(newElement, item) {
  var newNode = new Node(newElement);
  var currNode = this.find(item);
  console.log('currNode----insert', currNode);
  newNode.next = currNode.next;
  currNode.next = newNode;
}

//显示链表元素

function display() {
  var currNode = this.head;
  while (!(currNode.next == null)) {
    console.log('currNode--display', currNode);
    //直接过滤头节点
    console.log(currNode.next.element);
    currNode = currNode.next;
  }
}

// 从链表中删除节点时，我们先要找个待删除节点的前一个节点，找到后，我们修改它的 next 属性，使其不在指向待删除的节点，
// 而是待删除节点的下一个节点。那么，我们就得需要定义一个 findPrevious 方法遍历链表，
// 检查每一个节点的下一个节点是否存储待删除的数据。如果找到，返回该节点，这样就可以修改它的 next 属性了。 findPrevious 的实现如下：

//查找带删除节点的前一个节点

function findPrev(item) {
  var currNode = this.head;
  while (!(currNode.next == null) && currNode.next.element != item) {
    currNode = currNode.next;
  }
  return currNode;
}

//删除节点

function remove(item) {
  var prevNode = this.findPrev(item);
  console.log('prevNode', prevNode);
  if (!(prevNode.next == null)) {
    prevNode.next = prevNode.next.next;
  }
}
