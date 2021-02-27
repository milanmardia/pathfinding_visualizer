import React from "react";
import "./Node.css";

class Node extends React.Component {
  render() {
    const { row, col, isStart, isFinish, isVisited2 } = this.props.node;

    const style = isStart
      ? "isStart"
      : isFinish
      ? "isFinish"
      : isVisited2
      ? "isVisited"
      : "";
    return <div className={`node ${style}`}></div>;
  }
}

export default Node;
