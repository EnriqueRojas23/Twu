import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OrdenRecibo, OrdenReciboDetalle } from 'src/app/_models/Recepcion/ordenrecibo';
import { EquipoTransporte } from 'src/app/_models/Recepcion/equipotransporte';
import { environment } from 'src/environments/environment';
import { InventarioGeneral } from 'src/app/_models/Inventario/inventariogeneral';
import { CalendarEventModel } from 'src/app/_models/Recepcion/CalendarModel';


const httpOptions = {
  headers: new HttpHeaders({
    Authorization : 'Bearer ' + localStorage.getItem('token'),
    'Content-Type' : 'application/json ; charset=utf-8',

  }),
};

const httpOptionsUpload = {
  headers: new HttpHeaders({
    Authorization : 'Bearer ' + localStorage.getItem('token'),
  })
  // , observe: 'body', reportProgress: true };
};

@Injectable({
  providedIn: 'root'
})
export class OrdenReciboService {
  baseUrl = environment.baseUrl + '/api/ordenrecibo/';
constructor(private http: HttpClient) { }

getAll(model: any): Observable<OrdenRecibo[]> {

  if(model.PropietarioId === undefined)
     model.PropietarioId = '';
     if(model.EstadoId === undefined)
     model.EstadoId = '';
     if(model.AlmacenId === undefined)
     model.AlmacenId = '';

  const params = '?PropietarioID=' + model.PropietarioId +
  '&EstadoId=' + model.EstadoId +
  '&fec_ini=' + model.fec_ini.toLocaleDateString() +
  '&fec_fin=' + model.fec_fin.toLocaleDateString() +
  '&AlmacenId=' + model.AlmacenId;

  return this.http.get<OrdenRecibo[]>(this.baseUrl + params, httpOptions);
}
getAllByEquipoTransporte(model: any): Observable<OrdenRecibo[]> {
  const params = '?EquipoTransporteId=' + model.EquipoTransporteId ;
  return this.http.get<OrdenRecibo[]>(this.baseUrl + 'GetOrderbyEquipoTransporte' + params, httpOptions);
}
getCalendarioProgramados(): Observable<CalendarEventModel[]> {
  return this.http.get<CalendarEventModel[]>(this.baseUrl + 'GetListarCalendario'   , httpOptions);
}

registrar(model: any){
  return this.http.post(this.baseUrl + 'register', model, httpOptions);
}

registerGuiaCabecera(model: any){
  return this.http.post(this.baseUrl + 'registerGuiaCabecera', model, httpOptions);
}

updateGuiaCabecera(model: any){
  return this.http.post(this.baseUrl + 'updateGuiaCabecera', model, httpOptions);
}

registerGuiaDetalle(model: any) {
  return this.http.post(this.baseUrl + 'registerGuiaDetalle', model, httpOptions);
}

listarguiacabecera() {
  return this.http.get<OrdenRecibo[]>(this.baseUrl + 'ListarGuiaCabecera?idcliente=&fecharegistro=', httpOptions);
}
listarguiaspendientes() {
  return this.http.get<OrdenRecibo[]>(this.baseUrl + 'ListarGuiaCabecera?idcliente=&fecharegistro=', httpOptions);
}


listarguiadetalle(id:any) {
  return this.http.get<OrdenRecibo[]>(this.baseUrl + 'ListarGuiaDetalle?idguia=' + id, httpOptions);
}


actualizar(model: any){
  return this.http.post(this.baseUrl + 'update', model, httpOptions);
}

obtenerOrden(id: any): Observable<OrdenRecibo> {
  return this.http.get<OrdenRecibo>(this.baseUrl + 'GetOrder?Id=' + id, httpOptions);
}

registrar_detalle(model: any){
  return this.http.post(this.baseUrl + 'register_detail', model, httpOptions)
  .pipe(
    map((response: any) => {
    }
   ));
}

agregar_error(iddetalle, iderror){
  const model: any = {};
  return this.http.post(this.baseUrl + 'adderrorguia?iddetalle=' +  iddetalle + '&iderror=' + iderror, model, httpOptions)
  .pipe(
    map((response: any) => {
    }
   ));
}

vincularEquipoTransporte(model: any){
    return this.http.post(this.baseUrl + 'RegisterEquipoTransporte', model, httpOptions);
}
matchEquipoTransporte(model: any){
  return this.http.post(this.baseUrl + 'MatchTransporteOrdenIngreso', model, httpOptions);
}
getEquipoTransporte(placa: string): Observable<EquipoTransporte> {
  return this.http.get<EquipoTransporte>(this.baseUrl + 'GetEquipoTransporte?placa=' + placa , httpOptions);
}

getAllEquipoTransporte(model: any): Observable<EquipoTransporte[]> {

  const params = '?PropietarioID=' + model.PropietarioId +
  '&EstadoId=' + model.EstadoId +
  '&fec_ini=' + model.fec_ini.toLocaleDateString() +
  '&fec_fin=' + model.fec_fin.toLocaleDateString() +
  '&AlmacenId=' + model.AlmacenId;

  return this.http.get<EquipoTransporte[]>(this.baseUrl + 'ListEquipoTransporte' + params , httpOptions);
}
deleteOrder(id: any): Observable<OrdenRecibo[]> {
  const params = '?OrdenReciboId=' + id ;
  return this.http.delete<OrdenRecibo[]>(this.baseUrl + 'DeleteOrder' + params, httpOptions);
}
deleteOrderDetail(id: any): Observable<OrdenRecibo[]> {
  const params = '?id=' + id ;
  return this.http.delete<OrdenRecibo[]>(this.baseUrl + 'DeleteOrderDetail' + params, httpOptions);
}

uploadFile(formData: FormData, UserId: number) {
  return this.http.post(this.baseUrl + 'UploadFile?usrid=' + UserId.toString()
 , formData
 , httpOptionsUpload
);
}

assignmentOfDoor(EquipoTransporteId: any , ubicacionId: number) {
    const model: any = {};
    model.EquipoTransporteId = EquipoTransporteId;
    model.ubicacionId = ubicacionId;

    return this.http.post(this.baseUrl + 'assignmentOfDoor', model, httpOptions)
    .pipe(
      map((response: any) => {
      }
    ));
  }

obtenerOrdenDetalle(id: any): Observable<OrdenReciboDetalle> {
    return this.http.get<OrdenReciboDetalle>(this.baseUrl + 'GetOrderDetail?Id=' + id, httpOptions);
   }

identificar_detalle(model: any) {
  return this.http.post(this.baseUrl + 'identify_detail', model, httpOptions)
  .pipe(
    map((response: any) => {
      }
   ));
}

identificar_detallemultiple(model: InventarioGeneral[]) {
  const body = JSON.stringify(model);
  return this.http.post(this.baseUrl + 'identify_detail_mix', body, httpOptions)
  .pipe(
    map((response: any) => {
    }
   ));
}

cerrar_identificacion(Id: any) {

  const body = '';

  return this.http.post(this.baseUrl + 'close_details?Id=' + Id, body, httpOptions)
  .pipe(
    map((response: any) => {
    }
   ));
 }
}
