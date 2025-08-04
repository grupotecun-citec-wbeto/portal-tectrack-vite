// AppContext.js
import  { createContext, useState, useEffect, ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// AXIOS
import axios from 'axios';
// Enums
import Enums from '@/Enums';

//types
import { Diagnostico,Programa,Caso, BaseStructure,Login,CasoActivo,Equipamiento,UserData } from '@/types/User';
import { ReduxState } from './types/Redux';


// Crear el contexto
const AppContext = createContext(null);

interface AppContextProps {
    children: ReactNode;
}

// Crear el proveedor del contexto
export function AppProvider({ children }: AppContextProps) {
     
    // ACTIVE INDEX
    const [sideBarAccordionActiveIndex, setSideBarAccordionActiveIndex] = useState<number | null>(null);
    const [machineID,setMachineID] = useState<number | null>(null)
    const [caseType,setCaseType] = useState<string>(Enums.CORRECTIVO) // CORRECTIVO, PREVENTIVO
    const [serviceTypeData,setServiceTypeData] = useState(null)
    const [casoActivo,setCasoActivo] = useState('')
    const [slcCasoId,setSlcCasoId] = useState(null)
    

     // >>>>>>>>>>>>>>>>>>>>>>>>>>REDUX-PRESIST >>>>>>>>>>>>>>>>>>>>>>>>>>>>
     const userData = useSelector((state: ReduxState) => state.userData);  // Acceder al JSON desde el estado
     const dispatch = useDispatch();
     
     const saveUserData = (json:UserData) => {
       dispatch({ type: 'SET_USER_DATA', payload: json });
     };
 
     const getUserData = () => {
       dispatch({ type: 'GET_USER_DATA' });  // Despachar la acción para obtener datos
     };
     
     // <<<<<<<<<<<<<<<<<<<<<<<<<< REDUX-PRESIST <<<<<<<<<<<<<<<<<<<<<<<<<<<<
     // ---------------------------------------------------------------------


    // >>>>>>>>>>>>>>>>>>>>>>>>>>>> SECTION useEfect >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    /**
     * SECTION: useEfect
     */
    
    /**
     * ESTRUCTURA BASE
     */


    useEffect(()=>{
        getUserData()

        
      


        if(userData == null){
            const deepFreeze = (obj) => {
              // Primero congelamos el objeto principal
              Object.freeze(obj);
          
              // Luego congelamos cada propiedad, si es un objeto
              Object.keys(obj).forEach((key) => {
                  if (typeof obj[key] === "object" && obj[key] !== null && !Object.isFrozen(obj[key])) {
                      deepFreeze(obj[key]); // Llamada recursiva para congelar propiedades anidadas
                  }
              });
          
              return obj;
            }

            const equipamiento: Equipamiento= {
              herramienta_ID:0, 
              equipo_ID:0, 
              check:0, 
            }

            const programa : Programa = {
              caso_ID: 0, //INTEGER NOT NULL,
              asistencia_tipo_ID: 0, // INTEGER NOT NULL,
              catalogo_ID:0, //INTEGER NOT NULL,
              prioridad:0, //INTEGER,
              name:'', //TEXT,
              sistemas:{/*servicio */},
            }

            const caso : Caso = {
              usuario_ID:0, 
              comunicacion_ID:0, 
              segmento_ID:0, 
              caso_estado_ID:0, 
              fecha:'', 
              start:'', 
              date_end:'',
              description:'', 
              prioridad:3, 
              equipos:{},  
              programa: programa,
              km_inicial:0,
              km_final:0
            }

            const diagnostico: Diagnostico = {
              equipo_ID:0, //INTEGER NOT NULL,
              caso_ID:0, //INTEGER NOT NULL,
              diagnostico_tipo_ID:0, //INTEGER NOT NULL, 1: pre 2: post
              asistencia_tipo_ID:0, //INTEGER NOT NULL,
              especialista_ID:0, //INTEGER NULL, -- Es una usuario con el perfil de especialista que va acompañar
              necesitaEspecialista:0, // verificar si necesita especialista
              description:'', //TEXT NULL,
              visita_ID:0, //INTEGER NULL,
              prioridad:0,//INTEGER NULL,
              herramientas:{/*herramienta*/}, // Object
              sistemas:{/*servicio*/},
              isEqualPreDiagnostico:false // indica si un dianostico es igual a una predianostico
            }

            const login: Login = {
              isLogged:false
            }

            const casoActivo: CasoActivo = {
              code:'',
              caso_id:'',
              maquina_id:'',
              categoria_id:'',
              cliente_name:'',
              busqueda_terminada:0
            }

            

            let base_structure: BaseStructure = {
                casos : {}, // diccionario de casos
                casoActivo: casoActivo,
                login: login,
                stuctures:{
                  caso: caso,
                  diagnostico: diagnostico,
                  equipamiento: equipamiento,
                  diagnostico_cpy: diagnostico, // solo es la copia del diagnostico
                  equipoId:{
                    prediagnostico: diagnostico, // object
                    diagnostico: diagnostico // object
                  },
                  servicio:{
                    servicio_tipo_ID:0,
                    sistema_marca_ID:0,
                  },
                  casoActivo: casoActivo
                  
                  
                }
            }

            deepFreeze(base_structure.stuctures); 
            if(userData == null){
                saveUserData(base_structure)
            }
        }else{
            /*=======================================================
             BLOQUE: Recuperar datos Guardados en REDUX-PRESIST
             DESCRIPTION: Esto se ejecuta cuando useData tiene información que es estraida de REDUX-PRESIST 
            =========================================================*/
            if(casoActivo == ''){
                if(userData.casoActivo){  
                  if(userData.casoActivo.code != ''){
                      // Setear caso activo obtnido de REDUX-PERSIT
                      setCasoActivo(userData.casoActivo)
                  }
                }else{
                  // Esto es el caso que contenga nada de estructura de casoActivo
                  const newUserData = structuredClone(userData)
                  newUserData.casoActivo = structuredClone(userData.stuctures.casoActivo)
                  saveUserData(newUserData)
                }
            }
        }

        

        
        
    },[userData])

    useEffect(() => {
      
        //onSearch(debouncedSearchValue);
        setServiceTypeData([])
        const fetchData = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/servicesType`);
            
            let data = JSON.parse(response.data)
        

            
            setServiceTypeData(data);
          } catch (error) {
            setServiceTypeData([])
            console.error('df0e005d-089c-48dd-be86-33d956b2d20f', error);
            
          }
        };
        fetchData();
      
    }, []);

    

    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SECTION useEfect <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    //---------------------------------------------------------------------------------

    return (
        <AppContext.Provider value={{ 
            sideBarAccordionActiveIndex, setSideBarAccordionActiveIndex,
            machineID, setMachineID,
            caseType,setCaseType,
            serviceTypeData,setServiceTypeData,
            casoActivo,setCasoActivo,
            slcCasoId,setSlcCasoId,
            }}>
            {children}
        </AppContext.Provider>
  );
}

export default AppContext;