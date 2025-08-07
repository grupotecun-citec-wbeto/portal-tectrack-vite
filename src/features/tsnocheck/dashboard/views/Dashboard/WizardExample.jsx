// @ts-nocheck
import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
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
} from '@chakra-ui/react';
import { FiUser, FiSettings, FiCheck, FiMail, FiShield, FiBell, FiMoon, FiZap, FiGlobe, FiLock, FiGitBranch } from 'react-icons/fi';
import Card from '@dashboard/components/Card/Card';
import CardHeader from '@dashboard/components/Card/CardHeader';
import CardBody from '@dashboard/components/Card/CardBody';
import { Wizard, WizardStepContent } from '@dashboard/components/Wizard';
import TreeView from '@dashboard/components/TreeView/TreeView';

function WizardExample() {
  const textColor = useColorModeValue('gray.700', 'white');
  const toast = useToast();
  
  // Form data state
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Step 2: Preferences
    notifications: false,
    theme: 'light',
    language: 'es',
    
    // Step 3: Features Selection (Checkboxes with Icons)
    features: {
      security: false,
      notifications: false,
      darkMode: false,
      performance: false,
      multilingual: false,
      privacy: false,
    },
    
    // Step 4: Tree Selection
    selectedTreeItems: [],
    
    // Step 5: Additional Info
    bio: '',
    company: '',
    role: '',
  });

  // Datos de ejemplo para el árbol (simulando una estructura recursiva de la base de datos)
  const treeData = [
	{
		id : 1,
		name : "AUTO TURN",
		type: "Sistema",
		description : "2024-12-16 16:48:44",
		parentId : null
	},
	{
		id : 2,
		name : "AUTO TRACKER",
		type: "Sistema",
		description : "2024-12-16 16:48:44",
		parentId : null
	},
	{
		id : 3,
		name : "FIELD RATE CONTROL",
		type: "Sistema",
		description : "2024-12-16 16:48:44",
		parentId : null
	},
	{
		id : 4,
		name : "SEÑAL DE CORRECCIÓN",
		type: "Sistema",
		description : "2024-12-16 16:48:44",
		parentId : null
	},
	{
		id : 6,
		name : "EFICIENCIA",
		type: "Sistema",
		description : "2024-12-16 16:48:44",
		parentId : null
	},
	{
		id : 7,
		name : "BALANZA DE PRODUCTIVIDAD",
		type: "Sistema",
		description : "2024-12-16 16:48:44",
		parentId : null
	},
	{
		id : 8,
		name : "DAÑOS",
		type: "Sistema",
		description : "2024-12-16 16:48:44",
		parentId : null
	},
	{
		id : 9,
		name : "SISTEMA ELÉCTRICO",
		type: "Sistema",
		description : "2024-12-16 16:48:44",
		parentId : null
	},
	{
		id : 10,
		name : "SISTEMA HIDRÁULICO",
		type: "Sistema",
		description : "2024-12-16 16:48:44",
		parentId : null
	},
	{
		id : 11,
		name : "SISTEMA MECANICO",
		type: "Sistema",
		description : "2024-12-16 16:48:44",
		parentId : null
	},
	{
		id : 12,
		name : "PILOTO AUTOMÁTICO",
		type: "Sistema",
		description : "2024-12-16 16:48:44",
		parentId : null
	},
	{
		id : 13,
		name : "FIELD IQ",
		type: "Sistema",
		description : "2024-12-16 16:48:44",
		parentId : null
	},
	{
		id : 14,
		name : "TELEMETRÍA",
		type: "Sistema",
		description : "2024-12-16 16:48:44",
		parentId : null
	},
	{
		id : 15,
		name : "SOIL XPLORER",
		type: "Sistema",
		description : "2024-12-16 16:48:44",
		parentId : null
	},
	{
		id : 16,
		name : "AFS SOFTWARE",
		type: "Sistema",
		description : "2024-12-16 16:48:44",
		parentId : null
	},
	{
		id : 17,
		name : "IA TRIMBLE",
		type: "Sistema",
		description : "2024-12-16 16:48:44",
		parentId : null
	},
	{
		id : 18,
		name : "PROGRAMA DE DESARROLLO",
		type: "Sistema",
		description : "2025-01-16 15:30:29",
		parentId : null
	},
	{
		id : 19,
		name : "AUTO TURN",
		type: "Sistema",
		description : "2025-03-21 13:39:48",
		parentId : null
	},
	{
		id : 20,
		name : "AUTO TRACKER",
		type: "Sistema",
		description : "2025-03-21 13:39:49",
		parentId : null
	},
	{
		id : 21,
		name : "PILOTO AUTOMÁTICO",
		type: "Sistema",
		description : "2025-03-21 13:39:49",
		parentId : null
	},
	{
		id : 22,
		name : "CONTROL CRUSERO",
		type: "Sistema",
		description : "2025-03-21 13:39:49",
		parentId : null
	},
	{
		id : 23,
		name : "PANTALLA",
		type: "Sistema",
		parentId : 9,
		description : "2025-05-06 23:43:48",
		
	},
	{
		id : 24,
		name : "MODULO",
		type: "Sistema",
		parentId : 9,
		description : "2025-05-06 23:43:48",
		
	},
	{
		id : 25,
		name : "ANTENA",
		type: "Sistema",
		parentId : 9,
		description : "2025-05-06 23:43:48",
		
	},
	{
		id : 26,
		name : "ARNES",
		type: "Sistema",
		parentId : 9,
		description : "2025-05-06 23:43:48",
		
	},
	{
		id : 27,
		name : "SENSOR",
		type: "Sistema",
		parentId : 9,
		description : "2025-05-06 23:43:48",
		
	},
	{
		id : 28,
		name : "BOBINA",
		type: "Sistema",
		parentId : 9,
		description : "2025-05-06 23:43:48",
		
	},
	{
		id : 29,
		name : "INTERRUPTOR",
		type: "Sistema",
		parentId : 9,
		description : "2025-05-06 23:43:49",
		
	},
	{
		id : 30,
		name : "BOMBA",
		type: "Sistema",
		parentId : 10,
		description : "2025-05-06 23:43:49",
		
	},
	{
		id : 31,
		name : "MOTOR HIDRÁULICO",
		type: "Sistema",
		parentId : 10,
		description : "2025-05-06 23:43:49",
		
	},
	{
		id : 32,
		name : "MAGUERAS",
		type: "Sistema",
		parentId : 10,
		description : "2025-05-06 23:43:49",
		
	},
	{
		id : 33,
		name : "BLOQUE HIDRÁULICO",
		type: "Sistema",
		parentId : 10,
		description : "2025-05-06 23:43:49",
		
	},
	{
		id : 34,
		name : "VALVULAS",
		type: "Sistema",
		parentId : 10,
		description : "2025-05-06 23:43:49",
		
	},
	{
		id : 35,
		name : "CILINDROS",
		type: "Sistema",
		parentId : 10,
		description : "2025-05-06 23:43:49",
		
	},
	{
		id : 36,
		name : "PICADOR",
		type: "Sistema",
		parentId : 11,
		description : "2025-05-06 23:43:50",
		
	},
	{
		id : 37,
		name : "TREN DE MOLINOS",
		type: "Sistema",
		parentId : 11,
		description : "2025-05-06 23:43:50",
		
	},
	{
		id : 38,
		name : "CORTE BASE",
		type: "Sistema",
		parentId : 11,
		description : "2025-05-06 23:43:50",
		
	},
	{
		id : 39,
		name : "DIVISOR",
		type: "Sistema",
		parentId : 11,
		description : "2025-05-06 23:43:50",
		
	},
	{
		id : 40,
		name : "RODAJE",
		type: "Sistema",
		parentId : 11,
		description : "2025-05-06 23:43:50",
		
	},
	{
		id : 41,
		name : "ELEVADOR",
		type: "Sistema",
		parentId : 11,
		description : "2025-05-06 23:43:51",
		
	},
	{
		id : 42,
		name : "IMPLEMENTO",
		type: "Sistema",
		parentId : 11,
		description : "2025-05-06 23:43:51",
		
	},
	{
		id : 43,
		name : "CONECTOR",
		type: "Sistema",
		parentId : 23,
		description : "2025-05-06 23:43:51",
		
	},
	{
		id : 44,
		name : "FUSIBLE",
		type: "Sistema",
		parentId : 23,
		description : "2025-05-06 23:43:51",
		
	},
	{
		id : 45,
		name : "TERMINALES",
		type: "Sistema",
		parentId : 23,
		description : "2025-05-06 23:43:51",
		
	},
	{
		id : 46,
		name : "CONECTOR",
		type: "Sistema",
		parentId : 24,
		description : "2025-05-06 23:43:51",
		
	},
	{
		id : 47,
		name : "FUSIBLE",
		type: "Sistema",
		parentId : 24,
		description : "2025-05-06 23:43:51",
		
	},
	{
		id : 48,
		name : "TERMINALES",
		type: "Sistema",
		parentId : 24,
		description : "2025-05-06 23:43:52",
		
	},
	{
		id : 49,
		name : "BASE MAGNETICA",
		type: "Sistema",
		parentId : 25,
		description : "2025-05-06 23:43:52",
		
	},
	{
		id : 50,
		name : "CONECTOR",
		type: "Sistema",
		parentId : 25,
		description : "2025-05-06 23:43:52",
		
	},
	{
		id : 51,
		name : "CORTO CIRCUITO",
		type: "Sistema",
		parentId : 26,
		description : "2025-05-06 23:43:52",
		
	},
	{
		id : 52,
		name : "CONECTOR",
		type: "Sistema",
		parentId : 26,
		description : "2025-05-06 23:43:52",
		
	},
	{
		id : 53,
		name : "TERMINALES",
		type: "Sistema",
		parentId : 26,
		description : "2025-05-06 23:43:52",
		
	},
	{
		id : 54,
		name : "PANTALLA",
		type: "Sistema",
		parentId : 12,
		description : "2025-05-06 23:43:52",
		
	},
	{
		id : 55,
		name : "MODULO",
		type: "Sistema",
		parentId : 12,
		description : "2025-05-06 23:43:53",
		
	},
	{
		id : 56,
		name : "ANTENA",
		type: "Sistema",
		parentId : 12,
		description : "2025-05-06 23:43:53",
		
	},
	{
		id : 57,
		name : "CONTROL DE DIRECCION",
		type: "Sistema",
		parentId : 12,
		description : "2025-05-06 23:43:53",
		
	},
	{
		id : 58,
		name : "PANTALLA",
		type: "Sistema",
		parentId : 13,
		description : "2025-05-06 23:43:53",
		
	},
	{
		id : 59,
		name : "MODULO",
		type: "Sistema",
		parentId : 13,
		description : "2025-05-06 23:43:53",
		
	},
	{
		id : 60,
		name : "ELECTRICO",
		type: "Sistema",
		parentId : 13,
		description : "2025-05-06 23:43:53",
		
	},
	{
		id : 61,
		name : "HIDRAULICO",
		type: "Sistema",
		parentId : 13,
		description : "2025-05-06 23:43:53",
		
	},
	{
		id : 62,
		name : "PRO 700",
		type: "Sistema",
		parentId : 54,
		description : "2025-05-06 23:43:54",
		
	},
	{
		id : 63,
		name : "PRO 700+",
		type: "Sistema",
		parentId : 54,
		description : "2025-05-06 23:43:54",
		
	},
	{
		id : 64,
		name : "XCN 2050",
		type: "Sistema",
		parentId : 54,
		description : "2025-05-06 23:43:54",
		
	},
	{
		id : 65,
		name : "PRO 1200",
		type: "Sistema",
		parentId : 54,
		description : "2025-05-06 23:43:54",
		
	},
	{
		id : 66,
		name : "SCM",
		type: "Sistema",
		parentId : 55,
		description : "2025-05-06 23:43:54",
		
	},
	{
		id : 67,
		name : "TRASMISION",
		type: "Sistema",
		parentId : 55,
		description : "2025-05-06 23:43:54",
		
	},
	{
		id : 68,
		name : "UCM",
		type: "Sistema",
		parentId : 55,
		description : "2025-05-06 23:43:54",
		
	},
	{
		id : 69,
		name : "NAV 2",
		type: "Sistema",
		parentId : 55,
		description : "2025-05-06 23:43:55",
		
	},
	{
		id : 70,
		name : "NAV 3",
		type: "Sistema",
		parentId : 55,
		description : "2025-05-06 23:43:55",
		
	},
	{
		id : 71,
		name : "TM 200",
		type: "Sistema",
		parentId : 55,
		description : "2025-05-06 23:43:55",
		
	},
	{
		id : 72,
		name : "372",
		type: "Sistema",
		parentId : 56,
		description : "2025-05-06 23:43:55",
		
	},
	{
		id : 73,
		name : "392",
		type: "Sistema",
		parentId : 56,
		description : "2025-05-06 23:43:55",
		
	},
	{
		id : 74,
		name : "AG 25",
		type: "Sistema",
		parentId : 56,
		description : "2025-05-06 23:43:55",
		
	},
	{
		id : 75,
		name : "450",
		type: "Sistema",
		parentId : 56,
		description : "2025-05-06 23:43:55",
		
	},
	{
		id : 76,
		name : "470",
		type: "Sistema",
		parentId : 56,
		description : "2025-05-06 23:43:56",
		
	},
	{
		id : 77,
		name : "RODADURA",
		type: "Sistema",
		parentId : 57,
		description : "2025-05-06 23:43:56",
		
	},
	{
		id : 78,
		name : "ZONA MUERTA",
		type: "Sistema",
		parentId : 57,
		description : "2025-05-06 23:43:56",
		
	},
	{
		id : 79,
		name : "P. GANANCIA",
		type: "Sistema",
		parentId : 57,
		description : "2025-05-06 23:43:56",
		
	},
	{
		id : 80,
		name : "SENSOR DE DIRECCIÓN",
		type: "Sistema",
		parentId : 57,
		description : "2025-05-06 23:43:56",
		
	},
	{
		id : 81,
		name : "XCN 750",
		type: "Sistema",
		parentId : 58,
		description : "2025-05-06 23:43:56",
		
	},
	{
		id : 82,
		name : "XCN 1050",
		type: "Sistema",
		parentId : 58,
		description : "2025-05-06 23:43:56",
		
	},
	{
		id : 83,
		name : "XCN 2050",
		type: "Sistema",
		parentId : 58,
		description : "2025-05-06 23:43:57",
		
	},
	{
		id : 84,
		name : "COTROL DE SECCIONES",
		type: "Sistema",
		parentId : 59,
		description : "2025-05-06 23:43:57",
		
	},
	{
		id : 85,
		name : "MONITOREO DE SEMILLAS",
		type: "Sistema",
		parentId : 59,
		description : "2025-05-06 23:43:57",
		
	},
	{
		id : 86,
		name : "SENSOR",
		type: "Sistema",
		parentId : 60,
		description : "2025-05-06 23:43:57",
		
	},
	{
		id : 87,
		name : "BOBINA",
		type: "Sistema",
		parentId : 60,
		description : "2025-05-06 23:43:57",
		
	},
	{
		id : 88,
		name : "ARNES",
		type: "Sistema",
		parentId : 60,
		description : "2025-05-06 23:43:57",
		
	},
	{
		id : 89,
		name : "CONECTOR",
		type: "Sistema",
		parentId : 60,
		description : "2025-05-06 23:43:57",
		
	},
	{
		id : 90,
		name : "MOTOR",
		type: "Sistema",
		parentId : 61,
		description : "2025-05-06 23:43:58",
		
	},
	{
		id : 91,
		name : "BLOQUE",
		type: "Sistema",
		parentId : 61,
		description : "2025-05-06 23:43:58",
		
	},
	{
		id : 92,
		name : "MANGUERAS",
		type: "Sistema",
		parentId : 61,
		description : "2025-05-06 23:43:58",
		
	},
	{
		id : 93,
		name : "TOUCH",
		type: "Sistema",
		parentId : 62,
		description : "2025-05-06 23:43:58",
		
	},
	{
		id : 94,
		name : "PANTALLA",
		type: "Sistema",
		parentId : 8,
		description : "2025-05-06 23:43:58",
		
	},
	{
		id : 95,
		name : "MODULO",
		type: "Sistema",
		parentId : 8,
		description : "2025-05-06 23:43:58",
		
	},
	{
		id : 96,
		name : "ANTENA",
		type: "Sistema",
		parentId : 8,
		description : "2025-05-06 23:43:58",
		
	},
	{
		id : 97,
		name : "TOUCH",
		type: "Sistema",
		parentId : 63,
		description : "2025-05-06 23:43:58",
		
	}
]
;

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateFeature = (featureName, value) => {
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [featureName]: value
      }
    }));
  };

  const handleTreeSelection = (node, selectedNodes) => {
    updateFormData('selectedTreeItems', Array.from(selectedNodes));
  };

  // Custom checkbox with icon component
  const IconCheckbox = ({ icon: Icon, title, description, isChecked, onChange, colorScheme = "blue" }) => {
    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const hoverBorderColor = useColorModeValue('blue.300', 'blue.400');
    const checkedBg = useColorModeValue('blue.50', 'blue.900');
    const checkedBorderColor = useColorModeValue('blue.500', 'blue.400');
    
    return (
      <Box
        borderWidth="2px"
        borderColor={isChecked ? checkedBorderColor : borderColor}
        borderRadius="lg"
        p={4}
        cursor="pointer"
        transition="all 0.2s"
        bg={isChecked ? checkedBg : 'transparent'}
        _hover={{
          borderColor: hoverBorderColor,
          transform: 'translateY(-2px)',
          shadow: 'md'
        }}
        onClick={onChange}
        position="relative"
      >
        <VStack spacing={3} align="center" textAlign="center">
          <Box
            p={3}
            borderRadius="full"
            bg={isChecked ? `${colorScheme}.500` : useColorModeValue('gray.100', 'gray.700')}
            color={isChecked ? 'white' : useColorModeValue('gray.600', 'gray.300')}
            transition="all 0.2s"
          >
            <Icon size={24} />
          </Box>
          <Box>
            <Text fontWeight="bold" fontSize="md" mb={1}>
              {title}
            </Text>
            <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
              {description}
            </Text>
          </Box>
        </VStack>
        
        {/* Checkbox indicator */}
        <Box
          position="absolute"
          top={2}
          right={2}
          w={5}
          h={5}
          borderRadius="sm"
          borderWidth="2px"
          borderColor={isChecked ? `${colorScheme}.500` : borderColor}
          bg={isChecked ? `${colorScheme}.500` : 'transparent'}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {isChecked && (
            <FiCheck color="white" size={12} />
          )}
        </Box>
      </Box>
    );
  };

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
      title: 'Información Personal',
      content: (
        <WizardStepContent
          title="Datos Personales"
          description="Por favor, ingresa tu información personal básica"
          icon={FiUser}
        >
          <VStack spacing={4} align="stretch">
            <SimpleGrid 
              columns={{ base: 1, md: 2 }} 
              spacing={4}
            >
              <FormControl>
                <FormLabel>Nombre</FormLabel>
                <Input
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  placeholder="Tu nombre"
                  size={{ base: 'md', md: 'md' }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Apellido</FormLabel>
                <Input
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  placeholder="Tu apellido"
                  size={{ base: 'md', md: 'md' }}
                />
              </FormControl>
            </SimpleGrid>
            <SimpleGrid 
              columns={{ base: 1, md: 2 }} 
              spacing={4}
            >
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="tu@email.com"
                  size={{ base: 'md', md: 'md' }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Teléfono</FormLabel>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  placeholder="+1 234 567 8900"
                  size={{ base: 'md', md: 'md' }}
                />
              </FormControl>
            </SimpleGrid>
          </VStack>
        </WizardStepContent>
      ),
    },
    {
      id: 1,
      title: 'Preferencias',
      content: (
        <WizardStepContent
          title="Configuración de Preferencias"
          description="Personaliza tu experiencia en la plataforma"
          icon={FiSettings}
        >
          <VStack spacing={6} align="stretch">
            <FormControl>
              <FormLabel>Idioma preferido</FormLabel>
              <Select
                value={formData.language}
                onChange={(e) => updateFormData('language', e.target.value)}
                size={{ base: 'md', md: 'md' }}
              >
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
              </Select>
            </FormControl>
            
            <FormControl>
              <FormLabel>Tema</FormLabel>
              <RadioGroup
                value={formData.theme}
                onChange={(value) => updateFormData('theme', value)}
              >
                <SimpleGrid 
                  columns={{ base: 1, md: 3 }} 
                  spacing={4}
                  alignItems="center"
                >
                  <Radio value="light" size="lg">Claro</Radio>
                  <Radio value="dark" size="lg">Oscuro</Radio>
                  <Radio value="auto" size="lg">Automático</Radio>
                </SimpleGrid>
              </RadioGroup>
            </FormControl>
            
            <FormControl>
              <Checkbox
                isChecked={formData.notifications}
                onChange={(e) => updateFormData('notifications', e.target.checked)}
              >
                Recibir notificaciones por email
              </Checkbox>
            </FormControl>
          </VStack>
        </WizardStepContent>
      ),
    },
    {
      id: 2,
      title: 'Características',
      content: (
        <WizardStepContent
          title="Selecciona las Características"
          description="Elige las funcionalidades que deseas activar en tu cuenta"
          icon={FiZap}
        >
          <VStack spacing={6} align="stretch">
            <Text fontSize="md" color={useColorModeValue('gray.600', 'gray.400')} textAlign="center">
              Selecciona todas las características que te gustaría usar
            </Text>
            
            <SimpleGrid 
              columns={{ base: 1, md: 2, lg: 3 }} 
              spacing={4}
            >
              <IconCheckbox
                icon={FiShield}
                title="Seguridad Avanzada"
                description="Autenticación de dos factores y encriptación"
                isChecked={formData.features.security}
                onChange={() => updateFeature('security', !formData.features.security)}
                colorScheme="green"
              />
              
              <IconCheckbox
                icon={FiBell}
                title="Notificaciones Push"
                description="Recibe alertas en tiempo real"
                isChecked={formData.features.notifications}
                onChange={() => updateFeature('notifications', !formData.features.notifications)}
                colorScheme="blue"
              />
              
              <IconCheckbox
                icon={FiMoon}
                title="Modo Oscuro"
                description="Tema oscuro para mejor experiencia"
                isChecked={formData.features.darkMode}
                onChange={() => updateFeature('darkMode', !formData.features.darkMode)}
                colorScheme="purple"
              />
              
              <IconCheckbox
                icon={FiZap}
                title="Alto Rendimiento"
                description="Optimizaciones para velocidad"
                isChecked={formData.features.performance}
                onChange={() => updateFeature('performance', !formData.features.performance)}
                colorScheme="orange"
              />
              
              <IconCheckbox
                icon={FiGlobe}
                title="Multiidioma"
                description="Soporte para múltiples idiomas"
                isChecked={formData.features.multilingual}
                onChange={() => updateFeature('multilingual', !formData.features.multilingual)}
                colorScheme="teal"
              />
              
              <IconCheckbox
                icon={FiLock}
                title="Privacidad Avanzada"
                description="Control total sobre tus datos"
                isChecked={formData.features.privacy}
                onChange={() => updateFeature('privacy', !formData.features.privacy)}
                colorScheme="red"
              />
            </SimpleGrid>
          </VStack>
        </WizardStepContent>
      ),
    },
    {
      id: 3,
      title: 'Estructura Organizacional',
      content: (
        <WizardStepContent
          title="Selecciona Elementos de la Estructura"
          description="Explora y selecciona los elementos de la estructura organizacional que te interesan"
          icon={FiGitBranch}
        >
          <VStack spacing={4} align="stretch">
            <Text fontSize="md" color={useColorModeValue('gray.600', 'gray.400')} textAlign="center">
              Esta es una demostración de cómo mostrar datos recursivos en forma de árbol.
              Puedes expandir/contraer nodos y seleccionar múltiples elementos.
            </Text>
            
            <TreeView
              data={treeData}
              onSelect={handleTreeSelection}
              showCheckboxes={true}
              title="Estructura Organizacional"
            />
          </VStack>
        </WizardStepContent>
      ),
    },
    {
      id: 4,
      title: 'Información Adicional',
      content: (
        <WizardStepContent
          title="Detalles Adicionales"
          description="Información opcional sobre tu perfil profesional"
          icon={FiMail}
        >
          <VStack spacing={4} align="stretch">
            <SimpleGrid 
              columns={{ base: 1, md: 2 }}
              spacing={4}
            >
              <FormControl>
                <FormLabel>Empresa</FormLabel>
                <Input
                  value={formData.company}
                  onChange={(e) => updateFormData('company', e.target.value)}
                  placeholder="Nombre de tu empresa"
                  size={{ base: 'md', md: 'md' }}
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Cargo</FormLabel>
                <Select
                  value={formData.role}
                  onChange={(e) => updateFormData('role', e.target.value)}
                  placeholder="Selecciona tu cargo"
                  size={{ base: 'md', md: 'md' }}
                >
                  <option value="developer">Desarrollador</option>
                  <option value="designer">Diseñador</option>
                  <option value="manager">Gerente</option>
                  <option value="analyst">Analista</option>
                  <option value="other">Otro</option>
                </Select>
              </FormControl>
            </SimpleGrid>
            
            <FormControl>
              <FormLabel>Biografía</FormLabel>
              <Textarea
                value={formData.bio}
                onChange={(e) => updateFormData('bio', e.target.value)}
                placeholder="Cuéntanos un poco sobre ti..."
                rows={{ base: 3, md: 4 }}
                resize="vertical"
              />
            </FormControl>
          </VStack>
        </WizardStepContent>
      ),
    },
    {
      id: 5,
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
                  Información Personal:
                </Text>
                <VStack align="start" spacing={1} fontSize={{ base: "sm", md: "md" }}>
                  <Text>Nombre: {formData.firstName} {formData.lastName}</Text>
                  <Text>Email: {formData.email}</Text>
                  <Text>Teléfono: {formData.phone}</Text>
                </VStack>
              </Box>
              
              <Box 
                p={{ base: 3, md: 4 }} 
                borderWidth="1px" 
                borderRadius="md" 
                bg={useColorModeValue('gray.50', 'gray.700')}
              >
                <Text fontWeight="bold" mb={2} fontSize={{ base: "sm", md: "md" }}>
                  Preferencias:
                </Text>
                <VStack align="start" spacing={1} fontSize={{ base: "sm", md: "md" }}>
                  <Text>Idioma: {formData.language}</Text>
                  <Text>Tema: {formData.theme}</Text>
                  <Text>Notificaciones: {formData.notifications ? 'Activadas' : 'Desactivadas'}</Text>
                </VStack>
              </Box>
            </SimpleGrid>
            
            {/* Features Selected */}
            {Object.values(formData.features).some(Boolean) && (
              <Box 
                p={{ base: 3, md: 4 }} 
                borderWidth="1px" 
                borderRadius="md"
                bg={useColorModeValue('gray.50', 'gray.700')}
              >
                <Text fontWeight="bold" mb={2} fontSize={{ base: "sm", md: "md" }}>
                  Características Seleccionadas:
                </Text>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2} fontSize={{ base: "sm", md: "md" }}>
                  {formData.features.security && <Text>✅ Seguridad Avanzada</Text>}
                  {formData.features.notifications && <Text>✅ Notificaciones Push</Text>}
                  {formData.features.darkMode && <Text>✅ Modo Oscuro</Text>}
                  {formData.features.performance && <Text>✅ Alto Rendimiento</Text>}
                  {formData.features.multilingual && <Text>✅ Multiidioma</Text>}
                  {formData.features.privacy && <Text>✅ Privacidad Avanzada</Text>}
                </SimpleGrid>
              </Box>
            )}
            
            {/* Tree Selection */}
            {formData.selectedTreeItems.length > 0 && (
              <Box 
                p={{ base: 3, md: 4 }} 
                borderWidth="1px" 
                borderRadius="md"
                bg={useColorModeValue('gray.50', 'gray.700')}
              >
                <Text fontWeight="bold" mb={2} fontSize={{ base: "sm", md: "md" }}>
                  Elementos Seleccionados:
                </Text>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2} fontSize={{ base: "sm", md: "md" }}>
                  {formData.selectedTreeItems.map(itemId => {
                    const item = treeData.find(d => d.id === itemId);
                    return item ? (
                      <Text key={itemId}>✅ {item.name} ({item.type})</Text>
                    ) : null;
                  })}
                </SimpleGrid>
              </Box>
            )}
            
            {(formData.company || formData.role || formData.bio) && (
              <Box 
                p={{ base: 3, md: 4 }} 
                borderWidth="1px" 
                borderRadius="md"
                bg={useColorModeValue('gray.50', 'gray.700')}
              >
                <Text fontWeight="bold" mb={2} fontSize={{ base: "sm", md: "md" }}>
                  Información Adicional:
                </Text>
                <VStack align="start" spacing={1} fontSize={{ base: "sm", md: "md" }}>
                  {formData.company && <Text>Empresa: {formData.company}</Text>}
                  {formData.role && <Text>Cargo: {formData.role}</Text>}
                  {formData.bio && <Text>Biografía: {formData.bio}</Text>}
                </VStack>
              </Box>
            )}
          </VStack>
        </WizardStepContent>
      ),
    },
  ];

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }} px={{ base: 2, md: 0 }}>
      <VStack spacing={6} maxW="100%">
        <Card w="100%" maxW="1200px" mx="auto">
          <CardHeader pb={{ base: 4, md: 6 }}>
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
          <CardBody px={{ base: 2, md: 6 }} py={{ base: 4, md: 6 }}>
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

export default WizardExample;
