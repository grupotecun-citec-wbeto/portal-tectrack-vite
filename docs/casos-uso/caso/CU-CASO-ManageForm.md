
# CU-CASO-ManageForm

**Característica:** Caso 
**Fecha:** 14/08/2025
**Autor:** Humberto Herrador
**Departamento:** CITEC
**Proyecto:** TECTRACK


## Descripción
Este caso de uso es una parte integral de `ViewCases` y permite al usuario interactuar con el formulario del caso para ver y modificar su información. Es un caso de uso que orquesta las acciones relacionadas con el formulario, incluyendo la visualización de datos y la activación de otras funcionalidades como el registro de kilometraje.

## Actores
-   **Administrador**
-   **Técnico**

## Precondiciones
- El caso de uso `ViewCases` ha sido iniciado y el formulario del caso está disponible.

## Flujo principal
-   Durante la visualización de un caso, el sistema recupera los datos del formulario asociados a dicho caso.
    
-   El sistema presenta estos datos en la interfaz de usuario en el formato de un formulario.
    
-   El usuario puede ver los campos del formulario.
    
-   El sistema gestiona la interacción con el formulario, incluyendo la activación de funcionalidades como el registro de kilometraje, que es un paso necesario en este proceso.

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
- La interfaz de usuario muestra el formulario del caso con sus datos correspondientes.

## Diagrama (opcional)
```mermaid
usecaseDiagram
  actor Admin
  actor Técnico
  (ViewCases)
  Admin --> (ViewCases)
  Técnico --> (ViewCases)
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTIxMTI0MDE5MjcsLTExNDAzMzMwOF19
-->