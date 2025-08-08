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
