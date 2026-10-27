import { Node } from "./Node.js";
import { mergeSort, unique } from "./helpers.js";

export function Tree(array) {
  const cleanedArr = mergeSort(unique(array));

  function buildTree(array) {
    if (array.length === 0) return null;

    const mid = Math.floor((array.length - 1) / 2);
    const root = Node(array[mid]);
    root.left = buildTree(array.slice(0, mid));
    root.right = buildTree(array.slice(mid + 1));

    return root;
  }

  let root = buildTree(cleanedArr);

  function includes(value) {
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
  }

  function insert(value) {
    if (!root) {
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
  }

  function getPredecessor(root) {
    let curr = root.left;
    while (curr?.right) curr = curr.right;
    return curr;
  }

  function deleteNode(root, value) {
    if (!root) return null;
    if (value > root.data) root.right = deleteNode(root.right, value);
    if (value < root.data) root.left = deleteNode(root.left, value);
    if (value === root.data) {
      if (!root.left) return root.right;
      if (!root.right) return root.left;

      const predecessor = getPredecessor(root);
      root.data = predecessor.data;
      root.left = deleteNode(root.left, predecessor.data);
    }

    return root;
  }

  function deleteItem(value) {
    return deleteNode(root, value);
  }

  function levelOrderRec(callback, arr = [root]) {
    if (arr.length === 0) return;

    const currentNode = arr.shift();
    callback(currentNode.data);

    if (currentNode.left) arr.push(currentNode.left);
    if (currentNode.right) arr.push(currentNode.right);

    levelOrderRec(arr);
  }

  function levelOrderForEachRec(callback) {
    if (!callback) throw new Error("A callback is required");
    return levelOrderRec(callback);
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

  function preOrderNode(root, callback) {
    if (!root) return;
    callback(root.data);
    preOrderNode(root.left, callback);
    preOrderNode(root.right, callback);
  }

  function inOrderNode(root, callback) {
    if (!root) return;
    inOrderNode(root.left, callback);
    callback(root.data);
    inOrderNode(root.right, callback);
  }

  function postOrderNode(root, callback) {
    if (!root) return;
    postOrderNode(root.left, callback);
    postOrderNode(root.right, callback);
    callback(root.data);
  }

  function preOrderForEach(callback) {
    if (!callback) throw new Error("A callback is required");
    return preOrderNode(root, callback);
  }

  function inOrderForEach(callback) {
    if (!callback) throw new Error("A callback is required");
    return inOrderNode(root, callback);
  }

  function postOrderForEach(callback) {
    if (!callback) throw new Error("A callback is required");
    return postOrderNode(root, callback);
  }

  function nodeHeight(node) {
    if (!node) return -1;

    const leftSubtree = nodeHeight(node.left);
    const rightSubtree = nodeHeight(node.right);

    return Math.max(leftSubtree, rightSubtree) + 1;
  }

  function nodeDepth(root, value) {
    if (!root) return;

    if (value === root.data) return 0;
    if (value > root.data) return nodeDepth(root.right) + 1 || undefined;
    if (value < root.data) return nodeDepth(root.left) + 1 || undefined;
  }

  function height(value) {
    let tempRoot = root;
    while (tempRoot) {
      if (value === tempRoot.data) {
        break;
      } else if (value > tempRoot.data) {
        tempRoot = tempRoot.right;
      } else {
        tempRoot = tempRoot.left;
      }
    }

    const height = nodeHeight(tempRoot);
    return height >= 0 ? height : undefined;
  }

  function depth(value) {
    return nodeDepth(root, value);
  }

  function isBalancedNode(node) {
    if (!node) return true;

    if (Math.abs(nodeHeight(node.left) - nodeHeight(node.right)) > 1) {
      return false;
    } else {
      return isBalancedNode(node.left) && isBalancedNode(node.right);
    }
  }

  function isBalanced() {
    return isBalancedNode(root) > 0;
  }

  function rebalance() {
    const newArray = [];
    inOrderForEach((val) => newArray.push(val));
    root = buildTree(newArray);
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
    preOrderForEach,
    inOrderForEach,
    postOrderForEach,
    depth,
    height,
    isBalanced,
    rebalance,
  };
}
