// @ts-nocheck
import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Input,
  Select,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  useColorModeValue,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Divider,
  Badge,
  Grid,
  GridItem,
  Icon
} from '@chakra-ui/react';
import Card from "@dashboard/components/Card/Card.jsx";
import CardBody from "@dashboard/components/Card/CardBody.jsx";
import { FaSave, FaTimes, FaCalculator } from 'react-icons/fa';
import { 
  tiposCombustible, 
  unidadesCombustible,
  formatMoneda
} from '@dashboard/data/viaticosMockData';

const ViaticoForm = ({ 
  isOpen, 
  onClose, 
  caso, 
  viatico = null, 
  onSave 
}) => {
  const [formData, setFormData] = useState({
    desayuno: 0,
    almuerzo: 0,
    cena: 0,
    hospedaje: 0,
    combustible_cantidad: 0,
    combustible_unidad: 'Galones',
    combustible_tipo: 'Diesel',
    combustible_monto: 0,
    transporte: 0,
    observaciones: ''
  });

  const [calculatedTotal, setCalculatedTotal] = useState(0);
  const toast = useToast();
  const textColor = useColorModeValue('gray.700', 'white');
  const bgColor = useColorModeValue('white', 'gray.800');

  useEffect(() => {
    if (viatico) {
      // Modo edición
      setFormData({
        desayuno: viatico.desayuno || 0,
        almuerzo: viatico.almuerzo || 0,
        cena: viatico.cena || 0,
        hospedaje: viatico.hospedaje || 0,
        combustible_cantidad: viatico.combustibles?.cantidad || 0,
        combustible_unidad: viatico.combustibles?.unidad || 'Galones',
        combustible_tipo: viatico.combustibles?.tipo || 'Diesel',
        combustible_monto: viatico.combustibles?.monto_total || 0,
        transporte: viatico.transporte || 0,
        observaciones: viatico.observaciones || ''
      });
    } else {
      // Modo creación - resetear form
      setFormData({
        desayuno: 0,
        almuerzo: 0,
        cena: 0,
        hospedaje: 0,
        combustible_cantidad: 0,
        combustible_unidad: 'Galones',
        combustible_tipo: 'Diesel',
        combustible_monto: 0,
        transporte: 0,
        observaciones: ''
      });
    }
  }, [viatico, isOpen]);

  useEffect(() => {
    // Calcular total automáticamente
    const total = 
      (formData.desayuno || 0) +
      (formData.almuerzo || 0) +
      (formData.cena || 0) +
      (formData.hospedaje || 0) +
      (formData.combustible_monto || 0) +
      (formData.transporte || 0);
    
    setCalculatedTotal(total);
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Validaciones básicas
    if (calculatedTotal <= 0) {
      toast({
        title: "Error",
        description: "El monto total debe ser mayor a cero",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const viaticoData = {
      caso_ID: caso.ID,
      caso_numero: `${caso.usuario_ID}-${caso.ID.split('-')[0]}`,
      tecnico_ID: caso.usuario_ID_assigned,
      tecnico_name: caso.usuario_assigned_name,
      fecha_ingreso: new Date().toISOString().split('T')[0],
      fecha_creacion: new Date().toISOString(),
      estado: "Pendiente",
      desayuno: formData.desayuno || 0,
      almuerzo: formData.almuerzo || 0,
      cena: formData.cena || 0,
      hospedaje: formData.hospedaje || 0,
      combustibles: {
        cantidad: formData.combustible_cantidad || 0,
        unidad: formData.combustible_unidad,
        tipo: formData.combustible_tipo,
        monto_total: formData.combustible_monto || 0
      },
      transporte: formData.transporte || 0,
      monto_total: calculatedTotal,
      observaciones: formData.observaciones,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (viatico) {
      // Modo edición
      viaticoData.ID = viatico.ID;
      viaticoData.created_at = viatico.created_at;
    } else {
      // Modo creación
      viaticoData.ID = `viatico-${Date.now()}`;
    }

    onSave(viaticoData);
    
    toast({
      title: viatico ? "Viático actualizado" : "Viático creado",
      description: viatico ? "El viático ha sido actualizado exitosamente" : "El viático ha sido creado exitosamente",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent bg={bgColor}>
        <ModalHeader>
          <VStack align="start" spacing={2}>
            <Text fontSize="xl" fontWeight="bold">
              {viatico ? 'Editar Viático' : 'Crear Viático'}
            </Text>
            <Text fontSize="sm" color="gray.500">
              Caso #{caso?.usuario_ID}-{caso?.ID?.split('-')[0]} - {caso?.usuario_assigned_name}
            </Text>
          </VStack>
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
          <VStack spacing={6}>
            {/* Alimentación */}
            <Card w="100%">
              <CardBody>
                <VStack spacing={4}>
                  <Text fontSize="lg" fontWeight="bold" color={textColor} alignSelf="start">
                    <Icon as={FaCalculator} mr={2} />
                    Alimentación
                  </Text>
                  
                  <Grid templateColumns="repeat(3, 1fr)" gap={4} w="100%">
                    <GridItem>
                      <FormControl>
                        <FormLabel>Desayuno</FormLabel>
                        <NumberInput
                          value={formData.desayuno}
                          onChange={(valueString) => handleInputChange('desayuno', parseFloat(valueString) || 0)}
                          precision={2}
                          min={0}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>
                    </GridItem>
                    
                    <GridItem>
                      <FormControl>
                        <FormLabel>Almuerzo</FormLabel>
                        <NumberInput
                          value={formData.almuerzo}
                          onChange={(valueString) => handleInputChange('almuerzo', parseFloat(valueString) || 0)}
                          precision={2}
                          min={0}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>
                    </GridItem>
                    
                    <GridItem>
                      <FormControl>
                        <FormLabel>Cena</FormLabel>
                        <NumberInput
                          value={formData.cena}
                          onChange={(valueString) => handleInputChange('cena', parseFloat(valueString) || 0)}
                          precision={2}
                          min={0}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>
                    </GridItem>
                  </Grid>
                </VStack>
              </CardBody>
            </Card>

            {/* Hospedaje y Transporte */}
            <Card w="100%">
              <CardBody>
                <VStack spacing={4}>
                  <Text fontSize="lg" fontWeight="bold" color={textColor} alignSelf="start">
                    Hospedaje y Transporte
                  </Text>
                  
                  <Grid templateColumns="repeat(2, 1fr)" gap={4} w="100%">
                    <GridItem>
                      <FormControl>
                        <FormLabel>Hospedaje</FormLabel>
                        <NumberInput
                          value={formData.hospedaje}
                          onChange={(valueString) => handleInputChange('hospedaje', parseFloat(valueString) || 0)}
                          precision={2}
                          min={0}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>
                    </GridItem>
                    
                    <GridItem>
                      <FormControl>
                        <FormLabel>Transporte</FormLabel>
                        <NumberInput
                          value={formData.transporte}
                          onChange={(valueString) => handleInputChange('transporte', parseFloat(valueString) || 0)}
                          precision={2}
                          min={0}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>
                    </GridItem>
                  </Grid>
                </VStack>
              </CardBody>
            </Card>

            {/* Combustibles */}
            <Card w="100%">
              <CardBody>
                <VStack spacing={4}>
                  <Text fontSize="lg" fontWeight="bold" color={textColor} alignSelf="start">
                    Combustibles
                  </Text>
                  
                  <Grid templateColumns="repeat(2, 1fr)" gap={4} w="100%">
                    <GridItem>
                      <FormControl>
                        <FormLabel>Cantidad</FormLabel>
                        <NumberInput
                          value={formData.combustible_cantidad}
                          onChange={(valueString) => handleInputChange('combustible_cantidad', parseFloat(valueString) || 0)}
                          precision={2}
                          min={0}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>
                    </GridItem>
                    
                    <GridItem>
                      <FormControl>
                        <FormLabel>Unidad</FormLabel>
                        <Select
                          value={formData.combustible_unidad}
                          onChange={(e) => handleInputChange('combustible_unidad', e.target.value)}
                        >
                          {unidadesCombustible.map(unidad => (
                            <option key={unidad.id} value={unidad.id}>
                              {unidad.name}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                    
                    <GridItem>
                      <FormControl>
                        <FormLabel>Tipo de Combustible</FormLabel>
                        <Select
                          value={formData.combustible_tipo}
                          onChange={(e) => handleInputChange('combustible_tipo', e.target.value)}
                        >
                          {tiposCombustible.map(tipo => (
                            <option key={tipo.id} value={tipo.id}>
                              {tipo.name}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                    
                    <GridItem>
                      <FormControl>
                        <FormLabel>Monto Total</FormLabel>
                        <NumberInput
                          value={formData.combustible_monto}
                          onChange={(valueString) => handleInputChange('combustible_monto', parseFloat(valueString) || 0)}
                          precision={2}
                          min={0}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>
                    </GridItem>
                  </Grid>
                </VStack>
              </CardBody>
            </Card>

            {/* Observaciones */}
            <Card w="100%">
              <CardBody>
                <FormControl>
                  <FormLabel>Observaciones</FormLabel>
                  <Textarea
                    value={formData.observaciones}
                    onChange={(e) => handleInputChange('observaciones', e.target.value)}
                    placeholder="Ingrese observaciones del viático..."
                    rows={3}
                  />
                </FormControl>
              </CardBody>
            </Card>

            {/* Total */}
            <Card w="100%" bg="blue.50" borderColor="blue.200">
              <CardBody>
                <HStack justify="space-between" align="center">
                  <Text fontSize="lg" fontWeight="bold" color={textColor}>
                    Monto Total:
                  </Text>
                  <Badge colorScheme="blue" fontSize="lg" p={2}>
                    {formatMoneda(calculatedTotal)}
                  </Badge>
                </HStack>
              </CardBody>
            </Card>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose} leftIcon={<FaTimes />}>
            Cancelar
          </Button>
          <Button 
            colorScheme="blue" 
            onClick={handleSubmit}
            leftIcon={<FaSave />}
          >
            {viatico ? 'Actualizar' : 'Crear'} Viático
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ViaticoForm;
