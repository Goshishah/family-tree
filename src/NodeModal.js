import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

const NodeModal = ({ isOpen, node, onClose, onSubmit }) => {
  const [selectedNode, setSelectedNode] = useState(undefined);
  const [child, setChild] = useState("");

  useEffect(() => {
    setSelectedNode(node);
  }, [node]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add family member</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              value={selectedNode && selectedNode.name}
              onChange={(event) => {
                setSelectedNode({
                  ...selectedNode,
                  name: event.target.value,
                });
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Child Name</FormLabel>
            <Input
              value={child}
              onChange={(event) => setChild(event.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            color="blue.500"
            variant="solid"
            onClick={() => {
              onSubmit(selectedNode, child);
              setChild("");
            }}
            disabled={!selectedNode}
          >
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NodeModal;
