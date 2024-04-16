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
  Text,
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

interface CheckboxValueData {
  name: string;
  label: string;
  isChecked: boolean;
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

  const checboxValues: CheckboxValueData[] = [
    {
      name: "uppercase",
      label: "At least 1 uppercase",
      isChecked: settings.uppercase,
    },
    {
      name: "lowercase",
      label: "At least 1 lowercase",
      isChecked: settings.lowercase,
    },
    {
      name: "figure",
      label: "At least 1 figure",
      isChecked: settings.figure,
    },
    {
      name: "specialCharacter",
      label: "At least 1 special character - !@#$%^&*()",
      isChecked: settings.specialCharacter,
    },
    {
      name: "minLength",
      label: "At least 8 characters long",
      isChecked: settings.minLength,
    },
  ];

  return (
    <>
      <Settings size={25} onClick={onOpen} cursor="pointer" />
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "xs", md: "md" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader pb="0" px={{ base: "4", md: "5" }}>
            Password Settings
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody px={{ base: "4", md: "5" }}>
            <Text fontSize="sm" color="gray.100" mb={4}>
              Customize the password requirements according to your preferences.
            </Text>
            <VStack alignItems="start">
              {checboxValues.map((value, index) => (
                <Checkbox
                  key={index}
                  name={value.name}
                  isChecked={value.isChecked}
                  onChange={handleCheckboxChange}
                >
                  <Text fontSize={{ base: "sm", md: "md" }}>{value.label}</Text>
                </Checkbox>
              ))}
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
