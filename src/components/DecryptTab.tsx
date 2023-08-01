// DecryptTab.tsx
import React, { useState, ChangeEvent } from "react";
import { Text, Input, Box, Checkbox, Button, useToast } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import encryptionKey from "../utilities/secret";
import { useClipboard } from "@chakra-ui/react";

interface DecryptTabProps {
  encryptedText: string;
  setEncryptedText: (text: string) => void;
  decryptedOutput: string;
  setDecryptedOutput: (output: string) => void;
  handleDecryptText: (text: string, output: string) => void;
  customKeyDecrypt: string; // Add customKeyDecrypt prop
  setCustomKeyDecrypt: (key: string) => void; // Add setCustomKeyDecrypt prop
}

const DecryptTab: React.FC<DecryptTabProps> = ({
  encryptedText,
  setEncryptedText,
  decryptedOutput,
  setDecryptedOutput,
  handleDecryptText,
  customKeyDecrypt,
  setCustomKeyDecrypt,
}) => {
  const [useCustomKey, setUseCustomKey] = useState(false);
  const toast = useToast();
  const { onCopy } = useClipboard(decryptedOutput);

  const handleEncryptedTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEncryptedText(event.target.value);
  };

  const handleCustomKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomKeyDecrypt(event.target.value);
  };

  const handleDecrypt = () => {
    let key = encryptionKey; // Default key
    if (useCustomKey) {
      if (customKeyDecrypt.length < 5) {
        toast({
          title: "Invalid key length!",
          description: "Custom key must be at least 5 characters long.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return;
      }
      key = customKeyDecrypt;
    }

    const decryptedText = decryptText(encryptedText, key);
    setDecryptedOutput(decryptedText);
    handleDecryptText(encryptedText, decryptedText);
  };

  const decryptText = (text: string, key: string): string => {
    const decodedText = atob(text); // Decode the Base64 encoded text
    let decryptedText = "";
    for (let i = 0; i < decodedText.length; i++) {
      const charCode =
        decodedText.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      decryptedText += String.fromCharCode(charCode);
    }
    return decryptedText;
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
        <Text textAlign={"left"}>Enter the encrypted text to decrypt:</Text>
        <Input
          placeholder="Paste the encrypted text here..."
          value={encryptedText}
          onChange={handleEncryptedTextChange}
          my={"10px"}
        />
        <Box display={"flex"} justifyContent={"left"}>
          <Checkbox onChange={() => setUseCustomKey(!useCustomKey)}>
            Decrypt with a custom security key
          </Checkbox>
        </Box>

        {useCustomKey && (
          <Input
            placeholder="Enter your security key here"
            mt={2}
            value={customKeyDecrypt}
            onChange={handleCustomKeyChange}
          />
        )}

        <Button
          display={"flex"}
          justifyContent={"left"}
          onClick={handleDecrypt}
          backgroundColor={"#66FCF1"}
          my={"20px"}
        >
          Decrypt
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
          <Box>{decryptedOutput}</Box>
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

export default DecryptTab;
