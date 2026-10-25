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

  const root = buildTree(cleanedArr);

  // Binary tree traversal will result : O(n)
  // Binary search with the original array will result : O(log n)
  // Using the original array will be more efficient
  const includes = (value) => {
    let low = 0;
    let high = cleanedArr.length - 1;
    let mid;

    while (low <= high) {
      mid = Math.floor((high + low) / 2);

      if (cleanedArr[mid] === value) {
        return true;
      } else if (cleanedArr[mid] < value) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    return false;
  };

  return {
    root,
    includes,
  };
}
