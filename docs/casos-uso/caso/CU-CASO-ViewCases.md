# CU-CASE-0001-ViewCases

**Característica:** Caso
**Versión:** v1.0  
**Fecha:** 14/08/2025
**Autor:** Humberto Herrador
**Departamento:** CITEC

---

## Descripción
Visualizar la lista de casos

## Actores
- Principal: Administrador
- Secundarios: Técnico

## Precondiciones
- El actor ya tiene que estar logueado en la plataforma

## Flujo principal
1. El usuario ingresa a la plataforma
2. Abre la barra lateral izquierda 
3. En el la barra lateral selecciona  el apartado casos
4. Esto le mostrara un panel con la lista de casos

## Flujos alternos
- Si el usuario a ingresar a visualizar los casos no hay casos, tiene que mostrar un mensaje de que hay casos disponibles
- Si no hay casos, mostrar un mensaje que los lleve a crear un caso

## Postcondiciones
- Al seleccionar el caso se visualiza el detalle del caso
- Al seleccionar el caso se puede visualizar la lista equipos ingresados

## Reglas de negocio
- 

## Reglas de dominio
- Solo el administrador puede ver todo los casos
- Los técnicos solo pueden ver: 
	- Casos que ellos han creado.
	- Casos que les han asignado.

## Excepciones
- 

## Diagrama
[Link](https://app.diagrams.net/#Hgrupotecun-citec-wbeto%2Fportal-tectrack-vite%2Fuse-case-diagram%2Fdocs%2Fcasos-uso%2Fcaso%2FCU-CASO-ViewCases.drawio#%7B%22pageId%22%3A%2258KHKjolmZH9Jl-Zs60m%22%7D)

## Relaciones
- 

<!--stackedit_data:
eyJoaXN0b3J5IjpbODQ0OTk1NTExLDMwMTIyODcyMywxNDk5Mz
U1ODE5LDg2NDg3MDYzMywtNDE5MzAzODI3XX0=
-->