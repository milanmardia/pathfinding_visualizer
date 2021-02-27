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
      mouseIsPressed: false,
      startChosen: false,
      endChosen: false,
      startRow: 0,
      startCol: 0,
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
      this.setState({ nodes: newGrid, mouseIsPressed: true, endChosen: true });
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
      this.setState({ nodes: newGrid, mouseIsPressed: true, endChosen: true });
    } else {
      const newGrid = getNewGridWall(this.state.nodes, row, col);
      this.setState({ nodes: newGrid, mouseIsPressed: true });
    }
  }

  animate(path) {
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

  visualizeDFS() {
    const { nodes } = this.state;
    const startNode = nodes[this.state.startRow][this.state.startCol];
    const path = depthFirstSearch(nodes, startNode);
    this.animate(path);
  }

  visualizeBFS() {
    const { nodes } = this.state;
    const startNode = nodes[this.state.startRow][this.state.startCol];
    const path = breadthFirstSearch(nodes, startNode);
    console.log(path);
    this.animate(path);
  }

  render() {
    const { nodes } = this.state;
    return (
      <div>
        <button onClick={() => this.visualizeDFS()}> DFS </button>
        <button onClick={() => this.visualizeBFS()}> BFS </button>
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
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    nodes.push(currentRow);
  }
  return nodes;
};

const createNode = (col, row) => {
  return {
    row,
    col,
    isStart: false,
    isFinish: false,
    isVisited1: false,
    isVisited2: false,
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

export default PathfindingVisualizer;
