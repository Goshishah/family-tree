import React from "react";
import { useSelector } from "react-redux";

const TreeNode = (props) => {
  const { nodeDatum, toggleNode, readOnly, onNodeClick } = props;
  const { selectedLang } = useSelector((state) => state.general);

  const getNodeStyleConfis = (key) => {
    const fontStyle = {
      surname: {
        ur: {
          x: "50",
          y: "32",
          fontSize: "15",
        },
        ar: {
          x: "50",
          y: "32",
          fontSize: "15",
        },
      },
      firstname: {
        ur: {
          x: "75",
          y: "45",
          fontSize: "15",
        },
        ar: {
          x: "75",
          y: "45",
          fontSize: "15",
        },
      },
      middlename: {
        ur: {
          x: "35",
          y: "70",
          fontSize: "50",
        },
        ar: {
          x: "25",
          y: "70",
          fontSize: "30",
        },
      },
      lastname: {
        ur: {
          x: "45",
          y: "60",
          fontSize: "40",
        },
        ar: {
          x: "25",
          y: "60",
          fontSize: "40",
        },
      },
      laqab: {
        ur: {
          x: "20",
          y: "40",
          fontSize: "10",
        },
        ar: {
          x: "15",
          y: "45",
          fontSize: "15",
        },
      },
    };

    return fontStyle[key][selectedLang];
  };

  const getCost = (key) => {
    return (
      <text
        x="90"
        y="50"
        fill="#000"
        stroke="#000"
        strokeWidth="0"
        fontSize="40"
        textAnchor="start"
        transform="matrix(.64759 0 0 1.05366 12.847 -1.65)"
        xmlSpace="preserve"
        {...getNodeStyleConfis(key)}
      >
        {getFullName().surname}
      </text>
    );
  };

  const getFirstname = (key) => {
    return (
      <text
        x="90"
        y="50"
        fill="#000"
        stroke="#000"
        strokeWidth="0"
        fontFamily="monospace"
        fontSize="15"
        fontStyle="normal"
        fontWeight="normal"
        textAnchor="start"
        transform="matrix(.64759 0 0 1.05366 12.847 -1.65)"
        xmlSpace="preserve"
        {...getNodeStyleConfis(key)}
      >
        {getFullName().firstname}
      </text>
    );
  };

  const getMiddlename = (key) => {
    return (
      <text
        x="29.5"
        y="57.051"
        fill="#000"
        stroke="#000"
        strokeWidth="0"
        fontFamily="monospace"
        fontSize="24"
        fontStyle="normal"
        fontWeight="normal"
        textAnchor="start"
        transform="matrix(.64759 0 0 1.05366 12.847 -1.65)"
        xmlSpace="preserve"
        {...getNodeStyleConfis(key)}
      >
        {getFullName().middlename}
      </text>
    );
  };

  const getLastname = (key) => {
    return (
      <text
        x="29.5"
        y="57.051"
        fill="#000"
        stroke="#000"
        strokeWidth="0"
        fontFamily="monospace"
        fontSize="24"
        fontStyle="normal"
        fontWeight="normal"
        textAnchor="start"
        transform="matrix(.64759 0 0 1.05366 12.847 -1.65)"
        xmlSpace="preserve"
        {...getNodeStyleConfis(key)}
      >
        {getFullName().lastname}
      </text>
    );
  };

  const getLaqab = (key) => {
    return (
      <text
        x="29.5"
        y="57.051"
        fill="#000"
        stroke="#000"
        strokeWidth="0"
        fontFamily="monospace"
        fontSize="24"
        fontStyle="normal"
        fontWeight="normal"
        textAnchor="start"
        transform="matrix(.64759 0 0 1.05366 12.847 -1.65)"
        xmlSpace="preserve"
        {...getNodeStyleConfis(key)}
      >
        {getFullName().laqab}
      </text>
    );
  };

  const getFullName = () => {
    return nodeDatum.languages[selectedLang]
      ? nodeDatum.languages[selectedLang]
      : {
          surname: "",
          firstname: "",
          middlename: "",
          lastname: "",
          laqab: "",
        };
  };

  return (
    <g onClick={readOnly ? toggleNode : () => onNodeClick(nodeDatum)}>
      <g r="15">
        <path
          fill="#1a1a1a"
          stroke="null"
          d="M94.132 73.418c-.885 1.486-4.99 2.173-6.067 3.535s-.699 5.388-1.95 6.602c-1.25 1.214-5.4.846-6.803 1.891-1.404 1.045-2.112 5.029-3.644 5.887-1.533.858-5.442-.538-7.077.119-1.634.656-3.38 4.326-5.09 4.77-1.709.445-5.112-1.886-6.867-1.662-1.754.224-4.42 3.33-6.189 3.33s-4.435-3.106-6.19-3.33c-1.753-.224-5.157 2.107-6.866 1.663-1.71-.445-3.455-4.114-5.09-4.771-1.635-.657-5.544.74-7.076-.119-1.533-.858-2.24-4.842-3.644-5.887s-5.553-.677-6.804-1.891c-1.251-1.214-.872-5.24-1.95-6.602-1.077-1.362-5.182-2.049-6.067-3.535-.884-1.487.555-5.28-.122-6.866-.677-1.586-4.46-3.28-4.917-4.939-.458-1.658 1.944-4.96 1.713-6.663C3.202 53.248 0 50.662 0 48.945s3.201-4.303 3.432-6.005c.231-1.702-2.171-5.005-1.713-6.663.458-1.658 4.24-3.352 4.917-4.938.677-1.587-.762-5.38.122-6.866.885-1.487 4.99-2.174 6.068-3.536 1.077-1.362.698-5.387 1.949-6.601 1.251-1.214 5.4-.847 6.804-1.892 1.403-1.045 2.111-5.028 3.644-5.887 1.532-.858 5.441.539 7.076-.118 1.635-.657 3.38-4.327 5.09-4.771 1.709-.445 5.113 1.886 6.867 1.662C46.01 3.106 48.676 0 50.446 0s4.434 3.106 6.188 3.33c1.755.224 5.158-2.107 6.867-1.662 1.71.444 3.456 4.114 5.09 4.77 1.635.658 5.544-.739 7.077.12 1.532.858 2.24 4.841 3.644 5.886 1.403 1.045 5.552.678 6.803 1.892 1.251 1.214.873 5.239 1.95 6.601s5.182 2.049 6.067 3.536c.885 1.486-.555 5.28.122 6.866.677 1.586 4.46 3.28 4.918 4.938.458 1.658-1.945 4.96-1.714 6.663.23 1.702 3.432 4.289 3.432 6.005s-3.201 4.303-3.432 6.005c-.231 1.703 2.171 5.005 1.714 6.663-.458 1.658-4.24 3.353-4.918 4.939-.677 1.586.763 5.38-.122 6.866h0z"
        ></path>
        <path
          fill="#fff"
          stroke="null"
          d="M73.44 87.162l-2.396-.251-1.162 2.048-2.365-.452-1.342 1.942-2.315-.651-1.511 1.821-2.247-.844-1.67 1.687-2.163-1.031-1.814 1.539-2.063-1.21-1.945 1.38-1.946-1.38-2.062 1.21-1.815-1.54-2.163 1.032-1.67-1.687-2.247.844-1.511-1.821-2.315.65-1.342-1.941-2.364.452-1.163-2.048-2.396.25-.974-2.138-2.41.047-.778-2.213-2.404-.156-.577-2.27-2.381-.36-.37-2.31-2.34-.56-.162-2.333-2.281-.755.049-2.338-2.205-.945.259-2.325-2.111-1.128.466-2.294-2.001-1.302.67-2.246-1.877-1.467.87-2.18-1.738-1.62 1.062-2.099-1.586-1.76 1.247-2.001L4.46 48.52l1.422-1.888-1.247-2.001 1.586-1.76-1.062-2.1 1.738-1.62-.87-2.18 1.877-1.466-.67-2.246 2.001-1.302-.466-2.295 2.111-1.127-.259-2.325 2.205-.945-.05-2.338 2.282-.755.161-2.334 2.34-.559.37-2.31 2.382-.36.576-2.27 2.405-.157.778-2.213 2.41.047.974-2.139 2.396.251 1.162-2.048 2.365.453 1.342-1.943 2.315.651 1.511-1.821 2.248.844 1.669-1.687 2.163 1.031L46.44 4.07 48.5 5.28l1.946-1.38 1.945 1.38 2.063-1.21 1.814 1.54 2.163-1.032 1.67 1.687 2.247-.844L63.86 7.24l2.315-.65 1.342 1.942 2.365-.453 1.162 2.048 2.396-.25.974 2.138 2.41-.047.778 2.213 2.405.157.576 2.27 2.382.36.37 2.31 2.34.56.162 2.332 2.28.756-.048 2.337 2.204.946-.258 2.324 2.11 1.128-.466 2.294 2.002 1.303-.67 2.246 1.876 1.466-.87 2.18 1.739 1.62-1.063 2.1 1.586 1.76-1.247 2 1.422 1.889-1.422 1.888 1.247 2-1.586 1.761 1.063 2.099-1.739 1.62.87 2.18-1.877 1.467.671 2.246-2.002 1.302.467 2.294-2.111 1.128.258 2.325-2.204.945.049 2.338-2.281.755-.162 2.333-2.34.56-.37 2.31-2.382.36-.576 2.27-2.405.156-.778 2.213-2.41-.047-.974 2.139z"
        ></path>
        <path
          fill="#f9f9f9"
          stroke="#000"
          strokeLinejoin="round"
          d="M94.183 48.522c0 23.438-19.583 42.439-43.74 42.439s-43.739-19-43.739-42.44S26.287 6.084 50.444 6.084s43.74 19 43.74 42.439z"
        ></path>
        <path
          fill="#000"
          stroke="null"
          d="M92.696 48.518c0 22.64-18.916 40.993-42.25 40.993S8.199 71.158 8.199 48.518 27.113 7.525 50.447 7.525s42.249 18.353 42.249 40.993z"
        ></path>
        <path
          fill="#000"
          stroke={nodeDatum.children.length > 0 ? "#e3b306" : "#fff"}
          strokeDasharray="4.9310344,4.9310344"
          strokeLinejoin="round"
          strokeWidth="4.931"
          d="M90.576 48.517c0 21.506-17.968 38.94-40.133 38.94s-40.134-17.434-40.134-38.94 17.968-38.94 40.134-38.94 40.133 17.434 40.133 38.94z"
        ></path>
        <path
          fill="#000"
          stroke={nodeDatum.children.length > 0 ? "#e3b306" : "#fff"}
          strokeLinejoin="round"
          strokeWidth="2.178"
          d="M88.122 48.52c0 20.19-16.868 36.556-37.676 36.556S12.77 68.71 12.77 48.52s16.868-36.555 37.676-36.555S88.122 28.33 88.122 48.52z"
        ></path>
        <path
          fill={nodeDatum.children.length > 0 ? "#e3b306" : "#fff"}
          stroke={nodeDatum.children.length > 0 ? "#e3b306" : "#fff"}
          strokeDasharray="1.14678731,1.14678731"
          strokeLinejoin="round"
          strokeWidth="4.587"
          d="M85.011 48.522c0 18.522-15.475 33.537-34.565 33.537S15.881 67.044 15.881 48.522s15.475-33.538 34.565-33.538 34.565 15.015 34.565 33.538z"
        ></path>
      </g>
      {getCost("surname")}
      {getFirstname("firstname")}
      {getMiddlename("middlename")}
      {getLastname("lastname")}
      {getLaqab("laqab")}
    </g>
  );
};

export default TreeNode;
