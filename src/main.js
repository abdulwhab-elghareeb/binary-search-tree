import { Tree } from "./Tree.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

const generateRandomArray = (min = 0, max = 100, size = 16) => {
  const arraySize = size;
  const resultArr = [];
  for (let i = 0; i < arraySize; i++) {
    resultArr.push(Math.floor(Math.random() * (max - min) + min));
  }
  return resultArr;
};

const tree = Tree(generateRandomArray());
tree.insert(101);
tree.insert(202);
tree.insert(303);
tree.insert(404);

console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());

prettyPrint(tree.root);

console.group("LEVEL------------------------------------------");
tree.levelOrderForEach(console.log);
console.groupEnd();

console.group("PRE--------------------------------------------");
tree.preOrderForEach(console.log);
console.groupEnd();

console.group("POST-------------------------------------------");
tree.postOrderForEach(console.log);
console.groupEnd();

console.group("IN ORDER---------------------------------------");
tree.inOrderForEach(console.log);
console.groupEnd();
