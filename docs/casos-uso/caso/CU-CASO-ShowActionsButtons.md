
# CU-CASO-ShowActionsButtons

**Característica:** Caso 
**Fecha:** 14/08/2025
**Autor:** Humberto Herrador
**Departamento:** CITEC
**Proyecto:** TECTRACK


## Descripción
Este caso de uso es una parte integral de `ViewCases` y se encarga de mostrar los botones de acción contextuales para cada caso en la lista. La visualización de los botones depende de las capacidades del actor y del estado del caso.

## Actores
-   **Administrador**
-   **Técnico**

## Precondiciones
-   El caso de uso `ViewCases` se ha iniciado y está mostrando una lista de casos.
-   El sistema conoce el estado de cada caso y el rol del actor.

## Flujo principal
-   El sistema, durante la ejecución de `ViewCases`, itera sobre la lista de casos a mostrar.
-   Para cada caso, el sistema evalúa las reglas de negocio y de dominio para determinar qué botones de acción son aplicables.
-   El sistema genera los botones visuales correspondientes.
-   Los botones se renderizan y se muestran junto a la información principal de cada caso.

## Flujos alternos
- **A1: No hay botones de acción aplicables:**

	-   Si las reglas de negocio o de dominio no permiten ninguna acción para un caso en particular, no se muestra ningún botón de acción.

## Reglas de negocio
-   **RN-ACT-BUT-01:** La visualización de los botones es obligatoria para cada caso si hay acciones disponibles.
    
-   **RN-ACT-BUT-02:** Los botones deben seguir los estándares de diseño y disposición de la aplicación.
## Reglas de dominio (invariantes)
-   **RD-ACT-BUT-01:** Un caso solo puede ser `Iniciado` si su estado actual es "Abierto".
    
-   **RD-ACT-BUT-02:** Un caso solo puede ser `Cerrado` si su estado actual es "Resuelto" o "Cerrado".
    
-   **RD-ACT-BUT-03:** Solo los actores con el rol de `Administrador` o `Técnico` tienen permitido ejecutar acciones sobre los casos.

## Relaciones
- «include»: [CU-…] (obligatorio y reutilizable)
- «extend»: [CU-…] (condición/trigger)
- EP: [extension point si aplica]

## Postcondiciones
- Los botones de acción permitidos se muestran junto a cada caso en la interfaz de usuario.

## Diagrama (opcional)
```mermaid
usecaseDiagram
  actor Admin
  actor Técnico
  (ViewCases)
  Admin --> (ViewCases)
  Técnico --> (ViewCases)
<!--stackedit_data:
eyJoaXN0b3J5IjpbODQzNDMwMTVdfQ==
-->