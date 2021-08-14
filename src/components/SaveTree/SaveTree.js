import React from "react";
import { useSelector } from "react-redux";
import { isSuperAdmin } from "../../utils/helpers";
import floppydisk from "../../floppy-disk.svg";
import { postFullTreeApi } from "../../services/treeService";

const SaveTree = () => {
  const { user, tree } = useSelector(({ user, tree }) => ({ user, tree }));

  const handleClick = () => {
    console.log(tree);
    postFullTreeApi({ tree })
      .then((response) => {
        console.log("response", response);
      })
      .catch((err) => {});
  };

  if (!isSuperAdmin(user.role)) return null;
  return (
    <img
      width="25"
      height="25"
      style={{ cursor: "pointer", margin: "0 5px" }}
      src={floppydisk}
      alt={"floppydisk"}
      onClick={handleClick}
    />
  );
};

export default SaveTree;
