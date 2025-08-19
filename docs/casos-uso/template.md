# CU-[CÓDIGO] - [Nombre]

**Característica:** [Módulo] 
**Fecha:** [DD/MM/AAAA] 
**Autor:** Humberto Herrador
**Departamento:** CITEC
**Proyecto:** TECTRACK


## Descripción
Este caso de uso es una parte integral del caso de uso `ViewCases`. Su propósito es generar y mostrar indicadores visuales (badges) junto a cada caso en la lista para proveer información rápida y concisa sobre su estado y atributos clave.

## Actores
-   **Administrador**
-   **Técnico**

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
eyJoaXN0b3J5IjpbLTY1MjEwODgzLDE3MjYwMjExMTddfQ==
-->