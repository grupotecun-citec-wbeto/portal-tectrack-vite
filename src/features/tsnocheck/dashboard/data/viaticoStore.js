// Store global para viáticos - manejo de estado efímero
import React from 'react';
import { viaticosMockData } from './viaticosMockData';

class ViaticoStore {
  constructor() {
    // Inicializar con los datos mock
    this.viaticos = [...viaticosMockData];
    this.listeners = [];
  }

  // Suscribirse a cambios
  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  // Notificar a todos los suscriptores
  notify() {
    this.listeners.forEach(callback => callback(this.viaticos));
  }

  // Obtener todos los viáticos
  getAll() {
    return [...this.viaticos];
  }

  // Obtener viáticos por caso ID
  getByCaso(casoId) {
    return this.viaticos.filter(viatico => viatico.caso_ID === casoId);
  }

  // Agregar nuevo viático
  add(viatico) {
    this.viaticos.push(viatico);
    this.notify();
    return viatico;
  }

  // Actualizar viático existente
  update(viaticoId, updatedViatico) {
    const index = this.viaticos.findIndex(v => v.ID === viaticoId);
    if (index !== -1) {
      this.viaticos[index] = { ...this.viaticos[index], ...updatedViatico };
      this.notify();
      return this.viaticos[index];
    }
    return null;
  }

  // Eliminar viático
  delete(viaticoId) {
    const index = this.viaticos.findIndex(v => v.ID === viaticoId);
    if (index !== -1) {
      const deleted = this.viaticos.splice(index, 1)[0];
      this.notify();
      return deleted;
    }
    return null;
  }

  // Obtener estadísticas
  getStats() {
    const total = this.viaticos.reduce((sum, v) => sum + v.monto_total, 0);
    const pendientes = this.viaticos.filter(v => v.estado === 'Pendiente').length;
    const aprobados = this.viaticos.filter(v => v.estado === 'Aprobado').length;
    const rechazados = this.viaticos.filter(v => v.estado === 'Rechazado').length;

    return {
      total,
      count: this.viaticos.length,
      pendientes,
      aprobados,
      rechazados
    };
  }

  // Filtrar viáticos
  filter(filters) {
    return this.viaticos.filter(viatico => {
      const matchesSearch = !filters.search || 
        viatico.caso_numero.toLowerCase().includes(filters.search.toLowerCase()) ||
        viatico.tecnico_name.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesEstado = !filters.estado || viatico.estado === filters.estado;
      const matchesTecnico = !filters.tecnico || viatico.tecnico_ID.toString() === filters.tecnico;
      
      let matchesFecha = true;
      if (filters.fechaInicio && filters.fechaFin) {
        const fechaViatico = new Date(viatico.fecha_ingreso);
        const fechaInicio = new Date(filters.fechaInicio);
        const fechaFin = new Date(filters.fechaFin);
        matchesFecha = fechaViatico >= fechaInicio && fechaViatico <= fechaFin;
      }

      return matchesSearch && matchesEstado && matchesTecnico && matchesFecha;
    });
  }

  // Resetear a datos originales (útil para desarrollo)
  reset() {
    this.viaticos = [...viaticosMockData];
    this.notify();
  }
}

// Crear instancia global
export const viaticoStore = new ViaticoStore();

// Hook personalizado para React (simple)
export const useViaticoStore = () => {
  const [viaticos, setViaticos] = React.useState(viaticoStore.getAll());

  React.useEffect(() => {
    const unsubscribe = viaticoStore.subscribe(setViaticos);
    return unsubscribe;
  }, []);

  return {
    viaticos,
    addViatico: (viatico) => viaticoStore.add(viatico),
    updateViatico: (id, viatico) => viaticoStore.update(id, viatico),
    deleteViatico: (id) => viaticoStore.delete(id),
    getViaticosByCaso: (casoId) => viaticoStore.getByCaso(casoId),
    getStats: () => viaticoStore.getStats(),
    filterViaticos: (filters) => viaticoStore.filter(filters),
    resetStore: () => viaticoStore.reset()
  };
};

export default viaticoStore;
