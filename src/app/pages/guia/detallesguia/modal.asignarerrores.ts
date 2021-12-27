import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';

@Component({
    template: `
    <div class="p-fluid p-grid">

        <div class="col-10 offset-1">
          <button   class='mr-2 mb-4 btn-primary btn btn-xs' pButton iconPos="left" label="Lote Observado" icon="fa fa-file"   (click)="agregar('1')"  type="button"></button>
          <button   class='mr-2 mb-4 btn-primary btn btn-xs' pButton iconPos="left" label="Código observado" icon="fa fa-file"   (click)="agregar('2')"  type="button"></button>
          <button   class='mr-2 mb-4  btn-primary btn btn-xs' pButton iconPos="left" label="Cantidad Ilegible" icon="fa fa-file"   (click)="agregar('2')"  type="button"></button>
          <button   class='mr-2 mb-4 btn-primary btn btn-xs' pButton iconPos="left" label="Paletas y Huellas " icon="fa fa-file"   (click)="agregar('2')"  type="button"></button>
          <button   class='mr-2 mb-4 btn-primary btn btn-xs' pButton iconPos="left" label="Sin fecha expiración" icon="fa fa-file"   (click)="agregar('2')"  type="button"></button>
          <button   class='mr-2 mb-4 btn-primary btn btn-xs' pButton iconPos="left" label="Error en referencia" icon="fa fa-file"   (click)="agregar('2')"  type="button"></button>
          <button   class='mr-2 mb-4 btn-primary btn btn-xs' pButton iconPos="left" label="Ubicación Ocupada" icon="fa fa-file"   (click)="agregar('2')"  type="button"></button>
          <button   class='mr-2 mb-4 btn-primary btn btn-xs' pButton iconPos="left" label="Sin ubicación" icon="fa fa-file"   (click)="agregar('2')"  type="button"></button>
        </div>
    </div>


    `
})
export class AsignarEstibaComponent implements OnInit {

    cuadrilla: any[];
    id: any;
    model: any = {};

    constructor(private generalService: GeneralService,
                public ref: DynamicDialogRef,
                private ordenTransporteService: OrdenReciboService,
                public config: DynamicDialogConfig) {
                    this.id = config.data.id;

                }

    ngOnInit(): void {



    }
    agregar(iderror) {
        //this.id = 1;
        this.model.idordenrecojo = this.id;

        this.ordenTransporteService.agregar_error(this.id,iderror ).subscribe(x=>  {

        });



    }

    eliminar(id: any) {
    }

}
