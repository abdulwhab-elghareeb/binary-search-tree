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
      if (!r) return null;
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

  function preOrderForEach(callback) {
    if (!callback) throw new Error("A callback is required");

    function innerPreOrder(r = root) {
      if (!r) return;
      callback(r.data);
      innerPreOrder(r.left);
      innerPreOrder(r.right);
    }

    return innerPreOrder();
  }

  function inOrderForEach(callback) {
    if (!callback) throw new Error("A callback is required");

    function innerInOrder(r = root) {
      if (!r) return;
      innerInOrder(r.left);
      callback(r.data);
      innerInOrder(r.right);
    }

    return innerInOrder();
  }

  function postOrderForEach(callback) {
    if (!callback) throw new Error("A callback is required");

    function innerPostOrder(r = root) {
      if (!r) return;
      innerPostOrder(r.left);
      innerPostOrder(r.right);
      callback(r.data);
    }

    return innerPostOrder();
  }

  function nodeHeight(node) {
    if (!node) return -1;

    const leftSubtree = nodeHeight(node.left);
    const rightSubtree = nodeHeight(node.right);

    return Math.max(leftSubtree, rightSubtree) + 1;
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
    function innerDepth(r = root) {
      if (!r) return;

      let height = 0;
      if (value === r.data) return 0;
      if (value > r.data) height = innerDepth(r.right);
      if (value < r.data) height = innerDepth(r.left);

      return height + 1 || undefined;
    }

    return innerDepth();
  }

  function isBalancedNode(node) {
    if (!node) return true;

    const leftHeight = nodeHeight(node.left);
    const rightHeight = nodeHeight(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    } else {
      return isBalancedNode(node.left) && isBalancedNode(node.right);
    }
  }

  function isBalanced() {
    return isBalancedNode(root) > 0;
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
  };
}
