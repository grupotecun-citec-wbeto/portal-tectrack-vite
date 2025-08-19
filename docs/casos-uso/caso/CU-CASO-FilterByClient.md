# CU-CASO-FilterByClient

**Característica:** Caso 
**Fecha:**  14/08/2025
**Autor:** Humberto Herrador
**Departamento:** CITEC
**Proyecto:** TECTRACK


## Descripción
Este caso de uso es una especialización del caso de uso `FiltrarCasos`. Permite al usuario restringir la lista de casos mostrada a aquellos que están asociados a un cliente específico seleccionado.

## Actores
- Administrador
- Técnico

## Precondiciones
-   Se ha ejecutado el caso de uso `FiltrarCasos`.
-   Los datos de al menos un cliente están disponibles en el sistema.

## Flujo principal
-   El sistema presenta una interfaz para que el usuario seleccione un cliente de una lista (por ejemplo, un campo de autocompletado, una lista desplegable).
-   El usuario busca y selecciona un cliente de la lista.
-   El usuario activa el filtro (por ejemplo, haciendo clic en el botón "Aplicar Filtros" o un botón específico para el filtro por cliente).
-   El sistema ejecuta la lógica de filtrado para buscar los casos que pertenecen al cliente seleccionado.
    
-   El sistema refresca la interfaz, mostrando solo los casos asociados a ese cliente.

## Flujos alternos
-   **FA1: El cliente no tiene casos asociados:**
    -   Si el sistema no encuentra casos para el cliente seleccionado, muestra un mensaje informativo como "El cliente [Nombre del Cliente] no tiene casos registrados."
-   **FA2: Cancelación de la selección:**
    -   El usuario puede cancelar la selección de filtro de cliente, restaurando la lista de casos a su estado anterior (ya sea la lista completa o la lista filtrada por otros criterios).

## Reglas de negocio
-
## Reglas de dominio (invariantes)
- [RD1]

## Relaciones
- «include»: [CU-…] (obligatorio y reutilizable)
- «extend»: [CU-…] (condición/trigger)
- EP: [extension point si aplica]

## Postcondiciones
- La lista de casos se actualiza para mostrar solo los casos cuyo cliente coincide con el seleccionado.

## Diagrama (opcional)
```mermaid
usecaseDiagram
  actor Admin
  actor Técnico
  (ViewCases)
  Admin --> (ViewCases)
  Técnico --> (ViewCases)
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEyNDM5NDgzNjBdfQ==
-->