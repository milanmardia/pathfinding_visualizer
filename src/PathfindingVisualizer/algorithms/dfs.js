// def depthFirstSearch(start_node, finish_node):

//     node = {'state': problem.getStartState(), 'path': []}

//     frontier = util.Stack()
//     frontier.push(node)

//     visited = set()

//     while not frontier.isEmpty():

//         node = frontier.pop()
//         if problem.isGoalState(node['state']):
//                     return node['path']

//         visited.add(node['state'])
//         successors = problem.getSuccessors(node['state'])

//         for successor in successors:
//             child = {'state': successor[0], 'path': node['path'] + [successor[1]]}

//             if not child['state'] in visited:
//                 frontier.push(child)

//     util.raiseNotDefined()

function depthFirstSearch(grid, startNode) {
  const unvisited = [];
  unvisited.push(startNode);

  const allVisited = [];
  while (unvisited.length > 0) {
    const node = unvisited.pop();

    if (node.isFinish) {
      return allVisited;
    }

    node.isVisited1 = true;
    allVisited.push(node);
    const successors = getSuccessors(node, grid);
    for (let i = 0; i < successors.length; i++) {
      const child = successors[i];
      child.parent.push(node);
      if (!child.isVisited1 && !child.isWall) {
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

export default depthFirstSearch;
