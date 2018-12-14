import { Component, OnInit } from '@angular/core';
import { Lista, ListaItem } from '../../app/clases/index';
import { AlertController, NavController } from 'ionic-angular';
import { ListaDeseosService } from '../../app/services/lista-deseos.service';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html'
})
export class AgregarComponent implements OnInit {

  nombreLista: string = "";
  nombreItem: string = "";
  expReg = new RegExp(/^\s/);

  items: ListaItem[] = [];

  constructor( public alertCtrl: AlertController,
               public navCtrl: NavController,
               public _listaDeseos: ListaDeseosService) {

  }

  ngOnInit() {

  }

  agregarItem() {

    if (this.nombreItem.length == 0) return;

    let item = new ListaItem();

    item.nombre = this.nombreItem;
    item.completado = false;

    this.items.push( item );
    this.nombreItem = "";
  }

  borrarItem( idx: number ) {

    this.items.splice( idx, 1 );
  }

  guardarLista() {

    if ( this.nombreLista.length == 0 || this.expReg.test( this.nombreLista )) {

      const alert = this.alertCtrl.create({
        title: 'Nombre de la lista',
        subTitle: '¡El nombre de la lista es necesario!',
        buttons: ['OK']
      });

      alert.present();

      return;
    }

    if (this.items.length < 1) {

      const alert = this.alertCtrl.create({
        title: 'Items de la lista',
        subTitle: '¡La lista no tiene items, por favor agrega al menos uno!',
        buttons: ['OK']
      });

      alert.present();

      return;
    }

    let lista = new Lista( this.nombreLista );
    lista.items = this.items;

    //this._listaDeseos.listas.push(lista);
    let resp = this._listaDeseos.agregarLista( lista );

    if (resp) {
      
      this.navCtrl.pop();
    }
  }

}
