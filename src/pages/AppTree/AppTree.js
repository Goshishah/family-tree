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
import { isSuperAdmin } from "../../utils/helpers";

const EditNode = ({ readOnly, onClick }) => {
  const { role } = useSelector((state) => state.user);

  return (
    isSuperAdmin(role) &&
    !readOnly && (
      <foreignObject
        className={isSuperAdmin(role) ? "edit-icon" : ""}
        x="180"
        y="10"
        width="19"
        height="19"
        onClick={onClick}
      >
        <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
          <path d="m370.589844 250.972656c-5.523438 0-10 4.476563-10 10v88.789063c-.019532 16.5625-13.4375 29.984375-30 30h-280.589844c-16.5625-.015625-29.980469-13.4375-30-30v-260.589844c.019531-16.558594 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.519531-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.59375c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.792969c0-5.523437-4.476563-10-10-10zm0 0" />
          <path d="m376.628906 13.441406c-17.574218-17.574218-46.066406-17.574218-63.640625 0l-178.40625 178.40625c-1.222656 1.222656-2.105469 2.738282-2.566406 4.402344l-23.460937 84.699219c-.964844 3.472656.015624 7.191406 2.5625 9.742187 2.550781 2.546875 6.269531 3.527344 9.742187 2.566406l84.699219-23.464843c1.664062-.460938 3.179687-1.34375 4.402344-2.566407l178.402343-178.410156c17.546875-17.585937 17.546875-46.054687 0-63.640625zm-220.257812 184.90625 146.011718-146.015625 47.089844 47.089844-146.015625 146.015625zm-9.40625 18.875 37.621094 37.625-52.039063 14.417969zm227.257812-142.546875-10.605468 10.605469-47.09375-47.09375 10.609374-10.605469c9.761719-9.761719 25.589844-9.761719 35.351563 0l11.738281 11.734375c9.746094 9.773438 9.746094 25.589844 0 35.359375zm0 0" />
        </svg>
      </foreignObject>
    )
  );
};

const AppTree = () => {
  const { role } = useSelector((state) => state.user);
  const { readOnly } = useSelector((state) => state.general);

  const tree = useSelector((state) => state.tree);
  const treeRef = useRef(null);
  const [translate, containerRef] = useCenteredTree();
  const [node, setNode] = useState(null);
  const [open, setOpen] = useState(false);

  const [orientation, setOrientation] = useState("vertical");

  const dispatch = useDispatch();

  const handleClose = () => setOpen(false);
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
      <g onClick={customProps.toggleNode}>
        <EditNode
          readOnly={readOnly}
          onClick={() => {
            onNodeClick(customProps.nodeDatum);
            setOpen(true);
          }}
        />
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
        setOpen(false);
      } else {
        setOpen(false);
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
          isOpen={open}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default AppTree;
