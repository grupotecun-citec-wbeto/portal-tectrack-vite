  
CU-CASO-FilterByActor

# CU-CASO-FilterByActor  
  

**Característica:** Caso   
**Fecha:** 14/08/2025  
**Autor:** Humberto Herrador  
**Departamento:** CITEC  
**Proyecto:** TECTRACK  
  
  

## Descripción  

Este caso de uso es una especialización del caso de uso `FiltrarCasos`. Permite al usuario restringir la lista de casos mostrada a aquellos que están asociados a un cliente específico seleccionado.  
  

## Actores  

- Administrador  
- Técnico  
  

## Precondiciones  

- Se ha ejecutado el caso de uso `FiltrarCasos`.  
-   Los datos de al menos un cliente están disponibles en el sistema.  
  

## Flujo principal  

-   El sistema presenta una interfaz para que el usuario seleccione un cliente de una lista (por ejemplo, un campo de autocompletado, una lista desplegable).  
-   El usuario busca y selecciona un cliente de la lista.  
-   El usuario activa el filtro (por ejemplo, haciendo clic en el botón "Aplicar Filtros" o un botón específico para el filtro por cliente).  
-   El sistema ejecuta la lógica de filtrado para buscar los casos que pertenecen al cliente seleccionado.  
    
-   El sistema refresca la interfaz, mostrando solo los casos asociados a ese cliente.  
  

## Flujos alternos  

-  **FA1: El cliente no tiene casos asociados:**  
 -  Si el sistema no encuentra casos para el cliente seleccionado, muestra un mensaje informativo como "El cliente [Nombre del Cliente] no tiene casos registrados."  
-  **FA2: Cancelación de la selección:**  
 -  El usuario puede cancelar la selección de filtro de cliente, restaurando la lista de casos a su estado anterior (ya sea la lista completa o la lista filtrada por otros criterios).  
  

## Reglas de negocio  

-  **RN-FIL-CLI-01:** La búsqueda de clientes para aplicar el filtro debe incluir un mecanismo de búsqueda (ej. búsqueda por nombre, por ID) para facilitar la selección.  
    
-  **RN-FIL-CLI-02:** El filtro por cliente puede combinarse con otros filtros (prioridad, actor, segmento) para refinar aún más los resultados.  

## Reglas de dominio (invariantes)  

-  **RD-FIL-CLI-01:** Cada caso en el sistema debe estar asociado a un único cliente.  
    
-  **RD-FIL-CLI-02:** Un cliente es una entidad del dominio que tiene atributos como `ID de cliente`, `Nombre`, y `Segmento`.  
  

## Relaciones  

- **Generalización:** Este caso de uso es una especialización del caso de uso `FiltrarCasos`.  
  

## Postcondiciones  

- La lista de casos se actualiza para mostrar solo los casos cuyo cliente coincide con el seleccionado.  
  

## Diagrama (opcional)  

[Link diagrama](https://app.diagrams.net/#Hgrupotecun-citec-wbeto/portal-tectrack-vite/use-case-diagram/docs/casos-uso/caso/CU-CASO-ViewCases.drawio#%7B%22pageId%22:%2258KHKjolmZH9Jl-Zs60m%22%7D)  

# CU-CASO-FilterByActor

**Característica:**  Caso  
**Fecha:**  14/08/2025  
**Autor:**  Humberto Herrador  
**Departamento:**  CITEC  
**Proyecto:**  TECTRACK

## Descripción

Este caso de uso es una especialización del caso de uso  `FiltrarCasos`. Permite al usuario restringir la lista de casos mostrada a aquellos que están asociados a un cliente específico seleccionado.

## Actores

-   Administrador
-   Técnico

## Precondiciones

-   Se ha ejecutado el caso de uso  `FiltrarCasos`.
-   Los datos de al menos un cliente están disponibles en el sistema.

## Flujo principal

-   El sistema presenta una interfaz para que el usuario seleccione un cliente de una lista (por ejemplo, un campo de autocompletado, una lista desplegable).
    
-   El usuario busca y selecciona un cliente de la lista.
    
-   El usuario activa el filtro (por ejemplo, haciendo clic en el botón “Aplicar Filtros” o un botón específico para el filtro por cliente).
    
-   El sistema ejecuta la lógica de filtrado para buscar los casos que pertenecen al cliente seleccionado.
    
-   El sistema refresca la interfaz, mostrando solo los casos asociados a ese cliente.
    

## Flujos alternos

-   **FA1: El cliente no tiene casos asociados:**
    -   Si el sistema no encuentra casos para el cliente seleccionado, muestra un mensaje informativo como “El cliente [Nombre del Cliente] no tiene casos registrados.”
-   **FA2: Cancelación de la selección:**
    -   El usuario puede cancelar la selección de filtro de cliente, restaurando la lista de casos a su estado anterior (ya sea la lista completa o la lista filtrada por otros criterios).

## Reglas de negocio

-   **RN-FIL-CLI-01:**  La búsqueda de clientes para aplicar el filtro debe incluir un mecanismo de búsqueda (ej. búsqueda por nombre, por ID) para facilitar la selección.
    
-   **RN-FIL-CLI-02:**  El filtro por cliente puede combinarse con otros filtros (prioridad, actor, segmento) para refinar aún más los resultados.
    

## Reglas de dominio (invariantes)

-   **RD-FIL-CLI-01:**  Cada caso en el sistema debe estar asociado a un único cliente.
-   **RD-FIL-CLI-02:**  Un cliente es una entidad del dominio que tiene atributos como  `ID de cliente`,  `Nombre`, y  `Segmento`.
    

## Relaciones

-   **Generalización:**  Este caso de uso es una especialización del caso de uso  `FiltrarCasos`.

## Postcondiciones

-   La lista de casos se actualiza para mostrar solo los casos cuyo cliente coincide con el seleccionado.

## Diagrama (opcional)

[Link diagrama](https://app.diagrams.net/#Hgrupotecun-citec-wbeto/portal-tectrack-vite/use-case-diagram/docs/casos-uso/caso/CU-CASO-ViewCases.drawio#%7B%22pageId%22:%2258KHKjolmZH9Jl-Zs60m%22%7D)

Markdown 2639  bytes 373  words 51  lines Ln 1, Col 23

HTML 1918  characters 343  words 37  paragraphs

Workspaces

----------

----------

Syntax error in graphmermaid version 8.9.2
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTc1MzAyNzM3NV19
-->