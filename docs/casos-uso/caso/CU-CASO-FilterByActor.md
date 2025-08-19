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
-   **FA1: El cliente no tiene casos asociados:**
    -   Si el sistema no encuentra casos para el cliente seleccionado, muestra un mensaje informativo como "El cliente [Nombre del Cliente] no tiene casos registrados."
-   **FA2: Cancelación de la selección:**
    -   El usuario puede cancelar la selección de filtro de cliente, restaurando la lista de casos a su estado anterior (ya sea la lista completa o la lista filtrada por otros criterios).

## Reglas de negocio
-   **RN-FIL-CLI-01:** La búsqueda de clientes para aplicar el filtro debe incluir un mecanismo de búsqueda (ej. búsqueda por nombre, por ID) para facilitar la selección.
    
-   **RN-FIL-CLI-02:** El filtro por cliente puede combinarse con otros filtros (prioridad, actor, segmento) para refinar aún más los resultados.
## Reglas de dominio (invariantes)
-   **RD-FIL-CLI-01:** Cada caso en el sistema debe estar asociado a un único cliente.
    
-   **RD-FIL-CLI-02:** Un cliente es una entidad del dominio que tiene atributos como `ID de cliente`, `Nombre`, y `Segmento`.

## Relaciones
- **Generalización:** Este caso de uso es una especialización del caso de uso `FiltrarCasos`.

## Postcondiciones
- La lista de casos se actualiza para mostrar solo los casos asignados al actor seleccionado.

## Diagrama (opcional)
[Link diagrama](https://app.diagrams.net/#Hgrupotecun-citec-wbeto/portal-tectrack-vite/use-case-diagram/docs/casos-uso/caso/CU-CASO-ViewCases.drawio#%7B%22pageId%22:%2258KHKjolmZH9Jl-Zs60m%22%7D)
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEwODg4MTQ1NjddfQ==
-->