import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdenRecibo } from 'src/app/_models/Recepcion/ordenrecibo';
import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';

@Component({
  selector: 'app-guiaspendientes',
  templateUrl: './guiaspendientes.component.html',
  styleUrls: ['./guiaspendientes.component.scss']
})
export class GuiaspendientesComponent implements OnInit {

  cols: any[];
  selectedRow: OrdenRecibo[] = [];
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: true
  };

  guias: any[] = [];
  constructor(private ordenReciboService: OrdenReciboService
    ,   private router: Router
    ) { }

  ngOnInit() {

    this.cols =
    [
        {header: 'ACCIONES', field: 'id' , width: '50px' },
        {header: 'CLIENTE', field: 'id' , width: '100px' },
        {header: 'NRO GUÍA', field: 'nombreEstado'  ,  width: '100px'  },
        {header: 'F. GUÍA', field: 'fechaguia'  , width: '140px'   },
        {header: 'GR', field: 'guiaRemision' , width: '100px'  },
        {header: 'F. REGISTRO', field: 'fechaRegistro', width: '120px'    },
        {header: 'ESTADO', field: 'estado', width: '120px'    },

      ];

      this.ordenReciboService.listarguiaspendientes().subscribe(resp1 => {

        console.log(resp1);

        this.guias = resp1;

      })


  }
  ver(id){

    this.router.navigate(['/guia/detallesguia', id ]);

  }
  edit(id){


  }

}
