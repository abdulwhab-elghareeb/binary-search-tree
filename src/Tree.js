import { Node } from "./Node.js";
import { mergeSort, unique } from "./helpers.js";

export function Tree(array) {
  const buildTree = (array) => {
    if (array.length === 0) return null;
    const mid = Math.floor((0 + array.length - 1) / 2);
    const root = Node(array[mid]);
    root.left = buildTree(array.slice(0, mid));
    root.right = buildTree(array.slice(mid + 1));

    return root;
  };
  const root = buildTree(mergeSort(unique(array)));

  // Binary tree traversal will result : O(n)
  // Binary search with the original array will result : O(log n)
  // Using the original array will be more efficient
  const includes = (value) => {
    const innerIncludes = (r, val) => {
      if (r === null) return false;
      if (r.data === val) return true;

      return innerIncludes(r.left, val) || innerIncludes(r.right, val);
    };

    return innerIncludes(root, value);
  };

  return {
    root,
    includes,
  };
}
