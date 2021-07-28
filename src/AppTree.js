import React, { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import NodeModal from "./NodeModal";
import { useCenteredTree } from "./helpers";
import { deleteTreeApi, getTreeApi, postTreeApi } from "./treeService";
import { FormControl, Select, Button } from "@chakra-ui/react";
import TreeNode from "./TreeNode";

const containerStyles = {
  width: "100vw",
  height: "100vh",
};

const AppTree = ({ readOnly = true }) => {
  const [tree, setTree] = useState({
    name: "Root",
    gender: "male",
    attributes: {
      id: "411d9783-85ba-41e5-a6a3-5e1cca3d294f",
    },
    children: [],
  });

  const [translate, containerRef] = useCenteredTree();
  const [node, setNode] = useState();
  const [orientation, setOrientation] = useState("vertical");

  const handleClose = () => setNode(undefined);
  const handleNodeClick = (datum) => {
    setNode(datum);
  };

  useEffect(() => {
    getTreeApi().then((response) => {
      const { success, data } = response;
      if (success) {
        setTree(data);
      }
    });
  }, []);

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
    return (
      <TreeNode
        readOnly={readOnly}
        onNodeClick={onNodeClick}
        {...customProps}
      />
    );
  };

  const handleSubmit = (node, child) => {
    postTreeApi({ node, child }).then((response) => {
      const { success, data } = response;
      if (success) {
        setTree(data);
      }
    });
    setNode(undefined);
  };

  const handleDelete = (node) => {
    deleteTreeApi({ node }).then((response) => {
      const { success, data } = response;
      if (success) {
        setTree(data);
        setNode(undefined);
      } else {
        setNode(undefined);
      }
    });
  };

  return (
    <div style={containerStyles} ref={containerRef}>
      <FormControl>
        {!readOnly && (
          <Button color="blue.500" variant="solid" onClick={downloadFile}>
            Download Json
          </Button>
        )}
        {/* <Select
          placeholder="Select orientation"
          onChange={({ target }) => setOrientation(target.value)}
        >
          <option value="vertical">Vertical</option>
          <option value="horizontal">Horizontal</option>
        </Select> */}
      </FormControl>
      <Tree
        data={tree}
        orientation={orientation}
        translate={translate}
        pathFunc={(linkData, orientation) => {
          const { source, target } = linkData;
          const sX = source.x + 50;
          const sY = source.y + 90;
          const tX = target.x + 50;
          const tY = target.y + 90;

          if (Math.abs(sX - tX) > Math.abs(sY - tY)) {
            const midX = (tX + sX) / 2;
            return `M ${sX},${sY} C ${midX},${sY} ${midX},${tY} ${tX},${tY}`;
          } else {
            const midY = (tY + sY) / 2;
            return `M ${sX},${sY} C ${sX},${midY} ${tX},${midY} ${tX},${tY}`;
          }
        }}
        scaleExtent={{ min: 1, max: 10 }}
        nodeSize={{
          x: 150,
          y: 300,
        }}
        renderCustomNodeElement={(nodeInfo) =>
          renderRectSvgNode(nodeInfo, handleNodeClick)
        }
        onNodeClick={handleNodeClick}
      />
      {!readOnly && (
        <NodeModal
          onSubmit={handleSubmit}
          onDelete={handleDelete}
          onClose={handleClose}
          node={node}
          isOpen={!!node}
        />
      )}
    </div>
  );
};

export default AppTree;
