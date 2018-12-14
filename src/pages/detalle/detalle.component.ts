import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular'
import { Lista, ListaItem } from '../../app/clases/index';
import { ListaDeseosService } from '../../app/services/lista-deseos.service'

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html'
})

export class DetalleComponent implements OnInit {

  idx: number;
  lista: any;

  constructor( public navCtrl: NavController,
               public navPrms: NavParams,
               public _listaDeseos: ListaDeseosService,
               public alertCtrl: AlertController
  ) {

    this.idx = this.navPrms.get("idx");
    this.lista = this.navPrms.get("lista");
    console.log(this.navPrms);
  }

  ngOnInit() {
    
  }

  actualizar( item: ListaItem ) {

    item.completado = !item.completado;

    let todosMarcados = true;

    for ( let item of this.lista.items ) {

      if ( !item.completado ) {

        todosMarcados = false;
        break;
      }
    }

    this.lista.terminada = todosMarcados;

    this._listaDeseos.actualizarData();
  }

  borrarLista() {

    const confirm = this.alertCtrl.create({
      title: 'Eliminar la lista "' + this.lista.nombre+'"',
      message: '¿Deseas eliminar la lista "'+this.lista.nombre+'"?',
      buttons: ['Cancelar',
        {
          text: 'Eliminar',
          handler: () => {
            this._listaDeseos.eliminarLista( this.lista.nombre );
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();

  }
}
