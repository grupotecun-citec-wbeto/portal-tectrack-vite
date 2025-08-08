// @ts-nocheck
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Flex,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  Textarea,
  Select,
  Checkbox,
  Radio,
  RadioGroup,
  Stack,
  SimpleGrid,
  useToast,
  Badge,
} from '@chakra-ui/react';
import { FiUser, FiSettings, FiCheck, FiMail, FiShield, FiBell, FiMoon, FiZap, FiGlobe, FiLock, FiGitBranch, FiHeadphones, FiBookOpen, FiTool, FiStar, FiAlertTriangle, FiRefreshCw, FiSearch, FiGrid, FiList, FiEye, FiFilter, FiClipboard, FiEdit3, FiPlus, FiMaximize2, FiMinimize2 } from 'react-icons/fi';
import Card from '@dashboard/components/Card/Card';
import CardHeader from '@dashboard/components/Card/CardHeader';
import CardBody from '@dashboard/components/Card/CardBody';
import { Wizard, WizardStepContent } from '@dashboard/components/Wizard';
import TreeView from '@dashboard/components/TreeView/TreeView';

import { segments, caseTypes, equipmentData, treeData } from '@dashboard/data/wizardCreateCasoMockData';

function WizardCreateCaso() {
  const textColor = useColorModeValue('gray.700', 'white');
  const toast = useToast();
  
  // Form data state
  const [formData, setFormData] = useState({
    // Step 1: Segment Selection
    selectedSegment: '',
    
    // Step 2: Case Type Selection
    selectedCaseType: '',
    
    // Step 3: Equipment Search
    searchTerm: '',
    selectedEquipment: [],
    viewMode: 'cards', // 'compact', 'normal', 'cards'
    
    // Step 4: Equipment Diagnostics
    equipmentDiagnostics: {}, // { equipmentId: { diagnosticData } }
    equipmentSystems: {}, // { equipmentId: [systemIds] }
    
    // Removed steps 5-9: Personal Info, Preferences, Features, Tree Selection, Additional Info
  });



  // Memoizar updateFormData para mejor rendimiento
  const updateFormData = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  // Funciones para la búsqueda de equipos
  const filteredEquipment = equipmentData.filter(equipment => {
    if (!formData.searchTerm) return true;
    
    const searchTerm = formData.searchTerm.toLowerCase();
    return (
      equipment.serie?.toLowerCase().includes(searchTerm) ||
      equipment.serie_extra?.toLowerCase().includes(searchTerm) ||
      equipment.chasis?.toLowerCase().includes(searchTerm) ||
      equipment.codigo_finca?.toLowerCase().includes(searchTerm) ||
      equipment.cliente_name?.toLowerCase().includes(searchTerm) ||
      equipment.proyecto_name?.toLowerCase().includes(searchTerm) ||
      equipment.categoria_name?.toLowerCase().includes(searchTerm) ||
      equipment.marca_name?.toLowerCase().includes(searchTerm) ||
      equipment.modelo_name?.toLowerCase().includes(searchTerm)
    );
  });

  // Memoizar handleEquipmentSelection para mejor rendimiento
  const handleEquipmentSelection = useCallback((equipmentId) => {
    const currentSelection = formData.selectedEquipment;
    const isSelected = currentSelection.includes(equipmentId);
    
    if (isSelected) {
      updateFormData('selectedEquipment', currentSelection.filter(id => id !== equipmentId));
    } else {
      updateFormData('selectedEquipment', [...currentSelection, equipmentId]);
    }
  }, [formData.selectedEquipment, updateFormData]);

  // Memoizar selectAllVisibleEquipment para mejor rendimiento
  const selectAllVisibleEquipment = useCallback(() => {
    const visibleIds = filteredEquipment.map(eq => eq.id);
    updateFormData('selectedEquipment', visibleIds);
  }, [filteredEquipment, updateFormData]);

  // Memoizar clearEquipmentSelection para mejor rendimiento
  const clearEquipmentSelection = useCallback(() => {
    updateFormData('selectedEquipment', []);
  }, [updateFormData]);

  // Funciones para diagnósticos de equipos (memoizadas para mejor rendimiento)
  const updateEquipmentDiagnostic = useCallback((equipmentId, diagnosticData) => {
    const updatedDiagnostics = {
      ...formData.equipmentDiagnostics,
      [equipmentId]: diagnosticData
    };
    updateFormData('equipmentDiagnostics', updatedDiagnostics);
  }, [formData.equipmentDiagnostics, updateFormData]);

  const removeDiagnostic = useCallback((equipmentId) => {
    const updatedDiagnostics = { ...formData.equipmentDiagnostics };
    delete updatedDiagnostics[equipmentId];
    updateFormData('equipmentDiagnostics', updatedDiagnostics);
  }, [formData.equipmentDiagnostics, updateFormData]);

  const getSelectedEquipmentWithDiagnostics = useCallback(() => {
    return formData.selectedEquipment.map(equipId => {
      const equipment = equipmentData.find(eq => eq.id === equipId);
      const diagnostic = formData.equipmentDiagnostics[equipId];
      return {
        ...equipment,
        diagnostic: diagnostic || null
      };
    });
  }, [formData.selectedEquipment, formData.equipmentDiagnostics, equipmentData]);

  // Funciones globales para TreeView (utilizadas en múltiples componentes)
  const getSelectionStats = useCallback((selectedIds) => {
    if (!selectedIds || selectedIds.length === 0) return { sistemas: 0, subsistemas: 0, servicios: 0 };

    const selectedItems = selectedIds.map(id => treeData.find(item => item.id === id)).filter(Boolean);
    
    const stats = {
      sistemas: selectedItems.filter(item => item.type === "Sistema" && !item.parentId).length,
      subsistemas: selectedItems.filter(item => item.type === "Sistema" && item.parentId).length,
      servicios: selectedItems.filter(item => item.type === "Servicio").length
    };

    return stats;
  }, [treeData]);

  // Nueva función para obtener la ruta completa de navegación
  const getFullPath = useCallback((itemId) => {
    const path = [];
    let currentItem = treeData.find(item => item.id === itemId);
    
    while (currentItem) {
      path.unshift({
        id: currentItem.id,
        name: currentItem.name,
        type: currentItem.type,
        description: currentItem.description,
        icon: currentItem.icon
      });
      
      if (currentItem.parentId) {
        currentItem = treeData.find(item => item.id === currentItem.parentId);
      } else {
        currentItem = null;
      }
    }
    
    return path;
  }, [treeData]);

  // Nueva función para organizar las selecciones con rutas completas
  const organizeTreeSelectionWithPaths = useCallback((selectedIds) => {
    if (!selectedIds || selectedIds.length === 0) return [];

    const selectedItems = selectedIds.map(id => treeData.find(item => item.id === id)).filter(Boolean);
    const selectionPaths = [];

    selectedItems.forEach(item => {
      const fullPath = getFullPath(item.id);
      selectionPaths.push({
        selectedItem: item,
        fullPath: fullPath,
        pathString: fullPath.map(p => p.name).join(' > ')
      });
    });

    // Agrupar por sistema padre para una mejor organización
    const groupedBySystem = {};
    selectionPaths.forEach(selection => {
      const systemId = selection.fullPath[0].id;
      if (!groupedBySystem[systemId]) {
        groupedBySystem[systemId] = {
          sistema: selection.fullPath[0],
          selections: []
        };
      }
      groupedBySystem[systemId].selections.push(selection);
    });

    return Object.values(groupedBySystem);
  }, [treeData, getFullPath]);

  const organizeTreeSelection = useCallback((selectedIds) => {
    if (!selectedIds || selectedIds.length === 0) return [];

    const selectedItems = selectedIds.map(id => treeData.find(item => item.id === id)).filter(Boolean);
    const organized = {};

    selectedItems.forEach(item => {
      if (item.type === "Sistema") {
        // Si es un sistema padre (sin parentId)
        if (!item.parentId) {
          if (!organized[item.id]) {
            organized[item.id] = {
              sistema: {
                id: item.id,
                name: item.name,
                type: item.type,
                description: item.description
              },
              subsistemas: [],
              servicios: []
            };
          }
        } else {
          // Si es un subsistema (tiene parentId)
          const parentId = item.parentId;
          
          // Buscar el sistema padre
          const parentSystem = treeData.find(parent => parent.id === parentId);
          if (parentSystem) {
            if (!organized[parentId]) {
              organized[parentId] = {
                sistema: {
                  id: parentSystem.id,
                  name: parentSystem.name,
                  type: parentSystem.type,
                  description: parentSystem.description
                },
                subsistemas: [],
                servicios: []
              };
            }
            
            // Agregar el subsistema si no existe
            const existingSubsystem = organized[parentId].subsistemas.find(sub => sub.id === item.id);
            if (!existingSubsystem) {
              organized[parentId].subsistemas.push({
                id: item.id,
                name: item.name,
                type: item.type,
                description: item.description,
                servicios: []
              });
            }
          }
        }
      } else if (item.type === "Servicio") {
        // Si es un servicio
        const parentId = item.parentId;
        const parentSystem = treeData.find(parent => parent.id === parentId);
        
        if (parentSystem) {
          // Determinar si el padre es un sistema principal o subsistema
          if (!parentSystem.parentId) {
            // El padre es un sistema principal
            if (!organized[parentId]) {
              organized[parentId] = {
                sistema: {
                  id: parentSystem.id,
                  name: parentSystem.name,
                  type: parentSystem.type,
                  description: parentSystem.description
                },
                subsistemas: [],
                servicios: []
              };
            }
            
            organized[parentId].servicios.push({
              id: item.id,
              name: item.name,
              type: item.type,
              description: item.description,
              icon: item.icon
            });
          } else {
            // El padre es un subsistema
            const grandParentId = parentSystem.parentId;
            const grandParentSystem = treeData.find(gp => gp.id === grandParentId);
            
            if (grandParentSystem) {
              if (!organized[grandParentId]) {
                organized[grandParentId] = {
                  sistema: {
                    id: grandParentSystem.id,
                    name: grandParentSystem.name,
                    type: grandParentSystem.type,
                    description: grandParentSystem.description
                  },
                  subsistemas: [],
                  servicios: []
                };
              }
              
              // Encontrar o crear el subsistema
              let subsystem = organized[grandParentId].subsistemas.find(sub => sub.id === parentId);
              if (!subsystem) {
                subsystem = {
                  id: parentSystem.id,
                  name: parentSystem.name,
                  type: parentSystem.type,
                  description: parentSystem.description,
                  servicios: []
                };
                organized[grandParentId].subsistemas.push(subsystem);
              }
              
              // Agregar el servicio al subsistema
              subsystem.servicios.push({
                id: item.id,
                name: item.name,
                type: item.type,
                description: item.description,
                icon: item.icon
              });
            }
          }
        }
      }
    });

    return Object.values(organized);
  }, [treeData]);

  // Componente para vista compacta de equipos
  const CompactEquipmentView = ({ equipment, isSelected, onSelect }) => (
    <HStack
      p={2}
      borderWidth="1px"
      borderColor={isSelected ? 'blue.500' : 'gray.200'}
      borderRadius="md"
      bg={isSelected ? 'blue.50' : 'white'}
      cursor="pointer"
      _hover={{ bg: isSelected ? 'blue.100' : 'gray.50' }}
      onClick={() => onSelect(equipment.id)}
      spacing={3}
    >
      <Checkbox isChecked={isSelected} onChange={() => onSelect(equipment.id)} />
      <Text fontSize="sm" fontWeight="medium" flex="1" isTruncated>
        {equipment.modelo_name}
      </Text>
      <Text fontSize="xs" color="gray.600" minW="60px">
        {equipment.codigo_finca || equipment.serie || equipment.chasis || 'N/A'}
      </Text>
      <Text fontSize="xs" color="gray.500" minW="80px" textAlign="right">
        {equipment.marca_name}
      </Text>
    </HStack>
  );

  // Componente para vista normal de equipos
  const NormalEquipmentView = ({ equipment, isSelected, onSelect }) => (
    <Box
      p={4}
      borderWidth="1px"
      borderColor={isSelected ? 'blue.500' : 'gray.200'}
      borderRadius="md"
      bg={isSelected ? 'blue.50' : 'white'}
      cursor="pointer"
      _hover={{ bg: isSelected ? 'blue.100' : 'gray.50', transform: 'translateY(-1px)', boxShadow: 'md' }}
      onClick={() => onSelect(equipment.id)}
      transition="all 0.2s"
    >
      <HStack spacing={4} align="start">
        <Checkbox 
          isChecked={isSelected} 
          onChange={() => onSelect(equipment.id)}
          onClick={(e) => e.stopPropagation()}
        />
        <VStack align="start" spacing={2} flex="1">
          <HStack justify="space-between" w="100%">
            <Text fontSize="md" fontWeight="bold">
              {equipment.modelo_name}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {equipment.marca_name}
            </Text>
          </HStack>
          <SimpleGrid columns={3} spacing={4} w="100%" fontSize="sm">
            <Box>
              <Text color="gray.500" fontSize="xs">Categoría</Text>
              <Text>{equipment.categoria_name}</Text>
            </Box>
            <Box>
              <Text color="gray.500" fontSize="xs">Finca</Text>
              <Text>{equipment.codigo_finca || 'N/A'}</Text>
            </Box>
            <Box>
              <Text color="gray.500" fontSize="xs">Cliente</Text>
              <Text>{equipment.cliente_name || 'N/A'}</Text>
            </Box>
          </SimpleGrid>
          {equipment.serie && (
            <Text fontSize="xs" color="gray.600">
              Serie: {equipment.serie}
            </Text>
          )}
          {equipment.chasis && (
            <Text fontSize="xs" color="gray.600">
              Chasis: {equipment.chasis}
            </Text>
          )}
        </VStack>
      </HStack>
    </Box>
  );

  // Componente para vista de tarjetas de equipos
  const CardEquipmentView = ({ equipment, isSelected, onSelect }) => (
    <Box
      p={5}
      borderWidth="2px"
      borderColor={isSelected ? 'blue.400' : 'gray.200'}
      borderRadius="xl"
      bg={isSelected ? 'linear-gradient(135deg, blue.50 0%, blue.100 100%)' : 'white'}
      cursor="pointer"
      _hover={{ 
        bg: isSelected ? 'linear-gradient(135deg, blue.100 0%, blue.200 100%)' : 'gray.50', 
        transform: 'translateY(-4px)', 
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
        borderColor: isSelected ? 'blue.500' : 'gray.300'
      }}
      onClick={() => onSelect(equipment.id)}
      transition="all 0.3s ease"
      position="relative"
      boxShadow={isSelected ? '0 8px 25px rgba(59, 130, 246, 0.15)' : '0 4px 15px rgba(0, 0, 0, 0.08)'}
    >
      <VStack spacing={4} align="stretch">
        {/* Header con checkbox mejorado */}
        <HStack justify="flex-start" align="center">
          <Checkbox 
            isChecked={isSelected} 
            onChange={() => onSelect(equipment.id)}
            onClick={(e) => e.stopPropagation()}
            colorScheme="blue"
            size="lg"
          />
          {isSelected && (
            <Text fontSize="xs" color="blue.600" fontWeight="bold">
              SELECCIONADO
            </Text>
          )}
        </HStack>

        {/* Imagen centrada con efectos mejorados */}
        {equipment.catalogo_img && (
          <Flex justify="center" align="center" w="100%" py={2}>
            <Box
              w="120px"
              h="120px"
              borderRadius="xl"
              overflow="hidden"
              bg="gradient-to-br from-gray.50 to-gray.100"
              boxShadow="0 8px 25px rgba(0, 0, 0, 0.1)"
              border="3px solid"
              borderColor={isSelected ? 'blue.400' : 'white'}
              position="relative"
              _hover={{
                transform: 'scale(1.05)',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
                borderColor: isSelected ? 'blue.500' : 'gray.200'
              }}
              transition="all 0.3s ease"
            >
              <img
                src={equipment.catalogo_img}
                alt={equipment.modelo_name}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
              {/* Overlay sutil para mejorar contraste */}
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bg="linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.08) 100%)"
                borderRadius="8px"
              />
            </Box>
          </Flex>
        )}

        {/* Información principal mejorada */}
        <VStack align="start" spacing={3}>
          <Text 
            fontSize="xl" 
            fontWeight="bold" 
            color={isSelected ? 'blue.700' : 'gray.800'}
            textAlign="center"
            w="100%"
            noOfLines={2}
          >
            {equipment.modelo_name}
          </Text>
          <HStack justify="space-between" w="100%" align="center">
            <Box
              px={3}
              py={1}
              bg={isSelected ? 'blue.100' : 'blue.50'}
              borderRadius="full"
              border="1px solid"
              borderColor={isSelected ? 'blue.200' : 'blue.100'}
            >
              <Text 
                fontSize="xs" 
                color="blue.700" 
                fontWeight="bold"
                textTransform="uppercase"
              >
                {equipment.categoria_name}
              </Text>
            </Box>
            <Text 
              fontSize="sm" 
              color="gray.600"
              fontWeight="semibold"
            >
              {equipment.marca_name}
            </Text>
          </HStack>
        </VStack>

        {/* Información detallada mejorada para mejor legibilidad */}
        <Box
          p={4}
          bg={isSelected ? 'blue.25' : 'gray.50'}
          borderRadius="lg"
          border="1px solid"
          borderColor={isSelected ? 'blue.100' : 'gray.200'}
        >
          <VStack align="start" spacing={3}>
            <Text 
              fontSize="sm" 
              fontWeight="bold" 
              color="gray.700" 
              textTransform="uppercase"
              letterSpacing="wide"
              mb={1}
            >
              Detalles del Equipo
            </Text>
            
            <VStack spacing={3} w="100%" align="stretch">
              {/* Información básica */}
              <VStack spacing={2} align="stretch">
                <Box>
                  <Text fontSize="xs" color="gray.500" fontWeight="medium" mb={1}>
                    Departamento
                  </Text>
                  <Text fontSize="sm" color="gray.800" fontWeight="semibold" lineHeight="1.3">
                    {equipment.subdivision_name || 'N/A'}
                  </Text>
                </Box>
                
                <Box>
                  <Text fontSize="xs" color="gray.500" fontWeight="medium" mb={1}>
                    Proyecto
                  </Text>
                  <Text 
                    fontSize="sm" 
                    color="gray.800" 
                    fontWeight="semibold"
                    lineHeight="1.3"
                    noOfLines={2}
                  >
                    {equipment.proyecto_name || 'N/A'}
                  </Text>
                </Box>
                
                <Box>
                  <Text fontSize="xs" color="gray.500" fontWeight="medium" mb={1}>
                    Cliente
                  </Text>
                  <Text 
                    fontSize="sm" 
                    color="gray.800" 
                    fontWeight="semibold"
                    lineHeight="1.3"
                    noOfLines={2}
                  >
                    {equipment.cliente_name || 'N/A'}
                  </Text>
                </Box>
              </VStack>

              {/* Estado y código en badges */}
              <VStack spacing={2} align="stretch">
                <Box>
                  <Text fontSize="xs" color="gray.500" fontWeight="medium" mb={2}>
                    Estado
                  </Text>
                  <Box 
                    px={3} 
                    py={2} 
                    bg="green.100" 
                    borderRadius="lg"
                    border="1px solid green.200"
                    textAlign="center"
                  >
                    <Text color="green.700" fontSize="sm" fontWeight="bold" lineHeight="1.2">
                      {equipment.estado_maquinaria || 'N/A'}
                    </Text>
                  </Box>
                </Box>
                
                <Box>
                  <Text fontSize="xs" color="gray.500" fontWeight="medium" mb={2}>
                    Propietario
                  </Text>
                  <Text 
                    fontSize="sm" 
                    color="gray.800" 
                    fontWeight="semibold"
                    lineHeight="1.3"
                    noOfLines={2}
                  >
                    {equipment.propietario_name || 'N/A'}
                  </Text>
                </Box>
                
                <Box>
                  <Text fontSize="xs" color="gray.500" fontWeight="medium" mb={2}>
                    Código de Referencia
                  </Text>
                  <Box
                    px={3}
                    py={2}
                    bg="blue.50"
                    borderRadius="lg"
                    border="1px solid blue.200"
                    textAlign="center"
                  >
                    <Text 
                      color="blue.700" 
                      fontFamily="mono" 
                      fontSize="sm"
                      fontWeight="bold"
                      lineHeight="1.2"
                      wordBreak="break-all"
                    >
                      {equipment.codigo_finca || equipment.serie || equipment.chasis || 'N/A'}
                    </Text>
                  </Box>
                </Box>
              </VStack>
            </VStack>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );

  // Componente para mostrar equipo con opción de diagnóstico (memoizado para rendimiento)
  const EquipmentDiagnosticCard = React.memo(({ equipment, diagnostic, onUpdateDiagnostic, onRemoveDiagnostic }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [localDiagnostic, setLocalDiagnostic] = useState(diagnostic || {
      problema_reportado: '',
      sintomas: '',
      condiciones_operacion: '',
      notas_adicionales: '',
      prioridad: 'media',
      fecha_reporte: new Date().toISOString().split('T')[0]
    });

    // Estado local para sistemas seleccionados - evita dependencias externas que causen re-renders
    const [localSelectedSystems, setLocalSelectedSystems] = useState(() => {
      return formData.equipmentSystems?.[equipment.id] || [];
    });

    // Ultra-optimización: Refs para inputs no controlados - elimina re-renders
    const problemaRef = useRef(null);
    const sintomasRef = useRef(null);
    const condicionesRef = useRef(null);
    const notasRef = useRef(null);
    const prioridadRef = useRef(null);
    const fechaRef = useRef(null);

    // Estados ultra optimizados - eliminando throttle para máximo rendimiento
    const [inputValues, setInputValues] = useState({
      problema_reportado: localDiagnostic.problema_reportado,
      sintomas: localDiagnostic.sintomas,
      condiciones_operacion: localDiagnostic.condiciones_operacion,
      notas_adicionales: localDiagnostic.notas_adicionales,
      prioridad: localDiagnostic.prioridad,
      fecha_reporte: localDiagnostic.fecha_reporte
    });

    // Ref para evitar renders innecesarios
    const lastUpdateRef = useRef({});

    // Sincronizar inputValues cuando cambie el diagnóstico externo (ultra optimizado)
    useEffect(() => {
      const newDiagnostic = diagnostic || {
        problema_reportado: '',
        sintomas: '',
        condiciones_operacion: '',
        notas_adicionales: '',
        prioridad: 'media',
        fecha_reporte: new Date().toISOString().split('T')[0]
      };
      
      // Actualizar ref para evitar loops
      lastUpdateRef.current = newDiagnostic;
      
      // Actualización directa sin requestAnimationFrame para mejor rendimiento
      setLocalDiagnostic(newDiagnostic);
      setInputValues({
        problema_reportado: newDiagnostic.problema_reportado,
        sintomas: newDiagnostic.sintomas,
        condiciones_operacion: newDiagnostic.condiciones_operacion,
        notas_adicionales: newDiagnostic.notas_adicionales,
        prioridad: newDiagnostic.prioridad,
        fecha_reporte: newDiagnostic.fecha_reporte
      });

      // Actualizar refs de inputs para evitar re-renders
      if (problemaRef.current) problemaRef.current.value = newDiagnostic.problema_reportado || '';
      if (sintomasRef.current) sintomasRef.current.value = newDiagnostic.sintomas || '';
      if (condicionesRef.current) condicionesRef.current.value = newDiagnostic.condiciones_operacion || '';
      if (notasRef.current) notasRef.current.value = newDiagnostic.notas_adicionales || '';
      if (prioridadRef.current) prioridadRef.current.value = newDiagnostic.prioridad || 'media';
      if (fechaRef.current) fechaRef.current.value = newDiagnostic.fecha_reporte || '';
    }, [diagnostic]);

    // Efecto para sincronizar sistemas seleccionados con formData cuando cambie externamente
    useEffect(() => {
      const externalSelection = formData.equipmentSystems?.[equipment.id] || [];
      // Solo actualizar si es diferente del estado local actual para evitar loops
      // Usar una comparación más eficiente
      setLocalSelectedSystems(current => {
        // Comparación rápida por longitud primero
        if (externalSelection.length !== current.length) {
          return externalSelection;
        }
        // Si tienen la misma longitud, comparar contenido
        const hasChanges = externalSelection.some((id, index) => id !== current[index]);
        return hasChanges ? externalSelection : current;
      });
    }, [formData.equipmentSystems, equipment.id]);

    // Función ultra optimizada para manejar selección de TreeView
    const handleTreeViewSelection = useCallback((node, selectedNodes) => {
      // SOLO actualizar estado local inmediatamente para mantener la UI responsive
      const selectedArray = Array.from(selectedNodes);
      setLocalSelectedSystems(selectedArray);
      
      // NO actualizar formData aquí para evitar re-renders que cierren el formulario
      // El formData se actualizará solo cuando se guarde o cancele
    }, []);

    // Memoizar props del TreeView para evitar re-renders innecesarios
    const treeViewProps = useMemo(() => ({
      data: treeData,
      onSelect: handleTreeViewSelection,
      showCheckboxes: true,
      title: `Sistemas para ${equipment.modelo_name}`,
      selectedItems: localSelectedSystems
    }), [treeData, handleTreeViewSelection, equipment.modelo_name, localSelectedSystems]);

    // Handlers ultra-optimizados individuales para cada campo - máximo rendimiento
    const handleProblemaChange = useCallback((e) => {
      const value = e.target.value;
      lastUpdateRef.current.problema_reportado = value;
      setLocalDiagnostic(prev => ({ ...prev, problema_reportado: value }));
    }, []);

    const handleSintomasChange = useCallback((e) => {
      const value = e.target.value;
      lastUpdateRef.current.sintomas = value;
      setLocalDiagnostic(prev => ({ ...prev, sintomas: value }));
    }, []);

    const handleCondicionesChange = useCallback((e) => {
      const value = e.target.value;
      lastUpdateRef.current.condiciones_operacion = value;
      setLocalDiagnostic(prev => ({ ...prev, condiciones_operacion: value }));
    }, []);

    const handleNotasChange = useCallback((e) => {
      const value = e.target.value;
      lastUpdateRef.current.notas_adicionales = value;
      setLocalDiagnostic(prev => ({ ...prev, notas_adicionales: value }));
    }, []);

    const handlePrioridadChange = useCallback((e) => {
      const value = e.target.value;
      lastUpdateRef.current.prioridad = value;
      setLocalDiagnostic(prev => ({ ...prev, prioridad: value }));
    }, []);

    const handleFechaChange = useCallback((e) => {
      const value = e.target.value;
      lastUpdateRef.current.fecha_reporte = value;
      setLocalDiagnostic(prev => ({ ...prev, fecha_reporte: value }));
    }, []);

    // Memoizar funciones de manejo para evitar re-creaciones
    const handleSave = useCallback(() => {
      // Asegurar que los sistemas seleccionados se guarden en formData antes de cerrar
      const currentEquipmentSystems = formData.equipmentSystems || {};
      updateFormData('equipmentSystems', {
        ...currentEquipmentSystems,
        [equipment.id]: localSelectedSystems
      });
      
      onUpdateDiagnostic(equipment.id, localDiagnostic);
      setIsEditing(false);
      setIsFullscreen(false);
    }, [equipment.id, localDiagnostic, localSelectedSystems, onUpdateDiagnostic, formData.equipmentSystems, updateFormData]);

    const toggleFullscreen = useCallback(() => {
      setIsFullscreen(prev => !prev);
    }, []);

    const handleEditClick = useCallback(() => {
      // Sincronizar el estado local con formData al abrir la edición
      const currentSelection = formData.equipmentSystems?.[equipment.id] || [];
      setLocalSelectedSystems(currentSelection);
      setIsEditing(true);
    }, [formData.equipmentSystems, equipment.id]);

    const handleRemoveClick = useCallback(() => {
      onRemoveDiagnostic(equipment.id);
    }, [equipment.id, onRemoveDiagnostic]);

    const handleCancel = () => {
      const newDiagnostic = diagnostic || {
        problema_reportado: '',
        sintomas: '',
        condiciones_operacion: '',
        notas_adicionales: '',
        prioridad: 'media',
        fecha_reporte: new Date().toISOString().split('T')[0]
      };
      
      // Actualizar ref
      lastUpdateRef.current = newDiagnostic;
      
      setLocalDiagnostic(newDiagnostic);
      setInputValues({
        problema_reportado: newDiagnostic.problema_reportado,
        sintomas: newDiagnostic.sintomas,
        condiciones_operacion: newDiagnostic.condiciones_operacion,
        notas_adicionales: newDiagnostic.notas_adicionales,
        prioridad: newDiagnostic.prioridad,
        fecha_reporte: newDiagnostic.fecha_reporte
      });

      // Actualizar refs de inputs
      if (problemaRef.current) problemaRef.current.value = newDiagnostic.problema_reportado || '';
      if (sintomasRef.current) sintomasRef.current.value = newDiagnostic.sintomas || '';
      if (condicionesRef.current) condicionesRef.current.value = newDiagnostic.condiciones_operacion || '';
      if (notasRef.current) notasRef.current.value = newDiagnostic.notas_adicionales || '';
      if (prioridadRef.current) prioridadRef.current.value = newDiagnostic.prioridad || 'media';
      if (fechaRef.current) fechaRef.current.value = newDiagnostic.fecha_reporte || '';

      // Restaurar las selecciones del TreeView a su estado original
      const originalSelection = formData.equipmentSystems?.[equipment.id] || [];
      setLocalSelectedSystems(originalSelection);

      setIsEditing(false);
      setIsFullscreen(false);
    };

    const getPriorityColor = (priority) => {
      switch (priority) {
        case 'alta': return 'red';
        case 'media': return 'yellow';
        case 'baja': return 'green';
        default: return 'gray';
      }
    };

    return (
      <>
        <Box
          p={5}
          borderWidth="2px"
          borderColor={diagnostic ? 'green.200' : 'gray.200'}
          borderRadius="xl"
          bg={diagnostic ? 'green.50' : 'white'}
          transition="all 0.3s ease"
          position="relative"
          overflow="hidden"
          _hover={{
            borderColor: diagnostic ? 'green.400' : 'gray.400',
            boxShadow: 'lg',
            bg: diagnostic ? 'green.100' : 'gray.50',
          }}
        >
          <VStack spacing={4} align="stretch">
            {/* Header con información del equipo */}
            <HStack justify="space-between" align="flex-start">
              <VStack align="start" spacing={1}>
                <Text fontSize="lg" fontWeight="bold" color="gray.800">
                  {equipment.modelo_name}
                </Text>
                <HStack spacing={3}>
                  <Text fontSize="sm" color="blue.600" fontWeight="medium">
                    {equipment.categoria_name}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {equipment.marca_name}
                  </Text>
                </HStack>
                <Text fontSize="xs" color="gray.500" fontFamily="mono">
                  {equipment.codigo_finca || equipment.serie || equipment.chasis || 'N/A'}
                </Text>
              </VStack>

              <HStack spacing={2}>
                {diagnostic && !isEditing && (
                  <Box
                    px={3}
                    py={1}
                    bg={`${getPriorityColor(diagnostic.prioridad)}.100`}
                    borderRadius="full"
                    border="1px solid"
                    borderColor={`${getPriorityColor(diagnostic.prioridad)}.200`}
                  >
                    <Text
                      fontSize="xs"
                      color={`${getPriorityColor(diagnostic.prioridad)}.700`}
                      fontWeight="bold"
                      textTransform="uppercase"
                    >
                      {diagnostic.prioridad}
                    </Text>
                  </Box>
                )}
                
                {/* Botón de pantalla completa - solo visible cuando se está editando */}
                {isEditing && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={toggleFullscreen}
                    aria-label={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
                    _hover={{ bg: 'gray.100' }}
                  >
                    {isFullscreen ? <FiMinimize2 /> : <FiMaximize2 />}
                  </Button>
                )}
                
                {!isEditing ? (
                  <HStack spacing={2}>
                    <Button
                      size="sm"
                      leftIcon={diagnostic ? <FiEdit3 /> : <FiPlus />}
                      onClick={handleEditClick}
                      colorScheme="blue"
                      variant={diagnostic ? "outline" : "solid"}
                    >
                      {diagnostic ? 'Editar' : 'Agregar'} Diagnóstico
                    </Button>
                    {diagnostic && (
                      <Button
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                        onClick={handleRemoveClick}
                      >
                        Eliminar
                      </Button>
                    )}
                  </HStack>
                ) : (
                  <HStack spacing={2}>
                    <Button size="sm" colorScheme="green" onClick={handleSave}>
                      Guardar
                    </Button>
                    <Button size="sm" variant="ghost" onClick={handleCancel}>
                      Cancelar
                    </Button>
                  </HStack>
                )}
              </HStack>
            </HStack>

          {/* Mostrar diagnóstico existente o formulario de edición */}
          {diagnostic && !isEditing ? (
            <Box
              p={4}
              bg="white"
              borderRadius="lg"
              border="1px solid"
              borderColor="green.100"
              boxShadow="sm"
              transition="all 0.2s ease"
              _hover={{
                borderColor: "green.200",
                boxShadow: "md",
                bg: "green.25"
              }}
            >
              <VStack align="start" spacing={3}>
                <Text fontSize="sm" fontWeight="bold" color="gray.700">
                  Diagnóstico Registrado
                </Text>
                
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3} w="100%">
                  <Box>
                    <Text fontSize="xs" color="gray.500" fontWeight="medium" mb={1}>
                      Problema Reportado
                    </Text>
                    <Text fontSize="sm" color="gray.800">
                      {diagnostic.problema_reportado || 'No especificado'}
                    </Text>
                  </Box>
                  
                  <Box>
                    <Text fontSize="xs" color="gray.500" fontWeight="medium" mb={1}>
                      Síntomas
                    </Text>
                    <Text fontSize="sm" color="gray.800">
                      {diagnostic.sintomas || 'No especificado'}
                    </Text>
                  </Box>
                  
                  <Box>
                    <Text fontSize="xs" color="gray.500" fontWeight="medium" mb={1}>
                      Condiciones de Operación
                    </Text>
                    <Text fontSize="sm" color="gray.800">
                      {diagnostic.condiciones_operacion || 'No especificado'}
                    </Text>
                  </Box>
                  
                  <Box>
                    <Text fontSize="xs" color="gray.500" fontWeight="medium" mb={1}>
                      Fecha de Reporte
                    </Text>
                    <Text fontSize="sm" color="gray.800">
                      {diagnostic.fecha_reporte || 'No especificado'}
                    </Text>
                  </Box>
                </SimpleGrid>

                {diagnostic.notas_adicionales && (
                  <Box w="100%">
                    <Text fontSize="xs" color="gray.500" fontWeight="medium" mb={1}>
                      Notas Adicionales
                    </Text>
                    <Text fontSize="sm" color="gray.800">
                      {diagnostic.notas_adicionales}
                    </Text>
                  </Box>
                )}

                {/* Resumen de sistemas y servicios asociados al diagnóstico */}
                {(() => {
                  const localSelectedSystems = formData.equipmentSystems[equipment.id] || [];
                  return localSelectedSystems.length > 0 && (
                    <Box
                      mt={3}
                      p={3}
                      bg="blue.50"
                      borderRadius="md"
                      border="1px solid"
                      borderColor="blue.200"
                    >
                      <VStack align="start" spacing={2}>
                        <HStack justify="space-between" w="100%">
                          <Text fontSize="xs" fontWeight="medium" color="blue.700">
                            Sistemas y Servicios Asociados ({localSelectedSystems.length} elementos):
                          </Text>
                          <HStack spacing={1}>
                            {(() => {
                              const stats = getSelectionStats(localSelectedSystems);
                              return (
                                <>
                                  <Badge size="xs" colorScheme="blue">{stats.sistemas} S</Badge>
                                  <Badge size="xs" colorScheme="green">{stats.subsistemas} Sub</Badge>
                                  <Badge size="xs" colorScheme="orange">{stats.servicios} Srv</Badge>
                                </>
                              );
                            })()}
                          </HStack>
                        </HStack>
                        
                        {/* Lista compacta de sistemas principales */}
                        <VStack spacing={1} w="100%" align="stretch">
                          {organizeTreeSelectionWithPaths(localSelectedSystems).slice(0, 2).map(systemGroup => (
                            <Box 
                              key={systemGroup.sistema.id} 
                              p={2} 
                              bg="white" 
                              borderRadius="md" 
                              border="1px solid" 
                              borderColor="blue.100"
                            >
                              <HStack spacing={2} w="100%">
                                <Box w={2} h={2} bg="blue.500" borderRadius="full" flexShrink={0} />
                                <VStack align="start" spacing={0} flex="1" minW={0}>
                                  <Text fontSize="xs" fontWeight="medium" color="blue.700" noOfLines={1}>
                                    {systemGroup.sistema.name}
                                  </Text>
                                  <Text fontSize="xs" color="gray.600" noOfLines={1}>
                                    {systemGroup.selections.length} elemento(s) seleccionado(s)
                                  </Text>
                                </VStack>
                              </HStack>
                            </Box>
                          ))}
                          
                          {/* Mostrar indicador si hay más sistemas */}
                          {organizeTreeSelectionWithPaths(localSelectedSystems).length > 2 && (
                            <Text fontSize="xs" color="gray.500" textAlign="center" mt={1}>
                              +{organizeTreeSelectionWithPaths(localSelectedSystems).length - 2} sistema(s) más...
                            </Text>
                          )}
                        </VStack>
                      </VStack>
                    </Box>
                  );
                })()}
              </VStack>
            </Box>
          ) : isEditing ? (
            <Box
              p={4}
              bg="blue.50"
              borderRadius="lg"
              border="1px solid"
              borderColor="blue.100"
              boxShadow="sm"
              transition="all 0.2s ease"
              _hover={{
                borderColor: "blue.200",
                boxShadow: "md",
                bg: "blue.75"
              }}
            >
              <VStack spacing={4} align="stretch">
                <Text fontSize="sm" fontWeight="bold" color="blue.700">
                  {diagnostic ? 'Editar' : 'Agregar'} Diagnóstico
                </Text>
                
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl>
                    <FormLabel fontSize="sm">Problema Reportado</FormLabel>
                    <Textarea
                      ref={problemaRef}
                      defaultValue={inputValues.problema_reportado}
                      onChange={handleProblemaChange}
                      placeholder="Describe el problema principal..."
                      size="sm"
                      rows={3}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">Síntomas Observados</FormLabel>
                    <Textarea
                      ref={sintomasRef}
                      defaultValue={inputValues.sintomas}
                      onChange={handleSintomasChange}
                      placeholder="Síntomas específicos..."
                      size="sm"
                      rows={3}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">Condiciones de Operación</FormLabel>
                    <Textarea
                      ref={condicionesRef}
                      defaultValue={inputValues.condiciones_operacion}
                      onChange={handleCondicionesChange}
                      placeholder="Condiciones cuando ocurrió el problema..."
                      size="sm"
                      rows={3}
                    />
                  </FormControl>

                  <VStack spacing={3} align="stretch">
                    <FormControl>
                      <FormLabel fontSize="sm">Prioridad</FormLabel>
                      <Select
                        ref={prioridadRef}
                        defaultValue={inputValues.prioridad}
                        onChange={handlePrioridadChange}
                        size="sm"
                      >
                        <option value="baja">Baja</option>
                        <option value="media">Media</option>
                        <option value="alta">Alta</option>
                      </Select>
                    </FormControl>

                    <FormControl>
                      <FormLabel fontSize="sm">Fecha de Reporte</FormLabel>
                      <Input
                        ref={fechaRef}
                        type="date"
                        defaultValue={inputValues.fecha_reporte}
                        onChange={handleFechaChange}
                        size="sm"
                      />
                    </FormControl>
                  </VStack>
                </SimpleGrid>

                <FormControl>
                  <FormLabel fontSize="sm">Notas Adicionales</FormLabel>
                  <Textarea
                    ref={notasRef}
                    defaultValue={inputValues.notas_adicionales}
                    onChange={handleNotasChange}
                    placeholder="Información adicional relevante..."
                    size="sm"
                    rows={2}
                  />
                </FormControl>

                {/* Sección de Sistemas y Servicios dentro del formulario de edición */}
                <Box
                  p={4}
                  bg="white"
                  borderRadius="lg"
                  border="1px solid"
                  borderColor="gray.200"
                  mt={4}
                >
                  <VStack spacing={4} align="stretch">
                    <Text fontSize="sm" fontWeight="bold" color="gray.700">
                      Sistemas y Servicios Relacionados
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      Selecciona los sistemas y servicios específicos para este equipo
                    </Text>
                    
                    <TreeView {...treeViewProps} />
                    
                    {/* Resumen detallado de sistemas y servicios seleccionados para este equipo */}
                    {localSelectedSystems && localSelectedSystems.length > 0 && (
                      <Box
                        p={3}
                        bg="gray.50"
                        borderRadius="md"
                        border="1px solid"
                        borderColor="gray.200"
                      >
                        <VStack align="start" spacing={3}>
                          <HStack justify="space-between" w="100%">
                            <Text fontSize="xs" fontWeight="medium" color="gray.700">
                              Sistemas y Servicios Seleccionados ({localSelectedSystems.length} elementos):
                            </Text>
                            <HStack spacing={2}>
                              {(() => {
                                const stats = getSelectionStats(localSelectedSystems);
                                return (
                                  <>
                                    <Badge size="sm" colorScheme="blue">{stats.sistemas} Sistemas</Badge>
                                    <Badge size="sm" colorScheme="green">{stats.subsistemas} Subsistemas</Badge>
                                    <Badge size="sm" colorScheme="orange">{stats.servicios} Servicios</Badge>
                                  </>
                                );
                              })()}
                            </HStack>
                          </HStack>
                          
                          {/* Mostrar rutas completas de selección */}
                          <VStack spacing={3} w="100%" align="stretch">
                            {organizeTreeSelectionWithPaths(localSelectedSystems).map(systemGroup => (
                              <Box 
                                key={systemGroup.sistema.id} 
                                p={3} 
                                bg="white" 
                                borderRadius="lg" 
                                border="1px solid" 
                                borderColor="blue.200"
                                boxShadow="sm"
                              >
                                {/* Sistema Principal */}
                                <VStack align="start" spacing={2}>
                                  <HStack spacing={2} w="100%">
                                    <Box w={3} h={3} bg="blue.500" borderRadius="full" />
                                    <VStack align="start" spacing={0} flex="1">
                                      <Text fontSize="sm" fontWeight="bold" color="blue.700">
                                        {systemGroup.sistema.name}
                                      </Text>
                                      <HStack spacing={2}>
                                        <Text fontSize="xs" color="gray.600">
                                          ID: {systemGroup.sistema.id}
                                        </Text>
                                        <Badge size="sm" colorScheme="blue">
                                          {systemGroup.sistema.type}
                                        </Badge>
                                      </HStack>
                                    </VStack>
                                  </HStack>

                                  {/* Lista de selecciones con rutas completas */}
                                  <Box pl={4} w="100%">
                                    <Text fontSize="xs" fontWeight="medium" color="gray.600" mb={2}>
                                      Elementos Seleccionados ({systemGroup.selections.length}):
                                    </Text>
                                    <VStack spacing={2} w="100%" align="stretch">
                                      {systemGroup.selections.map((selection, index) => (
                                        <Box 
                                          key={`${selection.selectedItem.id}-${index}`}
                                          p={3}
                                          bg="gray.50"
                                          borderRadius="md"
                                          border="1px solid"
                                          borderColor="gray.200"
                                        >
                                          {/* Ruta completa de navegación */}
                                          <VStack align="start" spacing={2}>
                                            <HStack spacing={1} flexWrap="wrap">
                                              {selection.fullPath.map((pathItem, pathIndex) => (
                                                <React.Fragment key={pathItem.id}>
                                                  {pathIndex > 0 && (
                                                    <Text fontSize="xs" color="gray.400" mx={1}>
                                                      →
                                                    </Text>
                                                  )}
                                                  <HStack spacing={1}>
                                                    <Box 
                                                      w={2} 
                                                      h={2} 
                                                      bg={
                                                        pathItem.type === "Sistema" && pathIndex === 0 ? "blue.500" :
                                                        pathItem.type === "Sistema" ? "green.400" :
                                                        "orange.400"
                                                      } 
                                                      borderRadius="full" 
                                                    />
                                                    <Text 
                                                      fontSize="xs" 
                                                      fontWeight={pathIndex === selection.fullPath.length - 1 ? "bold" : "medium"}
                                                      color={
                                                        pathItem.type === "Sistema" && pathIndex === 0 ? "blue.700" :
                                                        pathItem.type === "Sistema" ? "green.700" :
                                                        "orange.700"
                                                      }
                                                    >
                                                      {pathItem.name}
                                                    </Text>
                                                    <Badge 
                                                      size="xs" 
                                                      colorScheme={
                                                        pathItem.type === "Sistema" && pathIndex === 0 ? "blue" :
                                                        pathItem.type === "Sistema" ? "green" :
                                                        "orange"
                                                      }
                                                    >
                                                      {pathItem.type}
                                                    </Badge>
                                                  </HStack>
                                                </React.Fragment>
                                              ))}
                                            </HStack>
                                            
                                            {/* Información del elemento seleccionado */}
                                            <Box pl={4} pt={1} borderLeft="2px solid" borderColor="gray.300">
                                              <VStack align="start" spacing={1}>
                                                <Text fontSize="xs" color="gray.600">
                                                  <strong>Elemento Seleccionado:</strong> {selection.selectedItem.name}
                                                </Text>
                                                <Text fontSize="xs" color="gray.500">
                                                  ID: {selection.selectedItem.id}
                                                </Text>
                                                {selection.selectedItem.description && (
                                                  <Text fontSize="xs" color="gray.500" fontStyle="italic">
                                                    {selection.selectedItem.description}
                                                  </Text>
                                                )}
                                              </VStack>
                                            </Box>
                                          </VStack>
                                        </Box>
                                      ))}
                                    </VStack>
                                  </Box>
                                </VStack>
                              </Box>
                            ))}
                          </VStack>
                        </VStack>
                      </Box>
                    )}
                  </VStack>
                </Box>
              </VStack>
            </Box>
          ) : null}
        </VStack>
      </Box>

      {/* Modal de pantalla completa */}
      {isFullscreen && isEditing && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(0, 0, 0, 0.8)"
          zIndex={1000}
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={4}
        >
          <Box
            bg="white"
            borderRadius="xl"
            maxW="95vw"
            maxH="95vh"
            w="100%"
            h="100%"
            overflow="auto"
            boxShadow="2xl"
            position="relative"
          >
            {/* Header del modal con botón de cerrar */}
            <HStack
              justify="space-between"
              align="center"
              p={6}
              borderBottom="1px solid"
              borderColor="gray.200"
              bg="blue.50"
              borderTopRadius="xl"
              position="sticky"
              top={0}
              zIndex={1001}
            >
              <VStack align="start" spacing={1}>
                <Text fontSize="xl" fontWeight="bold" color="gray.800">
                  {diagnostic ? 'Editar' : 'Agregar'} Diagnóstico - {equipment.modelo_name}
                </Text>
                <HStack spacing={3}>
                  <Text fontSize="sm" color="blue.600" fontWeight="medium">
                    {equipment.categoria_name}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {equipment.marca_name}
                  </Text>
                  <Text fontSize="sm" color="gray.500" fontFamily="mono">
                    {equipment.codigo_finca || equipment.serie || equipment.chasis || 'N/A'}
                  </Text>
                </HStack>
              </VStack>

              <HStack spacing={2}>
                <Button size="sm" colorScheme="green" onClick={handleSave}>
                  Guardar
                </Button>
                <Button size="sm" variant="ghost" onClick={handleCancel}>
                  Cancelar
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={toggleFullscreen}
                  aria-label="Salir de pantalla completa"
                  _hover={{ bg: 'gray.100' }}
                >
                  <FiMinimize2 />
                </Button>
              </HStack>
            </HStack>

            {/* Contenido del formulario en pantalla completa */}
            <Box p={6}>
              <VStack spacing={6} align="stretch">
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  <FormControl>
                    <FormLabel fontSize="md">Problema Reportado</FormLabel>
                    <Textarea
                      defaultValue={inputValues.problema_reportado}
                      onChange={handleProblemaChange}
                      placeholder="Describe el problema principal..."
                      size="md"
                      rows={4}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="md">Síntomas Observados</FormLabel>
                    <Textarea
                      defaultValue={inputValues.sintomas}
                      onChange={handleSintomasChange}
                      placeholder="Síntomas específicos..."
                      size="md"
                      rows={4}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="md">Condiciones de Operación</FormLabel>
                    <Textarea
                      defaultValue={inputValues.condiciones_operacion}
                      onChange={handleCondicionesChange}
                      placeholder="Condiciones cuando ocurrió el problema..."
                      size="md"
                      rows={4}
                    />
                  </FormControl>
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                  <FormControl>
                    <FormLabel fontSize="md">Prioridad</FormLabel>
                    <Select
                      defaultValue={inputValues.prioridad}
                      onChange={handlePrioridadChange}
                      size="md"
                    >
                      <option value="baja">Baja</option>
                      <option value="media">Media</option>
                      <option value="alta">Alta</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="md">Fecha de Reporte</FormLabel>
                    <Input
                      type="date"
                      defaultValue={inputValues.fecha_reporte}
                      onChange={handleFechaChange}
                      size="md"
                    />
                  </FormControl>

                  <Box /> {/* Spacer */}
                </SimpleGrid>

                <FormControl>
                  <FormLabel fontSize="md">Notas Adicionales</FormLabel>
                  <Textarea
                    defaultValue={inputValues.notas_adicionales}
                    onChange={handleNotasChange}
                    placeholder="Información adicional relevante..."
                    size="md"
                    rows={3}
                  />
                </FormControl>

                {/* Sección de Sistemas y Servicios en pantalla completa */}
                <Box
                  p={6}
                  bg="gray.50"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="gray.200"
                >
                  <VStack spacing={4} align="stretch">
                    <Text fontSize="lg" fontWeight="bold" color="gray.700">
                      Sistemas y Servicios Relacionados
                    </Text>
                    <Text fontSize="md" color="gray.600">
                      Selecciona los sistemas y servicios específicos para este equipo
                    </Text>
                    
                    <TreeView {...treeViewProps} />
                    
                    {/* Resumen detallado de sistemas y servicios seleccionados para este equipo */}
                    {localSelectedSystems && localSelectedSystems.length > 0 && (
                      <Box
                        p={4}
                        bg="white"
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="gray.300"
                      >
                        <VStack align="start" spacing={4}>
                          <HStack justify="space-between" w="100%">
                            <Text fontSize="md" fontWeight="medium" color="gray.700">
                              Sistemas y Servicios Seleccionados ({localSelectedSystems.length} elementos):
                            </Text>
                            <HStack spacing={3}>
                              {(() => {
                                const stats = getSelectionStats(localSelectedSystems);
                                return (
                                  <>
                                    <Badge size="md" colorScheme="blue">{stats.sistemas} Sistemas</Badge>
                                    <Badge size="md" colorScheme="green">{stats.subsistemas} Subsistemas</Badge>
                                    <Badge size="md" colorScheme="orange">{stats.servicios} Servicios</Badge>
                                  </>
                                );
                              })()}
                            </HStack>
                          </HStack>
                          
                          {/* Mostrar rutas completas de selección */}
                          <VStack spacing={4} w="100%" align="stretch">
                            {organizeTreeSelectionWithPaths(localSelectedSystems).map(systemGroup => (
                              <Box 
                                key={systemGroup.sistema.id} 
                                p={4} 
                                bg="blue.50" 
                                borderRadius="xl" 
                                border="2px solid" 
                                borderColor="blue.200"
                                boxShadow="md"
                              >
                                {/* Sistema Principal */}
                                <VStack align="start" spacing={3}>
                                  <HStack spacing={3} w="100%">
                                    <Box w={4} h={4} bg="blue.500" borderRadius="full" />
                                    <VStack align="start" spacing={1} flex="1">
                                      <Text fontSize="lg" fontWeight="bold" color="blue.800">
                                        {systemGroup.sistema.name}
                                      </Text>
                                      <HStack spacing={3}>
                                        <Text fontSize="sm" color="gray.600">
                                          ID: {systemGroup.sistema.id}
                                        </Text>
                                        <Badge size="md" colorScheme="blue">
                                          {systemGroup.sistema.type}
                                        </Badge>
                                        <Text fontSize="xs" color="gray.500">
                                          {systemGroup.sistema.description}
                                        </Text>
                                      </HStack>
                                    </VStack>
                                  </HStack>

                                  {/* Lista de selecciones con rutas completas */}
                                  <Box pl={6} w="100%">
                                    <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={3}>
                                      Elementos Seleccionados ({systemGroup.selections.length}):
                                    </Text>
                                    <VStack spacing={3} w="100%" align="stretch">
                                      {systemGroup.selections.map((selection, index) => (
                                        <Box 
                                          key={`${selection.selectedItem.id}-${index}`}
                                          p={4}
                                          bg="white"
                                          borderRadius="lg"
                                          border="1px solid"
                                          borderColor="gray.300"
                                          boxShadow="sm"
                                        >
                                          {/* Ruta completa de navegación */}
                                          <VStack align="start" spacing={3}>
                                            <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>
                                              Ruta Jerárquica:
                                            </Text>
                                            <HStack spacing={2} flexWrap="wrap" pl={2}>
                                              {selection.fullPath.map((pathItem, pathIndex) => (
                                                <React.Fragment key={pathItem.id}>
                                                  {pathIndex > 0 && (
                                                    <Text fontSize="sm" color="gray.400" mx={2}>
                                                      →
                                                    </Text>
                                                  )}
                                                  <HStack 
                                                    spacing={2} 
                                                    p={2} 
                                                    bg={
                                                      pathItem.type === "Sistema" && pathIndex === 0 ? "blue.100" :
                                                      pathItem.type === "Sistema" ? "green.100" :
                                                      "orange.100"
                                                    }
                                                    borderRadius="md"
                                                    border="1px solid"
                                                    borderColor={
                                                      pathItem.type === "Sistema" && pathIndex === 0 ? "blue.300" :
                                                      pathItem.type === "Sistema" ? "green.300" :
                                                      "orange.300"
                                                    }
                                                  >
                                                    <Box 
                                                      w={3} 
                                                      h={3} 
                                                      bg={
                                                        pathItem.type === "Sistema" && pathIndex === 0 ? "blue.500" :
                                                        pathItem.type === "Sistema" ? "green.500" :
                                                        "orange.500"
                                                      } 
                                                      borderRadius="full" 
                                                    />
                                                    <VStack align="start" spacing={0}>
                                                      <Text 
                                                        fontSize="sm" 
                                                        fontWeight={pathIndex === selection.fullPath.length - 1 ? "bold" : "medium"}
                                                        color={
                                                          pathItem.type === "Sistema" && pathIndex === 0 ? "blue.800" :
                                                          pathItem.type === "Sistema" ? "green.800" :
                                                          "orange.800"
                                                        }
                                                      >
                                                        {pathItem.name}
                                                      </Text>
                                                      <HStack spacing={1}>
                                                        <Badge 
                                                          size="xs" 
                                                          colorScheme={
                                                            pathItem.type === "Sistema" && pathIndex === 0 ? "blue" :
                                                            pathItem.type === "Sistema" ? "green" :
                                                            "orange"
                                                          }
                                                        >
                                                          {pathItem.type}
                                                        </Badge>
                                                        <Text fontSize="xs" color="gray.500">
                                                          {pathItem.id}
                                                        </Text>
                                                      </HStack>
                                                    </VStack>
                                                  </HStack>
                                                </React.Fragment>
                                              ))}
                                            </HStack>
                                            
                                            {/* Información detallada del elemento seleccionado */}
                                            <Box 
                                              p={3} 
                                              bg="gray.50" 
                                              borderRadius="md" 
                                              border="1px solid" 
                                              borderColor="gray.300"
                                              w="100%"
                                            >
                                              <VStack align="start" spacing={2}>
                                                <Text fontSize="sm" fontWeight="bold" color="gray.700">
                                                  📍 Elemento Final Seleccionado:
                                                </Text>
                                                <HStack spacing={3} w="100%">
                                                  <Box 
                                                    w={4} 
                                                    h={4} 
                                                    bg={
                                                      selection.selectedItem.type === "Sistema" ? "blue.500" :
                                                      selection.selectedItem.type === "Subsistema" ? "green.500" :
                                                      "orange.500"
                                                    } 
                                                    borderRadius="full" 
                                                  />
                                                  <VStack align="start" spacing={1} flex="1">
                                                    <Text fontSize="md" fontWeight="bold">
                                                      {selection.selectedItem.name}
                                                    </Text>
                                                    <HStack spacing={2}>
                                                      <Text fontSize="sm" color="gray.600">
                                                        ID: {selection.selectedItem.id}
                                                      </Text>
                                                      <Badge 
                                                        size="sm" 
                                                        colorScheme={
                                                          selection.selectedItem.type === "Sistema" ? "blue" :
                                                          selection.selectedItem.type === "Subsistema" ? "green" :
                                                          "orange"
                                                        }
                                                      >
                                                        {selection.selectedItem.type}
                                                      </Badge>
                                                    </HStack>
                                                    {selection.selectedItem.description && (
                                                      <Text fontSize="sm" color="gray.600" fontStyle="italic">
                                                        {selection.selectedItem.description}
                                                      </Text>
                                                    )}
                                                  </VStack>
                                                </HStack>
                                              </VStack>
                                            </Box>
                                          </VStack>
                                        </Box>
                                      ))}
                                    </VStack>
                                  </Box>
                                </VStack>
                              </Box>
                            ))}
                          </VStack>
                        </VStack>
                      </Box>
                    )}
                  </VStack>
                </Box>
              </VStack>
            </Box>
          </Box>
        </Box>
      )}
    </>
    );
  }, (prevProps, nextProps) => {
    // Función de comparación personalizada para evitar re-renders innecesarios
    // Solo re-renderizar si las props importantes cambian
    return (
      prevProps.equipment.id === nextProps.equipment.id &&
      prevProps.diagnostic === nextProps.diagnostic &&
      prevProps.onUpdateDiagnostic === nextProps.onUpdateDiagnostic &&
      prevProps.onRemoveDiagnostic === nextProps.onRemoveDiagnostic
    );
  });

  // Handlers memoizados para optimizar rendimiento
  const handleSegmentSelection = useCallback((segmentId) => {
    updateFormData('selectedSegment', segmentId);
  }, [updateFormData]);

  const handleCaseTypeSelection = useCallback((caseTypeId) => {
    updateFormData('selectedCaseType', caseTypeId);
  }, [updateFormData]);

  const handleViewModeChange = useCallback((mode) => {
    updateFormData('viewMode', mode);
  }, [updateFormData]);

  const handleStepChange = (stepIndex, step) => {
    console.log(`Changed to step ${stepIndex}:`, step.title);
  };

  const handleComplete = () => {
    toast({
      title: '¡Wizard completado!',
      description: 'Todos los datos han sido guardados exitosamente.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    console.log('Form completed with data:', formData);
  };

  // Define wizard steps
  const wizardSteps = [
    {
      id: 0,
      title: 'Selección de Segmento',
      content: (
        <WizardStepContent
          title="Elige tu Segmento"
          description="Selecciona el área de servicio que mejor se adapte a tus necesidades"
          icon={FiStar}
        >
          <VStack spacing={6} align="stretch">
            <SimpleGrid 
              columns={{ base: 1, md: 3 }} 
              spacing={6}
            >
              {segments.map((segment) => {
                const isSelected = formData.selectedSegment === segment.id;
                return (
                  <Box
                    key={segment.id}
                    p={6}
                    border="2px solid"
                    borderColor={isSelected ? `${segment.color}.500` : 'gray.200'}
                    borderRadius="xl"
                    cursor="pointer"
                    transition="all 0.3s ease"
                    bg={isSelected ? `${segment.color}.50` : 'white'}
                    position="relative"
                    _hover={{
                      borderColor: `${segment.color}.400`,
                      boxShadow: 'lg',
                      bg: isSelected ? `${segment.color}.100` : `${segment.color}.50`
                    }}
                    _dark={{
                      bg: isSelected ? `${segment.color}.900` : 'gray.800',
                      borderColor: isSelected ? `${segment.color}.400` : 'gray.600',
                      _hover: {
                        borderColor: `${segment.color}.300`,
                        bg: isSelected ? `${segment.color}.800` : 'gray.700',
                        boxShadow: 'lg'
                      }
                    }}
                    onClick={() => handleSegmentSelection(segment.id)}
                  >
                    {/* Indicador de selección */}
                    {isSelected && (
                      <Box
                        position="absolute"
                        top={3}
                        right={3}
                        bg={`${segment.color}.500`}
                        color="white"
                        borderRadius="full"
                        p={1}
                      >
                        <FiCheck size={12} />
                      </Box>
                    )}
                    
                    {/* Icono */}
                    <VStack spacing={4} align="center" textAlign="center">
                      <Box
                        p={4}
                        borderRadius="full"
                        bg={`${segment.color}.100`}
                        color={`${segment.color}.600`}
                        _dark={{
                          bg: `${segment.color}.800`,
                          color: `${segment.color}.200`
                        }}
                      >
                        <segment.icon size={32} />
                      </Box>
                      
                      {/* Título */}
                      <Text
                        fontSize="xl"
                        fontWeight="bold"
                        color={isSelected ? `${segment.color}.700` : 'gray.700'}
                        _dark={{
                          color: isSelected ? `${segment.color}.200` : 'white'
                        }}
                      >
                        {segment.title}
                      </Text>
                      
                      {/* Descripción */}
                      <Text
                        fontSize="sm"
                        color="gray.600"
                        _dark={{ color: 'gray.400' }}
                        lineHeight="tall"
                      >
                        {segment.description}
                      </Text>
                      
                      {/* Características */}
                      <VStack spacing={1} align="stretch" w="100%">
                        {segment.features.map((feature, index) => (
                          <HStack key={index} spacing={2} justify="center">
                            <Box w={1} h={1} bg="gray.400" borderRadius="full" />
                            <Text fontSize="xs" color="gray.600" _dark={{ color: 'gray.400' }}>
                              {feature}
                            </Text>
                          </HStack>
                        ))}
                      </VStack>
                    </VStack>
                  </Box>
                );
              })}
            </SimpleGrid>
            
            {/* Información adicional */}
            {formData.selectedSegment && (
              <Alert status="info" borderRadius="md">
                <AlertIcon />
                <Box>
                  <Text fontWeight="semibold">
                    Has seleccionado: {segments.find(s => s.id === formData.selectedSegment)?.title}
                  </Text>
                  <Text fontSize="sm">
                    Continuaremos con la configuración específica para este segmento.
                  </Text>
                </Box>
              </Alert>
            )}
          </VStack>
        </WizardStepContent>
      ),
    },
    {
      id: 1,
      title: 'Tipo de Caso',
      content: (
        <WizardStepContent
          title="Selecciona el Tipo de Caso"
          description="Elige el tipo de caso según la naturaleza de tu solicitud"
          icon={FiSettings}
        >
          <VStack spacing={6} align="stretch">
            <SimpleGrid 
              columns={{ base: 1, md: 2 }} 
              spacing={6}
            >
              {caseTypes.map((caseType) => {
                const isSelected = formData.selectedCaseType === caseType.id;
                return (
                  <Box
                    key={caseType.id}
                    p={6}
                    border="2px solid"
                    borderColor={isSelected ? `${caseType.color}.500` : 'gray.200'}
                    borderRadius="xl"
                    cursor="pointer"
                    transition="all 0.3s ease"
                    bg={isSelected ? `${caseType.color}.50` : 'white'}
                    position="relative"
                    _hover={{
                      borderColor: `${caseType.color}.400`,
                      boxShadow: 'lg',
                      bg: isSelected ? `${caseType.color}.100` : `${caseType.color}.50`
                    }}
                    _dark={{
                      bg: isSelected ? `${caseType.color}.900` : 'gray.800',
                      borderColor: isSelected ? `${caseType.color}.400` : 'gray.600',
                      _hover: {
                        borderColor: `${caseType.color}.300`,
                        bg: isSelected ? `${caseType.color}.800` : 'gray.700',
                        boxShadow: 'lg'
                      }
                    }}
                    onClick={() => handleCaseTypeSelection(caseType.id)}
                  >
                    {/* Indicador de selección */}
                    {isSelected && (
                      <Box
                        position="absolute"
                        top={3}
                        right={3}
                        bg={`${caseType.color}.500`}
                        color="white"
                        borderRadius="full"
                        p={1}
                      >
                        <FiCheck size={12} />
                      </Box>
                    )}
                    
                    {/* Icono */}
                    <VStack spacing={4} align="center" textAlign="center">
                      <Box
                        p={4}
                        borderRadius="full"
                        bg={`${caseType.color}.100`}
                        color={`${caseType.color}.600`}
                        _dark={{
                          bg: `${caseType.color}.800`,
                          color: `${caseType.color}.200`
                        }}
                      >
                        <caseType.icon size={32} />
                      </Box>
                      
                      {/* Título */}
                      <Text
                        fontSize="xl"
                        fontWeight="bold"
                        color={isSelected ? `${caseType.color}.700` : 'gray.700'}
                        _dark={{
                          color: isSelected ? `${caseType.color}.200` : 'white'
                        }}
                      >
                        {caseType.title}
                      </Text>
                      
                      {/* Descripción */}
                      <Text
                        fontSize="sm"
                        color="gray.600"
                        _dark={{ color: 'gray.400' }}
                        lineHeight="tall"
                      >
                        {caseType.description}
                      </Text>
                      
                      {/* Características */}
                      <VStack spacing={1} align="stretch" w="100%">
                        {caseType.features.map((feature, index) => (
                          <HStack key={index} spacing={2} justify="center">
                            <Box w={1} h={1} bg="gray.400" borderRadius="full" />
                            <Text fontSize="xs" color="gray.600" _dark={{ color: 'gray.400' }}>
                              {feature}
                            </Text>
                          </HStack>
                        ))}
                      </VStack>
                    </VStack>
                  </Box>
                );
              })}
            </SimpleGrid>
            
            {/* Información adicional */}
            {formData.selectedCaseType && (
              <Alert status="info" borderRadius="md">
                <AlertIcon />
                <Box>
                  <Text fontWeight="semibold">
                    Has seleccionado: {caseTypes.find(c => c.id === formData.selectedCaseType)?.title}
                  </Text>
                  <Text fontSize="sm">
                    Los siguientes pasos se adaptarán según el tipo de caso seleccionado.
                  </Text>
                </Box>
              </Alert>
            )}
          </VStack>
        </WizardStepContent>
      ),
    },
    {
      id: 2,
      title: 'Búsqueda de Equipos',
      content: (
        <WizardStepContent
          title="Seleccionar Equipos"
          description="Busca y selecciona los equipos que necesitas"
          icon={FiSearch}
        >
          <VStack spacing={6} align="stretch">
            {/* Barra de búsqueda y controles - layout responsive */}
            <VStack spacing={4} align="stretch">
              {/* Layout móvil: input separado */}
              <VStack spacing={4} align="stretch" display={{ base: "flex", md: "none" }}>
                <FormControl>
                  <Input
                    placeholder="Buscar por serie, chasis, finca, cliente o proyecto..."
                    value={formData.searchTerm}
                    onChange={(e) => updateFormData('searchTerm', e.target.value)}
                    size="lg"
                  />
                </FormControl>
                
                <HStack spacing={2}>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={clearEquipmentSelection}
                    isDisabled={formData.selectedEquipment.length === 0}
                    flex="1"
                  >
                    Limpiar
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={selectAllVisibleEquipment}
                    isDisabled={filteredEquipment.length === 0}
                    flex="1"
                  >
                    Seleccionar Todos
                  </Button>
                </HStack>
              </VStack>

              {/* Layout desktop: input y botones en línea */}
              <HStack spacing={4} display={{ base: "none", md: "flex" }}>
                <FormControl flex="1">
                  <Input
                    placeholder="Buscar por serie, chasis, finca, cliente o proyecto..."
                    value={formData.searchTerm}
                    onChange={(e) => updateFormData('searchTerm', e.target.value)}
                  />
                </FormControl>
                <Button
                  size="md"
                  variant="outline"
                  onClick={clearEquipmentSelection}
                  isDisabled={formData.selectedEquipment.length === 0}
                >
                  Limpiar
                </Button>
                <Button
                  size="md"
                  colorScheme="blue"
                  onClick={selectAllVisibleEquipment}
                  isDisabled={filteredEquipment.length === 0}
                >
                  Seleccionar Todos
                </Button>
              </HStack>

              {/* Controles de vista - layout responsive */}
              <Stack 
                direction={{ base: "column", md: "row" }}
                spacing={{ base: 3, md: 4 }} 
                justify="space-between"
                align={{ base: "stretch", md: "center" }}
              >
                {/* Solo en móvil: título separado */}
                <Box display={{ base: "block", md: "none" }}>
                  <Text 
                    fontSize="sm" 
                    color="gray.600" 
                    fontWeight="medium"
                    textAlign="center"
                    mb={2}
                  >
                    Modo de Vista:
                  </Text>
                </Box>

                {/* Layout original para desktop, centrado para móvil */}
                <HStack 
                  spacing={{ base: 0, md: 2 }}
                  justify={{ base: "center", md: "flex-start" }}
                  align="center"
                >
                  {/* Título para desktop */}
                  <Text 
                    fontSize="sm" 
                    color="gray.600"
                    display={{ base: "none", md: "block" }}
                  >
                    Vista:
                  </Text>
                  
                  <HStack spacing={1}>
                    <Button
                      size="sm"
                      variant={formData.viewMode === 'compact' ? 'solid' : 'ghost'}
                      colorScheme="blue"
                      onClick={() => handleViewModeChange('compact')}
                      leftIcon={<FiList />}
                      flex={{ base: "1", md: "none" }}
                      minW={{ base: "90px", md: "auto" }}
                    >
                      Compacto
                    </Button>
                    <Button
                      size="sm"
                      variant={formData.viewMode === 'normal' ? 'solid' : 'ghost'}
                      colorScheme="blue"
                      onClick={() => handleViewModeChange('normal')}
                      leftIcon={<FiEye />}
                      flex={{ base: "1", md: "none" }}
                      minW={{ base: "90px", md: "auto" }}
                    >
                      Normal
                    </Button>
                    <Button
                      size="sm"
                      variant={formData.viewMode === 'cards' ? 'solid' : 'ghost'}
                      colorScheme="blue"
                      onClick={() => handleViewModeChange('cards')}
                      leftIcon={<FiGrid />}
                      flex={{ base: "1", md: "none" }}
                      minW={{ base: "90px", md: "auto" }}
                    >
                      Tarjetas
                    </Button>
                  </HStack>
                </HStack>
                
                {/* Contador de equipos - mantiene posición original en desktop */}
                <HStack 
                  spacing={2} 
                  justify={{ base: "center", md: "flex-end" }}
                  align="center"
                >
                  <Text fontSize="sm" color="gray.600">
                    {filteredEquipment.length} equipos encontrados
                  </Text>
                  {formData.selectedEquipment.length > 0 && (
                    <Text fontSize="sm" color="blue.600" fontWeight="medium">
                      ({formData.selectedEquipment.length} seleccionados)
                    </Text>
                  )}
                </HStack>
              </Stack>
            </VStack>

            {/* Lista de equipos con altura aumentada */}
            <Box
              maxH={{ base: "500px", md: "600px" }}
              overflowY="auto"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="md"
              p={2}
            >
              {filteredEquipment.length === 0 ? (
                <VStack spacing={4} py={8}>
                  <Text color="gray.500" textAlign="center">
                    {formData.searchTerm 
                      ? `No se encontraron equipos que coincidan con "${formData.searchTerm}"`
                      : "No hay equipos disponibles"
                    }
                  </Text>
                  {formData.searchTerm && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => updateFormData('searchTerm', '')}
                    >
                      Limpiar búsqueda
                    </Button>
                  )}
                </VStack>
              ) : (
                <VStack spacing={formData.viewMode === 'compact' ? 1 : 3} align="stretch">
                  {formData.viewMode === 'compact' && 
                    filteredEquipment.map((equipment) => (
                      <CompactEquipmentView
                        key={equipment.id}
                        equipment={equipment}
                        isSelected={formData.selectedEquipment.includes(equipment.id)}
                        onSelect={handleEquipmentSelection}
                      />
                    ))
                  }
                  
                  {formData.viewMode === 'normal' && 
                    filteredEquipment.map((equipment) => (
                      <NormalEquipmentView
                        key={equipment.id}
                        equipment={equipment}
                        isSelected={formData.selectedEquipment.includes(equipment.id)}
                        onSelect={handleEquipmentSelection}
                      />
                    ))
                  }
                  
                  {formData.viewMode === 'cards' && (
                    <SimpleGrid 
                      columns={{ base: 1, md: 2, lg: 3 }} 
                      spacing={4}
                    >
                      {filteredEquipment.map((equipment) => (
                        <CardEquipmentView
                          key={equipment.id}
                          equipment={equipment}
                          isSelected={formData.selectedEquipment.includes(equipment.id)}
                          onSelect={handleEquipmentSelection}
                        />
                      ))}
                    </SimpleGrid>
                  )}
                </VStack>
              )}
            </Box>

            {/* Información de selección */}
            {formData.selectedEquipment.length > 0 && (
              <Alert status="info" borderRadius="md">
                <AlertIcon />
                <Box>
                  <Text fontWeight="semibold">
                    {formData.selectedEquipment.length} equipo{formData.selectedEquipment.length !== 1 ? 's' : ''} seleccionado{formData.selectedEquipment.length !== 1 ? 's' : ''}
                  </Text>
                  <Text fontSize="sm">
                    Puedes continuar al siguiente paso para ingresar más detalles.
                  </Text>
                </Box>
              </Alert>
            )}
          </VStack>
        </WizardStepContent>
      ),
    },
    {
      id: 3,
      title: 'Diagnóstico de Equipos',
      content: (
        <WizardStepContent
          title="Diagnóstico de Equipos"
          description="Agrega información de diagnóstico a los equipos seleccionados"
          icon={FiClipboard}
        >
          <VStack spacing={6} align="stretch">
            {formData.selectedEquipment && formData.selectedEquipment.length > 0 ? (
              <Box
                maxH="600px"
                overflowY="auto"
                css={{
                  '&::-webkit-scrollbar': {
                    width: '8px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: '#f1f1f1',
                    borderRadius: '10px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: '#c1c1c1',
                    borderRadius: '10px',
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    background: '#a8a8a8',
                  },
                }}
              >
                <VStack spacing={4} align="stretch">
                  {formData.selectedEquipment.map((equipmentId) => {
                    const equipment = equipmentData.find(eq => eq.id === equipmentId);
                    if (!equipment) return null;
                    
                    return (
                      <EquipmentDiagnosticCard
                        key={equipment.id}
                        equipment={equipment}
                        diagnostic={formData.equipmentDiagnostics[equipment.id]}
                        onUpdateDiagnostic={updateEquipmentDiagnostic}
                        onRemoveDiagnostic={removeDiagnostic}
                      />
                    );
                  })}
                </VStack>
              </Box>
            ) : (
              <Box
                p={8}
                bg="gray.50"
                borderRadius="xl"
                border="2px dashed"
                borderColor="gray.300"
                textAlign="center"
              >
                <FiClipboard size={48} color="#A0AEC0" style={{ margin: '0 auto 16px' }} />
                <Text fontSize="lg" color="gray.500" fontWeight="medium">
                  No hay equipos seleccionados
                </Text>
                <Text fontSize="sm" color="gray.400" mt={2}>
                  Regresa al paso anterior para seleccionar equipos
                </Text>
              </Box>
            )}

            {/* Resumen de diagnósticos */}
            {formData.selectedEquipment && formData.selectedEquipment.length > 0 && (
              <Box
                p={4}
                bg="blue.50"
                borderRadius="lg"
                border="1px solid"
                borderColor="blue.200"
              >
                <VStack spacing={3} align="start">
                  <Text fontSize="sm" fontWeight="bold" color="blue.700">
                    Resumen de Diagnósticos
                  </Text>
                  <HStack spacing={6} wrap="wrap">
                    <HStack spacing={2}>
                      <Box w={3} h={3} bg="green.400" borderRadius="full" />
                      <Text fontSize="sm" color="gray.700">
                        Con diagnóstico: {Object.keys(formData.equipmentDiagnostics || {}).length}
                      </Text>
                    </HStack>
                    <HStack spacing={2}>
                      <Box w={3} h={3} bg="gray.300" borderRadius="full" />
                      <Text fontSize="sm" color="gray.700">
                        Pendientes: {(formData.selectedEquipment?.length || 0) - Object.keys(formData.equipmentDiagnostics || {}).length}
                      </Text>
                    </HStack>
                    <HStack spacing={2}>
                      <Box w={3} h={3} bg="blue.400" borderRadius="full" />
                      <Text fontSize="sm" color="gray.700">
                        Total equipos: {formData.selectedEquipment?.length || 0}
                      </Text>
                    </HStack>
                  </HStack>
                  
                  {Object.keys(formData.equipmentDiagnostics || {}).length > 0 && (
                    <VStack align="start" spacing={2} w="100%" mt={3}>
                      <Text fontSize="xs" fontWeight="medium" color="gray.600">
                        Equipos con diagnóstico:
                      </Text>
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2} w="100%">
                        {Object.keys(formData.equipmentDiagnostics || {}).map(equipmentId => {
                          const equipment = equipmentData.find(eq => eq.id === parseInt(equipmentId));
                          const diagnostic = formData.equipmentDiagnostics[equipmentId];
                          if (!equipment) return null;
                          
                          const getPriorityColor = (priority) => {
                            switch (priority) {
                              case 'alta': return 'red';
                              case 'media': return 'yellow';
                              case 'baja': return 'green';
                              default: return 'gray';
                            }
                          };
                          
                          return (
                            <HStack key={equipmentId} justify="space-between" p={2} bg="white" borderRadius="md" border="1px solid" borderColor="gray.200">
                              <VStack align="start" spacing={0}>
                                <Text fontSize="xs" fontWeight="medium" color="gray.800">
                                  {equipment.modelo_name}
                                </Text>
                                <Text fontSize="xs" color="gray.500">
                                  {equipment.codigo_finca || equipment.serie || 'N/A'}
                                </Text>
                              </VStack>
                              <Box
                                px={2}
                                py={1}
                                bg={`${getPriorityColor(diagnostic.prioridad)}.100`}
                                borderRadius="full"
                                border="1px solid"
                                borderColor={`${getPriorityColor(diagnostic.prioridad)}.200`}
                              >
                                <Text
                                  fontSize="xs"
                                  color={`${getPriorityColor(diagnostic.prioridad)}.700`}
                                  fontWeight="bold"
                                  textTransform="uppercase"
                                >
                                  {diagnostic.prioridad}
                                </Text>
                              </Box>
                            </HStack>
                          );
                        })}
                      </SimpleGrid>
                      
                      {/* Información detallada de sistemas y servicios por equipo */}
                      <Box w="100%" mt={4}>
                        <Text fontSize="xs" fontWeight="medium" color="gray.600" mb={3}>
                          Sistemas y Servicios Seleccionados por Equipo:
                        </Text>
                        <VStack spacing={3} w="100%" align="stretch">
                          {Object.keys(formData.equipmentDiagnostics || {}).map(equipmentId => {
                            const equipment = equipmentData.find(eq => eq.id === parseInt(equipmentId));
                            const equipmentSystems = formData.equipmentSystems?.[equipmentId] || [];
                            
                            if (!equipment || equipmentSystems.length === 0) return null;
                            
                            const organizedSystems = organizeTreeSelection(equipmentSystems);
                            
                            return (
                              <Box key={`systems-${equipmentId}`} p={3} bg="white" borderRadius="lg" border="1px solid" borderColor="gray.200">
                                <VStack align="start" spacing={2}>
                                  <Text fontSize="sm" fontWeight="bold" color="gray.800">
                                    {equipment.modelo_name} - {equipment.codigo_finca || equipment.serie || 'N/A'}
                                  </Text>
                                  
                                  {organizedSystems.map(systemGroup => (
                                    <Box key={`system-${systemGroup.sistema.id}`} pl={3} w="100%">
                                      <VStack align="start" spacing={1} w="100%">
                                        {/* Sistema Principal */}
                                        <HStack spacing={2}>
                                          <Box w={2} h={2} bg="blue.500" borderRadius="full" />
                                          <Text fontSize="xs" fontWeight="medium" color="blue.700">
                                            {systemGroup.sistema.name} (ID: {systemGroup.sistema.id})
                                          </Text>
                                        </HStack>
                                        
                                        {/* Subsistemas */}
                                        {systemGroup.subsistemas.map(subsistema => (
                                          <Box key={`sub-${subsistema.id}`} pl={4}>
                                            <HStack spacing={2}>
                                              <Box w={1.5} h={1.5} bg="green.400" borderRadius="full" />
                                              <Text fontSize="xs" color="green.600">
                                                {subsistema.name} (ID: {subsistema.id})
                                              </Text>
                                            </HStack>
                                            
                                            {/* Servicios del subsistema */}
                                            {subsistema.servicios.map(servicio => (
                                              <Box key={`sub-serv-${servicio.id}`} pl={6}>
                                                <HStack spacing={2}>
                                                  <Box w={1} h={1} bg="orange.400" borderRadius="full" />
                                                  <Text fontSize="xs" color="orange.600">
                                                    {servicio.name} (ID: {servicio.id})
                                                  </Text>
                                                </HStack>
                                              </Box>
                                            ))}
                                          </Box>
                                        ))}
                                        
                                        {/* Servicios directos */}
                                        {systemGroup.servicios.map(servicio => (
                                          <Box key={`serv-${servicio.id}`} pl={4}>
                                            <HStack spacing={2}>
                                              <Box w={1.5} h={1.5} bg="orange.400" borderRadius="full" />
                                              <Text fontSize="xs" color="orange.600">
                                                {servicio.name} (ID: {servicio.id})
                                              </Text>
                                            </HStack>
                                          </Box>
                                        ))}
                                      </VStack>
                                    </Box>
                                  ))}
                                </VStack>
                              </Box>
                            );
                          })}
                        </VStack>
                      </Box>
                    </VStack>
                  )}
                </VStack>
              </Box>
            )}
          </VStack>
        </WizardStepContent>
      ),
    },
    {
      id: 4,
      title: 'Confirmación',
      content: (
        <WizardStepContent
          title="Revisar Información"
          description="Verifica que toda la información sea correcta antes de continuar"
          icon={FiCheck}
        >
          <VStack spacing={4} align="stretch">
            <Alert status="info" borderRadius="md">
              <AlertIcon />
              <Text fontSize={{ base: "sm", md: "md" }}>
                Por favor revisa toda la información antes de finalizar.
              </Text>
            </Alert>
            
            <SimpleGrid 
              columns={{ base: 1, lg: 2 }}
              spacing={4}
            >
              <Box 
                p={{ base: 3, md: 4 }} 
                borderWidth="1px" 
                borderRadius="md" 
                bg={useColorModeValue('gray.50', 'gray.700')}
              >
                <Text fontWeight="bold" mb={2} fontSize={{ base: "sm", md: "md" }}>
                  Segmento Seleccionado:
                </Text>
                <VStack align="start" spacing={1} fontSize={{ base: "sm", md: "md" }}>
                  {formData.selectedSegment ? (
                    <>
                      <Text fontWeight="semibold" color={`${segments.find(s => s.id === formData.selectedSegment)?.color}.600`}>
                        {segments.find(s => s.id === formData.selectedSegment)?.title}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        {segments.find(s => s.id === formData.selectedSegment)?.description}
                      </Text>
                    </>
                  ) : (
                    <Text color="red.500">No seleccionado</Text>
                  )}
                </VStack>
              </Box>

              <Box 
                p={{ base: 3, md: 4 }} 
                borderWidth="1px" 
                borderRadius="md" 
                bg={useColorModeValue('gray.50', 'gray.700')}
              >
                <Text fontWeight="bold" mb={2} fontSize={{ base: "sm", md: "md" }}>
                  Tipo de Caso:
                </Text>
                <VStack align="start" spacing={1} fontSize={{ base: "sm", md: "md" }}>
                  {formData.selectedCaseType ? (
                    <>
                      <Text fontWeight="semibold" color={`${caseTypes.find(c => c.id === formData.selectedCaseType)?.color}.600`}>
                        {caseTypes.find(c => c.id === formData.selectedCaseType)?.title}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        {caseTypes.find(c => c.id === formData.selectedCaseType)?.description}
                      </Text>
                    </>
                  ) : (
                    <Text color="red.500">No seleccionado</Text>
                  )}
                </VStack>
              </Box>

              <Box 
                p={{ base: 3, md: 4 }} 
                borderWidth="1px" 
                borderRadius="md" 
                bg={useColorModeValue('gray.50', 'gray.700')}
              >
                <Text fontWeight="bold" mb={2} fontSize={{ base: "sm", md: "md" }}>
                  Equipos Seleccionados:
                </Text>
                <VStack align="start" spacing={2} fontSize={{ base: "sm", md: "md" }}>
                  {formData.selectedEquipment.length > 0 ? (
                    <>
                      <Text color="blue.600" fontWeight="medium">
                        {formData.selectedEquipment.length} equipo{formData.selectedEquipment.length !== 1 ? 's' : ''} seleccionado{formData.selectedEquipment.length !== 1 ? 's' : ''}
                      </Text>
                      <VStack align="start" spacing={1} w="100%">
                        {formData.selectedEquipment.slice(0, 3).map(equipId => {
                          const equipment = equipmentData.find(eq => eq.id === equipId);
                          return equipment ? (
                            <HStack key={equipId} justify="space-between" w="100%">
                              <Text fontSize="sm">{equipment.modelo_name}</Text>
                              <Text fontSize="xs" color="gray.600">
                                {equipment.codigo_finca || equipment.serie || equipment.chasis || 'N/A'}
                              </Text>
                            </HStack>
                          ) : null;
                        })}
                        {formData.selectedEquipment.length > 3 && (
                          <Text fontSize="xs" color="gray.500">
                            y {formData.selectedEquipment.length - 3} más...
                          </Text>
                        )}
                      </VStack>
                    </>
                  ) : (
                    <Text color="red.500">Ningún equipo seleccionado</Text>
                  )}
                </VStack>
              </Box>

              {/* Diagnósticos de Equipos */}
              {formData.equipmentDiagnostics && Object.keys(formData.equipmentDiagnostics).length > 0 && (
                <Box 
                  p={{ base: 3, md: 4 }} 
                  borderWidth="1px" 
                  borderRadius="md" 
                  bg={useColorModeValue('gray.50', 'gray.700')}
                >
                  <Text fontWeight="bold" mb={2} fontSize={{ base: "sm", md: "md" }}>
                    Diagnósticos de Equipos:
                  </Text>
                  <VStack align="start" spacing={2} fontSize={{ base: "sm", md: "md" }}>
                    <Text color="green.600" fontWeight="medium">
                      {Object.keys(formData.equipmentDiagnostics).length} equipo{Object.keys(formData.equipmentDiagnostics).length !== 1 ? 's' : ''} con diagnóstico
                    </Text>
                    <VStack align="start" spacing={1} w="100%">
                      {Object.keys(formData.equipmentDiagnostics).slice(0, 3).map(equipId => {
                        const equipment = equipmentData.find(eq => eq.id === parseInt(equipId));
                        const diagnostic = formData.equipmentDiagnostics[equipId];
                        return equipment ? (
                          <HStack key={equipId} justify="space-between" w="100%">
                            <Text fontSize="sm">{equipment.modelo_name}</Text>
                            <Text fontSize="xs" color={diagnostic.prioridad === 'alta' ? 'red.600' : diagnostic.prioridad === 'media' ? 'yellow.600' : 'green.600'}>
                              Prioridad: {diagnostic.prioridad}
                            </Text>
                          </HStack>
                        ) : null;
                      })}
                      {Object.keys(formData.equipmentDiagnostics).length > 3 && (
                        <Text fontSize="xs" color="gray.500">
                          y {Object.keys(formData.equipmentDiagnostics).length - 3} más...
                        </Text>
                      )}
                    </VStack>
                  </VStack>
                </Box>
              )}

              {/* Sistemas por Equipo */}
              {formData.equipmentSystems && Object.keys(formData.equipmentSystems).length > 0 && (
                <Box 
                  p={{ base: 3, md: 4 }} 
                  borderWidth="1px" 
                  borderRadius="md" 
                  bg={useColorModeValue('gray.50', 'gray.700')}
                >
                  <Text fontWeight="bold" mb={2} fontSize={{ base: "sm", md: "md" }}>
                    Sistemas Asignados por Equipo:
                  </Text>
                  <VStack align="start" spacing={3} fontSize={{ base: "sm", md: "md" }}>
                    {Object.keys(formData.equipmentSystems).map(equipId => {
                      const equipment = equipmentData.find(eq => eq.id === parseInt(equipId));
                      const systemIds = formData.equipmentSystems[equipId];
                      if (!equipment || !systemIds || systemIds.length === 0) return null;
                      
                      return (
                        <Box key={equipId} w="100%" p={3} bg="white" borderRadius="md" border="1px solid" borderColor="gray.200">
                          <VStack align="start" spacing={2}>
                            <Text fontSize="sm" fontWeight="medium" color="blue.700">
                              {equipment.modelo_name} ({systemIds.length} sistema{systemIds.length !== 1 ? 's' : ''})
                            </Text>
                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={1} w="100%">
                              {systemIds.map(systemId => {
                                const system = treeData.find(d => d.id === systemId);
                                return system ? (
                                  <Text key={systemId} fontSize="xs" color="gray.600">
                                    • {system.name} ({system.type})
                                  </Text>
                                ) : null;
                              })}
                            </SimpleGrid>
                          </VStack>
                        </Box>
                      );
                    })}
                  </VStack>
                </Box>
              )}
            </SimpleGrid>
          </VStack>
        </WizardStepContent>
      ),
    },
  ];

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }} px={{ base: 0, md: 0 }}>
      <VStack spacing={6} maxW="100%">
        <Card 
          w="100%" 
          maxW={{ base: "100%", md: "1200px" }} 
          mx={{ base: 0, md: "auto" }}
          borderRadius={{ base: 0, md: "lg" }}
        >
          <CardHeader pb={{ base: 2, md: 6 }} px={{ base: 4, md: 6 }}>
            <VStack spacing={2} align="center" textAlign="center">
              <Text 
                fontSize={{ base: "lg", md: "xl" }} 
                color={textColor} 
                fontWeight="bold"
              >
                Wizard Component Demo
              </Text>
              <Text 
                color={textColor} 
                fontSize={{ base: "sm", md: "md" }}
                maxW="600px"
              >
                Ejemplo del componente Wizard inspirado en Argon Chakra Dashboard Pro.
                Incluye múltiples pasos, validación, navegación y diferentes tipos de contenido.
              </Text>
            </VStack>
          </CardHeader>
          <CardBody px={{ base: 0, md: 6 }} py={{ base: 2, md: 6 }}>
            <Wizard
              steps={wizardSteps}
              onStepChange={handleStepChange}
              onComplete={handleComplete}
              allowStepClick={true}
              showButtons={true}
            />
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
}

export default WizardCreateCaso;
