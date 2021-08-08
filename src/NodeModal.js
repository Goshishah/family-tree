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
import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import languages from "./data/languages.json";

const NodeModal = ({ isOpen, node, onClose, onSubmit, onDelete }) => {
  const [selectedNode, setSelectedNode] = useState(undefined);
  const [child, setChild] = useState({ name: "" });

  useEffect(() => {
    setSelectedNode(node);
  }, [node]);

  const handleGenderChange = ({ target }) => {
    setChild({ ...child, gender: target.value });
  };

  console.log("selected node...........", selectedNode);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add family member</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Select Parent language</FormLabel>
            <Select
              variant="outline"
              value={
                selectedNode && selectedNode.languageCode
                  ? selectedNode.languageCode
                  : ""
              }
              placeholder="Select your lanaguage"
              onChange={({ target }) => {
                setSelectedNode({
                  ...selectedNode,
                  languageCode: target.value,
                });
              }}
            >
              {languages.map((lang) => (
                <option value={lang.code}>{lang.name}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Parent Name</FormLabel>
            <Input
              value={
                selectedNode &&
                selectedNode.languages &&
                selectedNode.languages[selectedNode.languageCode]
                  ? selectedNode.languages[selectedNode.languageCode].name
                  : ""
              }
              onChange={(event) => {
                setSelectedNode({
                  ...selectedNode,
                  languages: {
                    ...selectedNode.languages,
                    [selectedNode.languageCode]: { name: event.target.value },
                  },
                });
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Parent Gender</FormLabel>
            <Select
              placeholder="Select gender"
              value={selectedNode && selectedNode.gender}
              disabled={selectedNode && !selectedNode.name}
              onChange={({ target }) =>
                setSelectedNode({ ...selectedNode, gender: target.value })
              }
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Select Child language</FormLabel>
            <Select
              variant="outline"
              value={child && child.languageCode ? child.languageCode : ""}
              placeholder="Select your lanaguage"
              onChange={({ target }) => {
                setChild({ ...child, languageCode: target.value });
              }}
            >
              {languages.map((lang) => (
                <option value={lang.code}>{lang.name}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Child Name</FormLabel>
            <Input
              value={child.name}
              onChange={(event) =>
                setChild({ ...child, name: event.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Child Gender</FormLabel>
            <Select
              placeholder="Select gender"
              disabled={!child.name}
              onChange={handleGenderChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            color="red.500"
            mr={3}
            variant="solid"
            onClick={() => {
              onDelete(selectedNode);
            }}
            disabled={!selectedNode}
          >
            Delete
          </Button>
          <Button
            color="blue.500"
            variant="solid"
            onClick={() => {
              onSubmit(selectedNode, child);
              setChild({ name: "" });
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
