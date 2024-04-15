import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Checkbox,
  VStack,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Settings } from "lucide-react";
import { SettingsData } from "../../types";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  settings: SettingsData;
  setSettings: React.Dispatch<React.SetStateAction<SettingsData>>;
}

const SettingsModal = ({
  setSettings,
  settings,
  isOpen,
  onOpen,
  onClose,
}: Props) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: checked,
    }));
  };

  const handleSaveSettings = () => {
    localStorage.setItem("passwordSettings", JSON.stringify(settings));
    onClose();
    window.location.reload();
  };

  return (
    <>
      <Settings size={35} onClick={onOpen} cursor="pointer" />
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack alignItems="start">
              <Checkbox
                name="uppercase"
                isChecked={settings.uppercase}
                onChange={handleCheckboxChange}
              >
                At least 1 uppercase
              </Checkbox>
              <Checkbox
                name="lowercase"
                isChecked={settings.lowercase}
                onChange={handleCheckboxChange}
              >
                At least 1 lowercase
              </Checkbox>
              <Checkbox
                name="figure"
                isChecked={settings.figure}
                onChange={handleCheckboxChange}
              >
                At least 1 figure
              </Checkbox>
              <Checkbox
                name="specialCharacter"
                isChecked={settings.specialCharacter}
                onChange={handleCheckboxChange}
              >
                At least 1 special character - !@#$%^&*()
              </Checkbox>
              <Checkbox
                name="minLength"
                isChecked={settings.minLength}
                onChange={handleCheckboxChange}
              >
                At least 8 characters long
              </Checkbox>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveSettings}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SettingsModal;
