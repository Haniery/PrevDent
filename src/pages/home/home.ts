import { Component } from '@angular/core';
import {NavController, IonicPage, MenuController, AlertController} from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';
import {getResponseURL} from "@angular/http/src/http_utils";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciaisDTO = {
    username: "",
    password: ""
  };
  
  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public alertCtrl: AlertController,
    public auth: AuthService) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        if(response.status == 200){
            this.auth.successfulLogin(response.body);
            this.navCtrl.setRoot('AgendamentoPage');
        } else {
            this.showLoginError(response.body);
        }
      },
    error => {
        this.showLoginError(error);
    });
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  showLoginError(mensagem) {
      let alert = this.alertCtrl.create({
          title: 'Erro',
          message: 'Não foi possível realizar seu login: ' + mensagem.erro,
          enableBackdropDismiss: false,
          buttons: [
              {
                  text: 'Ok',
                  handler: () => {}
              }
          ]
      });
      alert.present();
  }
}
