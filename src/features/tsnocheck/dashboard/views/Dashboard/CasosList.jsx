// @ts-nocheck
import React, { useState, useMemo, useCallback } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Button,
  ButtonGroup,
  IconButton,
  Input,
  Select,
  Flex,
  useColorModeValue,
  useBreakpointValue,
  Grid,
  GridItem,
  Divider,
  Stack,
  Avatar,
  Tooltip,
  Link,
  SimpleGrid,
  Icon,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import Card from "@dashboard/components/Card/Card.jsx";
import CardBody from "@dashboard/components/Card/CardBody.jsx";
import { 
  FaEye, 
  FaFilePdf, 
  FaCalendarAlt, 
  FaUser, 
  FaClock, 
  FaTractor,
  FaSearch,
  FaFilter,
  FaTh,
  FaList,
  FaThLarge,
  FaPhone,
  FaWhatsapp,
  FaUsers,
  FaBroadcastTower,
  FaVideo,
  FaEnvelope,
  FaBook,
  FaExclamationTriangle,
  FaInfoCircle,
  FaCheckCircle,
  FaPlus,
  FaPause,
  FaTimes
} from 'react-icons/fa';

import { 
  casosMockData, 
  getPrioridadInfo, 
  getEstadoInfo, 
  getSegmentoInfo, 
  getComunicacionInfo,
  formatFecha,
  getShortCaseId,
  getEquiposCount,
  formatDuration
} from '@dashboard/data/casosMockData';

// Iconos para diferentes elementos
const iconMap = {
  // Prioridades
  warning: FaExclamationTriangle,
  alert: FaExclamationTriangle,
  info: FaInfoCircle,
  
  // Estados
  plus: FaPlus,
  user: FaUser,
  clock: FaClock,
  pause: FaPause,
  check: FaCheckCircle,
  x: FaTimes,
  
  // Comunicación
  phone: FaPhone,
  message: FaWhatsapp,
  users: FaUsers,
  radio: FaBroadcastTower,
  video: FaVideo,
  mail: FaEnvelope,
  book: FaBook
};

