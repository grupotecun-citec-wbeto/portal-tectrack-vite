// @ts-nocheck
import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  IconButton,
  useColorModeValue,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
  Flex,
  Icon,
  Tooltip,
  Divider,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText
} from '@chakra-ui/react';
import Card from "@dashboard/components/Card/Card.jsx";
import CardBody from "@dashboard/components/Card/CardBody.jsx";
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaUser,
  FaGasPump,
  FaBus
} from 'react-icons/fa';
import ViaticoForm from './ViaticoForm';
import { 
  viaticosMockData,
  getEstadoViaticoInfo,
  getTipoCombustibleInfo,
  formatMoneda,
  formatFechaViatico,
  calcularTotalViaticos
} from '@dashboard/data/viaticosMockData';
import viaticoStore from '@dashboard/data/viaticoStore';

const ViaticosCasoDetalle = ({ caso }) => {
  const [viaticos, setViaticos] = useState([]);
  const [selectedViatico, setSelectedViatico] = useState(null);
  const [viaticoToDelete, setViaticoToDelete] = useState(null);
  
  const { isOpen: isFormOpen, onOpen: onFormOpen, onClose: onFormClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  
  const textColor = useColorModeValue('gray.700', 'white');
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const toast = useToast();
  const cancelRef = React.useRef();

  // Función para cargar viáticos del store
  const loadViaticos = () => {
    const viaticosCaso = viaticoStore.getByCaso(caso.ID);
    setViaticos(viaticosCaso);
  };

  useEffect(() => {
    // Cargar viáticos del caso desde el store
    loadViaticos();
    
    // Suscribirse a cambios en el store
    const unsubscribe = viaticoStore.subscribe(() => {
      loadViaticos();
    });

    return unsubscribe;
  }, [caso.ID]);

  const handleCreateViatico = () => {
    setSelectedViatico(null);
    onFormOpen();
  };

  const handleEditViatico = (viatico) => {
    setSelectedViatico(viatico);
    onFormOpen();
  };

  const handleDeleteViatico = (viatico) => {
    setViaticoToDelete(viatico);
    onDeleteOpen();
  };

  const confirmDelete = () => {
    // Eliminar del store
    viaticoStore.delete(viaticoToDelete.ID);
    
    toast({
      title: "Viático eliminado",
      description: "El viático ha sido eliminado exitosamente",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    
    onDeleteClose();
    setViaticoToDelete(null);
  };

  const handleSaveViatico = (viaticoData) => {
    if (selectedViatico) {
      // Editar viático existente en el store
      viaticoStore.update(selectedViatico.ID, viaticoData);
    } else {
      // Crear nuevo viático en el store
      viaticoStore.add(viaticoData);
    }
  };

  const canCreateViatico = () => {
    // Se puede crear viático si el caso está cerrado o fue cerrado hace menos de 2 días
    const casoEstaCerrado = caso.caso_estado_ID === 5; // Terminado
    if (!casoEstaCerrado) return true; // Si no está cerrado, siempre se puede crear
    
    if (caso.date_end) {
      const fechaCierre = new Date(caso.date_end);
      const ahora = new Date();
      const diasDesdeCierre = (ahora - fechaCierre) / (1000 * 60 * 60 * 24);
      return diasDesdeCierre <= 2;
    }
    
    return true;
  };

  const totalViaticos = calcularTotalViaticos(viaticos);

  return (
    <Box>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
          <Box>
            <Text fontSize="xl" fontWeight="bold" color={textColor}>
              Viáticos del Caso
            </Text>
            <Text color="gray.500">
              Caso #{caso.usuario_ID}-{caso.ID.split('-')[0]} - {caso.usuario_assigned_name}
            </Text>
          </Box>
          
          {canCreateViatico() && (
            <Button
              leftIcon={<FaPlus />}
              colorScheme="blue"
              onClick={handleCreateViatico}
            >
              Crear Viático
            </Button>
          )}
        </Flex>

        {/* Estadísticas */}
        {viaticos.length > 0 && (
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>
                    <Icon as={FaMoneyBillWave} mr={2} />
                    Total Viáticos
                  </StatLabel>
                  <StatNumber color="green.500">
                    {formatMoneda(totalViaticos)}
                  </StatNumber>
                  <StatHelpText>
                    {viaticos.length} registro{viaticos.length !== 1 ? 's' : ''}
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Aprobados</StatLabel>
                  <StatNumber color="green.500">
                    {viaticos.filter(v => v.estado === 'Aprobado').length}
                  </StatNumber>
                </Stat>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Pendientes</StatLabel>
                  <StatNumber color="yellow.500">
                    {viaticos.filter(v => v.estado === 'Pendiente').length}
                  </StatNumber>
                </Stat>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Rechazados</StatLabel>
                  <StatNumber color="red.500">
                    {viaticos.filter(v => v.estado === 'Rechazado').length}
                  </StatNumber>
                </Stat>
              </CardBody>
            </Card>
          </SimpleGrid>
        )}

        {/* Tabla de viáticos */}
        <Card>
          <CardBody>
            {viaticos.length === 0 ? (
              <Box textAlign="center" py={10}>
                <Icon as={FaMoneyBillWave} fontSize="3xl" color="gray.400" mb={4} />
                <Text fontSize="lg" color="gray.500" mb={4}>
                  No hay viáticos registrados para este caso
                </Text>
                {canCreateViatico() && (
                  <Button
                    leftIcon={<FaPlus />}
                    colorScheme="blue"
                    onClick={handleCreateViatico}
                  >
                    Crear Primer Viático
                  </Button>
                )}
              </Box>
            ) : (
              <Box overflowX="auto">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th borderColor={borderColor}>Fecha</Th>
                      <Th borderColor={borderColor}>Estado</Th>
                      <Th borderColor={borderColor}>Alimentación</Th>
                      <Th borderColor={borderColor}>Hospedaje</Th>
                      <Th borderColor={borderColor}>Combustible</Th>
                      <Th borderColor={borderColor}>Transporte</Th>
                      <Th borderColor={borderColor}>Total</Th>
                      <Th borderColor={borderColor}>Acciones</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {viaticos.map((viatico) => {
                      const estado = getEstadoViaticoInfo(viatico.estado);
                      const tipoCombustible = getTipoCombustibleInfo(viatico.combustibles.tipo);
                      const totalAlimentacion = viatico.desayuno + viatico.almuerzo + viatico.cena;
                      
                      return (
                        <Tr key={viatico.ID}>
                          <Td borderColor={borderColor}>
                            <VStack align="start" spacing={1}>
                              <Text fontSize="sm" fontWeight="medium">
                                {formatFechaViatico(viatico.fecha_ingreso)}
                              </Text>
                              <Text fontSize="xs" color="gray.500">
                                {new Date(viatico.created_at).toLocaleTimeString()}
                              </Text>
                            </VStack>
                          </Td>
                          <Td borderColor={borderColor}>
                            <Badge colorScheme={estado.color}>
                              {estado.name}
                            </Badge>
                          </Td>
                          <Td borderColor={borderColor}>
                            <Text fontWeight="medium">
                              {formatMoneda(totalAlimentacion)}
                            </Text>
                            <Text fontSize="xs" color="gray.500">
                              D: {formatMoneda(viatico.desayuno)} | 
                              A: {formatMoneda(viatico.almuerzo)} | 
                              C: {formatMoneda(viatico.cena)}
                            </Text>
                          </Td>
                          <Td borderColor={borderColor}>
                            <Text fontWeight="medium">
                              {formatMoneda(viatico.hospedaje)}
                            </Text>
                          </Td>
                          <Td borderColor={borderColor}>
                            <VStack align="start" spacing={1}>
                              <Text fontWeight="medium">
                                {formatMoneda(viatico.combustibles.monto_total)}
                              </Text>
                              <Text fontSize="xs" color="gray.500">
                                {viatico.combustibles.cantidad} {viatico.combustibles.unidad}
                              </Text>
                              <Badge size="sm" colorScheme={tipoCombustible.color}>
                                {tipoCombustible.name}
                              </Badge>
                            </VStack>
                          </Td>
                          <Td borderColor={borderColor}>
                            <Text fontWeight="medium">
                              {formatMoneda(viatico.transporte)}
                            </Text>
                          </Td>
                          <Td borderColor={borderColor}>
                            <Text fontWeight="bold" color="green.500">
                              {formatMoneda(viatico.monto_total)}
                            </Text>
                          </Td>
                          <Td borderColor={borderColor}>
                            <HStack spacing={1}>
                              <Tooltip label="Ver detalles">
                                <IconButton
                                  icon={<FaEye />}
                                  size="sm"
                                  variant="ghost"
                                  aria-label="Ver detalles"
                                />
                              </Tooltip>
                              <Tooltip label="Editar">
                                <IconButton
                                  icon={<FaEdit />}
                                  size="sm"
                                  variant="ghost"
                                  colorScheme="blue"
                                  aria-label="Editar"
                                  onClick={() => handleEditViatico(viatico)}
                                />
                              </Tooltip>
                              <Tooltip label="Eliminar">
                                <IconButton
                                  icon={<FaTrash />}
                                  size="sm"
                                  variant="ghost"
                                  colorScheme="red"
                                  aria-label="Eliminar"
                                  onClick={() => handleDeleteViatico(viatico)}
                                />
                              </Tooltip>
                            </HStack>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </Box>
            )}
          </CardBody>
        </Card>
      </VStack>

      {/* Modal de formulario */}
      <ViaticoForm
        isOpen={isFormOpen}
        onClose={onFormClose}
        caso={caso}
        viatico={selectedViatico}
        onSave={handleSaveViatico}
      />

      {/* Modal de confirmación de eliminación */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Eliminar Viático
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Está seguro que desea eliminar este viático? 
              Esta acción no se puede deshacer.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default ViaticosCasoDetalle;
