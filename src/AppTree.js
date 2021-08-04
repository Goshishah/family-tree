import React, { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import NodeModal from "./NodeModal";
import { useCenteredTree } from "./helpers";
import { deleteTreeApi, getTreeApi, postTreeApi } from "./treeService";
import { FormControl, Select, Button } from "@chakra-ui/react";
import TreeNode from "./TreeNode";
import languages from "./data/languages.json";

const containerStyles = {
  width: "100vw",
  height: "100vh",
};

const AppTree = ({ readOnly = true }) => {
  const [tree, setTree] = useState({
    languages: {
      ar: { name: "مُحَمَّد" },
      ur: { name: "محمد" },
      en: { name: "Muhammad" },
    },
    gender: "male",
    attributes: {
      id: "411d9783-85ba-41e5-a6a3-5e1cca3d294f",
    },
    children: [],
  });
  const [selectedLang, setSelectedLang] = useState("en");

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
  const renderRectSvgNode = (customProps, selectedLang, onNodeClick) => {
    return (
      <>
        {/* <Flag /> */}
        <TreeNode
          readOnly={readOnly}
          onNodeClick={onNodeClick}
          selectedLang={selectedLang}
          {...customProps}
        />
      </>
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

  const handlePath = (linkData, orientation) => {
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
  };

  return (
    <div style={containerStyles} ref={containerRef}>
      <FormControl>
        {!readOnly && (
          <Button color="blue.500" variant="solid" onClick={downloadFile}>
            Download Json
          </Button>
        )}
        <Select
          variant="outline"
          placeholder="Select your lanaguage"
          onChange={({ target }) => {
            setSelectedLang(target.value);
          }}
        >
          {languages.map((lang) => (
            <option value={lang.code}>{lang.name}</option>
          ))}
        </Select>
      </FormControl>
      <Tree
        data={tree}
        orientation={orientation}
        translate={translate}
        pathFunc={handlePath}
        scaleExtent={{ min: 1, max: 10 }}
        nodeSize={{
          x: 150,
          y: 300,
        }}
        renderCustomNodeElement={(nodeInfo) =>
          renderRectSvgNode(nodeInfo, selectedLang, handleNodeClick)
        }
        onNodeClick={handleNodeClick}
      />
      {!readOnly && (
        <NodeModal
          node={node}
          isOpen={!!node}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default AppTree;
