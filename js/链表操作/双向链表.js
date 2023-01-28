/**
 * @Description  : 双向链表操作
 * @Version      : 1.0
 * @Author       : mingfei.yao
 * @Date         : 2023-01-28 15:35:25
 * @LastEditors  : mingfei.yao
 * @LastEditTime : 2023-01-28 17:48:31
 * @FilePath     : \\js_frame_work\\js\\链表操作\\双向链表.js
 * @Copyright (C) 2023 mingfei.yao. All rights reserved.
 */
/**
 * Node类
 * Node类包含连个属性： element 用来保存节点上的数据，next 用来保存指向下一个节点的链接，具体实现如下：
 */
function Node(element) {
  this.element = element; //当前节点的元素
  this.next = null; //下一个节点链接
  this.previous = null; //上一个节点链接
}

function LList() {
  this.head = new Node('head');
  this.find = find;
  this.findLast = findLast;
  this.insert = insert;
  this.remove = remove;
  this.display = display;
  this.dispReverse = dispReverse;
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
    console.log('currNode', currNode);
    currNode = currNode.next;
  }
  return currNode;
}

//查找链表中的最后一个元素

function findLast() {
  var currNode = this.head;
  while (!(currNode.next == null)) {
    currNode = currNode.next;
  }
  return currNode;
}

//插入节点
function insert(newElement, item) {
  var newNode = new Node(newElement);
  var currNode = this.find(item);
  newNode.next = currNode.next;
  newNode.previous = currNode;
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

//反向显示链表元素

function dispReverse() {
  var currNode = this.findLast();
  while (!(currNode.previous == null)) {
    // console.log(currNode.element);
    currNode = currNode.previous;
  }
}

//删除节点

function remove(item) {
  var currNode = this.find(item);
  console.log('currNode', currNode);
  if (!(currNode.next == null)) {
    currNode.previous.next = currNode.next;
    currNode.next.previous = currNode.previous;
    currNode.next = null;
    currNode.previous = null;
  }
}
