
export interface Equipamiento  {
    herramienta_ID:number;
    equipo_ID:number;
    check:number;
}

export interface herramienta {
    "equipo_ID": number;
    "check": string;
}

export interface Herramientas {
    [key: string]: herramienta;
}

export interface Servicio {
    sistema_ID: number;
    servicio_tipo_ID: string;
    sistema_marca_ID: string;
    check: string;
}


export interface Sistemas {
    [key: string]: Servicio;
}

export interface Diagnostico {
    equipo_ID:number;
    caso_ID:number;
    diagnostico_tipo_ID:number;
    asistencia_tipo_ID:number;
    especialista_ID:number;
    necesitaEspecialista:number;
    description:string;
    visita_ID:number;
    prioridad:number;
    herramientas?:Herramientas;
    sistemas?:Sistemas;
    isEqualPreDiagnostico:boolean;
}


export interface Prioridad {
    1: 'Alta';
    2: 'Intermdia';
    3: 'Baja';
}

/* 
{"199":{"prediagnostico":{"equipo_ID":0,"caso_ID":0,"diagnostico_tipo_ID":0,"asistencia_tipo_ID":"1","especialista_ID":"4","necesitaEspecialista":"1","description":"Falla%20en%20piloto%20autom%C3%A1tico%20","visita_ID":0,"prioridad":"2","herramientas":{"Memoria":{"equipo_ID":0,"check":"1"}},"sistemas":{"AUTO TURN":{"sistema_ID":1,"servicio_tipo_ID":"8","sistema_marca_ID":"","check":"1"},"AUTO TRACKER":{"sistema_ID":2,"servicio_tipo_ID":"8","sistema_marca_ID":"","check":"1"},"PILOTO AUTOMATICO":{"sistema_ID":12,"servicio_tipo_ID":"3","sistema_marca_ID":"2","check":"1"}},"isEqualPreDiagnostico":true},"diagnostico":{"equipo_ID":0,"caso_ID":0,"diagnostico_tipo_ID":0,"asistencia_tipo_ID":"1","especialista_ID":"4","necesitaEspecialista":"1","description":"Falla%20en%20piloto%20autom%C3%A1tico%20","visita_ID":0,"prioridad":"2","herramientas":{"Memoria":{"equipo_ID":0,"check":"1"}},"sistemas":{"AUTO TURN":{"sistema_ID":1,"servicio_tipo_ID":"8","sistema_marca_ID":"","check":"1"},"AUTO TRACKER":{"sistema_ID":2,"servicio_tipo_ID":"8","sistema_marca_ID":"","check":"1"},"PILOTO AUTOMATICO":{"sistema_ID":12,"servicio_tipo_ID":"3","sistema_marca_ID":"2","check":"1"}},"isEqualPreDiagnostico":true}},"200":{"prediagnostico":{"equipo_ID":0,"caso_ID":0,"diagnostico_tipo_ID":0,"asistencia_tipo_ID":"1","especialista_ID":"4","necesitaEspecialista":"1","description":"Seguimiento%20a%20operaci%C3%B3n%20","visita_ID":0,"prioridad":"3","herramientas":{"Memoria":{"equipo_ID":0,"check":"1"}},"sistemas":{"AUTO TURN":{"sistema_ID":1,"servicio_tipo_ID":"8","sistema_marca_ID":"","check":"1"},"AUTO TRACKER":{"sistema_ID":2,"servicio_tipo_ID":"8","sistema_marca_ID":"","check":"1"}},"isEqualPreDiagnostico":true},"diagnostico":{"equipo_ID":0,"caso_ID":0,"diagnostico_tipo_ID":0,"asistencia_tipo_ID":"1","especialista_ID":"4","necesitaEspecialista":"1","description":"Seguimiento%20a%20operaci%C3%B3n%20","visita_ID":0,"prioridad":"3","herramientas":{"Memoria":{"equipo_ID":0,"check":"1"}},"sistemas":{"AUTO TURN":{"sistema_ID":1,"servicio_tipo_ID":"8","sistema_marca_ID":"","check":"1"},"AUTO TRACKER":{"sistema_ID":2,"servicio_tipo_ID":"8","sistema_marca_ID":"","check":"1"}},"isEqualPreDiagnostico":true}},"201":{"prediagnostico":{"equipo_ID":0,"caso_ID":0,"diagnostico_tipo_ID":0,"asistencia_tipo_ID":0,"especialista_ID":"4","necesitaEspecialista":"1","description":"Seguimiento%20a%20operaci%C3%B3n%20","visita_ID":0,"prioridad":"3","herramientas":{"Memoria":{"equipo_ID":0,"check":"1"}},"sistemas":{"AUTO TURN":{"sistema_ID":1,"servicio_tipo_ID":"8","sistema_marca_ID":"","check":"1"},"AUTO TRACKER":{"sistema_ID":2,"servicio_tipo_ID":"8","sistema_marca_ID":"","check":"1"},"PILOTO AUTOMATICO":{"sistema_ID":12,"servicio_tipo_ID":"8","sistema_marca_ID":"2","check":"1"}},"isEqualPreDiagnostico":true},"diagnostico":{"equipo_ID":0,"caso_ID":0,"diagnostico_tipo_ID":0,"asistencia_tipo_ID":0,"especialista_ID":"4","necesitaEspecialista":"1","description":"Seguimiento%20a%20operaci%C3%B3n%20","visita_ID":0,"prioridad":"3","herramientas":{"Memoria":{"equipo_ID":0,"check":"1"}},"sistemas":{"AUTO TURN":{"sistema_ID":1,"servicio_tipo_ID":"8","sistema_marca_ID":"","check":"1"},"AUTO TRACKER":{"sistema_ID":2,"servicio_tipo_ID":"8","sistema_marca_ID":"","check":"1"},"PILOTO AUTOMATICO":{"sistema_ID":12,"servicio_tipo_ID":"8","sistema_marca_ID":"2","check":"1"}},"isEqualPreDiagnostico":true}}}
*/




