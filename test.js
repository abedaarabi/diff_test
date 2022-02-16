let arr = [1, 5, 2, 4, 7, 3, 6, 8, 9, 5, 10];
// const total = arr.length
// const firstHlaf = arr.filter((i) => i < arr.length / 2);
// const half = arr.filter((i) => i > arr.length / 2);
// console.log({ firstHlaf, half });
// function findAcc(array, array2) {
//   let reslut = [];
//   let count = 0;
//   array.forEach((num) => {
//     count++;
//     if (array2.includes(total - num)) {
//       reslut.push([num, total - num]);
//     }
//   });
//   return { reslut, count };
// }

// console.log(findAcc(firstHlaf, half));

// const isObj = (obj) => typeof obj === "object" && !Array.isArray(obj);
// const topLevelOBj = (object) => {
//   let items = {};
//   for (const key in object) {
//     if (!isObj(object[key])) {
//       items = { ...items, [key]: object[key] };
//     } else {
//       topLevelOBj(object[key]);
//       items = { ...items, ...topLevelOBj(object[key]) };
//     }
//   }
//   return items;
// };
// const foo = topLevelOBj(apiObj);

// console.log({ [foo["isbn"]]: foo });

// const list = arr.sort(() => Math.random() - 0.5);
// console.log(list);

const arr1 = ["abed", "fanny", 1, 45, ["1", "3", [45, 78]]];

// const result = arr1.filter((item) => {
//   return item.toLocaleString().includes("y");
// });

// console.log(result);

// const isArray = (arr) => Array.isArray(arr);

// function flattenArray(array) {
//   let result = [];
//   array.forEach((arr) => {
//     if (!isArray(arr)) {
//       result.push(arr);
//     } else {
//       result = new Set([...result, ...flattenArray(arr)]);
//     }
//   });
//   return result;
// }

// const result = flattenArray(arr1);
// console.log(result.has(1));

const objOne = [
  {
    name: "abed",
    age: 31,
    height: 172,
    a: { b: 22, u: { k: "hey", justRemoved: "hello" } },
  },
  {
    test: "500m",
  },
];
const objTwo = [
  {
    name: "abed",
    color: "red1",
    age: "",
    height: 173,
    a: { b: 23, u: { k: "hey++" } },
  },
  {
    name: "abed",
    color: "red1",
    age: "",
    height: 173,
    a: { b: 23, u: { k: "hey++" } },
  },
];
const a = require("./obj1.json");
const b = require("./obj2.json");

//   for (keyTwo in objTwo) {
//     if (objOne[keyOne] !== objTwo[keyTwo]) {
//       diffOne = { ...diffOne, [keyOne]: objOne[keyOne] };
//       diffTwo = { ...diffTwo, [keyTwo]: objTwo[keyTwo] };
//     }
//   }
// }

// console.log({ diffOne, diffTwo });
const isObj = (obj) => typeof obj === "object" && !Array.isArray(obj);
function diffTest(obj1, obj2, path = []) {
  let result = {
    changed: {},
    added: {},
    removed: {},
  };
  const key1 = Object.keys(obj1);
  const key2 = Object.keys(obj2);
  let set = Array.from(new Set([...key1, ...key2]));

  // if (options.include) {
  //   set = options.include;
  // }

  for (let key of set) {
    if (!isObj(obj1[key])) {
      const { type, value } = diff(obj1, obj2, key);
      if (type === "unchanged") {
        continue;
      }
      result[type][key] = { ...value, path: path.concat(key) };
    } else {
      const { changed, removed, added } = diffTest(
        obj1[key],
        obj2[key],
        path.concat(key)
      );
      // result = { ...result, ...v };
      result.changed = { ...result.changed, ...changed };
      result.removed = { ...result.removed, ...removed };
      result.added = { ...result.added, ...added };
    }
  }
  return result;
}

// const result = diffTest(objOne, objTwo);

// console.log(JSON.stringify(result, null, 2));

function diff(objA, objB, key) {
  const valueA = objA[key];
  const valueB = objB[key];

  const keyAExist = objA.hasOwnProperty(key);
  const keyBExist = objB.hasOwnProperty(key);

  if (keyAExist && !keyBExist) {
    return {
      type: "removed",
      value: { value: valueA },
    };
  }
  if (!keyAExist && keyBExist) {
    return {
      type: "added",
      value: { value: valueB },
    };
  }
  if (keyAExist && keyBExist && valueA !== valueB) {
    return {
      type: "changed",
      value: {
        current: valueB,
        previous: valueA,
      },
    };
  }
  return {
    type: "unchanged",
  };
}

(function test() {
  const array1 = a.data.collection;
  const array2 = b.data.collection;

  const externalIds1 = array1.map((item) => item.externalId);

  const mapping1 = array1.reduce((acc, item, index) => {
    acc[item.externalId] = index;
    return acc;
  }, {});

  const externalIds2 = array2.map((item) => item.externalId);

  const mapping2 = array2.reduce((acc, item, index) => {
    acc[item.externalId] = index;
    return acc;
  }, {});

  let set = Array.from(new Set([...externalIds1, ...externalIds2]));

  const diffs = set.map((externalId) => {
    const index1 = mapping1[externalId];
    const index2 = mapping2[externalId];
    if (!index1 || !index2) {
      return { externalId, msg: "chnage me soon" };
    }
    const diff = diffTest(array1[index1], array2[index2]);
    return { externalId, ...diff };
  });
  console.log(
    JSON.stringify(
      diffs.find(
        (v) => v.externalId === "69b68d96-c6cf-46b9-abd8-22ecf802bab3-00295823"
      ),
      null,
      2
    )
  );
})();
