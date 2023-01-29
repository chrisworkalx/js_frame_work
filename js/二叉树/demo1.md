
> **先序遍历算法**

![image](https://user-images.githubusercontent.com/40884918/215311041-4a5acb9b-b032-4345-aa81-4df670e4a6a0.png)

1. 访问根节点
2. 对根节点的左子树进行先序遍历
3. 对根节点的右子树进行先序遍历
```js

const binaryTree = {
 val: 1,
 left: {
   val: 2,
   left: {
     val: 4,
     left: null,
     right: null,
   },
   right: {
     val: 5,
     left: {
       val: 7,
       left: null,
       right: null,
     },
     right: null,
   },
 },
 right: {
   val: 3,
   left: null,
   right: {
     val: 6,
     left: null,
     right: null,
   },
 },
};

```
> 递归版
```js
const preorder = root => {
  if (!root) return;
  console.log(root.val);
  preorder(root.left);
  preorder(root.right);
};
preorder(binaryTree);
```
> 非递归(栈性 先入后出)
```js
const preorder = root => {
  if (!root) return;
  const stack = [root];
  while (stack.length) {
    const n = stack.pop();
    console.log(n.val);
    n.right && stack.push(n.right);
    n.left && stack.push(n.left);
  }
};
preorder(binaryTree);
```

> **中序遍历算法**
![image](https://user-images.githubusercontent.com/40884918/215311024-bd5a70e8-a4ad-4317-89d5-8e085312ff99.png)

1. 对根节点的左子树进行中序遍历
2. 访问根接节点
3. 对根节点的右子树进行中序遍历
- 还是使用binaryTree这个树 递归版实现:
```js
const inorder = root => {
  if(!root) return 
  inorder(root.left)
  console.log(root.val)
  inorder(root.right)
}
inorder(binaryTree)
```
> 非递归版实现:
```js
const inorder = root => {
  if (!root) return;
  const stack = [];
  let p = root;
  while (stack.length || p) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const n = stack.pop();
    console.log(n.val);
    p = n.right;
  }
}
inorder(binaryTree)
```
> **后序遍历算法**
1. 对根节点的左子树进行中序遍历
2. 对根节点的右子树进行中序遍历
3. 访问根接节点

![image](https://user-images.githubusercontent.com/40884918/215311170-a699f707-19ea-4cc9-9795-6a4dafed8205.png)
> 还是使用binaryTree这个树 递归版实现:
```js
const postorder = (root) => {
  if (!root) return;
  postorder(root.left);
  postorder(root.right);
  console.log(root.val);
};
postorder(binaryTree);
```
> 非递归版实现:
```js
const inorder = root => {
  if (!root) return;
  const outputStack = [];
  const stack = [root];
  while (stack.length) {
    const n = stack.pop();
    outputStack.push(n);
    if (n.left) stack.push(n.left);
    if (n.right) stack.push(n.right);
  }
  while (outputStack.length) {
    const n = outputStack.pop();
    console.log(n.val);
  }
}
inorder(binaryTree)
```
