// Body.tsx
import { useState } from "react";
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import EncryptTab from "./EncryptTab";
import DecryptTab from "./DecryptTab";
import { Nav } from "./Nav";

const Body = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
    // Clear input and output text when changing tabs
    setInputText("");
    setEncryptedOutput("");
    setEncryptedText("");
    setDecryptedOutput("");
    setCustomKey(""); // Clear custom key when changing tabs in EncryptTab
  };

  // State for EncryptTab
  const [inputText, setInputText] = useState("");
  const [encryptedOutput, setEncryptedOutput] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [customKey, setCustomKey] = useState(""); // Add state for custom key

  const handleEncryptText = (text: string, output: string) => {
    setInputText(text);
    setEncryptedOutput(output);
    setEncryptedText(""); // Clear encryptedText when navigating from EncryptTab
  };

  // State for DecryptTab
  const [decryptedOutput, setDecryptedOutput] = useState("");
  const [customKeyDecrypt, setCustomKeyDecrypt] = useState(""); // Add state for custom key in DecryptTab

  const handleDecryptText = (text: string, output: string) => {
    setEncryptedText(text);
    setDecryptedOutput(output);
    setInputText(""); // Clear inputText when navigating from DecryptTab
  };

  return (
    <Box maxW={"1000px"} w="100vw" mx={"auto"}>
      <Nav />
      <Tabs
        isFitted
        variant="enclosed"
        onChange={(index) => handleTabChange(index)}
        index={selectedTab}
        borderColor={"#66FCF1"}
      >
        <TabList>
          <Tab>Encrypt</Tab>
          <Tab>Decrypt</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <EncryptTab
              inputText={inputText}
              setInputText={setInputText}
              encryptedOutput={encryptedOutput}
              setEncryptedOutput={setEncryptedOutput}
              encryptedText={encryptedText}
              handleEncryptText={handleEncryptText}
              customKey={customKey} // Pass customKey to EncryptTab
              setCustomKey={setCustomKey} // Pass setCustomKey to EncryptTab
            />
          </TabPanel>
          <TabPanel>
            <DecryptTab
              encryptedText={encryptedText}
              setEncryptedText={setEncryptedText}
              decryptedOutput={decryptedOutput}
              setDecryptedOutput={setDecryptedOutput}
              handleDecryptText={handleDecryptText}
              customKeyDecrypt={customKeyDecrypt} // Pass customKeyDecrypt to DecryptTab
              setCustomKeyDecrypt={setCustomKeyDecrypt} // Pass setCustomKeyDecrypt to DecryptTab
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Body;