const CasosList = () => {
  const [viewMode, setViewMode] = useState('cards'); // 'compact', 'normal', 'cards'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('');
  const [filterPrioridad, setFilterPrioridad] = useState('');
  const [filterSegmento, setFilterSegmento] = useState('');

  const textColor = useColorModeValue('gray.700', 'white');
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Responsive columns
  const cardColumns = useBreakpointValue({ base: 1, md: 2, lg: 3, xl: 4 });

  // Filtrar casos
  const filteredCasos = useMemo(() => {
    return casosMockData.filter(caso => {
      const matchesSearch = searchTerm === '' || 
        getShortCaseId(caso.ID, caso.usuario_ID).toLowerCase().includes(searchTerm.toLowerCase()) ||
        caso.usuario_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caso.usuario_assigned_name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesEstado = filterEstado === '' || caso.caso_estado_ID.toString() === filterEstado;
      const matchesPrioridad = filterPrioridad === '' || caso.prioridad.toString() === filterPrioridad;
      const matchesSegmento = filterSegmento === '' || caso.segmento_ID.toString() === filterSegmento;

      return matchesSearch && matchesEstado && matchesPrioridad && matchesSegmento;
    });
  }, [searchTerm, filterEstado, filterPrioridad, filterSegmento]);

  // Componente para vista compacta
  const CompactCasoView = ({ caso }) => {
    const prioridad = getPrioridadInfo(caso.prioridad);
    const estado = getEstadoInfo(caso.caso_estado_ID);
    const comunicacion = getComunicacionInfo(caso.comunicacion_ID);
    
    return (
      <Flex
        p={3}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="md"
        bg={bgColor}
        align="center"
        justify="space-between"
        _hover={{ bg: useColorModeValue('gray.50', 'gray.700'), transform: 'translateY(-1px)' }}
        transition="all 0.2s"
      >
        <HStack spacing={3} flex="1">
          <Badge colorScheme={prioridad.color} size="sm">
            <HStack spacing={1}>
              <Icon as={iconMap[prioridad.icon]} />
              <Text>{prioridad.name}</Text>
            </HStack>
          </Badge>
          
          <Text fontWeight="medium" fontSize="sm">
            Caso #{getShortCaseId(caso.ID, caso.usuario_ID)}
          </Text>
          
          <Badge colorScheme={estado.color} variant="outline" size="sm">
            {estado.name}
          </Badge>
        </HStack>
        
        <HStack spacing={2}>
          <Text fontSize="xs" color="gray.500">
            {formatFecha(caso.fecha)}
          </Text>
          
          <ButtonGroup size="sm" variant="ghost">
            <Tooltip label="Ver detalles">
              <IconButton
                icon={<FaEye />}
                aria-label="Ver caso"
                size="sm"
                onClick={() => console.log('Ver caso:', caso.ID)}
              />
            </Tooltip>
            <Tooltip label="Generar PDF">
              <IconButton
                icon={<FaFilePdf />}
                aria-label="PDF"
                size="sm"
                onClick={() => console.log('PDF caso:', caso.ID)}
              />
            </Tooltip>
          </ButtonGroup>
        </HStack>
      </Flex>
    );
  };

  // Componente para vista normal
  const NormalCasoView = ({ caso }) => {
    const prioridad = getPrioridadInfo(caso.prioridad);
    const estado = getEstadoInfo(caso.caso_estado_ID);
    const comunicacion = getComunicacionInfo(caso.comunicacion_ID);
    const segmento = getSegmentoInfo(caso.segmento_ID);
    
    return (
      <Box
        p={4}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="md"
        bg={bgColor}
        _hover={{ bg: useColorModeValue('gray.50', 'gray.700'), transform: 'translateY(-2px)', boxShadow: 'md' }}
        transition="all 0.2s"
      >
        <VStack align="stretch" spacing={3}>
          {/* Header */}
          <Flex justify="space-between" align="center">
            <HStack spacing={2}>
              <Badge colorScheme={prioridad.color}>
                <HStack spacing={1}>
                  <Icon as={iconMap[prioridad.icon]} />
                  <Text>{prioridad.name}</Text>
                </HStack>
              </Badge>
              <Badge colorScheme={comunicacion.color} variant="outline">
                <HStack spacing={1}>
                  <Icon as={iconMap[comunicacion.icon]} />
                  <Text>{comunicacion.name}</Text>
                </HStack>
              </Badge>
            </HStack>
            
            <Text fontSize="sm" fontWeight="bold" color={textColor}>
              Caso #{getShortCaseId(caso.ID, caso.usuario_ID)}
            </Text>
          </Flex>

          {/* Estado y duración */}
          <HStack justify="space-between">
            <Badge colorScheme={estado.color} variant="solid">
              <HStack spacing={1}>
                <Icon as={iconMap[estado.icon]} />
                <Text>{estado.name}</Text>
              </HStack>
            </Badge>
            
            <HStack spacing={1}>
              <Icon as={FaClock} color="gray.500" />
              <Text fontSize="sm" color="gray.500">
                {formatDuration(caso.start, caso.date_end)}
              </Text>
            </HStack>
          </HStack>

          <Divider />

          {/* Información del técnico */}
          <HStack>
            <Icon as={FaUser} color="gray.500" />
            <Text fontSize="sm" color={textColor}>
              Técnico asignado: {caso.usuario_assigned_name}
            </Text>
          </HStack>

          {/* Fecha de creación */}
          <HStack>
            <Icon as={FaCalendarAlt} color="gray.500" />
            <Text fontSize="sm" color={textColor}>
              Creado el {formatFecha(caso.fecha)}
            </Text>
          </HStack>

          {/* Acciones */}
          <Flex justify="space-between" align="center">
            <HStack>
              <Icon as={FaTractor} color="gray.500" />
              <Text fontSize="sm" color="gray.500">
                {getEquiposCount(caso.equipos)} equipos
              </Text>
            </HStack>
            
            <ButtonGroup size="sm">
              <Button
                leftIcon={<FaEye />}
                variant="outline"
                size="sm"
                onClick={() => console.log('Ver caso:', caso.ID)}
              >
                Ver
              </Button>
              <IconButton
                icon={<FaFilePdf />}
                aria-label="PDF"
                variant="outline"
                size="sm"
                onClick={() => console.log('PDF caso:', caso.ID)}
              />
            </ButtonGroup>
          </Flex>
        </VStack>
      </Box>
    );
  };

  // Componente para vista de tarjetas
  const CardCasoView = ({ caso }) => {
    const prioridad = getPrioridadInfo(caso.prioridad);
    const estado = getEstadoInfo(caso.caso_estado_ID);
    const comunicacion = getComunicacionInfo(caso.comunicacion_ID);
    const segmento = getSegmentoInfo(caso.segmento_ID);
    
    return (
      <Card
        _hover={{ 
          transform: 'translateY(-4px)', 
          boxShadow: 'xl',
          borderColor: estado.color === 'green' ? 'green.300' : estado.color === 'red' ? 'red.300' : 'blue.300'
        }}
        transition="all 0.3s"
        borderWidth="2px"
        borderColor={borderColor}
        bg={bgColor}
      >
        <CardBody>
          <VStack align="stretch" spacing={4}>
            {/* Header con badges */}
            <Flex justify="space-between" align="start">
              <VStack align="start" spacing={2}>
                <Badge colorScheme={prioridad.color} size="lg">
                  <HStack spacing={1}>
                    <Icon as={iconMap[prioridad.icon]} />
                    <Text>{prioridad.name}</Text>
                  </HStack>
                </Badge>
                
                <Badge colorScheme={comunicacion.color} variant="outline">
                  <HStack spacing={1}>
                    <Icon as={iconMap[comunicacion.icon]} />
                    <Text>{comunicacion.name}</Text>
                  </HStack>
                </Badge>
              </VStack>
              
              <Badge colorScheme={estado.color} variant="solid" size="lg">
                <HStack spacing={1}>
                  <Icon as={iconMap[estado.icon]} />
                  <Text>{estado.name}</Text>
                </HStack>
              </Badge>
            </Flex>

            {/* Número de caso */}
            <Text fontSize="lg" fontWeight="bold" color={textColor} textAlign="center">
              Caso #{getShortCaseId(caso.ID, caso.usuario_ID)}
            </Text>

            {/* Información adicional */}
            <VStack spacing={3} align="stretch">
              <HStack justify="space-between">
                <HStack spacing={1}>
                  <Icon as={FaClock} color="gray.500" />
                  <Text fontSize="sm" color="gray.500">
                    {formatDuration(caso.start, caso.date_end)}
                  </Text>
                </HStack>
                
                <HStack spacing={1}>
                  <Icon as={FaTractor} color="gray.500" />
                  <Text fontSize="sm" color="gray.500">
                    {getEquiposCount(caso.equipos)}
                  </Text>
                </HStack>
              </HStack>

              <Divider />

              {/* Información del técnico */}
              <HStack>
                <Icon as={FaUser} color="gray.500" />
                <Text fontSize="sm" color={textColor}>
                  Técnico asignado: {caso.usuario_assigned_name}
                </Text>
              </HStack>

              <Divider />

              {/* Fecha de creación */}
              <HStack>
                <Icon as={FaCalendarAlt} color="gray.500" />
                <Text fontSize="sm" color={textColor}>
                  Creado el {formatFecha(caso.fecha)}
                </Text>
              </HStack>
            </VStack>

            {/* Estado del caso */}
            <Box textAlign="center">
              <Text fontSize="sm" color="gray.600" mb={2}>
                Estado del caso
              </Text>
              <Text fontWeight="bold" color={estado.color === 'green' ? 'green.600' : 'gray.600'}>
                {estado.name}
              </Text>
            </Box>

            {/* Acciones */}
            <ButtonGroup size="sm" width="100%" justifyContent="center">
              <Button
                leftIcon={<FaEye />}
                colorScheme="blue"
                variant="outline"
                onClick={() => console.log('Ver caso:', caso.ID)}
                flex="1"
              >
                Ver
              </Button>
              <IconButton
                icon={<FaFilePdf />}
                aria-label="PDF"
                colorScheme="red"
                variant="outline"
                onClick={() => console.log('PDF caso:', caso.ID)}
              />
            </ButtonGroup>
          </VStack>
        </CardBody>
      </Card>
    );
  };

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
          <Box>
            <Text fontSize="2xl" fontWeight="bold" color={textColor}>
              Lista de Casos
            </Text>
            <Text color="gray.500">
              {filteredCasos.length} casos encontrados
            </Text>
          </Box>
          
          {/* Controles de vista */}
          <ButtonGroup isAttached>
            <Tooltip label="Vista compacta">
              <IconButton
                icon={<FaList />}
                aria-label="Vista compacta"
                isActive={viewMode === 'compact'}
                onClick={() => setViewMode('compact')}
              />
            </Tooltip>
            <Tooltip label="Vista normal">
              <IconButton
                icon={<FaThLarge />}
                aria-label="Vista normal"
                isActive={viewMode === 'normal'}
                onClick={() => setViewMode('normal')}
              />
            </Tooltip>
            <Tooltip label="Vista tarjetas">
              <IconButton
                icon={<FaTh />}
                aria-label="Vista tarjetas"
                isActive={viewMode === 'cards'}
                onClick={() => setViewMode('cards')}
              />
            </Tooltip>
          </ButtonGroup>
        </Flex>

        {/* Filtros */}
        <Box p={4} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="md">
          <Grid templateColumns={{ base: "1fr", md: "2fr 1fr 1fr 1fr" }} gap={4}>
            <GridItem>
              <InputGroup>
                <InputLeftElement>
                  <Icon as={FaSearch} color="gray.500" />
                </InputLeftElement>
                <Input
                  placeholder="Buscar por número de caso o técnico..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  bg={bgColor}
                />
              </InputGroup>
            </GridItem>
            
            <GridItem>
              <Select
                placeholder="Filtrar por estado"
                value={filterEstado}
                onChange={(e) => setFilterEstado(e.target.value)}
                bg={bgColor}
              >
                <option value="1">Creado</option>
                <option value="2">Asignado</option>
                <option value="3">En Proceso</option>
                <option value="4">Pausado</option>
                <option value="5">Terminado</option>
                <option value="6">Cancelado</option>
              </Select>
            </GridItem>
            
            <GridItem>
              <Select
                placeholder="Filtrar por prioridad"
                value={filterPrioridad}
                onChange={(e) => setFilterPrioridad(e.target.value)}
                bg={bgColor}
              >
                <option value="1">Alta</option>
                <option value="2">Media</option>
                <option value="3">Baja</option>
              </Select>
            </GridItem>
            
            <GridItem>
              <Select
                placeholder="Filtrar por segmento"
                value={filterSegmento}
                onChange={(e) => setFilterSegmento(e.target.value)}
                bg={bgColor}
              >
                <option value="1">Agricultura</option>
                <option value="2">Ganadería</option>
                <option value="3">Construcción</option>
              </Select>
            </GridItem>
          </Grid>
        </Box>

        {/* Lista de casos */}
        {viewMode === 'compact' && (
          <VStack spacing={2} align="stretch">
            {filteredCasos.map((caso) => (
              <CompactCasoView key={caso.ID} caso={caso} />
            ))}
          </VStack>
        )}

        {viewMode === 'normal' && (
          <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={4}>
            {filteredCasos.map((caso) => (
              <GridItem key={caso.ID}>
                <NormalCasoView caso={caso} />
              </GridItem>
            ))}
          </Grid>
        )}

        {viewMode === 'cards' && (
          <SimpleGrid columns={cardColumns} spacing={4}>
            {filteredCasos.map((caso) => (
              <CardCasoView key={caso.ID} caso={caso} />
            ))}
          </SimpleGrid>
        )}

        {/* Mensaje cuando no hay resultados */}
        {filteredCasos.length === 0 && (
          <Box textAlign="center" py={10}>
            <Text fontSize="lg" color="gray.500">
              No se encontraron casos que coincidan con los filtros aplicados
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default CasosList;
