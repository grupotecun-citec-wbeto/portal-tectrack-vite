// @ts-nocheck
import React from "react";
import {
  Flex,
  Text,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import Card from "@dashboard/components/Card/Card.jsx";
import CardBody from "@dashboard/components/Card/CardBody.jsx";
import CardHeader from "@dashboard/components/Card/CardHeader.jsx";

function Datos2() {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Datos2
          </Text>
        </CardHeader>
        <CardBody>
          <Box p="24px">
            <Text color={textColor}>
              Esta es la página de Datos2 - Tercer nivel de navegación.
            </Text>
            <Text color={textColor} mt="4">
              Ruta: /admin/tables/datos
            </Text>
          </Box>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Datos2;
