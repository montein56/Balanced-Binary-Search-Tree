import Node from "./node.js";
import mergeSort from "../js-exercises/recursion/mergeSort.js";

//BUILD A TREE CLASS THAT ACCEPTS AN ARRAY WHEN INITIALIZED
const BSTree = (array) => {
  //TURN ARRAY INTO A BALANCED BINARY SEARCH TREE USING RECURSION
  function buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) {
      return null;
    }
    let mid = parseInt((start + end) / 2);
    let root = new Node(arr[mid]);
    root.left = buildTree(arr, start, mid - 1);
    root.right = buildTree(arr, mid + 1, end);
    return root;
  }
  let arr = [...new Set(array)];
  arr = mergeSort(arr);
  console.log(`SORTED ARRAY, NO DUPLICATES: ${arr}\n`);
  let root = buildTree(arr);

  //FIND A VALUE, RETURN null IF NOT FOUND
  const find = (key, findNode = root) => {
    if (findNode == null || findNode.data == key) return console.log(findNode);
    findNode.data < key ? find(key, findNode.right) : find(key, findNode.left);
  };
  //INSERT A NEW NODE
  const insertNode = (key, rootNode = root) => {
    if (rootNode == null) {
      rootNode = new Node(key);
      return rootNode;
    }
    if (key < rootNode.data) rootNode.left = insertNode(key, rootNode.left);
    else if (key > rootNode.data)
      rootNode.right = insertNode(key, rootNode.right);
    return rootNode;
  };
  //THIS GOES WITH THE DELETENODE FUNCTION
  const minValue = (root) => {
    let minv = root.data;
    while (root.left != null) {
      minv = root.left.data;
      root = root.left;
    }
    return minv;
  };
  //TO REMOVE A NODE FROM THE BST
  function deleteNode(key, rootNode = root) {
    if (rootNode === null) return rootNode;
    if (key < rootNode.data) rootNode.left = deleteNode(key, rootNode.left);
    else if (key > rootNode.data)
      rootNode.right = deleteNode(key, rootNode.right);
    else {
      if (rootNode.left === null) return rootNode.right;
      else if (rootNode.right === null) return rootNode.left;
      rootNode.data = minValue(rootNode.right);
      rootNode.right = deleteNode(rootNode.data, rootNode.right);
    }
    return rootNode;
  }
  //CONSOLE LOG DISPLAY THE BST IN 'LEVEL ORDER'
  const levelOrder = (callBack) => {
    const rootNode = root;
    const arr = [];
    if (rootNode) {
      const queue = [rootNode];
      while (queue.length > 0) {
        if (queue[0].left) {
          queue.push(queue[0].left);
        }
        if (queue[0].right) {
          queue.push(queue[0].right);
        }
        if (callBack) {
          queue[0].data = callBack(queue[0]);
        } else {
          arr.push(queue[0].data);
        }
        queue.shift();
      }
    }
    if (!callBack) {
      return arr;
    }
  };

  const preOrder = (rootNode = root, arr = [], callBack) => {
    if (rootNode === null) return [];
    if (callBack) {
      callBack(rootNode.data);
    } else {
      arr.push(rootNode.data);
    }
    if (rootNode.left !== null) preOrder(rootNode.left, arr);
    if (rootNode.right !== null) preOrder(rootNode.right, arr);
    if (!callBack) {
      return arr;
    }
  };

  const inOrder = (rootNode = root, arr = [], callBack) => {
    if (rootNode === null) return [];
    if (rootNode.left !== null) inOrder(rootNode.left, arr);
    if (callBack) {
      callBack(rootNode.data);
    } else {
      arr.push(rootNode.data);
    }
    if (rootNode.right !== null) inOrder(rootNode.right, arr);
    if (!callBack) {
      return arr;
    }
  };
  const postOrder = (rootNode = root, arr = [], callBack) => {
    if (rootNode === null) return [];
    if (rootNode.left !== null) postOrder(rootNode.left, arr);
    if (rootNode.right !== null) postOrder(rootNode.right, arr);
    if (callBack) {
      callBack(rootNode.data);
    } else {
      arr.push(rootNode.data);
    }
    if (!callBack) {
      return arr;
    }
  };

  function findHeightUtil(rootNode) {
    // Base Case
    if (rootNode == null) {
      return -1;
    }
    // Store the maximum height of the left and right subtree
    let leftHeight = findHeightUtil(rootNode.left);
    let rightHeight = findHeightUtil(rootNode.right);
    // Update height of the current node
    return Math.max(leftHeight, rightHeight) + 1;
  }
  function findHeight(rootNode = root) {
    return findHeightUtil(rootNode);
  }

  const findDepth = (x, rootNode = root) => {
    // Base case
    if (rootNode == null) return -1;
    // Initialize distance as -1
    let depth = -1;
    // Check if x is current node
    if (
      rootNode.data == x ||
      // Otherwise, check if x is present in the left subtree
      (depth = findDepth(x, rootNode.left)) >= 0 ||
      // Otherwise, check if x is present in the right subtree
      (depth = findDepth(x, rootNode.right)) >= 0
    )
      // Return depth of the node
      return depth + 1;

    return x, depth;
  };

  const isBalanced = (rootNode = root) => {
    // base case
    if (rootNode === null) return true;
    if (
      Math.abs(findHeight(rootNode.left) - findHeight(rootNode.right)) <= 1 &&
      isBalanced(rootNode.left) === true &&
      isBalanced(rootNode.right) === true
    ) {
      return true;
    }
    return false;
  };

  const reBalance = () => {
    const inOrdered = inOrder();
    const balTreeRoot = BSTree(inOrdered);
    return balTreeRoot;
  };

  const display = (tree, prefix = "", isLeft = true) => {
    if (tree == null) return console.log("Tree is empty");
    // return;
    if (tree.right !== null) {
      display(tree.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${tree.data}`);
    if (tree.left !== null) {
      display(tree.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
    return display;
  };

  return {
    root,
    find,
    insertNode,
    deleteNode,
    levelOrder,
    preOrder,
    inOrder,
    postOrder,
    display,
    findHeight,
    findDepth,
    isBalanced,
    reBalance,
  };
};

export default BSTree;

// console.log("<<< DISPLAY OF MAIN BST FILE >>>");
// let newTree = BSTree([11, 33, 6, 999, 23, 99, 222, 333, 777]);

// newTree.display(newTree.root);
// console.log(`TREE IS BALANCED? : ${newTree.isBalanced()}`);
// newTree.insertNode(444);
// newTree.insertNode(111);
// newTree.insertNode(555);
// newTree.deleteNode(23);
// newTree.find(555);
// newTree.display(newTree.root);
// console.log(`HEIGHT OF NODE: ${newTree.findHeight()}`);
// console.log(`DEPTH OF NODE: ${newTree.findDepth(33)}`);
// console.log(`TREE IS BALANCED? : ${newTree.isBalanced()}`);
