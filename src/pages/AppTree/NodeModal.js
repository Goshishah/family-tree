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
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Spacer,
} from "@chakra-ui/react";
import languages from "../../data/languages.json";

const FormInput = ({ keyName, selectedNode, setSelectedNode }) => {
  const getValue = () => {
    return selectedNode &&
      selectedNode.languages &&
      selectedNode.languages[selectedNode.languageCode] &&
      selectedNode.languages[selectedNode.languageCode][keyName]
      ? selectedNode.languages[selectedNode.languageCode][keyName].title
      : "";
  };
  return (
    <Input
      value={getValue()}
      onChange={(event) => {
        setSelectedNode({
          ...selectedNode,
          languages: {
            ...selectedNode.languages,
            [selectedNode.languageCode]: {
              ...selectedNode.languages[selectedNode.languageCode],
              [keyName]: event.target.value,
            },
          },
        });
      }}
    />
  );
};

const NodeModal = ({ isOpen, node, onClose, onSubmit, onDelete }) => {
  const [selectedNode, setSelectedNode] = useState(undefined);
  const [child, setChild] = useState({
    middlename: { title: "" },
    languageCode: "ur",
  });

  useEffect(() => {
    setSelectedNode(node);
  }, [node]);

  const handleGenderChange = ({ target }) => {
    setChild({ ...child, gender: target.value });
  };

  return (
    <Modal isOpen={isOpen} size="full" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add family member</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column">
            <Flex>
              <FormControl>
                <FormLabel>Select language</FormLabel>
                <Select
                  variant="outline"
                  value={
                    selectedNode && selectedNode.languageCode
                      ? selectedNode.languageCode
                      : "ur"
                  }
                  placeholder="Select lanaguage"
                  onChange={({ target }) => {
                    setSelectedNode({
                      ...selectedNode,
                      languageCode: target.value,
                    });
                  }}
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Surname</FormLabel>
                <FormInput
                  keyName="surname"
                  selectedNode={selectedNode}
                  setSelectedNode={setSelectedNode}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Firstname</FormLabel>
                <FormInput
                  keyName="firstname"
                  selectedNode={selectedNode}
                  setSelectedNode={setSelectedNode}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Middlename</FormLabel>
                <FormInput
                  keyName="middlename"
                  selectedNode={selectedNode}
                  setSelectedNode={setSelectedNode}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Lastname</FormLabel>
                <FormInput
                  keyName="lastname"
                  selectedNode={selectedNode}
                  setSelectedNode={setSelectedNode}
                />
              </FormControl>
              <FormControl>
                <FormLabel>laqab</FormLabel>
                <FormInput
                  keyName="laqab"
                  selectedNode={selectedNode}
                  setSelectedNode={setSelectedNode}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <Select
                  placeholder="Select gender"
                  value={selectedNode && selectedNode.gender}
                  disabled={
                    selectedNode &&
                    selectedNode.languages[selectedNode.languageCode] &&
                    !selectedNode.languages[selectedNode.languageCode]
                      .middlename
                  }
                  onChange={({ target }) =>
                    setSelectedNode({ ...selectedNode, gender: target.value })
                  }
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Select>
              </FormControl>
            </Flex>
            <Spacer />
            <Flex>
              <FormControl>
                <FormLabel>Select language</FormLabel>
                <Select
                  variant="outline"
                  value={child && child.languageCode}
                  placeholder="Select your lanaguage"
                  onChange={({ target }) => {
                    setChild({ ...child, languageCode: target.value });
                  }}
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Surname</FormLabel>
                <Input
                  value={child.surname ? child.surname.title : ""}
                  onChange={(event) =>
                    setChild({ ...child, surname: event.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Firstname</FormLabel>
                <Input
                  value={child.firstname ? child.firstname.title : ""}
                  onChange={(event) =>
                    setChild({ ...child, firstname: event.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Middlename</FormLabel>
                <Input
                  value={child.middlename ? child.middlename.title : ""}
                  onChange={(event) =>
                    setChild({ ...child, middlename: event.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Lastname</FormLabel>
                <Input
                  value={child.lastname ? child.lastname.title : ""}
                  onChange={(event) =>
                    setChild({ ...child, lastname: event.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Laqab</FormLabel>
                <Input
                  value={child.laqab ? child.laqab.title : ""}
                  onChange={(event) =>
                    setChild({ ...child, laqab: event.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <Select
                  placeholder="Select gender"
                  disabled={!child.middlename}
                  onChange={handleGenderChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Select>
              </FormControl>
            </Flex>
          </Flex>
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
              console.log("child", child);
              // return;
              onSubmit(selectedNode, child);
              onClose();
              // setChild({
              //   middlename: { title: "" },
              //   languageCode: "ur",
              // });
            }}
            disabled={
              selectedNode &&
              selectedNode.languages[selectedNode.languageCode] &&
              !selectedNode.languages[selectedNode.languageCode].middlename
            }
          >
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NodeModal;
