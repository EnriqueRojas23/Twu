import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';
import { OrdenReciboDetalle } from 'src/app/_models/Recepcion/ordenrecibo';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { SelectItem } from 'primeng/api/selectitem';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/_common/datepicker.extend';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-nuevaordenrecibo',
  templateUrl: './nuevaordenrecibo.component.html',
  styleUrls: ['./nuevaordenrecibo.component.css'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})

export class NuevaordenreciboComponent implements OnInit  {
  es: any;
  public loading = false;
  model: any = {};
  clientes: SelectItem[] = [];
  almacenes: SelectItem[] = [];
  dateInicio: Date = new Date(Date.now()) ;
  OrdenesDetalle: OrdenReciboDetalle[] = [];
  IdNuevaOrden = 0;

  previewUrl: any = null;
  div_visible = false;
  uploadedFilePath: string = null;
  fileData: File = null;

  jwtHelper = new JwtHelperService();
  decodedToken: any = {};


  date: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: true
  };

  constructor(private ordenReciboService: OrdenReciboService ,
              private clienteService: ClienteService,
              private generealService: GeneralService,
              private router: Router
     ,        private alertify: ToastrService ) { }

  ngOnInit() {
    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
      dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
      dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
      monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre' ],
      monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ],
      today: 'Hoy',
      clear: 'Borrar'
  };

    this.generealService.getAllAlmacenes().subscribe(resp => {
        resp.forEach(element => {
          this.almacenes.push({ value: element.id ,  label : element.descripcion});
        });

        this.clienteService.getAllPropietarios('').subscribe(resp1 => {
          resp1.forEach(element => {
            this.clientes.push({ value: element.id , label: element.razonSocial});
          });

          }, error => {
          }, () => {



        });

      });

      const user  = localStorage.getItem('token');
      this.decodedToken = this.jwtHelper.decodeToken(user);




   }
   fileProgress(fileInput: any) {
    this.fileData =  fileInput.target.files[0] as File;
    this.preview();

}
preview() {
  // Show preview
  const mimeType = this.fileData.type;
  if (mimeType.match(/image\/*/) == null) {
    return;
  }
}
public uploadFile  = (files) => {
  this.div_visible = true;

  if (files.length === 0) {

     this.alertify.warning('Debe seleccionar un archivo'
    , 'Subir File', {
      closeButton: true
    });

    return ;
  }

  const fileToUpload =  files[0] as File;
  const formData = new FormData();
  formData.append('file', fileToUpload, fileToUpload.name);



  this.ordenReciboService.uploadFile(formData,1   ).subscribe(event => {
        this.div_visible = false;
        this.alertify.success('Se cargo correctamente'
         , 'Subir File', {
           closeButton: true
         });
      //  this.router.navigate(['seguimiento/listaorden']);
  }, error => {
    this.div_visible = false;
    this.alertify.warning(error.error.text
    , 'Subir File', {
      closeButton: true
    });

  }, () => {
    // this.router.navigate(['/dashboard']);
  });
}

  registrar(form: NgForm) {



    this.loading =  true;
    this.model.usuarioid = this.decodedToken.nameid;

    if (form.invalid) {
      return;
    }

    this.model.Propietario = this.clientes.filter(x => x.value === this.model.PropietarioId)[0].label;
    this.ordenReciboService.registrar(this.model).subscribe(resp => {
          this.model = resp;
        }, error => {

          if(error.error == 'Ya existe.'){
          this.alertify.error("La guía de remisión que intenta ingresar ya existe.");
          }
          console.log(error);
          console.log('estoy dentro del error');
          this.loading =  false;
        }, () => {
          this.loading =  false;
          this.alertify.success('Se registró correctamente.');
          this.router.navigate(['/recibo/verordenrecibo',  this.model.id ]);
    });

  }
}
