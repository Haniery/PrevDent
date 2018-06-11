import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AgendamentoService } from '../../services/domain/agendamento.service';

/**
 * Generated class for the AgendamentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agendamento',
  templateUrl: 'agendamento.html',
})
export class AgendamentoPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public agendamentoService: AgendamentoService) {
  }

  ionViewDidLoad() {
    this.agendamentoService.findAll()
    .subscribe(response =>{
      console.log(response);
    })
  }
  
}
