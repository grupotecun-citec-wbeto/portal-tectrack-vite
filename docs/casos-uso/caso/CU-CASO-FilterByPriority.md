
# CU-CASO-FilterByPriority  
  

**Característica:** Caso   
**Fecha:** 14/08/2025  
**Autor:** Humberto Herrador  
**Departamento:** CITEC  
**Proyecto:** TECTRACK  
  
  

## Descripción  

Este caso de uso es una especialización del caso de uso `FiltrarCasos`. Permite al usuario restringir la lista de casos mostrada a aquellos que tienen un nivel de prioridad específico, como "Alta", "Media" o "Baja".
  

## Actores  

- Administrador  
- Técnico  
  

## Precondiciones  

- Se ha ejecutado el caso de uso `FiltrarCasos`.  
- Los niveles de prioridad están definidos en el sistema.
  

## Flujo principal  

- [ ]   El sistema presenta al usuario una lista de niveles de prioridad disponibles (ej. un menú desplegable).
- [ ]   El usuario selecciona uno de los niveles de prioridad de la lista.
- [ ]  El usuario activa el filtro (ej. haciendo clic en el botón "Aplicar Filtros").
- [ ]   El sistema ejecuta la lógica de filtrado para buscar los casos que coinciden con la prioridad seleccionada.    
- [ ]   El sistema refresca la interfaz, mostrando únicamente los casos con esa prioridad.  
  

## Flujos alternos  

-   **A1: El nivel de prioridad no tiene casos asociados:**
    
    -   Si el sistema no encuentra casos con la prioridad seleccionada, muestra un mensaje informativo como "No se encontraron casos con prioridad [Prioridad Seleccionada]."
        
-   **A2: Cancelación de la selección:**
    
    -   El usuario puede cancelar la selección del filtro de prioridad, restaurando la lista de casos a su estado anterior.
  

## Reglas de negocio  

-   **RN-FIL-PRI-01:** La selección de prioridad debe ser única; el usuario no puede seleccionar múltiples prioridades para aplicar el filtro al mismo tiempo.
    
-   **RN-FIL-PRI-02:** El filtro por prioridad puede combinarse con otros filtros (cliente, actor, segmento) para refinar aún más los resultados.

## Reglas de dominio (invariantes)  

-   **RD-FIL-PRI-01:** Cada caso en el sistema debe tener una prioridad definida.
    
-   **RD-FIL-PRI-02:** Los niveles de prioridad son un conjunto finito y predefinido de valores (ej., "Alta", "Media", "Baja", "Crítica").
    
-   **RD-FIL-PRI-03:** El filtrado de casos se basa en el atributo de prioridad del propio caso.
  

## Relaciones  

- **Generalización:** Este caso de uso es una especialización del caso de uso `FiltrarCasos`.  
  

## Postcondiciones  

- La lista de casos se actualiza para mostrar solo los casos con la prioridad seleccionada.
  

## Diagrama (opcional)  

[Link diagrama](https://app.diagrams.net/#Hgrupotecun-citec-wbeto/portal-tectrack-vite/use-case-diagram/docs/casos-uso/caso/CU-CASO-ViewCases.drawio#%7B%22pageId%22:%2258KHKjolmZH9Jl-Zs60m%22%7D)  


<!--stackedit_data:
eyJoaXN0b3J5IjpbMTc3MjM2MTY4LDE4NDE4NzczMTNdfQ==
-->