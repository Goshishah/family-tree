import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tree from "react-d3-tree";
import NodeModal from "./NodeModal";
import { useCenteredTree } from "../../helpers";
import {
  deleteTreeApi,
  getTreeApi,
  postTreeApi,
} from "../../services/treeService";
import TreeNode from "./TreeNode";
import AppHeader from "../../components/AppHeader/AppHeader";
import AppLoader from "../../components/AppLoader/AppLoader";
import "./app-tree.scss";
import { setTreeAction } from "../../redux/treeReducer";

const AppTree = ({ readOnly = true }) => {
  const tree = useSelector((state) => state.tree);
  const treeRef = useRef(null);
  const [translate, containerRef] = useCenteredTree();
  const [node, setNode] = useState();
  const [orientation, setOrientation] = useState("vertical");

  const dispatch = useDispatch();

  const handleClose = () => setNode(undefined);
  const handleNodeClick = (datum) => {
    setNode(datum);
  };

  useEffect(() => {
    getTreeApi().then((response) => {
      const { success, data } = response;
      if (success) {
        dispatch(setTreeAction(data));
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
      <g
        onClick={
          readOnly
            ? customProps.toggleNode
            : () => onNodeClick(customProps.nodeDatum)
        }
      >
        <TreeNode key={customProps.nodeDatum.id} {...customProps} />
      </g>
    );
  };

  const handleSubmit = (node, child) => {
    postTreeApi({ node, child }).then((response) => {
      const { success, data } = response;
      if (success) {
        dispatch(setTreeAction(data));
      }
    });
    setNode(undefined);
  };

  const handleDelete = (node) => {
    deleteTreeApi({ node }).then((response) => {
      const { success, data } = response;
      if (success) {
        dispatch(setTreeAction(data));
        setNode(undefined);
      } else {
        setNode(undefined);
      }
    });
  };

  const handlePath = (linkData, orientation) => {
    const { source, target } = linkData;
    const sX = source.x + 120;
    const sY = source.y + 180;
    const tX = target.x + 120;
    const tY = target.y + 180;

    if (Math.abs(sX - tX) > Math.abs(sY - tY)) {
      const midX = (tX + sX) / 2;
      return `M ${sX},${sY} C ${midX},${sY} ${midX},${tY} ${tX},${tY}`;
    } else {
      const midY = (tY + sY) / 2;
      return `M ${sX},${sY} C ${sX},${midY} ${tX},${midY} ${tX},${tY}`;
    }
  };

  return (
    <div className="app-tree" ref={containerRef}>
      <AppHeader onTreeJsonDownload={downloadFile} treeRef={treeRef} />
      {tree ? (
        <Tree
          data-id="tree"
          svgClassName="family-tree"
          rootNodeClassName="root-node"
          branchNodeClassName="branch-node"
          leafNodeClassName="leaf-node"
          ref={treeRef}
          data={tree}
          orientation={orientation}
          translate={translate}
          pathFunc={handlePath}
          scaleExtent={{ min: 0.1, max: 10 }}
          nodeSize={{
            x: 300,
            y: 500,
          }}
          renderCustomNodeElement={(nodeInfo) =>
            renderRectSvgNode(nodeInfo, handleNodeClick)
          }
          onNodeClick={handleNodeClick}
        />
      ) : (
        <AppLoader />
      )}
      {tree && !readOnly && (
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
