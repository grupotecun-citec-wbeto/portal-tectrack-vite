# CU-c - [Nombre]

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
- Los badges correspondientes a las propiedades del caso se renderizan y se muestran junto a cada caso en la interfaz de usuario.

## Diagrama (opcional)
[Link diagrama](https://app.diagrams.net/#Hgrupotecun-citec-wbeto/portal-tectrack-vite/use-case-diagram/docs/casos-uso/caso/CU-CASO.drawio#%7B%22pageId%22:%2258KHKjolmZH9Jl-Zs60m%22%7D)
<!--stackedit_data:
eyJoaXN0b3J5IjpbMjA4OTM2NTkwNiwxNjkyNzEzMDIxXX0=
-->