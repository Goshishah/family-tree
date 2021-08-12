import React from "react";
import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { downlaodAsPDFApi } from "../../services/downloadService";

const DownloadAs = ({ treeRef }) => {
  const handleDownloadAsPdf = () => {
    console.log(
      "html.......",
      document.getElementsByClassName("rd3t-tree-container")[0]
    );
    // return;
    downlaodAsPDFApi({
      html: document.getElementsByClassName("rd3t-tree-container")[0].outerHTML,
    })
      .then((response) => {
        console.log("response..........", response);
        var url = window.URL.createObjectURL(response);
        var a = document.createElement("a");
        a.href = url;
        a.download = "sahjra";
        a.click();
        a.remove();
        setTimeout(() => window.URL.revokeObjectURL(url), 100);
        return;
        window.open(response, "shajra.pdf");

        var byteCharacters = atob(response);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var blob = new Blob([byteArray], { type: "application/pdf" });
        console.log(blob);
        // FileSaver.saveAs(blob, "shajra.pdf");
      })
      .catch((err) => {
        console.error("err..........", err);
      });
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
          <a href="#" download onClick={handleDownloadAsPdf}>
            Download As Pdf
          </a>
          <MenuItem onClick={handleDownloadAsPdf}>Download As Pdf</MenuItem>
          <MenuItem>Download As Image</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default DownloadAs;
