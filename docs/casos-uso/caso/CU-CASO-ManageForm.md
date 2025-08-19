
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
- **A1: Datos del formulario no disponibles:**

-   Si no hay datos de formulario asociados al caso, el sistema muestra un formulario vacío o un mensaje informativo.

## Reglas de negocio
-   **RN-FORM-01:** La visualización del formulario es obligatoria para cada caso si el formulario es un componente del caso.
    
-   **RN-FORM-02:** Los campos del formulario deben reflejar las propiedades del caso.
    
-   **RN-FORM-03:** Ciertos campos del formulario pueden ser editables o de solo lectura, dependiendo del estado del caso y del rol del usuario.
## Reglas de dominio (invariantes)
-   **RD-FORM-01:** Un formulario se compone de una colección de campos (ej., texto, numéricos, fechas) que corresponden a los atributos del caso.
    
-   **RD-FORM-02:** Los datos del formulario deben ser válidos de acuerdo a las reglas de formato y tipo de datos de cada campo.

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
eyJoaXN0b3J5IjpbLTEyODUzNzM0MDUsLTExNDAzMzMwOF19
-->