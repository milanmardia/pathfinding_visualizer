// def aStarSearch(problem, heuristic=nullHeuristic):
//     """Search the node that has the lowest combined cost and heuristic first."""
//     "*** YOUR CODE HERE ***"
//     node = {'state': problem.getStartState(), 'path': [], 'cost': 0 }

//     frontier = util.PriorityQueue()
//     frontier.push(node, node['cost'] + heuristic(node['state'], problem))

//     visited = set()

//     while not frontier.isEmpty():

//         node = frontier.pop()

//         if not node['state'] in visited:
//             visited.add(node['state'])

//             if problem.isGoalState(node['state']):
//                     return node['path']

//             successors = problem.getSuccessors(node['state'])

//             for successor in successors:
//                 child = {'state': successor[0], 'path': node['path'] + [successor[1]], 'cost': node['cost']+ successor[2]}
//                 frontier.push(child, child['cost'] + heuristic(child['state'], problem))

//     util.raiseNotDefined()

// User defined class
// to store element and its priority
function astar(grid, startNode, finishNode) {
  var unvisited = new PriorityQueue();
  unvisited.enqueue(
    startNode,
    startNode.cost + getManhattanDistance(startNode, finishNode)
  );
  console.log(getManhattanDistance(startNode, finishNode));

  const allVisited = [];
  while (!unvisited.isEmpty()) {
    const node = unvisited.dequeue().element;
    if (!node.isVisited1 && !node.isWall) {
      node.isVisited1 = true;
      allVisited.push(node);
      if (node.isFinish) {
        return allVisited;
      }

      const successors = getSuccessors(node, grid);
      for (const successor of successors) {
        const child = successor;
        child.parent.push(node);
        child.cost = node.cost + 1;
        unvisited.enqueue(
          child,
          child.cost + getManhattanDistance(child, finishNode)
        );
      }
    }
  }
  return allVisited;
}

function getManhattanDistance(node1, node2) {
  return Math.abs(node2.row - node1.row) + Math.abs(node2.col - node1.col);
}
function getSuccessors(node, grid) {
  const successors = [];
  const { row, col } = node;
  if (row > 0) successors.push(grid[row - 1][col]);
  if (row < grid.length - 1) successors.push(grid[row + 1][col]);
  if (col > 0) successors.push(grid[row][col - 1]);
  if (col < grid[row].length - 1) successors.push(grid[row][col + 1]);
  return successors;
}
class QElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

// PriorityQueue class
class PriorityQueue {
  // An array is used to implement priority
  constructor() {
    this.items = [];
  }

  // functions to be implemented

  // enqueue function to add element
  // to the queue as per priority
  enqueue(element, priority) {
    // creating object from queue element
    var qElement = new QElement(element, priority);
    var contain = false;

    // iterating through the entire
    // item array to add element at the
    // correct location of the Queue
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > qElement.priority) {
        // Once the correct location is found it is
        // enqueued
        this.items.splice(i, 0, qElement);
        contain = true;
        break;
      }
    }

    // if the element have the highest priority
    // it is added at the end of the queue
    if (!contain) {
      this.items.push(qElement);
    }
  }
  dequeue() {
    // return the dequeued element
    // and remove it.
    // if the queue is empty
    // returns Underflow
    if (this.isEmpty()) return "Underflow";
    return this.items.shift();
  }
  isEmpty() {
    // return true if the queue is empty.
    return this.items.length === 0;
  }
}

export default astar;
