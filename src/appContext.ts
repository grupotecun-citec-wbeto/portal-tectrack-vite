import { ServiceType } from "@/types/Entidades"; 


export interface AppContext {
    sideBarAccordionActiveIndex:number;
    setSideBarAccordionActiveIndex(index:number):void;
    serviceTypeDetails: ServiceType[];
    setServiceTypeDetails(detail:ServiceType[]):void;
    machineID:number;
    setMachineID(id:number):void;
    caseType:string;
    setCaseType(type:string):void;
}

