import React from "react";
import Node from "./Node/Node";
import "./PathfindingVisualizer.css";

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
          col,
          row,
          isFinish : row === 15 && col ==
        };
        currentRow.push(currentNode);
      }
      nodes.push(currentRow);
    }
    this.setState({ nodes: nodes });
  }

  render() {
    const nodes = this.state.nodes;
    return (
      <div className="grid">
        {nodes.map((row, rowIdx) => {
          return (
            <div>
              {row.map((node, nodeIdx) => (
                <Node></Node>
              ))}
            </div>
          );
        })}
      </div>
    );
  }
}

export default PathfindingVisualizer;
