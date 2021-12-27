import { GuiaCabecera } from './../../../_models/Recepcion/detalleguia';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SelectItem } from 'primeng';
import { OrdenRecibo, OrdenReciboDetalle } from 'src/app/_models/Recepcion/ordenrecibo';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';

@Component({
  selector: 'app-registroguiacabecera',
  templateUrl: './registroguiacabecera.component.html',
  styleUrls: ['./registroguiacabecera.component.scss']
})
export class RegistroguiacabeceraComponent implements OnInit {
  public loading = false;
  es: any;
  model: any = {};
  cols: any[];

  guias: any[] = [];

  EstadoId: number;
  selectedRow: OrdenRecibo[] = [];

  clientes: SelectItem[] = [];
  almacenes: SelectItem[] = [];
  dateInicio: Date = new Date(Date.now()) ;
  OrdenesDetalle: OrdenReciboDetalle[] = [];
  IdNuevaOrden = 0;

  date: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: true
  };
  estados: SelectItem[] = [
    {value: 1, label: 'Ingreso'},
    {value: 2, label: 'Salida'},


];
   clonedProducts: { [s: string]: GuiaCabecera; } = {};

    constructor(private ordenReciboService: OrdenReciboService ,
    private clienteService: ClienteService,
    private generealService: GeneralService,
    private router: Router
,        private alertify: ToastrService) { }

  ngOnInit() {

    this.clienteService.getAllPropietarios('').subscribe(resp1 => {
      resp1.forEach(element => {
        this.clientes.push({ value: element.id , label: element.razonSocial});
      });
    });
    this.cols =
    [
        {header: 'CLIENTE', field: 'id' , width: '100px' },
        {header: 'NRO GUÍA', field: 'nombreEstado'  ,  width: '100px'  },
        {header: 'F. GUÍA', field: 'fechaguia'  , width: '140px'   },
        {header: 'GR', field: 'guiaRemision' , width: '100px'  },
        {header: 'F. REGISTRO', field: 'fechaRegistro', width: '120px'    },

      ];

  }
 guardar(){

  this.guias.forEach(x=> {

    this.ordenReciboService.updateGuiaCabecera(x).subscribe(resp => {

      console.log(resp);

    });

  })
  this.alertify.success('Se actualizó correctamente.');





 }

  registrar(form: NgForm) {

    this.loading =  true;

    if (form.invalid) {
      return;
    }
    this.ordenReciboService.registerGuiaCabecera(this.model).subscribe(resp => {
          //this.model = resp;

          this.ordenReciboService.listarguiacabecera().subscribe(resp1 => {

            this.guias = resp1;

          })

        }, error => {
          this.alertify.error(error);
          console.log(error);

          this.loading =  false;
        }, () => {
          this.loading =  false;
          this.alertify.success('Se registró correctamente.');



    });

  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  onRowEditInit(product: GuiaCabecera) {

    this.clonedProducts[product.id] = {...product};
}

onRowEditSave(product: GuiaCabecera) {


}

onRowEditCancel(product: GuiaCabecera) {
    // this.products2[index] = this.clonedProducts[product.id];
    // delete this.products2[product.id];
}

}
