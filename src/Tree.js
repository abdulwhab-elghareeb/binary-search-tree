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

  return {
    root,
  };
}
