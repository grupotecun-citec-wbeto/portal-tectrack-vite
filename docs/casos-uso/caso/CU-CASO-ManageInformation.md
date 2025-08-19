# CU-CASO-ManageInformation

**Característica:** Caso
**Fecha:** 14/08/2025
**Autor:** Humberto Herrador
**Departamento:** CITEC
**Proyecto:** TECTRACK


## Descripción
Este caso de uso es una parte integral del caso de uso `ViewCases`. Su propósito es orquestar la recuperación y visualización de la información clave de un caso, incluyendo el estado, el segmento, el tiempo transcurrido, la fecha de creación y el técnico asignado. No se limita solo a mostrar datos, sino que gestiona su presentación de forma coherente.

## Actores
-   **Administrador**
-   **Técnico**

## Precondiciones
-   El caso de uso `ViewCases` ha sido iniciado y está en proceso de mostrar la lista de casos.
-   Los datos completos de cada caso están disponibles en el sistema.

## Flujo principal
-   Durante la ejecución de `ViewCases`, el sistema procesa la lista de casos.
-   Para cada caso, el sistema recupera su información clave (estado, segmento, tiempo, etc.) de la base de datos o de la capa de dominio.
-   El sistema presenta esta información al usuario a través de la interfaz (por ejemplo, en un formato de badges, texto o etiquetas).

## Flujos alternos
- **A1: Datos del badge no disponibles:**

	-   Si la información para un badge específico (ej. el tiempo transcurrido) no está disponible o no es aplicable para un caso en particular, ese badge no se muestra.

## Reglas de negocio
-   **RN-BAD-01:** La visualización de los badges es obligatoria siempre que se muestre la lista de casos.
    
-   **RN-BAD-02:** Los badges deben seguir los estándares de diseño y colores definidos para la aplicación (ej. color verde para "Resuelto", amarillo para "En Progreso").
## Reglas de dominio (invariantes)
-   **RD-BAD-01:** El estado de un caso debe ser uno de los valores definidos en el dominio (`Abierto`, `En Progreso`, `Resuelto`, `Cerrado`).
    
-   **RD-BAD-02:** La cantidad de equipos es un valor numérico entero y no negativo.
    
-   **RD-BAD-03:** El tiempo transcurrido se calcula a partir de la fecha de creación del caso.

## Relaciones
-   **Include** `ViewCases`: Este caso de uso es una parte necesaria e integral del caso de uso `ViewCases`.
    
-   **Generalización:** `ShowBadges` es un caso de uso generalizado. Los casos de uso específicos como `ShowBadgeStatus`, `ShowBadgeSegment`, `ShowBadgeTime` y `ShowBadgeQuantity` son especializaciones de este caso de uso.

## Postcondiciones
- La información relevante de cada caso se recupera y se presenta al usuario de manera organizada.

## Diagrama (opcional)
[Link diagrama](https://app.diagrams.net/#Hgrupotecun-citec-wbeto/portal-tectrack-vite/use-case-diagram/docs/casos-uso/caso/CU-CASO.drawio#%7B%22pageId%22:%2258KHKjolmZH9Jl-Zs60m%22%7D)
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTcyMzUzMDMyNl19
-->