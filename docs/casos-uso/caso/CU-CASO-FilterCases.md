


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
-   El sistema muestra la lista completa de casos (después de ejecutar el caso de uso `ViewCases`).
 -  El usuario selecciona uno o más criterios de filtrado (por ejemplo, cliente, prioridad, actor, segmento) desde las opciones disponibles en la interfaz de usuario.
-  El usuario confirma su selección (por ejemplo, haciendo clic en un botón de "Aplicar Filtros").
-  El sistema procesa la solicitud de filtrado, aplicando la lógica de negocio correspondiente para cada criterio.
    
-   El sistema actualiza la lista de casos mostrada en la interfaz, mostrando únicamente los resultados que cumplen con los filtros.

## Flujos alternos
-   **FA1: No se seleccionan filtros:**
    
    -   Si el usuario no selecciona ningún filtro y hace clic en "Aplicar", el sistema no realiza ninguna acción y mantiene la lista de casos actual sin cambios.
        
-   **FA2: No hay resultados para los filtros seleccionados:**
    
    -   Si, después de aplicar los filtros, no se encuentran casos que coincidan, el sistema muestra un mensaje informativo como "No se encontraron casos con los filtros seleccionados".

## Reglas de negocio
- [RN1]
## Reglas de dominio (invariantes)
- [RD1]

## Relaciones
-   **Extend** `ViewCases`: Este caso de uso es una extensión opcional del caso de uso `ViewCases`.
    
-   **Generalización:** `FiltrarCasos` es un caso de uso generalizado. Los casos de uso específicos como `FiltrarPorCliente`, `FiltrarPorPrioridad`, `FiltrarPorActor` y `FiltrarPorSegmento` son especializaciones de este caso de uso.

## Postcondiciones
- La lista de casos en la interfaz de usuario se actualiza para mostrar solo los casos que coinciden con los criterios de filtrado seleccionados.

## Diagrama (opcional)
[Link diagrama](https://app.diagrams.net/#Hgrupotecun-citec-wbeto/portal-tectrack-vite/use-case-diagram/docs/casos-uso/caso/CU-CASO-ViewCases.drawio#%7B%22pageId%22:%2258KHKjolmZH9Jl-Zs60m%22%7D)
<!--stackedit_data:
eyJoaXN0b3J5IjpbNTA3NDI0MjA1XX0=
-->