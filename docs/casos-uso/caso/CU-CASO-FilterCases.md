


# CU-CASO-FilterCases

**Característica:** Caso 
**Fecha:** 14/08/2025
**Autor:** Humberto Herrador
**Departamento:** CITEC
**Proyecto:** TECTRACK


## Descripción
Este caso de uso permite al usuario aplicar filtros sobre la lista de casos mostrada, restringiendo los resultados a aquellos que cumplen con criterios específicos. La funcionalidad de filtrado es opcional y se activa después de que la lista de casos ha sido cargada exitosamente.

## Actores
- **Administrador:** Puede aplicar todos los filtros disponibles.
- **Técnico:** Puede aplicar todos los filtros disponibles.

## Precondiciones
-   El usuario debe estar autenticado en el sistema.
-   El caso de uso `ViewCases` ha sido ejecutado, y se ha devuelto una lista de al menos un caso.

## Flujo principal
1. [Paso 1]
2. [Paso 2]
3. [Paso 3]

## Flujos alternos
- **FA1:** [Condición → Resultado]

## Reglas de negocio
- [RN1]
## Reglas de dominio (invariantes)
- [RD1]

## Relaciones
- «include»: [CU-…] (obligatorio y reutilizable)
- «extend»: [CU-…] (condición/trigger)
- EP: [extension point si aplica]

## Postcondiciones
- [Estado final]

## Diagrama (opcional)
```mermaid
usecaseDiagram
  actor Admin
  actor Técnico
  (ViewCases)
  Admin --> (ViewCases)
  Técnico --> (ViewCases)ith [StackEdit](https://stackedit.io/).
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTMwMjkwNDU2M119
-->