import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegistrationForm from "./pages/RegistrationForm";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
