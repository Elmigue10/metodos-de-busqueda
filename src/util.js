const TREE = [
  {
    data: [1, 2, 3, 0, 4, 5, 7, 8, 6],
    children: [
      {
        data: [1, 2, 3, 4, 0, 5, 7, 8, 6],
        children: [
          {
            data: [1, 0, 3, 4, 2, 6, 7, 8, 6],
            children: [
              {
                data: [1, 2, 3, 4, 5, 6, 7, 8, 0],
              },
              {
                data: [0, 1, 3, 4, 2, 5, 7, 8, 6],
              },
              {
                data: [1, 3, 0, 4, 2, 5, 7, 8, 6],
              },
            ],
          },
          {
            data: [1, 2, 3, 4, 5, 0, 7, 8, 6],
          },
          {
            data: [1, 2, 3, 4, 8, 5, 7, 0, 6],
          },
        ],
      },
      {
        data: [1, 2, 3, 4, 0, 5, 7, 8, 6],
      },
      {
        data: [1, 2, 3, 4, 0, 5, 7, 8, 6],
      },
    ],
  },
];

export function getTree(state) {
  return Promise.resolve(TREE);
}
/**
 *
 * @param {string} state
 * @returns
 */
export const validateState = (state) =>
  new Promise((res, rej) => {
    const mySet = new Set(state.split(""));
    if (mySet.size !== 9) {
      rej();
    }
    const elements = [];
    mySet.forEach((element) => {
      elements.push(+element);
    });
    res(elements);
  });
