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
];

const result = objOne.reduce((acc, val, index) => {
  acc[val.id] = index;
  return acc;
}, {});

const ids = objOne.map((i) => i.id);
console.log(result[1]);

ids.map((id) => {
  const idx = result[id];

  console.log(objOne[idx]);
});
