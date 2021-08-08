import React from "react";
import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

const DownloadAs = ({ treeRef }) => {
  const handleDownloadAsPdf = () => {
    console.log(treeRef.current);
  };

  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          rounded={"full"}
          variant={"link"}
          cursor={"pointer"}
          minW={0}
        >
          Download
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleDownloadAsPdf}>Download As Pdf</MenuItem>
          <MenuItem>Download As Image</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default DownloadAs;
