import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Flex,
  VStack,
} from "@chakra-ui/react";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Flex justifyContent="center" alignItems="center" width="100%" h="100vh">
      <form onSubmit={handleSubmit}>
        <VStack gap="5" w="80">
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Text mt={2} textAlign="left">
              Password Strength:{" "}
            </Text>
          </FormControl>
          <Button w="100%" type="submit">
            Submit
          </Button>
        </VStack>
      </form>
    </Flex>
  );
};

export default RegistrationForm;
