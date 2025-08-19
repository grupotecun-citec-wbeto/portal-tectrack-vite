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
-   El caso de uso `ViewCases` ha sido iniciado y está en proceso de mostrar la lista de casos.
-   Los datos de cada caso (estado, segmento, tiempo transcurrido, cantidad de equipos) están disponibles para ser procesados.

## Flujo principal
-   El sistema, durante la ejecución del caso de uso `ViewCases`, itera sobre la lista de casos a mostrar.
-   Para cada caso, el sistema recupera los datos necesarios (estado, segmento, tiempo, cantidad de equipos).
-   El sistema genera los badges visuales basándose en estos datos.
    
-   Los badges se muestran junto a la información principal de cada caso.

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
- Los badges correspondientes a las propiedades del caso se renderizan y se muestran junto a cada caso en la interfaz de usuario.

## Diagrama (opcional)
```mermaid
usecaseDiagram
  actor Admin
  actor Técnico
  (ViewCases)
  Admin --> (ViewCases)
  Técnico --> (ViewCases)
<!--stackedit_data:
eyJoaXN0b3J5IjpbNjY4MDU1MDY2LC02NTIxMDg4MywxNzI2MD
IxMTE3XX0=
-->