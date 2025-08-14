// Chakra Imports
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex, 
  Input,
  Link,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Switch,
  Text,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react";
import { HSeparator } from "@dashboard/components/Separator/Separator";
import React, { useState } from "react";
import GitHubButton from "react-github-btn";
import { FaFacebook, FaTwitter } from "react-icons/fa";

export default function Configurator(props) {
  const {
    sidebarVariant,
    setSidebarVariant,
    secondary,
    isOpen,
    onClose,
    fixed,
    ...rest
  } = props;
  const [switched, setSwitched] = useState(props.isChecked);
  
  // Estados para las nuevas configuraciones
  const [costoTecnico, setCostoTecnico] = useState(25.00); // Costo por hora en USD
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState('sedan');
  const [kmPorGalon, setKmPorGalon] = useState(12.5);
  
  // Lista de vehículos con su eficiencia de combustible
  const vehiculos = {
    'sedan': { nombre: 'Sedán', kmPorGalon: 12.5 },
    'suv': { nombre: 'SUV', kmPorGalon: 8.5 },
    'pickup': { nombre: 'Pick-up', kmPorGalon: 10.0 },
    'compacto': { nombre: 'Compacto', kmPorGalon: 15.0 },
    'van': { nombre: 'Van', kmPorGalon: 9.0 },
    'moto': { nombre: 'Motocicleta', kmPorGalon: 35.0 }
  };
  
  // Función para manejar el cambio de vehículo
  const handleVehiculoChange = (tipoVehiculo) => {
    setVehiculoSeleccionado(tipoVehiculo);
    setKmPorGalon(vehiculos[tipoVehiculo].kmPorGalon);
  };

  const { colorMode, toggleColorMode } = useColorMode();

  let bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "white"
  );
  let colorButton = useColorModeValue("white", "gray.700");
  const secondaryButtonBg = useColorModeValue("white", "transparent");
  const secondaryButtonBorder = useColorModeValue("gray.700", "white");
  const secondaryButtonColor = useColorModeValue("gray.700", "white");
  const bgDrawer = useColorModeValue("white", "navy.800");
  const settingsRef = React.useRef();
  return (
    <>
      <Drawer
        isOpen={props.isOpen}
        onClose={props.onClose}
        placement={document.documentElement.dir === "rtl" ? "left" : "right"}
        finalFocusRef={settingsRef}
        blockScrollOnMount={false}
      >
        <DrawerContent bg={bgDrawer}>
          <DrawerHeader pt="24px" px="24px">
            <DrawerCloseButton />
            <Text fontSize="xl" fontWeight="bold" mt="16px">
              Argon Chakra Configurator
            </Text>
            <Text fontSize="md" mb="16px">
              See your dashboard options.
            </Text>
            <HSeparator />
          </DrawerHeader>
          <DrawerBody w="340px" ps="24px" pe="40px">
            <Flex flexDirection="column">
              <Flex justifyContent="space-between " mb="16px">
                <Text fontSize="md" fontWeight="600" mb="4px">
                  Navbar Fixed
                </Text>
                <Switch
                  colorScheme="blue"
                  isChecked={switched}
                  onChange={() => {
                    if (switched === true) {
                      props.onSwitch(false);
                      setSwitched(false);
                    } else {
                      props.onSwitch(true);
                      setSwitched(true);
                    }
                  }}
                />
              </Flex>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                mb="24px"
              >
                <Text fontSize="md" fontWeight="600" mb="4px">
                  Dark/Light
                </Text>
                <Button
                  onClick={toggleColorMode}
                  color={colorMode === "light" ? "Dark" : "Light"}
                >
                  Toggle {colorMode === "light" ? "Dark" : "Light"}
                </Button>
              </Flex>

              <HSeparator />
              
              {/* Configuración de Costo de Técnico */}
              <Box mt="24px" mb="24px">
                <Text fontSize="md" fontWeight="600" mb="12px">
                  Configuración de Costos
                </Text>
                <Flex justifyContent="space-between" alignItems="center" mb="16px">
                  <Text fontSize="sm" fontWeight="500">
                    Costo por Hora del Técnico ($)
                  </Text>
                </Flex>
                <NumberInput
                  value={costoTecnico}
                  onChange={(valueString, valueNumber) => setCostoTecnico(valueNumber)}
                  precision={2}
                  step={0.25}
                  min={5}
                  max={100}
                  size="sm"
                >
                  <NumberInputField placeholder="25.00" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Text fontSize="xs" color="gray.500" mt="4px">
                  Rango: $5.00 - $100.00 por hora
                </Text>
              </Box>

              <HSeparator />
              
              {/* Configuración de Vehículos y Combustible */}
              <Box mt="24px" mb="24px">
                <Text fontSize="md" fontWeight="600" mb="12px">
                  Configuración de Vehículos
                </Text>
                
                <Flex justifyContent="space-between" alignItems="center" mb="16px">
                  <Text fontSize="sm" fontWeight="500">
                    Tipo de Vehículo
                  </Text>
                </Flex>
                <Select 
                  value={vehiculoSeleccionado}
                  onChange={(e) => handleVehiculoChange(e.target.value)}
                  size="sm"
                  mb="16px"
                >
                  {Object.entries(vehiculos).map(([key, vehiculo]) => (
                    <option key={key} value={key}>
                      {vehiculo.nombre}
                    </option>
                  ))}
                </Select>
                
                <Flex justifyContent="space-between" alignItems="center" mb="16px">
                  <Text fontSize="sm" fontWeight="500">
                    Kilómetros por Galón
                  </Text>
                </Flex>
                <NumberInput
                  value={kmPorGalon}
                  onChange={(valueString, valueNumber) => setKmPorGalon(valueNumber)}
                  precision={1}
                  step={0.5}
                  min={5}
                  max={50}
                  size="sm"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Text fontSize="xs" color="gray.500" mt="4px">
                  Eficiencia de combustible actual: {kmPorGalon} km/gal
                </Text>
              </Box>

              <HSeparator />
              <Box mt="24px">
                <Box>
                  <Link
                    href="https://www.creative-tim.com/product/argon-dashboard-chakra?ref=creativetim-pud"
                    w="100%"
                    mb="16px"
                  >
                    <Button
                      w="100%"
                      mb="16px"
                      bg={bgButton}
                      color={colorButton}
                      fontSize="xs"
                      variant="no-effects"
                      px="30px"
                    >
                      Free Download
                    </Button>
                  </Link>
                  <Link
                    href="https://demos.creative-tim.com/docs-argon-dashboard-chakra/?ref=creativetim-pud"
                    w="100%"
                  >
                    <Button
                      w="100%"
                      bg={secondaryButtonBg}
                      border="1px solid"
                      borderColor={secondaryButtonBorder}
                      color={secondaryButtonColor}
                      fontSize="xs"
                      variant="no-effects"
                      px="20px"
                      mb="16px"
                    >
                      <Text textDecorationColor="none">Documentation</Text>
                    </Button>
                  </Link>
                </Box>
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  w="100%"
                  mb="16px"
                >
                  <GitHubButton
                    href="https://github.com/creativetimofficial/argon-dashboard-chakra"
                    data-icon="octicon-star"
                    data-show-count="true"
                    aria-label="Star creativetimofficial/argon-dashboard-chakra on GitHub"
                  >
                    Star
                  </GitHubButton>
                </Flex>
                <Box w="100%">
                  <Text mb="6px" textAlign="center">
                    Thank you for sharing!
                  </Text>
                  <Flex justifyContent="center" alignContent="center">
                    <Link
                      isExternal="true"
                      href="https://twitter.com/intent/tweet?url=https://www.creative-tim.com/product/argon-dashboard-chakra/&text=Check%20Argon%20Dashboard%20Chakra%20made%20by%20@simmmple_web%20and%20@CreativeTim"
                    >
                      <Button
                        colorScheme="twitter"
                        leftIcon={<FaTwitter />}
                        me="10px"
                      >
                        <Text>Tweet</Text>
                      </Button>
                    </Link>
                    <Link
                      isExternal="true"
                      href="https://www.facebook.com/sharer/sharer.php?u=https://www.creative-tim.com/product/argon-dashboard-chakra/"
                    >
                      <Button colorScheme="facebook" leftIcon={<FaFacebook />}>
                        <Text>Share</Text>
                      </Button>
                    </Link>
                  </Flex>
                </Box>
              </Box>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
