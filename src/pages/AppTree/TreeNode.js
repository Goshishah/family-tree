import React, { useEffect, useRef, useState } from "react";
import { findDOMNode } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import * as d3 from "d3";
import "./tree-node.scss";
import { isSuperAdmin } from "../../utils/helpers";
import { updateNodeTextAction } from "../../redux/treeReducer";

const SVGText = (props) => {
  const { role } = useSelector((state) => state.user);
  const { readOnly } = useSelector((state) => state.general);

  const { id, x, y, nodeDatum, item, selectedLang, ...rest } = props;
  const textRef = useRef(null);

  const dispatch = useDispatch();
  const setNodeValue = (translateX, translateY) => {
    console.log("setNodeValue", nodeDatum);
    dispatch(
      updateNodeTextAction({
        ...nodeDatum,
        languages: {
          ...nodeDatum.languages,
          [selectedLang]: {
            ...nodeDatum.languages[selectedLang],
            [item]: {
              ...nodeDatum.languages[selectedLang][item],
              x: translateX,
              y: translateY,
            },
          },
        },
      })
    );
  };

  const makeDraggable = (readOnly) => {
    let translateX = props.x;
    let translateY = props.y;
    const handleDrag = d3
      .drag()
      .subject(function () {
        return { x: translateX, y: translateY };
      })
      .on("drag", function (event) {
        if (isSuperAdmin(role) && !readOnly) {
          const me = d3.select(textRef.current);
          const transform = `translate(${event.x}, ${event.y})`;
          translateX = event.x;
          translateY = event.y;
          setNodeValue(translateX, translateY);
          me.attr("transform", transform);
        }
      });

    const node = findDOMNode(textRef.current);
    handleDrag(d3.select(node));
  };

  useEffect(() => {
    makeDraggable(readOnly);
  }, [readOnly, nodeDatum]);

  return (
    <text
      ref={textRef}
      transform={`translate(${x}, ${y})`}
      {...rest}
      className={!readOnly && isSuperAdmin(role) ? "highlighter" : ""}
    >
      {props.children}
    </text>
  );
};

const TreeNode = ({ nodeDatum }) => {
  const { selectedLang } = useSelector((state) => state.general);
  const getTreeNode = () => {
    return nodeDatum.languages[selectedLang]
      ? nodeDatum.languages[selectedLang]
      : {
          surname: { title: "" },
          firstname: { title: "" },
          middlename: { title: "" },
          lastname: { title: "" },
          laqab: { title: "" },
        };
  };

  const getNameParts = () => {
    return Object.keys(getTreeNode()).map((item) => {
      return (
        <SVGText
          key={item}
          id={nodeDatum.attributes.id}
          selectedLang={selectedLang}
          item={item}
          nodeDatum={nodeDatum}
          {...getTreeNode()[item]}
        >
          {getTreeNode()[item].title}
        </SVGText>
      );
    });
  };
  return (
    <>
      <path
        d="M211 169c-2 4-11 5-14 9-2 3-1 12-4 15s-12 2-15 4c-4 3-5 12-9 14-3 2-12-1-15 0-4 2-8 10-12 11s-11-4-15-4c-4 1-10 8-14 8s-10-7-14-8c-4 0-11 5-15 4s-8-9-12-11c-3-1-12 2-16 0-3-2-5-11-8-14-3-2-12-1-15-4s-2-12-4-15c-3-4-12-5-14-9-2-3 1-12 0-15-2-4-10-8-11-12s4-11 4-15c-1-4-8-10-8-14s7-10 8-14c0-4-5-11-4-15s9-8 11-12c1-3-2-12 0-16 2-3 11-5 14-8 2-3 1-12 4-15s12-2 15-4c3-3 5-12 8-14 4-2 13 1 16 0 4-2 8-10 12-11s11 4 15 4c4-1 10-8 14-8s10 7 14 8c4 0 11-5 15-4s8 9 12 11c3 1 12-2 15 0 4 2 5 11 9 14 3 2 12 1 15 4s2 12 4 15c3 3 12 5 14 8 2 4-1 13 0 16 2 4 10 8 11 12s-4 11-4 15c1 4 8 10 8 14s-7 10-8 14c0 4 5 11 4 15s-9 8-11 12c-1 3 2 12 0 15z"
        fill="#1a1a1a"
      />
      <path
        d="M164 201h-5l-3 4-5-1-3 5-5-2-3 4-5-2-4 4-5-2-4 4-5-3-4 3-4-3-5 3-4-4-5 2-4-4-5 2-3-4-5 2-3-5-6 1-2-4h-6l-2-5h-5l-2-5h-5l-2-5-5-1-1-6-5-1v-5l-5-2v-5l-5-3v-5l-4-3 1-5-5-3 2-5-5-3 2-5-3-4 2-5-4-4 3-5-3-4 3-4-3-5 4-4-2-5 3-4-2-5 5-3-2-5 5-3-1-6 4-2v-6l5-2v-5l5-2v-5l5-2 1-5 5-1 2-5h5l2-5h5l2-5h6l2-4 6 1 3-5 5 2 3-4 5 1 4-3 5 2 4-4 5 3 4-3 4 3 5-3 4 4 5-2 4 3 5-1 3 4 5-2 3 5 5-1 3 4h5l3 5h5l2 5h5l1 5 6 1 1 5 5 2v5l5 2v5l5 2v6l4 2-1 6 5 3-2 5 4 3-2 5 4 4-2 5 4 4-3 5 3 4-3 4 3 5-4 4 2 5-4 4 2 5-4 3 2 5-5 3 1 5-4 3v5l-5 3v5l-5 2v5l-5 1-1 6-6 1-1 5h-5l-2 5h-5z"
        fill="#fff"
      />
      <path
        d="M211 112a98 98 0 11-196 0 98 98 0 01196 0z"
        strokeLinejoin="round"
        stroke="#000"
        fill="#000"
        strokeWidth="1.3793"
      />
      <path
        d="M208 112a95 95 0 11-190 0 95 95 0 01190 0z"
        stroke="#000"
        fill="#000"
      />
      <path
        d="M203 112a90 90 0 11-180 0 90 90 0 01180 0z"
        strokeLinejoin="round"
        stroke={nodeDatum.children.length > 0 ? "#e3b306" : "#fff"}
        strokeDasharray="4.9310344,4.9310344"
        strokeWidth="6.201440000000001"
      />
      <path
        d="M197 112a84 84 0 11-168 0 84 84 0 01168 0z"
        strokeLinejoin="round"
        stroke={nodeDatum.children.length > 0 ? "#e3b306" : "#fff"}
        strokeWidth="2.61382"
      />
      <path
        d="M190 112a77 77 0 11-154 0 77 77 0 01154 0z"
        strokeLinejoin="round"
        strokeDasharray="1.14678731,1.14678731"
        strokeWidth="5.014"
        fill={nodeDatum.children.length > 0 ? "#e3b306" : "#fff"}
        stroke={nodeDatum.children.length > 0 ? "#e3b306" : "#fff"}
      />
      {getNameParts()}
    </>
  );
};

export default TreeNode;
