import React, { useState } from "react";
import Tree from "react-d3-tree";
import { v4 } from "uuid";
import NodeModal from "./NodeModal";
import { useCenteredTree } from "./helpers";

const containerStyles = {
  width: "100vw",
  height: "100vh",
};

const AppTree = ({ readOnly = true }) => {
  const [tree, setTree] = useState({
    name: "Root",
    attributes: {
      id: "411d9783-85ba-41e5-a6a3-5e1cca3d294f",
    },
    children: [
      {
        name: "Root 1.1",
        attributes: {
          id: "411d9783-85ba-41e5-a6a3-5e1cca3d294f2",
        },
        children: [],
      },
      {
        name: "Root 1.2",
        attributes: {
          id: "411d9783-85ba-41e5-a6a3-5e1cca3d294f3",
        },
        children: [],
      },
    ],
  });
  const [translate, containerRef] = useCenteredTree();
  const [node, setNode] = useState();
  const handleClose = () => setNode(undefined);
  const handleNodeClick = (datum) => {
    setNode(datum);
  };

  // Here we're using `renderCustomNodeElement` to represent each node
  // as an SVG `rect` instead of the default `circle`.
  const renderRectSvgNode = (customProps, onNodeClick) => {
    const { nodeDatum, toggleNode } = customProps;

    return (
      <g>
        <circle
          r="15"
          fill={"#777"}
          onClick={readOnly ? toggleNode : () => onNodeClick(nodeDatum)}
        />
        <text fill="black" strokeWidth="1" x="20">
          {nodeDatum.name}
        </text>
        {nodeDatum.attributes?.department && (
          <text fill="black" x="20" dy="20" strokeWidth="1">
            Department: {nodeDatum.attributes?.department}
          </text>
        )}
      </g>
    );
  };

  const handleSubmit = (node, child) => {
    const newTree = bfs(node.attributes?.id, tree, {
      name: node.name,
      attributes: {
        id: v4(),
      },
      children: child
        ? [
            ...node.children,
            {
              name: child,
              attributes: {
                id: v4(),
              },
              children: [],
            },
          ]
        : [],
    });

    if (newTree) {
      setTree(newTree);
    }

    setNode(undefined);
  };

  function bfs(id, tree, node) {
    const queue = [];
    queue.unshift(tree);
    while (queue.length > 0) {
      const curNode = queue.pop();
      if (curNode.attributes?.id === id) {
        curNode.name = node.name;
        curNode.children = node.children
          ? [...curNode.children, ...node.children]
          : curNode.children;
        return { ...tree };
      }

      const len = curNode.children.length;
      for (let i = 0; i < len; i++) {
        queue.unshift(curNode.children[i]);
      }
    }
  }

  return (
    <div style={containerStyles} ref={containerRef}>
      <Tree
        data={tree}
        // orientation="vertical"
        translate={translate}
        renderCustomNodeElement={(nodeInfo) =>
          renderRectSvgNode(nodeInfo, handleNodeClick)
        }
        onNodeClick={handleNodeClick}
      />
      {!readOnly && (
        <NodeModal
          onSubmit={handleSubmit}
          onClose={handleClose}
          node={node}
          isOpen={!!node}
        />
      )}
    </div>
  );
};

export default AppTree;
