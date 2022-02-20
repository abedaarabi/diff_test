const objOne = [
  {
    name: "abed",
    age: 31,
    height: 172,
    id: 1,
  },
  {
    name: "abed",
    age: 31,
    height: 172,
    id: 2,
  },
  {
    name: "abed",
    age: 31,
    height: 172,
    id: 3,
  },
  {
    name: "abed",
    age: 31,
    height: 172,
    id: 7,
  },
];
const objTwo = [
  {
    name: "abed",
    age: 31,
    height: 172,
    id: 1,
  },
  {
    name: "abed",
    age: 31,
    height: 172,
    id: 2,
  },
  {
    name: "abed",
    age: 31,
    height: 172,
    id: 3,
  },
  {
    name: "abed",
    age: 31,
    height: 172,
    id: 4,
  },
];

const indexs1 = objOne.reduce((acc, val, idx) => {
  acc[val.id] = idx;
  return acc;
}, {});

const indexs2 = objTwo.reduce((acc, val, idx) => {
  acc[val.id] = idx;
  return acc;
}, {});

const ids1 = objOne.map((i) => i.id);
const ids2 = objTwo.map((i) => i.id);

const set = Array.from(new Set([...ids1, ...ids2]));

const result = set.map((i) => {
  const idx1 = indexs1[i];
  const idx2 = indexs2[i];

  if (!idx1 && idx2) {
    return { id: i, msg: "element added" };
  }
  if (idx1 && !idx2) {
    return { id: i, msg: "element removed" };
  }
  return { idx1, idx2 };
});

console.log(result);
