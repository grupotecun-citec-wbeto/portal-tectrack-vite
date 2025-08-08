// @ts-nocheck
import React, { useState, useMemo } from 'react';
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
  SimpleGrid,
  Icon,
  InputGroup,
  InputLeftElement,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tooltip,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Avatar
} from '@chakra-ui/react';
import Card from "@dashboard/components/Card/Card.jsx";
import CardBody from "@dashboard/components/Card/CardBody.jsx";
import { 
  FaSearch,
  FaFilter,
  FaTh,
  FaList,
  FaThLarge,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaUser,
  FaGasPump,
  FaBus,
  FaEye,
  FaEdit,
  FaCheckCircle,
  FaClock,
  FaTimes,
  FaFileExport
} from 'react-icons/fa';
import { 
  viaticosMockData,
  getEstadoViaticoInfo,
  getTipoCombustibleInfo,
  formatMoneda,
  formatFechaViatico,
  calcularTotalViaticos,
  getViaticosPorEstado,
  getViaticosPorFecha
} from '@dashboard/data/viaticosMockData';

const ViaticosList = () => {
  const [viewMode, setViewMode] = useState('cards'); // 'compact', 'normal', 'cards'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('');
  const [filterTecnico, setFilterTecnico] = useState('');
  const [filterFechaInicio, setFilterFechaInicio] = useState('');
  const [filterFechaFin, setFilterFechaFin] = useState('');

  const textColor = useColorModeValue('gray.700', 'white');
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Responsive columns
  const cardColumns = useBreakpointValue({ base: 1, md: 2, lg: 3, xl: 4 });

  // Iconos para diferentes elementos
  const iconMap = {
    check: FaCheckCircle,
    clock: FaClock,
    x: FaTimes
  };

  // Filtrar viáticos
  const filteredViaticos = useMemo(() => {
    return viaticosMockData.filter(viatico => {
      const matchesSearch = searchTerm === '' || 
        viatico.caso_numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
        viatico.tecnico_name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesEstado = filterEstado === '' || viatico.estado === filterEstado;
      const matchesTecnico = filterTecnico === '' || viatico.tecnico_ID.toString() === filterTecnico;
      
      let matchesFecha = true;
      if (filterFechaInicio && filterFechaFin) {
        const fechaViatico = new Date(viatico.fecha_ingreso);
        const fechaInicio = new Date(filterFechaInicio);
        const fechaFin = new Date(filterFechaFin);
        matchesFecha = fechaViatico >= fechaInicio && fechaViatico <= fechaFin;
      }

      return matchesSearch && matchesEstado && matchesTecnico && matchesFecha;
    });
  }, [searchTerm, filterEstado, filterTecnico, filterFechaInicio, filterFechaFin]);

  // Estadísticas
  const totalViaticos = calcularTotalViaticos(filteredViaticos);
  const viaticosPendientes = filteredViaticos.filter(v => v.estado === 'Pendiente').length;
  const viaticosAprobados = filteredViaticos.filter(v => v.estado === 'Aprobado').length;
  const viaticosRechazados = filteredViaticos.filter(v => v.estado === 'Rechazado').length;

  // Obtener técnicos únicos
  const tecnicos = [...new Set(viaticosMockData.map(v => ({ 
    id: v.tecnico_ID, 
    name: v.tecnico_name 
  })))].reduce((acc, current) => {
    const x = acc.find(item => item.id === current.id);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  // Componente para vista compacta
  const CompactViaticoView = ({ viatico }) => {
    const estado = getEstadoViaticoInfo(viatico.estado);
    
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
          <Badge colorScheme={estado.color} size="sm">
            <HStack spacing={1}>
              <Icon as={iconMap[estado.icon]} />
              <Text>{estado.name}</Text>
            </HStack>
          </Badge>
          
          <Text fontWeight="medium" fontSize="sm">
            Caso #{viatico.caso_numero}
          </Text>
          
          <Text fontSize="sm" color="gray.500">
            {viatico.tecnico_name}
          </Text>
        </HStack>
        
        <HStack spacing={2}>
          <Text fontSize="sm" fontWeight="bold" color="green.500">
            {formatMoneda(viatico.monto_total)}
          </Text>
          
          <Text fontSize="xs" color="gray.500">
            {formatFechaViatico(viatico.fecha_ingreso)}
          </Text>
          
          <ButtonGroup size="sm" variant="ghost">
            <Tooltip label="Ver detalles">
              <IconButton
                icon={<FaEye />}
                aria-label="Ver viático"
                size="sm"
                onClick={() => console.log('Ver viático:', viatico.ID)}
              />
            </Tooltip>
          </ButtonGroup>
        </HStack>
      </Flex>
    );
  };

  // Componente para vista normal
  const NormalViaticoView = ({ viatico }) => {
    const estado = getEstadoViaticoInfo(viatico.estado);
    const tipoCombustible = getTipoCombustibleInfo(viatico.combustibles.tipo);
    const totalAlimentacion = viatico.desayuno + viatico.almuerzo + viatico.cena;
    
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
              <Badge colorScheme={estado.color}>
                <HStack spacing={1}>
                  <Icon as={iconMap[estado.icon]} />
                  <Text>{estado.name}</Text>
                </HStack>
              </Badge>
              <Text fontSize="sm" fontWeight="bold" color={textColor}>
                Caso #{viatico.caso_numero}
              </Text>
            </HStack>
            
            <Text fontSize="lg" fontWeight="bold" color="green.500">
              {formatMoneda(viatico.monto_total)}
            </Text>
          </Flex>

          {/* Información del técnico */}
          <HStack>
            <Icon as={FaUser} color="gray.500" />
            <Text fontSize="sm" color={textColor}>
              {viatico.tecnico_name}
            </Text>
          </HStack>

          {/* Fecha */}
          <HStack>
            <Icon as={FaCalendarAlt} color="gray.500" />
            <Text fontSize="sm" color={textColor}>
              {formatFechaViatico(viatico.fecha_ingreso)}
            </Text>
          </HStack>

          {/* Desglose de gastos */}
          <Grid templateColumns="repeat(2, 1fr)" gap={2}>
            <HStack>
              <Text fontSize="xs" color="gray.500">Alimentación:</Text>
              <Text fontSize="sm" fontWeight="medium">{formatMoneda(totalAlimentacion)}</Text>
            </HStack>
            <HStack>
              <Text fontSize="xs" color="gray.500">Hospedaje:</Text>
              <Text fontSize="sm" fontWeight="medium">{formatMoneda(viatico.hospedaje)}</Text>
            </HStack>
            <HStack>
              <Text fontSize="xs" color="gray.500">Combustible:</Text>
              <Text fontSize="sm" fontWeight="medium">{formatMoneda(viatico.combustibles.monto_total)}</Text>
            </HStack>
            <HStack>
              <Text fontSize="xs" color="gray.500">Transporte:</Text>
              <Text fontSize="sm" fontWeight="medium">{formatMoneda(viatico.transporte)}</Text>
            </HStack>
          </Grid>

          {/* Acciones */}
          <Flex justify="flex-end">
            <ButtonGroup size="sm">
              <Button
                leftIcon={<FaEye />}
                variant="outline"
                size="sm"
                onClick={() => console.log('Ver viático:', viatico.ID)}
              >
                Ver
              </Button>
            </ButtonGroup>
          </Flex>
        </VStack>
      </Box>
    );
  };

  // Componente para vista de tarjetas
  const CardViaticoView = ({ viatico }) => {
    const estado = getEstadoViaticoInfo(viatico.estado);
    const tipoCombustible = getTipoCombustibleInfo(viatico.combustibles.tipo);
    const totalAlimentacion = viatico.desayuno + viatico.almuerzo + viatico.cena;
    
    return (
      <Card
        _hover={{ 
          transform: 'translateY(-4px)', 
          boxShadow: 'xl',
          borderColor: estado.color === 'green' ? 'green.300' : estado.color === 'red' ? 'red.300' : 'yellow.300'
        }}
        transition="all 0.3s"
        borderWidth="2px"
        borderColor={borderColor}
        bg={bgColor}
      >
        <CardBody>
          <VStack align="stretch" spacing={4}>
            {/* Header con estado */}
            <Flex justify="space-between" align="start">
              <Badge colorScheme={estado.color} size="lg">
                <HStack spacing={1}>
                  <Icon as={iconMap[estado.icon]} />
                  <Text>{estado.name}</Text>
                </HStack>
              </Badge>
              
              <Text fontSize="lg" fontWeight="bold" color="green.500">
                {formatMoneda(viatico.monto_total)}
              </Text>
            </Flex>

            {/* Número de caso */}
            <Text fontSize="lg" fontWeight="bold" color={textColor} textAlign="center">
              Caso #{viatico.caso_numero}
            </Text>

            {/* Información del técnico */}
            <HStack justify="center">
              <Avatar size="sm" name={viatico.tecnico_name} />
              <Text fontSize="sm" color={textColor}>
                {viatico.tecnico_name}
              </Text>
            </HStack>

            {/* Fecha */}
            <HStack justify="center">
              <Icon as={FaCalendarAlt} color="gray.500" />
              <Text fontSize="sm" color={textColor}>
                {formatFechaViatico(viatico.fecha_ingreso)}
              </Text>
            </HStack>

            {/* Desglose de gastos */}
            <VStack spacing={2} align="stretch">
              <Flex justify="space-between">
                <Text fontSize="sm" color="gray.500">Alimentación:</Text>
                <Text fontSize="sm" fontWeight="medium">{formatMoneda(totalAlimentacion)}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text fontSize="sm" color="gray.500">Hospedaje:</Text>
                <Text fontSize="sm" fontWeight="medium">{formatMoneda(viatico.hospedaje)}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text fontSize="sm" color="gray.500">Combustible:</Text>
                <Text fontSize="sm" fontWeight="medium">{formatMoneda(viatico.combustibles.monto_total)}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text fontSize="sm" color="gray.500">Transporte:</Text>
                <Text fontSize="sm" fontWeight="medium">{formatMoneda(viatico.transporte)}</Text>
              </Flex>
            </VStack>

            {/* Observaciones */}
            {viatico.observaciones && (
              <Box>
                <Text fontSize="xs" color="gray.500" mb={1}>Observaciones:</Text>
                <Text fontSize="sm" color={textColor} noOfLines={2}>
                  {viatico.observaciones}
                </Text>
              </Box>
            )}

            {/* Acciones */}
            <Button
              leftIcon={<FaEye />}
              colorScheme="blue"
              variant="outline"
              onClick={() => console.log('Ver viático:', viatico.ID)}
              width="100%"
            >
              Ver Detalles
            </Button>
          </VStack>
        </CardBody>
      </Card>
    );
  };

  return (
    <Box pt={{ base: "120px", md: "75px" }} px={6} pb={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
          <Box>
            <Text fontSize="2xl" fontWeight="bold" color={textColor}>
              Lista de Viáticos
            </Text>
            <Text color="gray.500">
              {filteredViaticos.length} viático{filteredViaticos.length !== 1 ? 's' : ''} encontrado{filteredViaticos.length !== 1 ? 's' : ''}
            </Text>
          </Box>
          
          {/* Controles de vista */}
          <HStack spacing={4}>
            <Button
              leftIcon={<FaFileExport />}
              variant="outline"
              onClick={() => console.log('Exportar viáticos')}
            >
              Exportar
            </Button>
            
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
          </HStack>
        </Flex>

        {/* Estadísticas */}
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
                  {filteredViaticos.length} registro{filteredViaticos.length !== 1 ? 's' : ''}
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Aprobados</StatLabel>
                <StatNumber color="green.500">
                  {viaticosAprobados}
                </StatNumber>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Pendientes</StatLabel>
                <StatNumber color="yellow.500">
                  {viaticosPendientes}
                </StatNumber>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Rechazados</StatLabel>
                <StatNumber color="red.500">
                  {viaticosRechazados}
                </StatNumber>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Filtros */}
        <Box p={4} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="md">
          <Grid templateColumns={{ base: "1fr", md: "2fr 1fr 1fr 1fr 1fr" }} gap={4}>
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
                <option value="Pendiente">Pendiente</option>
                <option value="Aprobado">Aprobado</option>
                <option value="Rechazado">Rechazado</option>
              </Select>
            </GridItem>
            
            <GridItem>
              <Select
                placeholder="Filtrar por técnico"
                value={filterTecnico}
                onChange={(e) => setFilterTecnico(e.target.value)}
                bg={bgColor}
              >
                {tecnicos.map(tecnico => (
                  <option key={tecnico.id} value={tecnico.id}>
                    {tecnico.name}
                  </option>
                ))}
              </Select>
            </GridItem>
            
            <GridItem>
              <Input
                type="date"
                placeholder="Fecha inicio"
                value={filterFechaInicio}
                onChange={(e) => setFilterFechaInicio(e.target.value)}
                bg={bgColor}
              />
            </GridItem>
            
            <GridItem>
              <Input
                type="date"
                placeholder="Fecha fin"
                value={filterFechaFin}
                onChange={(e) => setFilterFechaFin(e.target.value)}
                bg={bgColor}
              />
            </GridItem>
          </Grid>
        </Box>

        {/* Lista de viáticos */}
        {viewMode === 'compact' && (
          <VStack spacing={2} align="stretch">
            {filteredViaticos.map((viatico) => (
              <CompactViaticoView key={viatico.ID} viatico={viatico} />
            ))}
          </VStack>
        )}

        {viewMode === 'normal' && (
          <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={4}>
            {filteredViaticos.map((viatico) => (
              <GridItem key={viatico.ID}>
                <NormalViaticoView viatico={viatico} />
              </GridItem>
            ))}
          </Grid>
        )}

        {viewMode === 'cards' && (
          <SimpleGrid columns={cardColumns} spacing={4}>
            {filteredViaticos.map((viatico) => (
              <CardViaticoView key={viatico.ID} viatico={viatico} />
            ))}
          </SimpleGrid>
        )}

        {/* Mensaje cuando no hay resultados */}
        {filteredViaticos.length === 0 && (
          <Box textAlign="center" py={10}>
            <Icon as={FaMoneyBillWave} fontSize="3xl" color="gray.400" mb={4} />
            <Text fontSize="lg" color="gray.500">
              No se encontraron viáticos que coincidan con los filtros aplicados
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default ViaticosList;
