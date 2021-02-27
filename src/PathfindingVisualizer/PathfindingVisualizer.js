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
    };
  }

  componentDidMount() {
    const nodes = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        const currentNode = {
          row,
          col,
          isStart: row === 15 && col === 15,
          isFinish: row === 16 && col === 45,
          isVisited1: false,
          isVisited2: false,
        };
        currentRow.push(currentNode);
      }
      nodes.push(currentRow);
    }
    this.setState({ nodes: nodes });
  }
  animate(path) {
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        const node = path[i];
        console.log(node);
        const newGrid = this.state.nodes.slice();
        const newNode = {
          ...node,
          isVisited2: true,
        };
        console.log(newGrid);
        newGrid[node.row][node.col] = newNode;
        this.setState({ grid: newGrid });
      }, 100 * i);
    }
  }

  visualizeDFS() {
    const { nodes } = this.state;
    const startNode = nodes[15][15];
    const path = depthFirstSearch(nodes, startNode);
    this.animate(path);
  }

  visualizeBFS() {
    const { nodes } = this.state;
    const startNode = nodes[15][15];
    const path = breadthFirstSearch(nodes, startNode);
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
              <div>
                {row.map((node, nodeIdx) => (
                  <Node node={node}></Node>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default PathfindingVisualizer;
