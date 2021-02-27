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
