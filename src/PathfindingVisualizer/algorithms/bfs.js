// def breadthFirstSearch(problem):
//     """Search the shallowest nodes in the search tree first."""
//     "*** YOUR CODE HERE ***"
//     node = {'state': problem.getStartState(), 'path': []}

//     frontier = util.Queue()
//     frontier.push(node)

//     visited = set()

//     while not frontier.isEmpty():

//         node = frontier.pop()

//         if not node['state'] in visited:
//             visited.add(node['state'])

//             if problem.isGoalState(node['state']):
//                     return node['path']

//             successors = problem.getSuccessors(node['state'])

//             for successor in successors:
//                 child = {'state': successor[0], 'path': node['path'] + [successor[1]], 'parent': node}
//                 frontier.push(child)

//     util.raiseNotDefined()
function breadthFirstSearch(grid, startNode) {
  const unvisited = [];
  unvisited.push(startNode);

  const allVisited = [];

  while (unvisited.length > 0) {
    const node = unvisited.shift();

    if (!node.isVisited1 && !node.isWall) {
      allVisited.push(node);
      node.isVisited1 = true;
      if (node.isFinish) {
        return allVisited;
      }
      const successors = getSuccessors(node, grid);
      for (const successor of successors) {
        const child = successor;
        child.parent.push(node);
        unvisited.push(child);
      }
    }
  }
  return allVisited;
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

export default breadthFirstSearch;
