// chakra imports
import { Flex, Text } from "@chakra-ui/react";

import { useColorModeValue } from "@components/ui/color-mode";
import { Button } from "@components/ui/button";

// iconos
import {TecTrackCaseDark } from "@components/Icons/Icons";
import { CiLogout } from "react-icons/ci";

interface LoginItemContentProps {
    handleLogout: () => void;
    boldInfo: string;
    info: string;
    time: string;
    type: string;
}

export function LoginItemContent(props: LoginItemContentProps) {
  const {handleLogout,...rest} = props
  const navbarIcon = useColorModeValue("gray.500", "gray.200");
  const notificationColor = useColorModeValue("gray.700", "white");
  const spacing = " ";
  return (
    <Flex direction="row">
      { rest.type == "buttom" ? (
         <Button colorScheme='teal' variant='solid' onClick={handleLogout}>
            <CiLogout />
          LogOut
        </Button>
      ):(
        <Flex flexDirection="column">
          <Text fontSize="14px" mb="5px" color={notificationColor}>
            <Text fontWeight="bold" fontSize="14px" as="span">
              {props.boldInfo}
              {spacing}
            </Text>
            {props.info}
          </Text>
          <Flex alignItems="center">
            <TecTrackCaseDark color={navbarIcon} w="13px" h="13px" me="3px" />
            <Text fontSize="xs" lineHeight="100%" color={navbarIcon}>
              {props.time}
            </Text>
            
          </Flex>
        </Flex>
      )}
    </Flex>
    
  );
}
