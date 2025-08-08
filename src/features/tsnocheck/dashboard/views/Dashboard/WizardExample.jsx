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

function WizardExample() {
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
    
    // Step 3.5: Equipment Diagnostics
    equipmentDiagnostics: {}, // { equipmentId: { diagnosticData } }
    equipmentSystems: {}, // { equipmentId: [systemIds] }
    
    // Step 4: Personal Info (moved from step 3)
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Step 4: Preferences
    notifications: false,
    theme: 'light',
    language: 'es',
    
    // Step 5: Features Selection (Checkboxes with Icons)
    features: {
      security: false,
      notifications: false,
      darkMode: false,
      performance: false,
      multilingual: false,
      privacy: false,
    },
    
    // Step 6: Tree Selection
    selectedTreeItems: [],
    
    // Step 7: Additional Info
    bio: '',
    company: '',
    role: '',
  });

  // Definición de segmentos disponibles
  const segments = [
    {
      id: 'soporte',
      title: 'Soporte Técnico',
      description: 'Asistencia técnica especializada, resolución de problemas y mantenimiento de equipos',
      icon: FiHeadphones,
      color: 'blue',
      features: ['Asistencia 24/7', 'Diagnóstico remoto', 'Mantenimiento preventivo', 'Soporte en campo']
    },
    {
      id: 'capacitacion',
      title: 'Capacitación',
      description: 'Programas de entrenamiento y desarrollo de habilidades técnicas',
      icon: FiBookOpen,
      color: 'green',
      features: ['Cursos especializados', 'Certificaciones', 'Material didáctico', 'Prácticas en campo']
    },
    {
      id: 'proyectos',
      title: 'Proyectos',
      description: 'Desarrollo e implementación de soluciones tecnológicas personalizadas',
      icon: FiTool,
      color: 'purple',
      features: ['Consultoría técnica', 'Implementación', 'Integración de sistemas', 'Seguimiento']
    }
  ];

  // Definición de tipos de casos disponibles
  const caseTypes = [
    {
      id: 'correctivos',
      title: 'Casos Correctivos',
      description: 'Resolución de problemas existentes, reparaciones y correcciones de fallas',
      icon: FiAlertTriangle,
      color: 'red',
      features: ['Diagnóstico de fallas', 'Reparaciones urgentes', 'Corrección de errores', 'Restauración del servicio']
    },
    {
      id: 'preventivos',
      title: 'Casos Preventivos',
      description: 'Mantenimiento programado y acciones para prevenir problemas futuros',
      icon: FiRefreshCw,
      color: 'green',
      features: ['Mantenimiento programado', 'Inspecciones regulares', 'Actualizaciones preventivas', 'Optimización continua']
    }
  ];

  // Datos de equipos de ejemplo (simulando la consulta de la base de datos)
  const equipmentData = [
    {
      id: 1,
      catalogo_id: 7,
      serie: null,
      serie_extra: null,
      chasis: "HCCZC140EPCN59011",
      categoria_name: "TRACTOR",
      catalogo_img: "https://storage.googleapis.com/images-tectrack/Puma_185.jpg",
      modelo_name: "PUMA SPS 140",
      marca_name: "CASE IH",
      proyecto_name: "PROYECTO",
      subdivision_name: null,
      cliente_name: null,
      estado_maquinaria: null,
      estatus_maquinaria: null,
      departamento_negocio: null,
      unidad_negocio: null,
      propietario_name: null,
      contrato: null,
      codigo_finca: "81268"
    },
    {
      id: 2,
      catalogo_id: 7,
      serie: null,
      serie_extra: null,
      chasis: "HCCZC140CPCN59009",
      categoria_name: "TRACTOR",
      catalogo_img: "https://storage.googleapis.com/images-tectrack/Puma_185.jpg",
      modelo_name: "PUMA SPS 140",
      marca_name: "CASE IH",
      proyecto_name: "PROYECTO",
      subdivision_name: null,
      cliente_name: null,
      estado_maquinaria: null,
      estatus_maquinaria: null,
      departamento_negocio: null,
      unidad_negocio: null,
      propietario_name: null,
      contrato: null,
      codigo_finca: "81269"
    },
    {
      id: 3,
      catalogo_id: 7,
      serie: null,
      serie_extra: null,
      chasis: "HCCZC140CPCN59043",
      categoria_name: "TRACTOR",
      catalogo_img: "https://storage.googleapis.com/images-tectrack/Puma_185.jpg",
      modelo_name: "PUMA SPS 140",
      marca_name: "CASE IH",
      proyecto_name: "PROYECTO",
      subdivision_name: null,
      cliente_name: null,
      estado_maquinaria: null,
      estatus_maquinaria: null,
      departamento_negocio: null,
      unidad_negocio: null,
      propietario_name: null,
      contrato: null,
      codigo_finca: "81270"
    },
    {
      id: 4,
      catalogo_id: 15,
      serie: "FR1614241",
      serie_extra: null,
      chasis: null,
      categoria_name: "TRACTOR",
      catalogo_img: "https://storage.googleapis.com/images-tectrack/Farmall_90.jpg",
      modelo_name: "JXM 90",
      marca_name: "CASE IH",
      proyecto_name: "ATLANTIDA Tecun Uman Farmall 90 (308)",
      subdivision_name: "TECÚN UMÁN ATLÁNTIDA",
      cliente_name: "ATLANTIDA",
      estado_maquinaria: "ACTIVO",
      estatus_maquinaria: "OPERATIVO",
      departamento_negocio: "AGRICULTURA",
      unidad_negocio: "TRACTORES",
      propietario_name: "ATLANTIDA",
      contrato: "ATLANTIDA Tecun Uman Farmall 90 (308)",
      codigo_finca: "292299"
    },
    {
      id: 5,
      catalogo_id: 15,
      serie: "FR1622603",
      serie_extra: null,
      chasis: null,
      categoria_name: "TRACTOR",
      catalogo_img: "https://storage.googleapis.com/images-tectrack/Farmall_90.jpg",
      modelo_name: "JXM 90",
      marca_name: "CASE IH",
      proyecto_name: "ATLANTIDA Tecun Uman Farmall 90 (308)",
      subdivision_name: "TECÚN UMÁN ATLÁNTIDA",
      cliente_name: "ATLANTIDA",
      estado_maquinaria: "ACTIVO",
      estatus_maquinaria: "OPERATIVO",
      departamento_negocio: "AGRICULTURA",
      unidad_negocio: "TRACTORES",
      propietario_name: "ATLANTIDA",
      contrato: "ATLANTIDA Tecun Uman Farmall 90 (308)",
      codigo_finca: "292300"
    },
    {
      id: 6,
      catalogo_id: 28,
      serie: "PULV001",
      serie_extra: null,
      chasis: null,
      categoria_name: "PULVERIZADOR",
      catalogo_img: "https://storage.googleapis.com/images-tectrack/PATRIOT_250.jpg",
      modelo_name: "PATRIOT 250",
      marca_name: "CASE IH",
      proyecto_name: "PROYECTO PULVERIZACION",
      subdivision_name: "ESCUINTLA",
      cliente_name: "AGRO CORP",
      estado_maquinaria: "ACTIVO",
      estatus_maquinaria: "MANTENIMIENTO",
      departamento_negocio: "AGRICULTURA",
      unidad_negocio: "PULVERIZADORES",
      propietario_name: "AGRO CORP",
      contrato: "CONTRATO PULV 2024",
      codigo_finca: "PULV001"
    },
    {
      id: 7,
      catalogo_id: 31,
      serie: "CX001",
      serie_extra: null,
      chasis: "CX220C001",
      categoria_name: "EXCAVADORA",
      catalogo_img: "https://storage.googleapis.com/images-tectrack/excabadora_cx220c.png",
      modelo_name: "CX 220 C",
      marca_name: "CASE",
      proyecto_name: "PROYECTO CONSTRUCCION",
      subdivision_name: "GUATEMALA",
      cliente_name: "CONSTRUCTORA XYZ",
      estado_maquinaria: "ACTIVO",
      estatus_maquinaria: "OPERATIVO",
      departamento_negocio: "CONSTRUCCION",
      unidad_negocio: "EXCAVADORAS",
      propietario_name: "CONSTRUCTORA XYZ",
      contrato: "CONTRATO CONSTRUCCION 2024",
      codigo_finca: "CONST001"
    },
    {
      id: 8,
      catalogo_id: 33,
      serie: "PC621G001",
      serie_extra: null,
      chasis: "PC621G001",
      categoria_name: "PALA CARGADORA",
      catalogo_img: "https://storage.googleapis.com/images-tectrack/PALA%20CARGADORA%20621G%20view.png",
      modelo_name: "PC 621 G",
      marca_name: "CASE",
      proyecto_name: "PROYECTO MINERIA",
      subdivision_name: "QUETZALTENANGO",
      cliente_name: "MINERA ABC",
      estado_maquinaria: "ACTIVO",
      estatus_maquinaria: "OPERATIVO",
      departamento_negocio: "MINERIA",
      unidad_negocio: "PALAS CARGADORAS",
      propietario_name: "MINERA ABC",
      contrato: "CONTRATO MINERIA 2024",
      codigo_finca: "MIN001"
    }
  ];

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
		
	},
	// ============ SERVICIOS BASADOS EN DATOS REALES ============
	// Servicios para AUTO TURN (sistema_ID: 1)
	{
		id : 150,
		name : "CONFIGURACIÓN",
		type: "Servicio",
		parentId : 1,
		description : "2025-06-18 21:34:40",
		icon: "settings"
	},
	{
		id : 151,
		name : "CAPACITACIÓN",
		type: "Servicio",
		parentId : 1,
		description : "2025-06-18 21:34:40",
		icon: "graduation"
	},
	{
		id : 152,
		name : "SEGUIMIENTO",
		type: "Servicio",
		parentId : 1,
		description : "2025-06-18 21:34:40",
		icon: "tracking"
	},
	{
		id : 153,
		name : "INSPECCIÓN TÉCNICA",
		type: "Servicio",
		parentId : 1,
		description : "2025-06-18 21:34:40",
		icon: "inspect"
	},
	{
		id : 154,
		name : "EVALUACIÓN",
		type: "Servicio",
		parentId : 1,
		description : "2025-06-18 21:34:40",
		icon: "evaluate"
	},
	{
		id : 155,
		name : "ACTUALIZACIÓN",
		type: "Servicio",
		parentId : 1,
		description : "2025-07-28 22:00:59",
		icon: "update"
	},
	{
		id : 156,
		name : "INSTALACIÓN",
		type: "Servicio",
		parentId : 1,
		description : "2025-07-28 22:02:33",
		icon: "install"
	},
	
	// Servicios para AUTO TRACKER (sistema_ID: 2)
	{
		id : 157,
		name : "CONFIGURACIÓN",
		type: "Servicio",
		parentId : 2,
		description : "2025-06-18 21:34:40",
		icon: "settings"
	},
	{
		id : 158,
		name : "CAPACITACIÓN",
		type: "Servicio",
		parentId : 2,
		description : "2025-06-18 21:34:40",
		icon: "graduation"
	},
	{
		id : 159,
		name : "SEGUIMIENTO",
		type: "Servicio",
		parentId : 2,
		description : "2025-06-18 21:34:40",
		icon: "tracking"
	},
	{
		id : 160,
		name : "EVALUACIÓN",
		type: "Servicio",
		parentId : 2,
		description : "2025-06-18 21:34:40",
		icon: "evaluate"
	},
	{
		id : 161,
		name : "CALIBRACIÓN",
		type: "Servicio",
		parentId : 2,
		description : "2025-06-18 21:34:40",
		icon: "calibrate"
	},
	{
		id : 162,
		name : "INSPECCIÓN TÉCNICA",
		type: "Servicio",
		parentId : 2,
		description : "2025-06-18 21:34:40",
		icon: "inspect"
	},
	{
		id : 163,
		name : "CAMBIO DE HARDWARE",
		type: "Servicio",
		parentId : 2,
		description : "2025-06-18 21:34:40",
		icon: "hardware"
	},
	
	// Servicios para FIELD RATE CONTROL (sistema_ID: 3)
	{
		id : 164,
		name : "CONFIGURACIÓN",
		type: "Servicio",
		parentId : 3,
		description : "2025-06-18 21:34:40",
		icon: "settings"
	},
	{
		id : 165,
		name : "CAPACITACIÓN",
		type: "Servicio",
		parentId : 3,
		description : "2025-06-18 21:34:40",
		icon: "graduation"
	},
	{
		id : 166,
		name : "SEGUIMIENTO",
		type: "Servicio",
		parentId : 3,
		description : "2025-06-18 21:34:40",
		icon: "tracking"
	},
	{
		id : 167,
		name : "EVALUACIÓN",
		type: "Servicio",
		parentId : 3,
		description : "2025-06-18 21:34:40",
		icon: "evaluate"
	},
	
	// Servicios para SEÑAL DE CORRECCIÓN (sistema_ID: 4)
	{
		id : 168,
		name : "CONFIGURACIÓN",
		type: "Servicio",
		parentId : 4,
		description : "2025-06-18 21:34:40",
		icon: "settings"
	},
	{
		id : 169,
		name : "CAPACITACIÓN",
		type: "Servicio",
		parentId : 4,
		description : "2025-06-18 21:34:40",
		icon: "graduation"
	},
	{
		id : 170,
		name : "SEGUIMIENTO",
		type: "Servicio",
		parentId : 4,
		description : "2025-06-18 21:34:40",
		icon: "tracking"
	},
	{
		id : 171,
		name : "EVALUACIÓN",
		type: "Servicio",
		parentId : 4,
		description : "2025-06-18 21:34:40",
		icon: "evaluate"
	},
	{
		id : 172,
		name : "CALIBRACIÓN",
		type: "Servicio",
		parentId : 4,
		description : "2025-06-18 21:34:40",
		icon: "calibrate"
	},
	{
		id : 173,
		name : "INSPECCIÓN TÉCNICA",
		type: "Servicio",
		parentId : 4,
		description : "2025-06-18 21:34:40",
		icon: "inspect"
	},
	
	// Servicios para EFICIENCIA (sistema_ID: 6)
	{
		id : 174,
		name : "CONFIGURACIÓN",
		type: "Servicio",
		parentId : 6,
		description : "2025-06-18 21:34:40",
		icon: "settings"
	},
	{
		id : 175,
		name : "CAPACITACIÓN",
		type: "Servicio",
		parentId : 6,
		description : "2025-06-18 21:34:40",
		icon: "graduation"
	},
	{
		id : 176,
		name : "SEGUIMIENTO",
		type: "Servicio",
		parentId : 6,
		description : "2025-06-18 21:34:40",
		icon: "tracking"
	},
	{
		id : 177,
		name : "INSTALACIÓN",
		type: "Servicio",
		parentId : 6,
		description : "2025-06-18 21:34:40",
		icon: "install"
	},
	{
		id : 178,
		name : "CALIBRACIÓN",
		type: "Servicio",
		parentId : 6,
		description : "2025-06-18 21:34:40",
		icon: "calibrate"
	},
	{
		id : 179,
		name : "INSPECCIÓN TÉCNICA",
		type: "Servicio",
		parentId : 6,
		description : "2025-06-18 21:34:40",
		icon: "inspect"
	},
	{
		id : 180,
		name : "ACTUALIZACIÓN",
		type: "Servicio",
		parentId : 6,
		description : "2025-06-18 21:34:40",
		icon: "update"
	},
	{
		id : 181,
		name : "CAMBIO DE HARDWARE",
		type: "Servicio",
		parentId : 6,
		description : "2025-06-18 21:34:40",
		icon: "hardware"
	},
	
	// Servicios para BALANZA DE PRODUCTIVIDAD (sistema_ID: 7)
	{
		id : 182,
		name : "CONFIGURACIÓN",
		type: "Servicio",
		parentId : 7,
		description : "2025-06-18 21:34:40",
		icon: "settings"
	},
	{
		id : 183,
		name : "CAPACITACIÓN",
		type: "Servicio",
		parentId : 7,
		description : "2025-06-18 21:34:40",
		icon: "graduation"
	},
	{
		id : 184,
		name : "SEGUIMIENTO",
		type: "Servicio",
		parentId : 7,
		description : "2025-06-18 21:34:40",
		icon: "tracking"
	},
	{
		id : 185,
		name : "ACTUALIZACIÓN",
		type: "Servicio",
		parentId : 7,
		description : "2025-06-18 21:34:40",
		icon: "update"
	},
	
	// Servicios para DAÑOS (sistema_ID: 8)
	{
		id : 186,
		name : "CONFIGURACIÓN",
		type: "Servicio",
		parentId : 8,
		description : "2025-06-18 21:34:40",
		icon: "settings"
	},
	{
		id : 187,
		name : "CAPACITACIÓN",
		type: "Servicio",
		parentId : 8,
		description : "2025-06-18 21:34:40",
		icon: "graduation"
	},
	{
		id : 188,
		name : "SEGUIMIENTO",
		type: "Servicio",
		parentId : 8,
		description : "2025-06-18 21:34:40",
		icon: "tracking"
	},
	{
		id : 189,
		name : "INSPECCIÓN TÉCNICA",
		type: "Servicio",
		parentId : 8,
		description : "2025-06-18 21:34:40",
		icon: "inspect"
	},
	
	// Servicios para SISTEMA ELÉCTRICO (sistema_ID: 9)
	{
		id : 190,
		name : "INSTALACIÓN",
		type: "Servicio",
		parentId : 9,
		description : "2025-06-18 21:34:40",
		icon: "install"
	},
	{
		id : 191,
		name : "CALIBRACIÓN",
		type: "Servicio",
		parentId : 9,
		description : "2025-06-18 21:34:40",
		icon: "calibrate"
	},
	{
		id : 192,
		name : "INSPECCIÓN TÉCNICA",
		type: "Servicio",
		parentId : 9,
		description : "2025-06-18 21:34:40",
		icon: "inspect"
	},
	{
		id : 193,
		name : "ACTUALIZACIÓN",
		type: "Servicio",
		parentId : 9,
		description : "2025-06-18 21:34:40",
		icon: "update"
	},
	{
		id : 194,
		name : "CAMBIO DE HARDWARE",
		type: "Servicio",
		parentId : 9,
		description : "2025-06-18 21:34:40",
		icon: "hardware"
	},
	{
		id : 195,
		name : "CAPACITACIÓN",
		type: "Servicio",
		parentId : 9,
		description : "2025-06-18 21:34:40",
		icon: "graduation"
	},
	{
		id : 196,
		name : "SEGUIMIENTO",
		type: "Servicio",
		parentId : 9,
		description : "2025-06-18 21:34:40",
		icon: "tracking"
	},
	{
		id : 197,
		name : "EVALUACIÓN",
		type: "Servicio",
		parentId : 9,
		description : "2025-06-18 21:34:40",
		icon: "evaluate"
	},
	
	// Servicios para SISTEMA HIDRÁULICO (sistema_ID: 10)
	{
		id : 198,
		name : "INSTALACIÓN",
		type: "Servicio",
		parentId : 10,
		description : "2025-06-18 21:34:40",
		icon: "install"
	},
	{
		id : 199,
		name : "CAPACITACIÓN",
		type: "Servicio",
		parentId : 10,
		description : "2025-06-18 21:34:40",
		icon: "graduation"
	},
	{
		id : 200,
		name : "SEGUIMIENTO",
		type: "Servicio",
		parentId : 10,
		description : "2025-06-18 21:34:40",
		icon: "tracking"
	},
	
	// Servicios para SISTEMA MECÁNICO (sistema_ID: 11)
	{
		id : 201,
		name : "CAPACITACIÓN",
		type: "Servicio",
		parentId : 11,
		description : "2025-06-18 21:34:40",
		icon: "graduation"
	},
	{
		id : 202,
		name : "SEGUIMIENTO",
		type: "Servicio",
		parentId : 11,
		description : "2025-06-18 21:34:40",
		icon: "tracking"
	},
	
	// Servicios para PILOTO AUTOMÁTICO (sistema_ID: 12)
	{
		id : 203,
		name : "INSTALACIÓN",
		type: "Servicio",
		parentId : 12,
		description : "2025-06-18 21:34:40",
		icon: "install"
	},
	{
		id : 204,
		name : "CALIBRACIÓN",
		type: "Servicio",
		parentId : 12,
		description : "2025-06-18 21:34:40",
		icon: "calibrate"
	},
	{
		id : 205,
		name : "INSPECCIÓN TÉCNICA",
		type: "Servicio",
		parentId : 12,
		description : "2025-06-18 21:34:40",
		icon: "inspect"
	},
	{
		id : 206,
		name : "ACTUALIZACIÓN",
		type: "Servicio",
		parentId : 12,
		description : "2025-06-18 21:34:40",
		icon: "update"
	},
	{
		id : 207,
		name : "CAMBIO DE HARDWARE",
		type: "Servicio",
		parentId : 12,
		description : "2025-06-18 21:34:40",
		icon: "hardware"
	},
	{
		id : 208,
		name : "DOWNGRADE",
		type: "Servicio",
		parentId : 12,
		description : "2025-06-18 21:34:40",
		icon: "downgrade"
	},
	{
		id : 209,
		name : "CAPACITACIÓN",
		type: "Servicio",
		parentId : 12,
		description : "2025-06-18 21:34:40",
		icon: "graduation"
	},
	{
		id : 210,
		name : "SEGUIMIENTO",
		type: "Servicio",
		parentId : 12,
		description : "2025-06-18 21:34:40",
		icon: "tracking"
	},
	{
		id : 211,
		name : "EVALUACIÓN",
		type: "Servicio",
		parentId : 12,
		description : "2025-06-18 21:34:40",
		icon: "evaluate"
	},
	{
		id : 212,
		name : "CONFIGURACIÓN",
		type: "Servicio",
		parentId : 12,
		description : "2025-06-18 21:34:40",
		icon: "settings"
	},
	
	// Servicios para FIELD IQ (sistema_ID: 13)
	{
		id : 213,
		name : "INSTALACIÓN",
		type: "Servicio",
		parentId : 13,
		description : "2025-06-18 21:34:40",
		icon: "install"
	},
	{
		id : 214,
		name : "CALIBRACIÓN",
		type: "Servicio",
		parentId : 13,
		description : "2025-06-18 21:34:40",
		icon: "calibrate"
	},
	{
		id : 215,
		name : "INSPECCIÓN TÉCNICA",
		type: "Servicio",
		parentId : 13,
		description : "2025-06-18 21:34:40",
		icon: "inspect"
	},
	{
		id : 216,
		name : "ACTUALIZACIÓN",
		type: "Servicio",
		parentId : 13,
		description : "2025-06-18 21:34:40",
		icon: "update"
	},
	{
		id : 217,
		name : "CAMBIO DE HARDWARE",
		type: "Servicio",
		parentId : 13,
		description : "2025-06-18 21:34:40",
		icon: "hardware"
	},
	{
		id : 218,
		name : "DOWNGRADE",
		type: "Servicio",
		parentId : 13,
		description : "2025-06-18 21:34:40",
		icon: "downgrade"
	},
	{
		id : 219,
		name : "CAPACITACIÓN",
		type: "Servicio",
		parentId : 13,
		description : "2025-06-18 21:34:40",
		icon: "graduation"
	},
	{
		id : 220,
		name : "SEGUIMIENTO",
		type: "Servicio",
		parentId : 13,
		description : "2025-06-18 21:34:40",
		icon: "tracking"
	},
	{
		id : 221,
		name : "EVALUACIÓN",
		type: "Servicio",
		parentId : 13,
		description : "2025-06-18 21:34:40",
		icon: "evaluate"
	},
	{
		id : 222,
		name : "CONFIGURACIÓN",
		type: "Servicio",
		parentId : 13,
		description : "2025-06-18 21:34:40",
		icon: "settings"
	},
	
	// Servicios para TELEMETRÍA (sistema_ID: 14)
	{
		id : 223,
		name : "INSPECCIÓN TÉCNICA",
		type: "Servicio",
		parentId : 14,
		description : "2025-06-18 21:34:40",
		icon: "inspect"
	},
	{
		id : 224,
		name : "SEGUIMIENTO",
		type: "Servicio",
		parentId : 14,
		description : "2025-06-18 21:34:40",
		icon: "tracking"
	},
	{
		id : 225,
		name : "EVALUACIÓN",
		type: "Servicio",
		parentId : 14,
		description : "2025-06-18 21:34:40",
		icon: "evaluate"
	},
	{
		id : 226,
		name : "CAPACITACIÓN",
		type: "Servicio",
		parentId : 14,
		description : "2025-07-28 22:02:02",
		icon: "graduation"
	},
	{
		id : 227,
		name : "ACTUALIZACIÓN",
		type: "Servicio",
		parentId : 14,
		description : "2025-07-28 22:03:26",
		icon: "update"
	},
	
	// Servicios para SOIL XPLORER (sistema_ID: 15)
	{
		id : 228,
		name : "SEGUIMIENTO",
		type: "Servicio",
		parentId : 15,
		description : "2025-06-18 21:34:40",
		icon: "tracking"
	},
	
	// Servicios para AFS SOFTWARE (sistema_ID: 16)
	{
		id : 229,
		name : "INSPECCIÓN TÉCNICA",
		type: "Servicio",
		parentId : 16,
		description : "2025-06-18 21:34:40",
		icon: "inspect"
	},
	{
		id : 230,
		name : "ACTUALIZACIÓN",
		type: "Servicio",
		parentId : 16,
		description : "2025-06-18 21:34:40",
		icon: "update"
	},
	{
		id : 231,
		name : "CAMBIO DE HARDWARE",
		type: "Servicio",
		parentId : 16,
		description : "2025-06-18 21:34:40",
		icon: "hardware"
	},
	{
		id : 232,
		name : "CAPACITACIÓN",
		type: "Servicio",
		parentId : 16,
		description : "2025-06-18 21:34:40",
		icon: "graduation"
	},
	
	// Servicios para IA TRIMBLE (sistema_ID: 17)
	{
		id : 233,
		name : "ACTUALIZACIÓN",
		type: "Servicio",
		parentId : 17,
		description : "2025-06-18 21:34:40",
		icon: "update"
	},
	{
		id : 234,
		name : "CAPACITACIÓN",
		type: "Servicio",
		parentId : 17,
		description : "2025-06-18 21:34:40",
		icon: "graduation"
	},
	{
		id : 235,
		name : "SEGUIMIENTO",
		type: "Servicio",
		parentId : 17,
		description : "2025-06-18 21:34:40",
		icon: "tracking"
	},
	
	// Servicios para PROGRAMA DE DESARROLLO (sistema_ID: 18)
	{
		id : 236,
		name : "EVALUACIÓN",
		type: "Servicio",
		parentId : 18,
		description : "2025-06-18 21:34:40",
		icon: "evaluate"
	},
	{
		id : 237,
		name : "CAPACITACIÓN",
		type: "Servicio",
		parentId : 18,
		description : "2025-06-18 21:34:40",
		icon: "graduation"
	},
	{
		id : 238,
		name : "SEGUIMIENTO",
		type: "Servicio",
		parentId : 18,
		description : "2025-06-18 21:34:40",
		icon: "tracking"
	},
	
	// Servicios para AUTO TURN (sistema_ID: 19) - duplicado
	{
		id : 239,
		name : "SEGUIMIENTO",
		type: "Servicio",
		parentId : 19,
		description : "2025-06-18 21:34:40",
		icon: "tracking"
	},
	
	// Servicios para AUTO TRACKER (sistema_ID: 20) - duplicado
	{
		id : 240,
		name : "SEGUIMIENTO",
		type: "Servicio",
		parentId : 20,
		description : "2025-06-18 21:34:40",
		icon: "tracking"
	},
	
	// Servicios para PILOTO AUTOMÁTICO (sistema_ID: 21) - duplicado
	{
		id : 241,
		name : "INSPECCIÓN TÉCNICA",
		type: "Servicio",
		parentId : 21,
		description : "2025-06-18 21:34:40",
		icon: "inspect"
	},
	{
		id : 242,
		name : "ACTUALIZACIÓN",
		type: "Servicio",
		parentId : 21,
		description : "2025-06-18 21:34:40",
		icon: "update"
	},
	
	// Servicios para subsistemas específicos
	// Servicios para SENSOR (sistema_ID: 27)
	{
		id : 243,
		name : "CALIBRACIÓN",
		type: "Servicio",
		parentId : 27,
		description : "2025-06-18 21:34:40",
		icon: "calibrate"
	},
	
	// Servicios para PRO 700 (sistema_ID: 62)
	{
		id : 244,
		name : "CONFIGURACIÓN",
		type: "Servicio",
		parentId : 62,
		description : "2025-06-18 21:34:40",
		icon: "settings"
	},
	{
		id : 245,
		name : "ACTUALIZACIÓN",
		type: "Servicio",
		parentId : 62,
		description : "2025-06-18 21:34:40",
		icon: "update"
	},
	
	// Servicios para PRO 700+ (sistema_ID: 63)
	{
		id : 246,
		name : "CONFIGURACIÓN",
		type: "Servicio",
		parentId : 63,
		description : "2025-06-18 21:34:40",
		icon: "settings"
	},
	{
		id : 247,
		name : "ACTUALIZACIÓN",
		type: "Servicio",
		parentId : 63,
		description : "2025-06-18 21:34:40",
		icon: "update"
	},
	
	// Servicios para XCN 2050 (sistema_ID: 64)
	{
		id : 248,
		name : "CONFIGURACIÓN",
		type: "Servicio",
		parentId : 64,
		description : "2025-06-18 21:34:40",
		icon: "settings"
	},
	{
		id : 249,
		name : "ACTUALIZACIÓN",
		type: "Servicio",
		parentId : 64,
		description : "2025-06-18 21:34:40",
		icon: "update"
	},
	
	// Servicios para PRO 1200 (sistema_ID: 65)
	{
		id : 250,
		name : "CONFIGURACIÓN",
		type: "Servicio",
		parentId : 65,
		description : "2025-06-18 21:34:40",
		icon: "settings"
	},
	{
		id : 251,
		name : "ACTUALIZACIÓN",
		type: "Servicio",
		parentId : 65,
		description : "2025-06-18 21:34:40",
		icon: "update"
	},
	
	// Servicios para módulos PILOTO AUTOMÁTICO
	// SCM (sistema_ID: 66)
	{
		id : 252,
		name : "ACTUALIZACIÓN",
		type: "Servicio",
		parentId : 66,
		description : "2025-06-18 21:34:40",
		icon: "update"
	},
	
	// TRASMISION (sistema_ID: 67)
	{
		id : 253,
		name : "ACTUALIZACIÓN",
		type: "Servicio",
		parentId : 67,
		description : "2025-06-18 21:34:40",
		icon: "update"
	},
	
	// UCM (sistema_ID: 68)
	{
		id : 254,
		name : "ACTUALIZACIÓN",
		type: "Servicio",
		parentId : 68,
		description : "2025-06-18 21:34:40",
		icon: "update"
	},
	
	// NAV 2 (sistema_ID: 69)
	{
		id : 255,
		name : "CONFIGURACIÓN",
		type: "Servicio",
		parentId : 69,
		description : "2025-06-18 21:34:40",
		icon: "settings"
	},
	{
		id : 256,
		name : "ACTUALIZACIÓN",
		type: "Servicio",
		parentId : 69,
		description : "2025-06-18 21:34:40",
		icon: "update"
	},
	
	// NAV 3 (sistema_ID: 70)
	{
		id : 257,
		name : "CONFIGURACIÓN",
		type: "Servicio",
		parentId : 70,
		description : "2025-06-18 21:34:40",
		icon: "settings"
	},
	{
		id : 258,
		name : "ACTUALIZACIÓN",
		type: "Servicio",
		parentId : 70,
		description : "2025-06-18 21:34:40",
		icon: "update"
	},
	
	// TM 200 (sistema_ID: 71)
	{
		id : 259,
		name : "CONFIGURACIÓN",
		type: "Servicio",
		parentId : 71,
		description : "2025-06-18 21:34:40",
		icon: "settings"
	},
	{
		id : 260,
		name : "ACTUALIZACIÓN",
		type: "Servicio",
		parentId : 71,
		description : "2025-06-18 21:34:40",
		icon: "update"
	},
	
	// Servicios para antenas PILOTO AUTOMÁTICO
	// 372 (sistema_ID: 72)
	{
		id : 261,
		name : "CONFIGURACIÓN",
		type: "Servicio",
		parentId : 72,
		description : "2025-06-18 21:34:40",
		icon: "settings"
	},
	{
		id : 262,
		name : "ACTUALIZACIÓN",
		type: "Servicio",
		parentId : 72,
		description : "2025-06-18 21:34:40",
		icon: "update"
	},
	
	// 392 (sistema_ID: 73)
	{
		id : 263,
		name : "CONFIGURACIÓN",
		type: "Servicio",
		parentId : 73,
		description : "2025-06-18 21:34:40",
		icon: "settings"
	},
	{
		id : 264,
		name : "ACTUALIZACIÓN",
		type: "Servicio",
		parentId : 73,
		description : "2025-06-18 21:34:40",
		icon: "update"
	},
	
	// AG 25 (sistema_ID: 74)
	{
		id : 265,
		name : "CALIBRACIÓN",
		type: "Servicio",
		parentId : 74,
		description : "2025-06-18 21:34:40",
		icon: "calibrate"
	},
	{
		id : 266,
		name : "ACTUALIZACIÓN",
		type: "Servicio",
		parentId : 74,
		description : "2025-06-18 21:34:40",
		icon: "update"
	},
	
	// 450 (sistema_ID: 75)
	{
		id : 267,
		name : "MEDICIÓN OHMIOS",
		type: "Servicio",
		parentId : 75,
		description : "2025-06-18 21:34:40",
		icon: "measure"
	},
	{
		id : 268,
		name : "CAMBIO DE HARDWARE",
		type: "Servicio",
		parentId : 75,
		description : "2025-06-18 21:34:40",
		icon: "hardware"
	},
	
	// 470 (sistema_ID: 76)
	{
		id : 269,
		name : "MEDICIÓN OHMIOS",
		type: "Servicio",
		parentId : 76,
		description : "2025-06-18 21:34:40",
		icon: "measure"
	},
	{
		id : 270,
		name : "CAMBIO DE HARDWARE",
		type: "Servicio",
		parentId : 76,
		description : "2025-06-18 21:34:40",
		icon: "hardware"
	},
	
	// Servicios para CONTROL DE DIRECCION subsistemas
	// RODADURA (sistema_ID: 77)
	{
		id : 271,
		name : "CALIBRACIÓN",
		type: "Servicio",
		parentId : 77,
		description : "2025-06-18 21:34:40",
		icon: "calibrate"
	},
	
	// ZONA MUERTA (sistema_ID: 78)
	{
		id : 272,
		name : "CALIBRACIÓN",
		type: "Servicio",
		parentId : 78,
		description : "2025-06-18 21:34:40",
		icon: "calibrate"
	},
	
	// P. GANANCIA (sistema_ID: 79)
	{
		id : 273,
		name : "CALIBRACIÓN",
		type: "Servicio",
		parentId : 79,
		description : "2025-06-18 21:34:40",
		icon: "calibrate"
	},
	
	// SENSOR DE DIRECCIÓN (sistema_ID: 80)
	{
		id : 274,
		name : "CALIBRACIÓN",
		type: "Servicio",
		parentId : 80,
		description : "2025-06-18 21:34:40",
		icon: "calibrate"
	},
	
	// Servicios para FIELD IQ pantallas
	// XCN 750 (sistema_ID: 81)
	{
		id : 275,
		name : "CONFIGURACIÓN",
		type: "Servicio",
		parentId : 81,
		description : "2025-06-18 21:34:40",
		icon: "settings"
	},
	{
		id : 276,
		name : "ACTUALIZACIÓN",
		type: "Servicio",
		parentId : 81,
		description : "2025-06-18 21:34:40",
		icon: "update"
	},
	
	// XCN 1050 (sistema_ID: 82)
	{
		id : 277,
		name : "CONFIGURACIÓN",
		type: "Servicio",
		parentId : 82,
		description : "2025-06-18 21:34:40",
		icon: "settings"
	},
	{
		id : 278,
		name : "ACTUALIZACIÓN",
		type: "Servicio",
		parentId : 82,
		description : "2025-06-18 21:34:40",
		icon: "update"
	},
	
	// XCN 2050 (sistema_ID: 83)
	{
		id : 279,
		name : "CONFIGURACIÓN",
		type: "Servicio",
		parentId : 83,
		description : "2025-06-18 21:34:40",
		icon: "settings"
	},
	{
		id : 280,
		name : "ACTUALIZACIÓN",
		type: "Servicio",
		parentId : 83,
		description : "2025-06-18 21:34:40",
		icon: "update"
	},
	
	// Servicios para FIELD IQ módulos
	// CONTROL DE SECCIONES (sistema_ID: 84)
	{
		id : 281,
		name : "CONFIGURACIÓN",
		type: "Servicio",
		parentId : 84,
		description : "2025-06-18 21:34:40",
		icon: "settings"
	},
	{
		id : 282,
		name : "ACTUALIZACIÓN",
		type: "Servicio",
		parentId : 84,
		description : "2025-06-18 21:34:40",
		icon: "update"
	},
	
	// MONITOREO DE SEMILLAS (sistema_ID: 85)
	{
		id : 283,
		name : "CONFIGURACIÓN",
		type: "Servicio",
		parentId : 85,
		description : "2025-06-18 21:34:40",
		icon: "settings"
	},
	{
		id : 284,
		name : "ACTUALIZACIÓN",
		type: "Servicio",
		parentId : 85,
		description : "2025-06-18 21:34:40",
		icon: "update"
	}
]
;

  // Memoizar updateFormData para mejor rendimiento
  const updateFormData = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  // Memoizar updateFeature para mejor rendimiento  
  const updateFeature = useCallback((featureName, value) => {
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [featureName]: value
      }
    }));
  }, []);

  // Memoizar handleTreeSelection para mejor rendimiento
  const handleTreeSelection = useCallback((node, selectedNodes) => {
    updateFormData('selectedTreeItems', Array.from(selectedNodes));
  }, [updateFormData]);

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
      id: 5,
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
      id: 6,
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
      id: 7,
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
      id: 8,
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
      id: 9,
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

export default WizardExample;
