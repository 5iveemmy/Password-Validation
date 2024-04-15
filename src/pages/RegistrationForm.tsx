import { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Flex,
  VStack,
  Box,
  useDisclosure,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import SettingsModal from "../components/modals/SettingsModal";
import { SettingsData } from "../types";
import * as Yup from "yup";
import { getPasswordStrength, isObjEmpty } from "../utils/helpers";
import { Eye, EyeOff } from "lucide-react";
import { useFormik } from "formik";

interface FormValue {
  email: string;
  password: string;
}

const RegistrationForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [strength, setStrength] = useState("");
  const [isSettingsEmpty, setIsSettingEmpty] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const [settings, setSettings] = useState<SettingsData>({
    uppercase: false,
    lowercase: false,
    figure: false,
    specialCharacter: false,
    minLength: false,
  });

  const validationSchema = () => {
    return Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .nullable()
        .when([], (password, schema) => {
          if (settings.uppercase) {
            schema = schema.matches(
              /[A-Z]/,
              "Must contain at least one uppercase letter"
            );
          }
          if (settings.lowercase) {
            schema = schema.matches(
              /[a-z]/,
              "Must contain at least one lowercase letter"
            );
          }
          if (settings.figure) {
            schema = schema.matches(/[0-9]/, "Must contain at least one digit");
          }
          if (settings.specialCharacter) {
            schema = schema.matches(
              /[!@#$%^&*()]/,
              "Must contain at least one special character"
            );
          }
          if (settings.minLength) {
            schema = schema.min(8, "Must be at least 8 characters long");
          }
          return schema;
        }),
    });
  };

  useEffect(() => {
    const savedSettings = JSON.parse(
      localStorage.getItem("passwordSettings") || "{}"
    );

    setIsSettingEmpty(isObjEmpty(savedSettings));

    if (isObjEmpty(savedSettings)) {
      onOpen();
    } else {
      setSettings(savedSettings);
    }

    const areAllFieldsFalse = Object.values(savedSettings).every(
      (value) => value === false
    );
    if (areAllFieldsFalse) {
      localStorage.removeItem("passwordSettings");
    }
  }, [onOpen]);

  const submitForm = (values: FormValue) => {
    const strength = getPasswordStrength(values.password);
    setStrength(strength);
  };

  const { values, handleChange, handleSubmit, errors, isValid, dirty } =
    useFormik<FormValue>({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: validationSchema(),
      onSubmit: (values) => {
        submitForm(values);
      },
    });

  return (
    <Flex
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      h="100vh"
    >
      <Box pb="16">
        <SettingsModal
          setSettings={setSettings}
          settings={settings}
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
        />
      </Box>
      <form onSubmit={handleSubmit}>
        <VStack gap="5" w="80">
          <FormControl textAlign="start" isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              onChange={handleChange}
              value={values.email}
              type="email"
              disabled={isSettingsEmpty}
              name="email"
            />
            {!!errors.email && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.email}
              </Text>
            )}
          </FormControl>
          <FormControl textAlign="start" isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                onChange={handleChange}
                name="password"
                value={values.password}
                disabled={isSettingsEmpty}
                type={showPassword ? "text" : "password"}
              />
              <InputRightElement cursor="pointer" onClick={togglePassword}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </InputRightElement>
            </InputGroup>
            {!!errors.password && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.password}
              </Text>
            )}
            {strength && (
              <Text mt={2} textAlign="left">
                Password Strength: {strength}
              </Text>
            )}
          </FormControl>
          <Button
            isDisabled={!isValid || !dirty || isSettingsEmpty}
            _hover={{
              opacity: (!isValid || !dirty) ?? "0.8",
            }}
            w="100%"
            type="submit"
          >
            Check Password Strength
          </Button>
        </VStack>
      </form>
    </Flex>
  );
};

export default RegistrationForm;
