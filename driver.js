import BSTree from "./bst.js";

//GENERATE ARRAY OF UNIQUE INTEGERS OF LENGTH 'ARRAY_LENGTH'
//Apparently, using a loop is faster than using Array.from !!
const ARRAY_LENGTH = 10;
const randomArray = [];
for (let i = 0; i < ARRAY_LENGTH; i++) {
  let newRandNum = Math.floor(Math.random() * 10);
  randomArray.push(newRandNum);
}
console.log(
  `\nUNSORTED RANDOM ARRAY [Length = ${ARRAY_LENGTH}], LIKELY WITH DUPLICATES: ${randomArray}\n`
);

//GENERATE & DISPLAY A NEW BALANCED BINARY SEARCH TREE
let newTree = BSTree(randomArray);
newTree.display(newTree.root);

//FOLLOW PROJECT REQUIREMENTS
console.log(`TREE IS BALANCED? : ${newTree.isBalanced()}`);
console.log(`\nLEVEL ORDER:  ${newTree.levelOrder()}`);
console.log(`\nPRE-ORDER:  ${newTree.preOrder()}`);
console.log(`\nIN-ORDER:  ${newTree.inOrder()}`);
console.log(`\nPOST-ORDER:  ${newTree.postOrder()}\n`);
console.log("ADDING NODES TO UNBALANCE THE TREE");
newTree.insertNode(333);
newTree.insertNode(444);
newTree.display(newTree.root);
console.log(`\nTREE IS BALANCED? : ${newTree.isBalanced()}`);
console.log("REBALANCING THE TREE");
newTree = newTree.reBalance();
console.log(`LOOKS LIKE THE ROOT MOVED!`);
console.log(newTree.root);
console.log(`\nTREE IS BALANCED? : ${newTree.isBalanced()}`);
newTree.display(newTree.root);
console.log(`\nLEVEL ORDER:  ${newTree.levelOrder()}`);
console.log(`\nPRE-ORDER:  ${newTree.preOrder()}`);
console.log(`\nIN-ORDER:  ${newTree.inOrder()}`);
console.log(`\nPOST-ORDER:  ${newTree.postOrder()}\n`);
