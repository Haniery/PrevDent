import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AgendamentoService } from '../../services/domain/agendamento.service';
import { AgendamentoDTO } from '../../models/agendamento.dto';
import { API_CONFIG } from '../../config/api.config';
import {StorageService} from "../../services/storage.service";

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

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: AgendamentoDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public agendamentoService: AgendamentoService) {
  }

  ionViewDidLoad() {
      let localUser = this.storage.getLocalUser();
      if (localUser && localUser.email) {
          this.agendamentoService.findByEmail(localUser.email)
              .subscribe(response => {
                      this.items = response;
                  },
                  error => {
                  });
      }
  }
}
