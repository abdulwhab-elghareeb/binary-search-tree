import { Node } from "./Node.js";
import { mergeSort, unique } from "./helpers.js";

export class Tree {
  #root;
  constructor(array) {
    if (!Array.isArray(array)) array = [];
    this.#root = this.#buildTree(mergeSort(unique(array)));
  }

  #buildTree(array) {
    if (array.length === 0) return null;

    const mid = Math.floor((array.length - 1) / 2);
    const root = new Node(array[mid]);
    root.left = this.#buildTree(array.slice(0, mid));
    root.right = this.#buildTree(array.slice(mid + 1));

    return root;
  }

  get root() {
    return this.#root;
  }

  includes(value) {
    let tempRoot = this.#root;

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

  insert(value) {
    if (!this.#root) {
      this.#root = new Node(value);
      return;
    }

    let tempRoot = this.#root;
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

    tempRoot[direction] = new Node(value);
  }

  #getPredecessor(root) {
    let curr = root.left;
    while (curr?.right) curr = curr.right;
    return curr;
  }

  #deleteNode(root, value) {
    if (!root) return null;
    if (value > root.data) root.right = this.#deleteNode(root.right, value);
    if (value < root.data) root.left = this.#deleteNode(root.left, value);
    if (value === root.data) {
      if (!root.left) return root.right;
      if (!root.right) return root.left;

      const predecessor = this.#getPredecessor(root);
      root.data = predecessor.data;
      root.left = this.#deleteNode(root.left, predecessor.data);
    }

    return root;
  }

  deleteItem(value) {
    this.#deleteNode(this.#root, value);
  }

  #levelOrderRec(callback, queue = [this.#root]) {
    if (queue.length === 0) return;

    const currentNode = queue.shift();
    callback(currentNode.data);

    if (currentNode.left) queue.push(currentNode.left);
    if (currentNode.right) queue.push(currentNode.right);

    this.#levelOrderRec(queue);
  }

  levelOrderForEachRec(callback) {
    if (!callback) throw new Error("A callback is required");
    return this.#levelOrderRec(callback);
  }

  levelOrderForEach(callback) {
    if (!callback) throw new Error("A callback is required");
    const queue = [this.#root];

    while (queue.length) {
      const currentNode = queue.shift();
      callback(currentNode.data);

      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
  }

  #preOrderNode(root, callback) {
    if (!root) return;
    callback(root.data);
    this.#preOrderNode(root.left, callback);
    this.#preOrderNode(root.right, callback);
  }

  #inOrderNode(root, callback) {
    if (!root) return;
    this.#inOrderNode(root.left, callback);
    callback(root.data);
    this.#inOrderNode(root.right, callback);
  }

  #postOrderNode(root, callback) {
    if (!root) return;
    this.#postOrderNode(root.left, callback);
    this.#postOrderNode(root.right, callback);
    callback(root.data);
  }

  preOrderForEach(callback) {
    if (!callback) throw new Error("A callback is required");
    return this.#preOrderNode(this.#root, callback);
  }

  inOrderForEach(callback) {
    if (!callback) throw new Error("A callback is required");
    return this.#inOrderNode(this.#root, callback);
  }

  postOrderForEach(callback) {
    if (!callback) throw new Error("A callback is required");
    return this.#postOrderNode(this.#root, callback);
  }

  #nodeHeight(node) {
    if (!node) return -1;
    return (
      Math.max(this.#nodeHeight(node.left), this.#nodeHeight(node.right)) + 1
    );
  }

  #nodeDepth(root, val) {
    if (!root) return;

    if (val === root.data) return 0;
    if (val > root.data)
      return this.#nodeDepth(root.right, val) + 1 || undefined;
    if (val < root.data)
      return this.#nodeDepth(root.left, val) + 1 || undefined;
  }

  height(value) {
    let tempRoot = this.#root;
    while (tempRoot) {
      if (value === tempRoot.data) {
        break;
      } else if (value > tempRoot.data) {
        tempRoot = tempRoot.right;
      } else {
        tempRoot = tempRoot.left;
      }
    }

    if (!tempRoot) return;
    return this.#nodeHeight(tempRoot);
  }

  depth(value) {
    return this.#nodeDepth(this.#root, value);
  }

  #isBalancedNode(node) {
    if (!node) return true;

    if (
      !this.#isBalancedNode(node.right) ||
      !this.#isBalancedNode(node.left) ||
      Math.abs(this.#nodeHeight(node.left) - this.#nodeHeight(node.right)) > 1
    ) {
      return false;
    } else {
      return true;
    }
  }

  isBalanced() {
    return this.#isBalancedNode(this.#root);
  }

  rebalance() {
    const newArray = [];
    this.inOrderForEach((val) => newArray.push(val));
    this.#root = this.#buildTree(newArray);
  }
}
