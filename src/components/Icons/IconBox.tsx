import React from "react";
import { Flex } from "@chakra-ui/react";

interface IconBoxProps {
  children: React.ReactNode;
  [key: string]: any;
}

export default function IconBox(props: IconBoxProps) {
  const { children, ...rest } = props;

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={"8px"}
      {...rest}
    >
      {children}
    </Flex>
  );
}
