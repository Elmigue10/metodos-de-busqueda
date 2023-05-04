import { Node } from "./puzzleNode";
import PriorityQueue from "js-priority-queue";
import { isUndefined } from "lodash";

let suscribeList = [];

export const suscribe = (callback) => {
  const code = Symbol(callback.toString());
  suscribeList.push({ code, callback });
  return code;
};

export const pushStep = (state) => {
  suscribeList.forEach((c) => c.callback(state));
};

export const unSuscribe = (symbol) => {
  suscribeList = suscribeList.filter((item) => item.code === symbol);
};

const moveUp = (state, index) => {
  let newState = state.slice();
  // swap values
  let temp = newState[index - 3];
  newState[index - 3] = newState[index];
  newState[index] = temp;
  return newState;
};

const moveDown = (state, index) => {
  let newState = state.slice();
  // swap values
  let temp = newState[index + 3];
  newState[index + 3] = newState[index];
  newState[index] = temp;
  return newState;
};

const moveLeft = (state, index) => {
  let newState = state.slice();
  // swap values
  let temp = newState[index - 1];
  newState[index - 1] = newState[index];
  newState[index] = temp;
  return newState;
};

const moveRight = (state, index) => {
  let newState = state.slice();
  // swap values
  let temp = newState[index + 1];
  newState[index + 1] = newState[index];
  newState[index] = temp;
  return newState;
};

const expandNode = (node) => {
  // return list of expanded nodes
  let expandedNodes = [];
  const index = node.getState().indexOf(0);
  if (![0, 1, 2].includes(index)) {
    expandedNodes.push(
      new Node(moveUp(node.state, index), node, "up", node.depth + 1, 0)
    );
  }
  if (![6, 7, 8].includes(index)) {
    expandedNodes.push(
      new Node(moveDown(node.state, index), node, "down", node.depth + 1, 0)
    );
  }
  if (![0, 3, 6].includes(index)) {
    expandedNodes.push(
      new Node(moveLeft(node.state, index), node, "left", node.depth + 1, 0)
    );
  }
  if (![2, 5, 8].includes(index)) {
    expandedNodes.push(
      new Node(moveRight(node.state, index), node, "right", node.depth + 1, 0)
    );
  }
  return expandedNodes;
};

const dfs = (goal, start, depth = 20) => {
  const depthLimit = depth;
  const nodes = new PriorityQueue({
    comparator: function (a, b) {
      return a.getDepth() - b.getDepth();
    },
  });
  nodes.queue(new Node(goal, null, null, 0));
  let count = 0;
  const explored = new Map(); // set (state, bool)
  while (nodes.length > 0) {
    const node = nodes.dequeue();
    if (explored.has(JSON.stringify(node.getState()))) {
      continue;
    } else {
      explored.set(JSON.stringify(node.getState()), true);
    }
    count++;
    if (JSON.stringify(node.state) === JSON.stringify(start)) {
      return node.pathFromStart(goal);
    }
    if (node.depth < depthLimit) {
      const expandedNodes = expandNode(node);
      for (const item of expandedNodes) {
        nodes.queue(item);
      }
    }
  }
};

/**
 *
 * @param {Array<number>} startState
 * @param {Array<number>} goalState
 */
export const start = (startState, goalState) =>
  new Promise((resolve, reject) => {
    const result = dfs(goalState, startState);
    if (isUndefined(result)) {
      reject();
    } else {
      resolve(result);
    }
  });
