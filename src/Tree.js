import { Node } from "./Node.js";
import { mergeSort, unique } from "./helpers.js";

export function Tree(array) {
  const cleanedArr = mergeSort(unique(array));

  const buildTree = (array) => {
    if (array.length === 0) return null;

    const mid = Math.floor((0 + array.length - 1) / 2);
    const root = Node(array[mid]);
    root.left = buildTree(array.slice(0, mid));
    root.right = buildTree(array.slice(mid + 1));

    return root;
  };

  let root = buildTree(cleanedArr);

  const includes = (value) => {
    let tempRoot = root;

    while (tempRoot) {
      if (tempRoot.data === value) {
        return true;
      } else if (tempRoot.data > value) {
        tempRoot = tempRoot.left;
      } else {
        tempRoot = tempRoot.right;
      }
    }

    return false;
  };

  const insert = (value) => {
    if (root === null) {
      root = Node(value);
      return;
    }

    let tempRoot = root;
    let direction;

    while (true) {
      if (value === tempRoot.data) {
        return;
      } else if (value > tempRoot.data) {
        direction = "right";
      } else {
        direction = "left";
      }

      if (tempRoot[direction]) {
        tempRoot = tempRoot[direction];
      } else {
        break;
      }
    }

    tempRoot[direction] = Node(value);
  };

  const deleteItem = (value) => {
    function getPredecessor(root) {
      let curr = root.left;
      while (curr?.right) curr = curr.right;
      return curr;
    }

    function innerDelete(r = root, val = value) {
      if (!r) return;
      if (val > r.data) r.right = innerDelete(r.right, val);
      if (val < r.data) r.left = innerDelete(r.left, val);
      if (val === r.data) {
        if (!r.left) return r.right;
        if (!r.right) return r.left;

        const predecessor = getPredecessor(r);
        r.data = predecessor.data;
        r.left = innerDelete(r.left, predecessor.data);
      }

      return r;
    }

    return innerDelete();
  };

  function levelOrderForEachRec(callback) {
    if (!callback) throw new Error("A callback is required");

    function levelOrderRec(arr = [root]) {
      if (!arr.length) return;

      const currentNode = arr.shift();
      callback(currentNode.data);

      if (currentNode.left) arr.push(currentNode.left);
      if (currentNode.right) arr.push(currentNode.right);

      levelOrderRec(arr);
    }

    return levelOrderRec();
  }

  function levelOrderForEach(callback) {
    if (!callback) throw new Error("A callback is required");
    const arr = [root];

    while (arr.length > 0) {
      const currentNode = arr.shift();
      callback(currentNode.data);

      if (currentNode.left) arr.push(currentNode.left);
      if (currentNode.right) arr.push(currentNode.right);
    }
  }

  return {
    get root() {
      return root;
    },
    includes,
    insert,
    deleteItem,
    levelOrderForEachRec,
    levelOrderForEach,
  };
}
