// EncryptTab.tsx
import React, { useState, ChangeEvent } from "react";
import {
  Text,
  Input,
  Box,
  Checkbox,
  Button,
  useToast,
  useClipboard,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import encryptionKey from "../utilities/secret";

interface EncryptTabProps {
  inputText: string;
  setInputText: (text: string) => void;
  encryptedOutput: string;
  setEncryptedOutput: (output: string) => void;
  encryptedText: string;
  handleEncryptText: (text: string, output: string) => void;
  customKey: string; // Add customKey prop
  setCustomKey: (key: string) => void; // Add setCustomKey prop
}

const EncryptTab: React.FC<EncryptTabProps> = ({
  inputText,
  setInputText,
  encryptedOutput,
  setEncryptedOutput,
  encryptedText,
  handleEncryptText,
  customKey,
  setCustomKey,
}) => {
  const [useCustomKey, setUseCustomKey] = useState(false);
  const toast = useToast();
  const { hasCopied, onCopy } = useClipboard(encryptedOutput);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleCustomKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomKey(event.target.value);
  };

  const handleEncrypt = () => {
    let key = encryptionKey; // Default key
    if (useCustomKey) {
      if (customKey.length < 5) {
        toast({
          title: "Invalid key length!",
          description: "Custom key must be at least 5 characters long.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return;
      }
      key = customKey;
    }

    const encryptedText = encryptText(inputText, key);
    setEncryptedOutput(encryptedText);
    handleEncryptText(inputText, encryptedText);
  };

  const encryptText = (text: string, key: string): string => {
    let encryptedText = "";
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      encryptedText += String.fromCharCode(charCode);
    }
    return btoa(encryptedText); // Base64 encode the encrypted text
  };

  const handleCopyToClipboard = () => {
    onCopy(); // Use onCopy function from useClipboard
    toast({
      title: "Copied to clipboard!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <>
      <Box px={"20px"}>
        <Text textAlign={"left"}>Enter any text to encrypt:</Text>
        <Input
          placeholder="Type or paste your text here..."
          value={inputText}
          onChange={handleInputChange}
          my={"10px"}
        />
        <Box display={"flex"} justifyContent={"left"}>
          <Checkbox onChange={() => setUseCustomKey(!useCustomKey)}>
            Encrypt with a custom security key
          </Checkbox>
        </Box>

        {useCustomKey && (
          <Input
            placeholder="Enter your security key here (DO NOT LOSE YOUR KEY!!)"
            mt={2}
            value={customKey}
            onChange={handleCustomKeyChange}
          />
        )}

        <Button
          display={"flex"}
          justifyContent={"left"}
          onClick={handleEncrypt}
          backgroundColor={"#66FCF1"}
          my={"20px"}
        >
          Encrypt
        </Button>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          borderRadius={"5px"}
          padding={"15px"}
          my={"5px"}
          backgroundColor={"#45A29E"}
          color={"#0B0C10"}
        >
          <Box className="encryptedOutput">{encryptedOutput}</Box>
          <CopyIcon
            ml={"auto"}
            onClick={handleCopyToClipboard}
            cursor="pointer"
          />
        </Box>
      </Box>
    </>
  );
};

export default EncryptTab;
