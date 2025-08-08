// @ts-nocheck
import React from "react";
import { useHistory } from "react-router-dom";
import {
  Flex,
  Text,
  useColorModeValue,
  Box,
  Button,
  VStack,
} from "@chakra-ui/react";
import Card from "@dashboard/components/Card/Card.jsx";
import CardBody from "@dashboard/components/Card/CardBody.jsx";
import CardHeader from "@dashboard/components/Card/CardHeader.jsx";

function Datos() {
  const textColor = useColorModeValue("gray.700", "white");
  const history = useHistory();

  const navigateToDetail = (id) => {
    history.push(`/admin/tables/datos/${id}`);
  };

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Datos
          </Text>
        </CardHeader>
        <CardBody>
          <Box p="24px">
            <Text color={textColor}>
              Esta es la página de Datos - Tercer nivel de navegación.
            </Text>
            <Text color={textColor} mt="4">
              Ruta: /admin/tables/datos
            </Text>
            
            <Text color={textColor} mt="6" fontWeight="bold">
              Ejemplos de navegación con parámetros:
            </Text>
            
            <VStack spacing={3} align="start" mt="4">
              <Button 
                colorScheme="blue" 
                size="sm"
                onClick={() => navigateToDetail(123)}
              >
                Ver Dato ID: 123
              </Button>
              <Button 
                colorScheme="green" 
                size="sm"
                onClick={() => navigateToDetail(456)}
              >
                Ver Dato ID: 456
              </Button>
              <Button 
                colorScheme="purple" 
                size="sm"
                onClick={() => navigateToDetail('abc')}
              >
                Ver Dato ID: abc
              </Button>
            </VStack>
          </Box>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Datos;
