// @ts-nocheck
import React, { useState, useMemo } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Flex,
  Icon,
  Collapse,
  useColorModeValue,
  Badge,
  Button,
  Checkbox,
  IconButton,
  Tooltip,
  SimpleGrid,
  useBreakpointValue,
} from '@chakra-ui/react';
import { 
  FiChevronDown, 
  FiChevronRight, 
  FiFolder, 
  FiFile,
  FiSearch,
  FiFilter,
  FiPlus,
  FiMinus,
  FiSettings,
  FiTool,
  FiCheckCircle,
  FiUpload,
  FiHardDrive,
  FiDownload,
  FiBookOpen,
  FiTarget,
  FiTrendingUp,
  FiActivity
} from 'react-icons/fi';

// Función para obtener el icono según el tipo de servicio
const getServiceIcon = (iconType) => {
  const iconMap = {
    settings: FiSettings,
    calibrate: FiTarget,
    inspect: FiCheckCircle,
    update: FiUpload,
    hardware: FiHardDrive,
    downgrade: FiDownload,
    graduation: FiBookOpen,
    tracking: FiActivity,
    evaluate: FiTrendingUp,
    install: FiTool,
    measure: FiActivity
  };
  
  return iconMap[iconType] || FiFile;
};

const TreeNode = ({ 
  node, 
  level = 0, 
  onToggle, 
  onSelect, 
  expandedNodes,
  selectedNodes,
  showCheckboxes = false,
  variant = 'default',
  isMobile = false
}) => {
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const selectedBg = useColorModeValue('blue.50', 'blue.900');
  const selectedBorderColor = useColorModeValue('blue.500', 'blue.400');
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const subtextColor = useColorModeValue('gray.600', 'gray.400');

  const hasChildren = node.children && node.children.length > 0;
  const indentSize = variant === 'compact' ? 16 : 24;
  
  // Determinar el estado basado en los Sets del componente padre
  const isExpanded = expandedNodes?.has(node.id) || false;
  const isSelected = selectedNodes?.has(node.id) || false;

  const handleToggle = (e) => {
    e.stopPropagation();
    if (hasChildren) {
      onToggle?.(node.id);
    }
  };

  const handleSelect = (e) => {
    e.stopPropagation();
    onSelect?.(node);
  };

  // Vista optimizada para móvil (tarjetas)
  if (variant === 'cards' || (isMobile && variant !== 'compact')) {
    return (
      <VStack spacing={isMobile ? 1 : 2} align="stretch" w="100%">
        <Box
          bg={isSelected ? selectedBg : bgColor}
          borderWidth="1px"
          borderColor={isSelected ? selectedBorderColor : borderColor}
          borderRadius={isMobile ? "md" : "lg"}
          p={isMobile ? 3 : 4}
          cursor="pointer"
          transition="all 0.2s"
          _hover={{
            bg: isSelected ? selectedBg : hoverBg,
            transform: isMobile ? 'none' : 'translateY(-1px)',
            shadow: isMobile ? 'sm' : 'md'
          }}
          onClick={handleSelect}
          minH={isMobile ? "60px" : "auto"}
          position="relative"
        >
          <HStack spacing={isMobile ? 2 : 3} justify="space-between" align="center">
            <HStack spacing={isMobile ? 2 : 3} flex="1" align="center">
              {showCheckboxes && (
                <Checkbox
                  isChecked={isSelected}
                  onChange={handleSelect}
                  colorScheme="blue"
                  size={isMobile ? "md" : "lg"}
                />
              )}
              
              <Icon 
                as={
                  node.type === 'Servicio' && node.icon 
                    ? getServiceIcon(node.icon)
                    : hasChildren ? FiFolder : FiFile
                } 
                color={
                  node.type === 'Servicio' 
                    ? 'purple.500' 
                    : hasChildren ? 'blue.500' : 'gray.500'
                }
                fontSize={isMobile ? "md" : "lg"}
                flexShrink={0}
              />
              
              <VStack align="start" spacing={isMobile ? 0 : 1} flex="1" minW={0}>
                <Text 
                  fontSize={isMobile ? "sm" : "md"} 
                  fontWeight="semibold" 
                  color={textColor}
                  noOfLines={isMobile ? 1 : 2}
                  wordBreak="break-word"
                >
                  {node.title || node.name}
                </Text>
                {node.description && !isMobile && (
                  <Text fontSize="sm" color={subtextColor} noOfLines={2}>
                    {node.description}
                  </Text>
                )}
                <HStack spacing={1} flexWrap="wrap">
                  {node.type && (
                    <Badge 
                      colorScheme={node.type === 'Servicio' ? 'purple' : 'blue'} 
                      size="sm"
                      fontSize={isMobile ? "10px" : "12px"}
                    >
                      {node.type}
                    </Badge>
                  )}
                  {hasChildren && (
                    <Badge 
                      colorScheme="green" 
                      size="sm"
                      fontSize={isMobile ? "10px" : "12px"}
                    >
                      {node.children.length}
                    </Badge>
                  )}
                </HStack>
              </VStack>
            </HStack>
            
            {hasChildren && (
              <IconButton
                icon={<Icon as={isExpanded ? FiChevronDown : FiChevronRight} />}
                size={isMobile ? "sm" : "md"}
                variant="ghost"
                onClick={handleToggle}
                aria-label={isExpanded ? 'Contraer' : 'Expandir'}
                minW={isMobile ? "32px" : "40px"}
                h={isMobile ? "32px" : "40px"}
                flexShrink={0}
              />
            )}
          </HStack>
        </Box>
        
        {hasChildren && (
          <Collapse in={isExpanded}>
            <Box 
              pl={isMobile ? 3 : 6} 
              borderLeftWidth={isMobile ? "1px" : "2px"} 
              borderLeftColor={borderColor}
              ml={isMobile ? 2 : 0}
            >
              <VStack spacing={isMobile ? 1 : 2} align="stretch">
                {node.children.map((child) => (
                  <TreeNode
                    key={child.id}
                    node={child}
                    level={level + 1}
                    onToggle={onToggle}
                    onSelect={onSelect}
                    expandedNodes={expandedNodes}
                    selectedNodes={selectedNodes}
                    showCheckboxes={showCheckboxes}
                    variant={variant}
                    isMobile={isMobile}
                  />
                ))}
              </VStack>
            </Box>
          </Collapse>
        )}
      </VStack>
    );
  }

  // Vista compacta/normal optimizada para móvil
  return (
    <VStack spacing={variant === 'compact' && !isMobile ? 0 : 1} align="stretch" w="100%">
      <HStack
        spacing={2}
        pl={isMobile ? level * 12 : level * indentSize}
        py={variant === 'compact' && !isMobile ? 1 : (isMobile ? 3 : 2)}
        px={isMobile ? 3 : 2}
        bg={isSelected ? selectedBg : 'transparent'}
        borderRadius={isMobile ? "md" : "md"}
        cursor="pointer"
        transition="all 0.2s"
        _hover={{
          bg: isSelected ? selectedBg : hoverBg
        }}
        onClick={handleSelect}
        minH={isMobile ? '48px' : (variant === 'compact' ? '32px' : '40px')}
        borderWidth={isMobile ? "1px" : "0"}
        borderColor={isMobile ? (isSelected ? selectedBorderColor : 'transparent') : 'transparent'}
      >
        {/* Expand/Collapse Button */}
        <IconButton
          icon={
            hasChildren ? (
              <Icon as={isExpanded ? FiChevronDown : FiChevronRight} />
            ) : (
              <Box w="16px" />
            )
          }
          size="xs"
          variant="ghost"
          onClick={handleToggle}
          isDisabled={!hasChildren}
          opacity={hasChildren ? 1 : 0}
          aria-label={isExpanded ? 'Contraer' : 'Expandir'}
          minW={isMobile ? "24px" : "20px"}
          h={isMobile ? "24px" : "20px"}
        />

        {/* Checkbox */}
        {showCheckboxes && (
          <Checkbox
            isChecked={isSelected}
            onChange={handleSelect}
            colorScheme="blue"
            size={variant === 'compact' && !isMobile ? 'sm' : 'md'}
          />
        )}

        {/* Icon */}
        <Icon 
          as={
            node.type === 'Servicio' && node.icon 
              ? getServiceIcon(node.icon)
              : hasChildren ? FiFolder : FiFile
          } 
          color={
            node.type === 'Servicio' 
              ? 'purple.500' 
              : hasChildren ? 'blue.500' : 'gray.500'
          }
          fontSize={variant === 'compact' && !isMobile ? 'sm' : 'md'}
          flexShrink={0}
        />

        {/* Content */}
        <Flex direction="column" flex="1" align="start" minW={0}>
          <Text 
            fontSize={variant === 'compact' && !isMobile ? 'sm' : (isMobile ? 'sm' : 'md')} 
            fontWeight={hasChildren ? 'semibold' : 'normal'}
            color={textColor}
            noOfLines={1}
            wordBreak="break-word"
          >
            {node.title || node.name}
          </Text>
          {node.description && variant !== 'compact' && !isMobile && (
            <Text fontSize="xs" color={subtextColor} noOfLines={1}>
              {node.description}
            </Text>
          )}
        </Flex>

        {/* Badges */}
        <HStack spacing={1} flexShrink={0}>
          {node.type && (
            <Badge 
              colorScheme={node.type === 'Servicio' ? 'purple' : 'blue'} 
              size="sm"
              fontSize={variant === 'compact' || isMobile ? '10px' : '12px'}
            >
              {node.type}
            </Badge>
          )}
          {hasChildren && (
            <Badge 
              colorScheme="green" 
              size="sm"
              fontSize={variant === 'compact' || isMobile ? '10px' : '12px'}
            >
              {node.children.length}
            </Badge>
          )}
        </HStack>
      </HStack>

      {/* Children */}
      {hasChildren && (
        <Collapse in={isExpanded}>
          <VStack spacing={variant === 'compact' && !isMobile ? 0 : 1} align="stretch">
            {node.children.map((child) => (
              <TreeNode
                key={child.id}
                node={child}
                level={level + 1}
                onToggle={onToggle}
                onSelect={onSelect}
                expandedNodes={expandedNodes}
                selectedNodes={selectedNodes}
                showCheckboxes={showCheckboxes}
                variant={variant}
                isMobile={isMobile}
              />
            ))}
          </VStack>
        </Collapse>
      )}
    </VStack>
  );
};

