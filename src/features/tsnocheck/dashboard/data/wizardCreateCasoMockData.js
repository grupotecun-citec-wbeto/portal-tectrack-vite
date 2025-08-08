// @ts-nocheck
/**
 * Datos mock para el componente WizardCreateCaso
 * Contiene todos los datos de ejemplo utilizados en el wizard
 */

import { FiHeadphones, FiBookOpen, FiTool, FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';

// Definición de segmentos disponibles
export const segments = [
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
export const caseTypes = [
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
export const equipmentData = [
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
export const treeData = [
  {
    id: 1,
    name: "AUTO TURN",
    type: "Sistema",
    description: "2024-12-16 16:48:44",
    parentId: null
  },
  {
    id: 2,
    name: "AUTO TRACKER",
    type: "Sistema",
    description: "2024-12-16 16:48:44",
    parentId: null
  },
  {
    id: 3,
    name: "FIELD RATE CONTROL",
    type: "Sistema",
    description: "2024-12-16 16:48:44",
    parentId: null
  },
  {
    id: 4,
    name: "SEÑAL DE CORRECCIÓN",
    type: "Sistema",
    description: "2024-12-16 16:48:44",
    parentId: null
  },
  {
    id: 6,
    name: "EFICIENCIA",
    type: "Sistema",
    description: "2024-12-16 16:48:44",
    parentId: null
  },
  {
    id: 7,
    name: "BALANZA DE PRODUCTIVIDAD",
    type: "Sistema",
    description: "2024-12-16 16:48:44",
    parentId: null
  },
  {
    id: 8,
    name: "DAÑOS",
    type: "Sistema",
    description: "2024-12-16 16:48:44",
    parentId: null
  },
  {
    id: 9,
    name: "SISTEMA ELÉCTRICO",
    type: "Sistema",
    description: "2024-12-16 16:48:44",
    parentId: null
  },
  {
    id: 10,
    name: "SISTEMA HIDRÁULICO",
    type: "Sistema",
    description: "2024-12-16 16:48:44",
    parentId: null
  },
  {
    id: 11,
    name: "SISTEMA MECANICO",
    type: "Sistema",
    description: "2024-12-16 16:48:44",
    parentId: null
  },
  {
    id: 12,
    name: "PILOTO AUTOMÁTICO",
    type: "Sistema",
    description: "2024-12-16 16:48:44",
    parentId: null
  },
  {
    id: 13,
    name: "FIELD IQ",
    type: "Sistema",
    description: "2024-12-16 16:48:44",
    parentId: null
  },
  {
    id: 14,
    name: "TELEMETRÍA",
    type: "Sistema",
    description: "2024-12-16 16:48:44",
    parentId: null
  },
  {
    id: 15,
    name: "SOIL XPLORER",
    type: "Sistema",
    description: "2024-12-16 16:48:44",
    parentId: null
  },
  {
    id: 16,
    name: "AFS SOFTWARE",
    type: "Sistema",
    description: "2024-12-16 16:48:44",
    parentId: null
  },
  {
    id: 17,
    name: "IA TRIMBLE",
    type: "Sistema",
    description: "2024-12-16 16:48:44",
    parentId: null
  },
  {
    id: 18,
    name: "PROGRAMA DE DESARROLLO",
    type: "Sistema",
    description: "2025-01-16 15:30:29",
    parentId: null
  },
  {
    id: 19,
    name: "AUTO TURN",
    type: "Sistema",
    description: "2025-03-21 13:39:48",
    parentId: null
  },
  {
    id: 20,
    name: "AUTO TRACKER",
    type: "Sistema",
    description: "2025-03-21 13:39:49",
    parentId: null
  },
  {
    id: 21,
    name: "PILOTO AUTOMÁTICO",
    type: "Sistema",
    description: "2025-03-21 13:39:49",
    parentId: null
  },
  {
    id: 22,
    name: "CONTROL CRUSERO",
    type: "Sistema",
    description: "2025-03-21 13:39:49",
    parentId: null
  },
  {
    id: 23,
    name: "PANTALLA",
    type: "Sistema",
    parentId: 9,
    description: "2025-05-06 23:43:48"
  },
  {
    id: 24,
    name: "MODULO",
    type: "Sistema",
    parentId: 9,
    description: "2025-05-06 23:43:48"
  },
  {
    id: 25,
    name: "ANTENA",
    type: "Sistema",
    parentId: 9,
    description: "2025-05-06 23:43:48"
  },
  {
    id: 26,
    name: "ARNES",
    type: "Sistema",
    parentId: 9,
    description: "2025-05-06 23:43:48"
  },
  {
    id: 27,
    name: "SENSOR",
    type: "Sistema",
    parentId: 9,
    description: "2025-05-06 23:43:48"
  },
  {
    id: 28,
    name: "BOBINA",
    type: "Sistema",
    parentId: 9,
    description: "2025-05-06 23:43:48"
  },
  {
    id: 29,
    name: "INTERRUPTOR",
    type: "Sistema",
    parentId: 9,
    description: "2025-05-06 23:43:49"
  },
  {
    id: 30,
    name: "BOMBA",
    type: "Sistema",
    parentId: 10,
    description: "2025-05-06 23:43:49"
  },
  {
    id: 31,
    name: "MOTOR HIDRÁULICO",
    type: "Sistema",
    parentId: 10,
    description: "2025-05-06 23:43:49"
  },
  {
    id: 32,
    name: "MAGUERAS",
    type: "Sistema",
    parentId: 10,
    description: "2025-05-06 23:43:49"
  },
  {
    id: 33,
    name: "BLOQUE HIDRÁULICO",
    type: "Sistema",
    parentId: 10,
    description: "2025-05-06 23:43:49"
  },
  {
    id: 34,
    name: "VALVULAS",
    type: "Sistema",
    parentId: 10,
    description: "2025-05-06 23:43:49"
  },
  {
    id: 35,
    name: "CILINDROS",
    type: "Sistema",
    parentId: 10,
    description: "2025-05-06 23:43:49"
  },
  {
    id: 36,
    name: "PICADOR",
    type: "Sistema",
    parentId: 11,
    description: "2025-05-06 23:43:50"
  },
  {
    id: 37,
    name: "TREN DE MOLINOS",
    type: "Sistema",
    parentId: 11,
    description: "2025-05-06 23:43:50"
  },
  {
    id: 38,
    name: "CORTE BASE",
    type: "Sistema",
    parentId: 11,
    description: "2025-05-06 23:43:50"
  },
  {
    id: 39,
    name: "DIVISOR",
    type: "Sistema",
    parentId: 11,
    description: "2025-05-06 23:43:50"
  },
  {
    id: 40,
    name: "RODAJE",
    type: "Sistema",
    parentId: 11,
    description: "2025-05-06 23:43:50"
  },
  {
    id: 41,
    name: "ELEVADOR",
    type: "Sistema",
    parentId: 11,
    description: "2025-05-06 23:43:51"
  },
  {
    id: 42,
    name: "IMPLEMENTO",
    type: "Sistema",
    parentId: 11,
    description: "2025-05-06 23:43:51"
  },
  {
    id: 43,
    name: "CONECTOR",
    type: "Sistema",
    parentId: 23,
    description: "2025-05-06 23:43:51"
  },
  {
    id: 44,
    name: "FUSIBLE",
    type: "Sistema",
    parentId: 23,
    description: "2025-05-06 23:43:51"
  },
  {
    id: 45,
    name: "TERMINALES",
    type: "Sistema",
    parentId: 23,
    description: "2025-05-06 23:43:51"
  },
  {
    id: 46,
    name: "CONECTOR",
    type: "Sistema",
    parentId: 24,
    description: "2025-05-06 23:43:51"
  },
  {
    id: 47,
    name: "FUSIBLE",
    type: "Sistema",
    parentId: 24,
    description: "2025-05-06 23:43:51"
  },
  {
    id: 48,
    name: "TERMINALES",
    type: "Sistema",
    parentId: 24,
    description: "2025-05-06 23:43:52"
  },
  {
    id: 49,
    name: "BASE MAGNETICA",
    type: "Sistema",
    parentId: 25,
    description: "2025-05-06 23:43:52"
  },
  {
    id: 50,
    name: "CONECTOR",
    type: "Sistema",
    parentId: 25,
    description: "2025-05-06 23:43:52"
  }
  // Nota: El treeData completo contiene más elementos.
  // Para obtener la estructura completa, revisar el archivo original WizardCreateCaso.jsx
  // Este es un extracto de los primeros 50 elementos para mostrar la estructura
];

// Funciones utilitarias para el manejo de datos del árbol
export function getSelectionStats(selectedItems) {
  if (!selectedItems || selectedItems.length === 0) return { sistemas: 0, subsistemas: 0, servicios: 0 };
  
  const stats = { sistemas: 0, subsistemas: 0, servicios: 0 };
  
  selectedItems.forEach(itemId => {
    // Lógica para categorizar elementos basada en patrones de ID o estructura de datos
    if (itemId.toString().length <= 2) {
      stats.sistemas++;
    } else if (itemId.toString().includes('.')) {
      stats.subsistemas++;
    } else {
      stats.servicios++;
    }
  });
  
  return stats;
}

export function organizeTreeSelection(selectedItems) {
  // Lógica de organización simplificada
  return [{
    sistema: { id: '1', name: 'Sistema Principal', type: 'Sistema' },
    subsistemas: [],
    servicios: []
  }];
}

export function organizeTreeSelectionWithPaths(selectedItems) {
  // Lógica simplificada con rutas
  return [{
    sistema: { id: '1', name: 'Sistema Principal', type: 'Sistema' },
    selections: selectedItems.map(id => ({
      selectedItem: { id, name: `Item ${id}`, type: 'Servicio' },
      fullPath: [{ id, name: `Item ${id}`, type: 'Servicio' }]
    }))
  }];
}

// Estado inicial del formulario
export const initialFormData = {
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
};

// Configuración de características disponibles
export const availableFeatures = [
  {
    key: 'security',
    title: 'Seguridad Avanzada',
    description: 'Autenticación de dos factores y encriptación',
    colorScheme: 'green'
  },
  {
    key: 'notifications',
    title: 'Notificaciones Push',
    description: 'Recibe alertas en tiempo real',
    colorScheme: 'blue'
  },
  {
    key: 'darkMode',
    title: 'Modo Oscuro',
    description: 'Tema oscuro para mejor experiencia',
    colorScheme: 'purple'
  },
  {
    key: 'performance',
    title: 'Alto Rendimiento',
    description: 'Optimizaciones para velocidad',
    colorScheme: 'orange'
  },
  {
    key: 'multilingual',
    title: 'Multiidioma',
    description: 'Soporte para múltiples idiomas',
    colorScheme: 'teal'
  },
  {
    key: 'privacy',
    title: 'Privacidad Avanzada',
    description: 'Control total sobre tus datos',
    colorScheme: 'red'
  }
];

// Opciones de idiomas disponibles
export const languageOptions = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' }
];

// Opciones de tema disponibles
export const themeOptions = [
  { value: 'light', label: 'Claro' },
  { value: 'dark', label: 'Oscuro' },
  { value: 'auto', label: 'Automático' }
];

// Opciones de cargos disponibles
export const roleOptions = [
  { value: 'developer', label: 'Desarrollador' },
  { value: 'designer', label: 'Diseñador' },
  { value: 'manager', label: 'Gerente' },
  { value: 'analyst', label: 'Analista' },
  { value: 'other', label: 'Otro' }
];
