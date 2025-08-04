// chakra imports
import { Flex, Text, IconButton } from "@chakra-ui/react";
import { useColorModeValue } from "@components/ui/color-mode";
import { Avatar } from "@components/ui/avatar";
import { Tooltip } from "@components/ui/tooltip";
import { IoAddOutline } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
import { TecTrackCaseDark } from "@components/Icons/Icons";

interface ItemContentProps {
  eliminarEquipo: (id: string) => void;
  crearPreDiagnostico: (id: string) => void;
  aName: string;
  aSrc: string;
  boldInfo: string;
  info: string;
  time: string;
  id: string;
}

export function ItemContent(props: ItemContentProps) {
  const {
    eliminarEquipo,
    crearPreDiagnostico,
    ...rest
  } = props
  const navbarIcon = useColorModeValue("gray.500", "gray.200");
  const notificationColor = useColorModeValue("gray.700", "white");
  const spacing = " ";
  return (
    <Flex direction="row">
      <>
        <Avatar
          name={rest.aName}
          src={rest.aSrc}
          borderRadius="5px"
          me="16px"
          backgroundColor={"white"}
        />
      
        <Flex flexDirection="column">
          <Text fontSize="14px" mb="5px" color={notificationColor}>
            <Text fontWeight="bold" fontSize="14px" as="span">
              {rest.boldInfo}
              {spacing}
            </Text>
            {rest.info}
          </Text>
          <Flex alignItems="center">
            <TecTrackCaseDark color={navbarIcon} w="13px" h="13px" me="3px" />
            <Text fontSize="xs" lineHeight="100%" color={navbarIcon}>
              {rest.time}
            </Text>
            
          </Flex>
        </Flex>
      </>
      <Tooltip content="Quitar equipo" aria-label="Tooltip para el botón">
        <IconButton
            variant="ghost" // Transparent button for consistency
            ml="auto" // Align to the right
            onClick={() => eliminarEquipo(rest.id)}
        >
          <FaTimes />
        </IconButton>
      </Tooltip>
      <Tooltip content="Agregar pre-diagnostico" aria-label="Tooltip para el botón">
        <IconButton
            variant="ghost" // Transparent button for consistency
            ml="auto" // Align to the right
            onClick={() => crearPreDiagnostico(rest.id)}
        >
          <IoAddOutline />
        </IconButton>
      </Tooltip>
    </Flex>
    
  );
}
