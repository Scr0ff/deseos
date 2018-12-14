import { Injectable } from '@angular/core';
import { Lista } from '../clases/listas';
import { AlertController, NavController } from 'ionic-angular';

@Injectable()

export class ListaDeseosService {

  listas: Lista[] = [];

  constructor( public alertCtrl: AlertController ) {

    //let lista1 = new Lista('Compras de supermercado');
    //let lista2 = new Lista('Juegos que deseo');
    //let lista3 = new Lista('Cosas de la Universidad');

    //this.listas.push(lista1);
    //this.listas.push(lista2);
    //this.listas.push(lista3);
    this.cargarData();
    console.log("¡Servicio listo para usar!");
    console.log(this.listas);
  }

  actualizarData() {

    localStorage.setItem( "data", JSON.stringify( this.listas ) );
  }

  cargarData() {

    if ( localStorage.getItem( "data" ) )
      this.listas = JSON.parse( localStorage.getItem( "data" ) );
  }

  agregarLista( lista: Lista) {

    for ( let l1sta of this.listas ) {

      if (l1sta.nombre == lista.nombre) {

        const alert = this.alertCtrl.create({
          title: 'Nombre de la lista',
          subTitle: '¡Este nombre de lista ya existe, por favor ingresa otro!',
          buttons: ['OK']
        });

        alert.present();

        return false;
      }
    }

    this.listas.push(lista);
    this.actualizarData();
    console.log(this.listas);
    return true;
  }

  eliminarLista( nombreLista: string ) {

    console.log("Va a eliminar:");
    for ( let lista of this.listas ) {

      if (lista.nombre == nombreLista) {
        let i = this.listas.map(function (e) { return e.nombre; }).indexOf(nombreLista);
        console.log(this.listas.splice(i, 1));
        this.actualizarData();
        break;
      }
    }
    
    console.log(this.listas);
  }
}
