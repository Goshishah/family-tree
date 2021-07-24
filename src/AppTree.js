import React, { useEffect, useState } from "react";
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
    children: [],
  });

  const [translate, containerRef] = useCenteredTree();
  const [node, setNode] = useState();
  const handleClose = () => setNode(undefined);
  const handleNodeClick = (datum) => {
    setNode(datum);
  };

  useEffect(() => {
    getDataFile("/data/data.json").then((tree) => {
      setTree(tree);
    });
  }, []);

  const getDataFile = (filePath) => {
    if (filePath) {
      return fetch(filePath).then((response) => {
        return response.json();
      });
    }
  };

  const downloadFile = async () => {
    const json = JSON.stringify(tree);
    const blob = new Blob([json], { type: "application/json" });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        curNode.children = node.children ? node.children : curNode.children;
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
      {!readOnly && (
        <button type="button" onClick={downloadFile}>
          {`Download Json`}
        </button>
      )}
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
