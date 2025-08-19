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
- [Condición 1]
- [Condición 2]

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
  Técnico --> (ViewCases)
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE4OTI5MTQ1OTddfQ==
-->