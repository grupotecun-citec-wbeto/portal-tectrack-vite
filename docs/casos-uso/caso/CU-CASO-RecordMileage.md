
# CU-CASO-RecordMileage

**Característica:** Caso 
**Fecha:** 14/08/2025
**Autor:** Humberto Herrador
**Departamento:** CITEC
**Proyecto:** TECTRACK


## Descripción
Este caso de uso es una parte necesaria de `ManageForm` y se encarga de permitir al usuario registrar el kilometraje inicial y final del equipo asociado a un caso. Es un paso clave para documentar el uso del equipo durante la resolución del caso.

## Actores
-   **Administrador**
-   **Técnico**

## Precondiciones
-   El caso de uso `ManageForm` ha sido iniciado.
-   El caso está asociado a un equipo con capacidad de medición de kilometraje.

## Flujo principal
-   El usuario inicia la funcionalidad de registro de kilometraje desde el formulario del caso.
-   El sistema presenta los campos para el kilometraje inicial y final.
-   El usuario ingresa el kilometraje inicial.
-   Le da clic al boton  para iniciar el caso `CU-CASO-StarCase`
-   El usuario realiza lo solicitado en el caso
-   El usuario ingresa el kilometraje final.
-   
-   El usuario confirma el registro de los datos.
-   El sistema valida los datos ingresados y los guarda en el caso.

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
- El kilometraje inicial y final se registra con éxito en el caso.

## Diagrama (opcional)
```mermaid
usecaseDiagram
  actor Admin
  actor Técnico
  (ViewCases)
  Admin --> (ViewCases)
  Técnico --> (ViewCases)
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTU5MzI5OTBdfQ==
-->