export interface Programa {
    caso_ID: number;
    asistencia_tipo_ID: number;
    catalogo_ID: number; 
    prioridad?: number;
    name?: string;
    sistemas?: Sistemas;
}

export interface Equipo{
    prediagnostico:Diagnostico;
    diagnostico:Diagnostico;
}

export interface Equipos {
    [key: string]: Equipo;
}




export interface Caso {
    usuario_ID:number; 
    comunicacion_ID:number; 
    segmento_ID:number; 
    caso_estado_ID:number; 
    fecha:string;  // DATE, formato ISO 8601 (YYYY-MM-DD)
    start?:string; //DATETIME NULL, formato ISO 8601 (YYYY-MM-DDTHH:mm:ss)
    date_end:string; //DATETIME NULL, formato ISO 8601 (YYYY-MM-DDTHH:mm:ss)
    description:string;
    prioridad: keyof Prioridad; 
    equipos?:Equipos 
    programa?: Programa;
    km_inicial:number;
    km_final:number
    
};

export interface Casos{
    [key: string]: Caso;
}



export interface CasoActivo {
    code?:string;
    caso_id?:string;
    maquina_id?:string;
    categoria_id?:string;
    cliente_name?:string;
    busqueda_terminada?:number;
}

export interface User{
    ID?: number;
    nombre?:string;
    apellido?:string;
    display_name?:string;
    nickname?:string;
    perfil_ID?:number;
}

export interface Login extends User {
    password?: string;
    email?: string;
    token?: string;
    refreshToken?: string;
    expires?: string;
    remember?: boolean;
    isLogged: boolean;
}

export interface Structures {
    caso: Caso;
    diagnostico: Diagnostico;
    equipamiento: Equipamiento;
    diagnostico_cpy?: Diagnostico;
    equipoId: Equipo;
    servicio: Servicio;
    casoActivo: CasoActivo;
}

export interface BaseStructure {
    casos : Casos;
    casoActivo: CasoActivo;
    login: Login;
    stuctures: Structures;
    
}

export interface UserData {
    casos: Casos;
    casoActivo: CasoActivo;
    login: Login;
    stuctures: Structures;
}