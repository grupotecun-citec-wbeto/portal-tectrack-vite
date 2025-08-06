// @ts-nocheck
import React from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "@dashboard/components/Card/Card";
import CardHeader from "@dashboard/components/Card/CardHeader";
import CardBody from "@dashboard/components/Card/CardBody";

function DatosWithId() {
  const { id } = useParams();
  const history = useHistory();
  const textColor = useColorModeValue("gray.700", "white");

  const goBack = () => {
    history.push('/admin/tables/datos');
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Card>
        <CardHeader>
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Datos - Detalle ID: {id}
          </Text>
        </CardHeader>
        <CardBody>
          <Text color={textColor}>
            Esta es la página de Datos con ID: {id}
          </Text>
          <Text color={textColor} mt={4}>
            Aquí puedes mostrar información específica del dato con ID {id}
          </Text>
          <Button 
            colorScheme="blue" 
            mt={4} 
            onClick={goBack}
          >
            Volver a Datos
          </Button>
        </CardBody>
      </Card>
    </Box>
  );
}

export default DatosWithId;
