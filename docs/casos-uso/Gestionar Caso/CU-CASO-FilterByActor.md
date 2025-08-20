# CU-CASO-FilterByActor

**Característica:** Caso 
**Fecha:**  14/08/2025
**Autor:** Humberto Herrador
**Departamento:** CITEC
**Proyecto:** TECTRACK


## Descripción
Este caso de uso es una especialización del caso de uso `FiltrarCasos`. Permite al usuario restringir la lista de casos mostrada a aquellos que están asignados a un actor (usuario) específico.

## Actores
- Administrador
- Técnico

## Precondiciones
-   Se ha ejecutado el caso de uso `FiltrarCasos`.
-   Los actores (usuarios) que pueden ser asignados a casos están definidos en el sistema.

## Flujo principal
-   El sistema presenta una interfaz para que el usuario seleccione un actor de una lista (por ejemplo, un campo de autocompletado o una lista desplegable de usuarios activos).
-   El usuario busca y selecciona un actor de la lista.
-   El usuario activa el filtro (por ejemplo, haciendo clic en el botón "Aplicar Filtros").
-   El sistema ejecuta la lógica de filtrado para buscar los casos que están asignados al actor seleccionado.
-   El sistema refresca la interfaz, mostrando únicamente los casos asignados a ese actor.

## Flujos alternos
-   **A1: El actor no tiene casos asignados:**
    
    -   Si el sistema no encuentra casos asignados al actor seleccionado, muestra un mensaje informativo como "El actor [Nombre del Actor] no tiene casos asignados."
        
-   **A2: Cancelación de la selección:**
    
    -   El usuario puede cancelar la selección del filtro de actor, restaurando la lista de casos a su estado anterior.

## Reglas de negocio
-   **RN-FIL-ACT-01:** La selección de actores para el filtro debe incluir un mecanismo de búsqueda para facilitar la selección.
    
-   **RN-FIL-ACT-02:** El filtro por actor puede combinarse con otros filtros (cliente, prioridad, segmento) para refinar aún más los resultados.
## Reglas de dominio (invariantes)
-   **RD-FIL-ACT-01:** Cada caso en el sistema puede estar asignado a un único actor.
    
-   **RD-FIL-ACT-02:** Los actores son usuarios con roles definidos en el sistema (ej., `Administrador`, `Técnico`).
    
-   **RD-FIL-ACT-03:** El filtrado se basa en el atributo de asignación de actor del propio caso.

## Relaciones
- **Generalización:** Este caso de uso es una especialización del caso de uso `FiltrarCasos`.

## Postcondiciones
- La lista de casos se actualiza para mostrar solo los casos asignados al actor seleccionado.

## Diagrama (opcional)
[Link diagrama](https://app.diagrams.net/#Hgrupotecun-citec-wbeto/portal-tectrack-vite/use-case-diagram/docs/casos-uso/caso/CU-CASO.drawio#%7B%22pageId%22:%2258KHKjolmZH9Jl-Zs60m%22%7D)
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTg2NzIyNzA1N119
-->