const TreeView = ({ 
  data, 
  onSelect, 
  showCheckboxes = false,
  variant = 'default', // 'default', 'compact', 'cards'
  searchable = true,
  expandable = true,
  title = "Estructura de Datos"
}) => {
  const [expandedNodes, setExpandedNodes] = useState(new Set());
  const [selectedNodes, setSelectedNodes] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('all'); // 'all', 'sistemas', 'servicios'
  
  // Detectar si es móvil
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [viewMode, setViewMode] = useState(variant);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Actualizar viewMode cuando cambie el variant inicial, pero mantener preferencia del usuario
  React.useEffect(() => {
    if (variant !== viewMode && !isMobile) {
      setViewMode(variant);
    }
  }, [variant]);

  // En móvil, forzar modo tarjetas si está en default
  const effectiveViewMode = isMobile && viewMode === 'default' ? 'cards' : viewMode;

  // Transform flat data with parent relationships into tree structure
  const treeData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    const buildTree = (items, parentId = null) => {
      return items
        .filter(item => item.parentId === parentId)
        .map(item => ({
          ...item,
          children: buildTree(items, item.id)
        }));
    };

    return buildTree(data);
  }, [data]);

  // Auto-expand nodes that contain search matches
  const autoExpandMatches = useMemo(() => {
    if (!searchTerm) return new Set();
    
    const matchingParents = new Set();
    
    const findMatchingNodes = (nodes, parents = []) => {
      nodes.forEach(node => {
        const matchesSearch = (node.title || node.name || '')
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
          (node.description || '').toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesType = searchType === 'all' || 
          (searchType === 'sistemas' && node.type === 'Sistema') ||
          (searchType === 'servicios' && node.type === 'Servicio');
        
        if (matchesSearch && matchesType) {
          // Agregar todos los padres de este nodo para expandirlos
          parents.forEach(parentId => matchingParents.add(parentId));
          
          // Si el nodo que coincide tiene hijos, también expandirlo para mostrar sus contenidos
          if (node.children && node.children.length > 0) {
            matchingParents.add(node.id);
          }
        }
        
        if (node.children && node.children.length > 0) {
          findMatchingNodes(node.children, [...parents, node.id]);
        }
      });
    };
    
    findMatchingNodes(treeData);
    return matchingParents;
  }, [treeData, searchTerm, searchType]);

  // Filter tree based on search term and type
  const filteredData = useMemo(() => {
    if (!searchTerm) return treeData;

    const filterTree = (nodes, parentMatched = false) => {
      return nodes.reduce((acc, node) => {
        const matchesSearch = (node.title || node.name || '')
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
          (node.description || '').toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = searchType === 'all' || 
          (searchType === 'sistemas' && node.type === 'Sistema') ||
          (searchType === 'servicios' && node.type === 'Servicio');

        // El nodo actual coincide si cumple búsqueda Y tipo, O si su padre ya coincidió
        const currentNodeMatches = (matchesSearch && matchesType) || parentMatched;

        // Si el nodo actual coincide, incluir TODOS sus hijos sin filtrar
        let childrenToInclude = [];
        if (currentNodeMatches) {
          // Si el nodo coincide, incluir todos sus hijos tal como están
          childrenToInclude = node.children || [];
        } else {
          // Si el nodo no coincide, filtrar recursivamente los hijos
          childrenToInclude = filterTree(node.children || [], false);
        }

        // Incluir nodo si:
        // 1. El nodo actual coincide (directamente o por herencia del padre)
        // 2. Tiene hijos que coinciden (para mostrar la jerarquía)
        if (currentNodeMatches || childrenToInclude.length > 0) {
          acc.push({
            ...node,
            children: childrenToInclude
          });
        }

        return acc;
      }, []);
    };

    return filterTree(treeData, false);
  }, [treeData, searchTerm, searchType]);

  // Aplicar auto-expansión cuando hay búsqueda
  React.useEffect(() => {
    if (searchTerm && autoExpandMatches.size > 0) {
      setExpandedNodes(prev => {
        const newSet = new Set(prev);
        autoExpandMatches.forEach(id => newSet.add(id));
        return newSet;
      });
    }
  }, [searchTerm, autoExpandMatches]);

  // Función para expandir todos los sistemas encontrados cuando se buscan sistemas
  const expandAllFoundSystems = () => {
    if (searchTerm && searchType === 'sistemas') {
      const systemsToExpand = new Set();
      
      const findSystems = (nodes) => {
        nodes.forEach(node => {
          const matchesSearch = (node.title || node.name || '')
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          
          if (matchesSearch && node.type === 'Sistema' && node.children && node.children.length > 0) {
            systemsToExpand.add(node.id);
          }
          
          if (node.children && node.children.length > 0) {
            findSystems(node.children);
          }
        });
      };
      
      findSystems(filteredData);
      
      setExpandedNodes(prev => {
        const newSet = new Set(prev);
        systemsToExpand.forEach(id => newSet.add(id));
        return newSet;
      });
    }
  };

  // Auto-expandir sistemas cuando se cambia el tipo de búsqueda a 'sistemas'
  React.useEffect(() => {
    if (searchTerm && searchType === 'sistemas') {
      setTimeout(expandAllFoundSystems, 100); // Pequeño delay para asegurar que el filtrado esté listo
    }
  }, [searchTerm, searchType]);

  const handleToggle = (nodeId) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const handleSelect = (node) => {
    if (showCheckboxes) {
      setSelectedNodes(prev => {
        const newSet = new Set(prev);
        if (newSet.has(node.id)) {
          newSet.delete(node.id);
        } else {
          newSet.add(node.id);
        }
        return newSet;
      });
    }
    onSelect?.(node, selectedNodes);
  };

  const expandAll = () => {
    const getAllIds = (nodes) => {
      let ids = [];
      nodes.forEach(node => {
        ids.push(node.id);
        if (node.children) {
          ids = ids.concat(getAllIds(node.children));
        }
      });
      return ids;
    };
    setExpandedNodes(new Set(getAllIds(treeData)));
  };

  const collapseAll = () => {
    setExpandedNodes(new Set());
  };

  return (
    <Box
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      overflow="hidden"
      w="100%"
    >
      {/* Header */}
      <Box p={isMobile ? 3 : 4} borderBottomWidth="1px" borderBottomColor={borderColor}>
        <VStack spacing={3} align="stretch">
          <HStack justify="space-between" wrap="wrap" spacing={2}>
            <Text fontSize={isMobile ? "md" : "lg"} fontWeight="bold">
              {title}
            </Text>
            
            {/* View Mode Toggles - Solo en desktop */}
            {!isMobile && (
              <HStack spacing={2} display={{ base: 'none', md: 'flex' }}>
                <Button
                  size="sm"
                  variant={effectiveViewMode === 'compact' ? 'solid' : 'outline'}
                  colorScheme="blue"
                  onClick={() => setViewMode('compact')}
                >
                  Compacto
                </Button>
                <Button
                  size="sm"
                  variant={effectiveViewMode === 'default' ? 'solid' : 'outline'}
                  colorScheme="blue"
                  onClick={() => setViewMode('default')}
                >
                  Normal
                </Button>
                <Button
                  size="sm"
                  variant={effectiveViewMode === 'cards' ? 'solid' : 'outline'}
                  colorScheme="blue"
                  onClick={() => setViewMode('cards')}
                >
                  Tarjetas
                </Button>
              </HStack>
            )}
          </HStack>

          {/* Controls */}
          <VStack spacing={3} align="stretch">
            {/* Search */}
            {searchable && (
              <VStack spacing={2} align="stretch">
                <HStack>
                  <Icon as={FiSearch} color="gray.500" flexShrink={0} />
                  <Box flex="1">
                    <input
                      placeholder="Buscar en la estructura..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{
                        width: '100%',
                        padding: isMobile ? '12px 14px' : '8px 12px',
                        border: '1px solid #E2E8F0',
                        borderRadius: '6px',
                        fontSize: isMobile ? '16px' : '14px', // 16px previene zoom en iOS
                        touchAction: 'manipulation' // Mejora la experiencia táctil
                      }}
                    />
                  </Box>
                </HStack>
                
                {/* Search Type Filter */}
                <HStack spacing={2} justify="center" wrap="wrap">
                  <Button
                    size="xs"
                    variant={searchType === 'all' ? 'solid' : 'outline'}
                    colorScheme="blue"
                    onClick={() => setSearchType('all')}
                    leftIcon={<FiFilter />}
                    fontSize="xs"
                    minH="28px"
                    px={2}
                  >
                    Todos
                  </Button>
                  <Button
                    size="xs"
                    variant={searchType === 'sistemas' ? 'solid' : 'outline'}
                    colorScheme="green"
                    onClick={() => setSearchType('sistemas')}
                    leftIcon={<FiFolder />}
                    fontSize="xs"
                    minH="28px"
                    px={2}
                  >
                    Sistemas
                  </Button>
                  <Button
                    size="xs"
                    variant={searchType === 'servicios' ? 'solid' : 'outline'}
                    colorScheme="purple"
                    onClick={() => setSearchType('servicios')}
                    leftIcon={<FiFile />}
                    fontSize="xs"
                    minH="28px"
                    px={2}
                  >
                    Servicios
                  </Button>
                </HStack>
                
                {/* Search Results Info */}
                {searchTerm && (
                  <VStack spacing={2} align="center">
                    <Text fontSize="xs" color="gray.500" textAlign="center">
                      Buscando "{searchTerm}" en {searchType === 'all' ? 'todos los elementos' : searchType}
                      {autoExpandMatches.size > 0 && ` • ${autoExpandMatches.size} elemento(s) expandido(s) automáticamente`}
                    </Text>
                    
                    {/* Quick expand for found systems */}
                    {searchType === 'sistemas' && filteredData.length > 0 && (
                      <Button
                        size="xs"
                        variant="outline"
                        colorScheme="green"
                        onClick={expandAllFoundSystems}
                        leftIcon={<FiChevronDown />}
                        fontSize="xs"
                        minH="24px"
                        px={2}
                      >
                        Ver contenido de sistemas encontrados
                      </Button>
                    )}
                  </VStack>
                )}
              </VStack>
            )}

            {/* Expand/Collapse Controls */}
            {expandable && (
              <HStack justify={{ base: 'center', md: 'flex-end' }} spacing={2}>
                <Button
                  leftIcon={<FiPlus />}
                  size="sm"
                  variant="outline"
                  onClick={expandAll}
                  fontSize={isMobile ? "xs" : "sm"}
                  minH={isMobile ? '40px' : '32px'}
                  px={isMobile ? 4 : 3}
                >
                  {isMobile ? "Expandir" : "Expandir Todo"}
                </Button>
                <Button
                  leftIcon={<FiMinus />}
                  size="sm"
                  variant="outline"
                  onClick={collapseAll}
                  fontSize={isMobile ? "xs" : "sm"}
                  minH={isMobile ? '40px' : '32px'}
                  px={isMobile ? 4 : 3}
                >
                  {isMobile ? "Contraer" : "Contraer Todo"}
                </Button>
              </HStack>
            )}
          </VStack>
        </VStack>
      </Box>

      {/* Tree Content */}
      <Box 
        p={isMobile ? 2 : (effectiveViewMode === 'cards' ? 4 : 2)} 
        maxH={{ base: '60vh', md: '500px' }} 
        overflowY="auto"
        overflowX="hidden"
        sx={{
          // Scroll suave en móvil
          '-webkit-overflow-scrolling': 'touch',
          scrollBehavior: 'smooth'
        }}
      >
        {filteredData.length > 0 ? (
          <VStack spacing={isMobile ? 2 : (effectiveViewMode === 'cards' ? 3 : (effectiveViewMode === 'compact' ? 0 : 1))} align="stretch">
            {filteredData.map((node) => (
              <TreeNode
                key={node.id}
                node={node}
                onToggle={handleToggle}
                onSelect={handleSelect}
                expandedNodes={expandedNodes}
                selectedNodes={selectedNodes}
                showCheckboxes={showCheckboxes}
                variant={effectiveViewMode}
                isMobile={isMobile}
              />
            ))}
          </VStack>
        ) : (
          <Box textAlign="center" py={8} color="gray.500">
            <Icon as={FiSearch} fontSize="3xl" mb={2} />
            <Text fontSize={isMobile ? "sm" : "md"}>No se encontraron resultados</Text>
            {searchTerm && (
              <Text fontSize="sm" mt={1}>
                Intenta con otros términos de búsqueda
              </Text>
            )}
          </Box>
        )}
      </Box>

      {/* Footer with selection info */}
      {showCheckboxes && selectedNodes.size > 0 && (
        <Box p={3} borderTopWidth="1px" borderTopColor={borderColor}>
          <Text fontSize="sm" color="gray.600">
            {selectedNodes.size} elemento(s) seleccionado(s)
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default TreeView;
