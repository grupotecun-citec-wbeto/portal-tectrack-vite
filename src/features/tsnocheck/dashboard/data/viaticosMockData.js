// Mock data para viáticos
export const viaticosMockData = [
  {
    ID: "viatico-001",
    caso_ID: "0004c854-6d2b-4cc3-83ea-f5dfafc8a4a0",
    caso_numero: "2-0004c854",
    tecnico_ID: 2,
    tecnico_name: "Miguel Rodríguez",
    fecha_ingreso: "2025-03-31",
    fecha_creacion: "2025-03-31 10:30:00",
    estado: "Aprobado", // Pendiente, Aprobado, Rechazado
    desayuno: 15.50,
    almuerzo: 25.00,
    cena: 20.75,
    hospedaje: 85.00,
    combustibles: {
      cantidad: 12.5,
      unidad: "Galones", // Galones, Litros
      tipo: "Diesel", // Diesel, Gasolina
      monto_total: 48.75
    },
    transporte: 35.00,
    monto_total: 230.00,
    observaciones: "Viaje a zona rural para mantenimiento de equipos",
    created_at: "2025-03-31 10:30:00",
    updated_at: "2025-03-31 15:45:00"
  },
  {
    ID: "viatico-002", 
    caso_ID: "0068efd1-29a1-42c1-bb21-d33c540d7ca3",
    caso_numero: "7-0068efd1",
    tecnico_ID: 7,
    tecnico_name: "Carlos Mendoza",
    fecha_ingreso: "2025-02-28",
    fecha_creacion: "2025-02-28 16:15:00",
    estado: "Pendiente",
    desayuno: 12.00,
    almuerzo: 18.50,
    cena: 22.00,
    hospedaje: 0, // No se hospedó
    combustibles: {
      cantidad: 8.2,
      unidad: "Galones",
      tipo: "Gasolina",
      monto_total: 35.50
    },
    transporte: 25.00,
    monto_total: 113.00,
    observaciones: "Servicio técnico en construcción",
    created_at: "2025-02-28 16:15:00",
    updated_at: "2025-02-28 16:15:00"
  },
  {
    ID: "viatico-003",
    caso_ID: "00895369-bc9f-48e0-b2db-2d550c9a2ab9", 
    caso_numero: "4-00895369",
    tecnico_ID: 4,
    tecnico_name: "Ana García",
    fecha_ingreso: "2025-06-10",
    fecha_creacion: "2025-06-10 20:30:00",
    estado: "Aprobado",
    desayuno: 14.00,
    almuerzo: 28.00,
    cena: 24.50,
    hospedaje: 120.00,
    combustibles: {
      cantidad: 45.0,
      unidad: "Litros",
      tipo: "Diesel",
      monto_total: 67.50
    },
    transporte: 75.00,
    monto_total: 329.00,
    observaciones: "Evaluación prolongada de programa de desarrollo - 3 días",
    created_at: "2025-06-10 20:30:00",
    updated_at: "2025-06-11 09:15:00"
  },
  {
    ID: "viatico-004",
    caso_ID: "05094efe-2ce6-4fa7-b8cc-564a9bbcdd53",
    caso_numero: "1-05094efe", 
    tecnico_ID: 1,
    tecnico_name: "Juan Pérez",
    fecha_ingreso: "2025-01-22",
    fecha_creacion: "2025-01-22 14:00:00",
    estado: "Rechazado",
    desayuno: 10.00,
    almuerzo: 15.00,
    cena: 18.00,
    hospedaje: 60.00,
    combustibles: {
      cantidad: 15.8,
      unidad: "Galones",
      tipo: "Diesel",
      monto_total: 62.40
    },
    transporte: 40.00,
    monto_total: 205.40,
    observaciones: "Reparación de equipo sin señal CMR",
    motivo_rechazo: "Montos excesivos para la zona",
    created_at: "2025-01-22 14:00:00",
    updated_at: "2025-01-23 08:30:00"
  },
  {
    ID: "viatico-005",
    caso_ID: "103b72e5-b1d5-4254-abd0-4c062a3ec989",
    caso_numero: "4-103b72e5",
    tecnico_ID: 4,
    tecnico_name: "Ana García", 
    fecha_ingreso: "2025-01-15",
    fecha_creacion: "2025-01-15 22:00:00",
    estado: "Aprobado",
    desayuno: 8.50,
    almuerzo: 12.00,
    cena: 15.50,
    hospedaje: 0,
    combustibles: {
      cantidad: 6.5,
      unidad: "Galones",
      tipo: "Gasolina",
      monto_total: 28.25
    },
    transporte: 20.00,
    monto_total: 84.25,
    observaciones: "Servicio rápido - mismo día",
    created_at: "2025-01-15 22:00:00",
    updated_at: "2025-01-16 10:00:00"
  }
];

// Estados de viáticos
export const estadosViaticos = [
  { id: "Pendiente", name: "Pendiente", color: "yellow", icon: "clock" },
  { id: "Aprobado", name: "Aprobado", color: "green", icon: "check" },
  { id: "Rechazado", name: "Rechazado", color: "red", icon: "x" }
];

// Tipos de combustible
export const tiposCombustible = [
  { id: "Diesel", name: "Diesel", color: "blue" },
  { id: "Gasolina", name: "Gasolina", color: "orange" }
];

// Unidades de combustible
export const unidadesCombustible = [
  { id: "Galones", name: "Galones" },
  { id: "Litros", name: "Litros" }
];

// Funciones de utilidad
export const getEstadoViaticoInfo = (estado) => {
  return estadosViaticos.find(e => e.id === estado) || estadosViaticos[0];
};

export const getTipoCombustibleInfo = (tipo) => {
  return tiposCombustible.find(t => t.id === tipo) || tiposCombustible[0];
};

export const formatMoneda = (monto) => {
  return new Intl.NumberFormat('es-GT', {
    style: 'currency',
    currency: 'GTQ'
  }).format(monto);
};

export const formatFechaViatico = (fecha) => {
  const date = new Date(fecha);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getViaticosPorCaso = (casoId) => {
  return viaticosMockData.filter(viatico => viatico.caso_ID === casoId);
};

export const calcularTotalViaticos = (viaticos) => {
  return viaticos.reduce((total, viatico) => total + viatico.monto_total, 0);
};

export const getViaticosPorTecnico = (tecnicoId) => {
  return viaticosMockData.filter(viatico => viatico.tecnico_ID === tecnicoId);
};

export const getViaticosPorEstado = (estado) => {
  return viaticosMockData.filter(viatico => viatico.estado === estado);
};

export const getViaticosPorFecha = (fechaInicio, fechaFin) => {
  return viaticosMockData.filter(viatico => {
    const fechaViatico = new Date(viatico.fecha_ingreso);
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    return fechaViatico >= inicio && fechaViatico <= fin;
  });
};
