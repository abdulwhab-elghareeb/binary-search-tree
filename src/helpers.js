function merge(arr1, arr2) {
  let i = 0;
  let j = 0;
  let k = 0;

  const mergeResult = [];

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      mergeResult[k++] = arr1[i++];
    } else {
      mergeResult[k++] = arr2[j++];
    }
  }

  for (i; i < arr1.length; i++) {
    mergeResult[k++] = arr1[i];
  }

  for (j; j < arr2.length; j++) {
    mergeResult[k++] = arr2[j];
  }

  return mergeResult;
}

export function mergeSort(arr) {
  const low = 1;
  const high = arr.length;
  const mid = (low + high) / 2;

  if (low < high) {
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
  } else {
    return arr;
  }
}

export function unique(array) {
  const uniqueArray = [];
  for (const elem of array) {
    if (!uniqueArray.includes(elem)) uniqueArray.push(elem);
  }
  return uniqueArray;
}
