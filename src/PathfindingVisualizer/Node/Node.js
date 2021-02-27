import React from "react";
import "./Node.css";

class Node extends React.Component {
  render() {
    const { node, onMouseDown, onMouseEnter, onMouseUp } = this.props;
    const { row, col, isStart, isFinish, isVisited2, isWall, isPath } = node;

    const style = isStart
      ? "isStart"
      : isFinish
      ? "isFinish"
      : isWall
      ? "isWall"
      : isPath
      ? "isPath"
      : isVisited2
      ? "isVisited"
      : "";
    return (
      <div
        className={`node ${style}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      ></div>
    );
  }
}

export default Node;
