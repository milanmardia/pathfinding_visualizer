import React from "react";
import Node from "./Node/Node";
import "./PathfindingVisualizer.css";
import depthFirstSearch from "./algorithms/dfs";
import breadthFirstSearch from "./algorithms/bfs";

class PathfindingVisualizer extends React.Component {
  constructor() {
    super();
    this.state = {
      nodes: [],
      shortestPath: [],
      mouseIsPressed: false,
      startChosen: false,
      endChosen: false,
      startRow: 0,
      startCol: 0,
      endRow: 0,
      endCol: 0,
    };
  }

  componentDidMount() {
    const nodes = createGrid();
    this.setState({ nodes });
  }

  handleOnMouseDown(row, col) {
    var newGrid;
    if (!this.state.startChosen) {
      newGrid = getNewGridStart(this.state.nodes, row, col);
      this.setState({
        nodes: newGrid,
        mouseIsPressed: true,
        startChosen: true,
        startRow: row,
        startCol: col,
      });
    } else if (!this.state.endChosen) {
      newGrid = getNewGridFinish(this.state.nodes, row, col);
      this.setState({
        nodes: newGrid,
        mouseIsPressed: true,
        endChosen: true,
        endRow: row,
        endCol: col,
      });
    } else {
      const newGrid = getNewGridWall(this.state.nodes, row, col);
      this.setState({ nodes: newGrid, mouseIsPressed: true });
    }
  }

  handleOnMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  handleOnMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    var newGrid;
    if (!this.state.startChosen) {
      newGrid = getNewGridStart(this.state.nodes, row, col);
      this.setState({
        nodes: newGrid,
        mouseIsPressed: true,
        startChosen: true,
      });
    } else if (!this.state.endChosen) {
      newGrid = getNewGridFinish(this.state.nodes, row, col);
      this.setState({
        nodes: newGrid,
        mouseIsPressed: true,
        endChosen: true,
        endRow: row,
        endCol: col,
      });
    } else {
      const newGrid = getNewGridWall(this.state.nodes, row, col);
      this.setState({ nodes: newGrid, mouseIsPressed: true });
    }
  }

  animate(path, shortestPath) {
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        const node = path[i];
        const newGrid = this.state.nodes.slice();
        const newNode = {
          ...node,
          isVisited2: true,
        };
        newGrid[node.row][node.col] = newNode;
        this.setState({ grid: newGrid });
      }, 25 * i);
    }
  }

  animatePath() {
    setTimeout(() => {
      const { shortestPath } = this.state;
      for (let i = 0; i < shortestPath.length; i++) {
        setTimeout(() => {
          const node = shortestPath[i];
          const newGrid = this.state.nodes.slice();
          const newNode = {
            ...node,
            isPath: true,
          };
          newGrid[node.row][node.col] = newNode;
          this.setState({ grid: newGrid });
        }, 50 * i);
      }
    });
  }

  visualizeDFS() {
    const newGrid = resetGrid(this.state.nodes);
    this.setState({ nodes: newGrid });
    const { nodes } = this.state;
    const startNode = nodes[this.state.startRow][this.state.startCol];
    const finishNode = nodes[this.state.endRow][this.state.endCol];
    const path = depthFirstSearch(nodes, startNode);
    const shortestPath = generatePathList(finishNode);
    this.setState({ shortestPath });
    this.animate(path);
  }

  visualizeBFS() {
    const newGrid = resetGrid(this.state.nodes);
    this.setState({ nodes: newGrid });
    const { nodes } = this.state;
    const startNode = nodes[this.state.startRow][this.state.startCol];
    const finishNode = nodes[this.state.endRow][this.state.endCol];
    const path = breadthFirstSearch(nodes, startNode);
    const shortestPath = generatePathList(finishNode);
    this.setState({ shortestPath });
    this.animate(path);
  }

  render() {
    const { nodes } = this.state;
    return (
      <div>
        <button className="button" onClick={() => this.visualizeDFS()}>
          {" "}
          DFS{" "}
        </button>
        <button className="button" onClick={() => this.visualizeBFS()}>
          {" "}
          BFS{" "}
        </button>
        <button className="button" onClick={() => this.animatePath()}>
          {" "}
          shortestPath{" "}
        </button>
        <div className="grid">
          {nodes.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => (
                  <Node
                    key={nodeIdx}
                    node={node}
                    onMouseDown={() =>
                      this.handleOnMouseDown(node.row, node.col)
                    }
                    onMouseUp={() => this.handleOnMouseUp()}
                    onMouseEnter={() =>
                      this.handleOnMouseEnter(node.row, node.col)
                    }
                  ></Node>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const createGrid = () => {
  const nodes = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 40; col++) {
      currentRow.push(createNode(row, col));
    }
    nodes.push(currentRow);
  }
  return nodes;
};

const resetGrid = (grid) => {
  const newGrid = grid.slice();
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const node = grid[row][col];
      const newNode = {
        ...node,
        isVisited1: false,
        isVisited2: false,
        isPath: false,
      };
      newGrid[row][col] = newNode;
    }
  }
  return newGrid;
};
const createNode = (row, col) => {
  return {
    row,
    col,
    parent: [],
    isStart: false,
    isFinish: false,
    isVisited1: false,
    isVisited2: false,
    isPath: false,
    isWall: false,
  };
};

const getNewGridWall = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const getNewGridStart = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isStart: !node.isStart,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const getNewGridFinish = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isFinish: !node.isFinish,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const generatePathList = (finishNode) => {
  const path = [];
  var currentNode = finishNode;

  while (!currentNode.isStart) {
    path.push(currentNode);
    currentNode = currentNode.parent[0];
  }
  path.reverse();
  console.log("BFs");
  return path;
};

export default PathfindingVisualizer;
