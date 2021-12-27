import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, DialogService, DynamicDialogRef, MessageService, SelectItem } from 'primeng';
import { DetalleGuia } from 'src/app/_models/Recepcion/detalleguia';
import { OrdenRecibo } from 'src/app/_models/Recepcion/ordenrecibo';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { ProductoService } from 'src/app/_services/Mantenimiento/producto.service';
import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';
import { AsignarEstibaComponent } from './modal.asignarerrores';

@Component({
  selector: 'app-detallesguia',
  templateUrl: './detallesguia.component.html',
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
  styleUrls: ['./detallesguia.component.scss'],
  providers: [ConfirmationService, MessageService, DialogService]
})
export class DetallesguiaComponent implements OnInit {

  ref: DynamicDialogRef;
  cols: any[];
  selectedRow: OrdenRecibo[] = [];
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: true
  };
  productDialog: boolean;
  model: any = {};
  id: any;
  propietarioid : any;

  estados: SelectItem[] = [];
  guias: any[] = [];
  constructor(private ordenReciboService: OrdenReciboService,
  private generalService: GeneralService,

  public dialogService: DialogService,
  private router: Router,
  private productoService: ProductoService ,
  public activeRoute: ActivatedRoute) { }




  ngOnInit() {

    this.id =   this.activeRoute.snapshot.params.uid;
    this.propietarioid  =   this.activeRoute.snapshot.params.uid2;


    this.generalService.getAll(3).subscribe(resp =>
      {

        resp.forEach(element => {
          this.estados.push({
            value: element.id ,
            label: element.nombreEstado
          });
        });
      });





    this.cols =
    [
        {header: 'ACCIONES', field: 'id' , width: '70px' },
        {header: 'CÓDIGO', field: 'codigo' , width: '60px' },
        {header: 'DESCRIPCIÓN', field: 'producto'  ,  width: '100px'  },
        {header: 'CANTIDAD', field: 'cantidad'  , width: '140px'   },
        {header: 'REFERENCIA', field: 'referencia' , width: '100px'  },
        {header: 'LOTE', field: 'lote', width: '120px'    },
        {header: 'FECHA EXPIRE', field: 'fechaexpire', width: '120px'    },

      ];

      this.ordenReciboService.listarguiadetalle(this.id).subscribe(resp1 => {

        this.guias = resp1;

        console.log(this.guias);
      })


  }
  registrar() {

    this.model.guiaid = this.id;



      this.ordenReciboService.registerGuiaDetalle(this.model).subscribe( resp => {


         this.ordenReciboService.listarguiadetalle(this.id).subscribe(resp1 => {

          this.guias = resp1;


        })
      })


  }
  edit(id){

  }
  eliminar(id){

  }
  observado(id){


      this.ref = this.dialogService.open(AsignarEstibaComponent, {
        header: 'Asignar Errores',
        width: '40%',
        contentStyle: {'max-height': '400px', overflow: 'auto'},
        baseZIndex: 10000,
        data : {id }
    });
  }
  regresar() {
    this.router.navigate(['guia/guiaspendientes']);
  }
  openNew() {
    // this.product = {};
    // this.submitted = false;
    this.productDialog = true;
}
deleteSelectedProducts() {
  // this.confirmationService.confirm({
  //     message: 'Are you sure you want to delete the selected products?',
  //     header: 'Confirm',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //         this.products = this.products.filter(val => !this.selectedProducts.includes(val));
  //         this.selectedProducts = null;
  //         this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
  //     }
  // });
}

editProduct(product: DetalleGuia) {
  // this.product = {...product};
   this.productDialog = true;
}
numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}


onBlurMethod(codigo){

        this.productoService.getByCodigo(codigo,1).subscribe(resp => {


          this.model.descripcionLarga  = resp[0].descripcionLarga;
          this.model.codigo = resp[0].codigo;
          this.model.productoid =resp[0].id;

        });


}
// deleteProduct(product: Product) {
//   this.confirmationService.confirm({
//       message: 'Are you sure you want to delete ' + product.name + '?',
//       header: 'Confirm',
//       icon: 'pi pi-exclamation-triangle',
//       accept: () => {
//           this.products = this.products.filter(val => val.id !== product.id);
//           this.product = {};
//           this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
//       }
//   });
// }

// hideDialog() {
//   this.productDialog = false;
//   this.submitted = false;
// }

}
