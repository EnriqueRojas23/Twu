import { inject } from "@angular/core/testing"

export interface DetalleGuia {
    id: any;
    equipoTransporte: string;
    placa	:  any ;
    ruc	:  string ;
    dni	:  number ;
    estado: string;
    tipoVehiculo: string;
    chofer: string;
    equipoTransporteId: number;
    nombreCompleto: string;
    tipoVehiculoId:number;
    marcaId: number;
    razonSocial: string;
    brevete: string;
}

export interface GuiaCabecera {
  id: any;
  numguia: string;

  fechaguia: Date;

}
