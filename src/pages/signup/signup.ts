import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PacienteService } from '../../services/domain/paciente.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public pacienteService: PacienteService,
    public alertCtrl: AlertController
  ) {

  this.formGroup = formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
    telefone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  }

  signupUser() {
    this.pacienteService.insert(this.formGroup.value)
      .subscribe(response => {
        if(response.status == 200){
            this.showInsertOk();
        } else {
            this.showInsertError(response.body)
        }
      },
    error => {});
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

    showInsertError(mensagem : String) {
        let alert = this.alertCtrl.create({
            title: 'Erro',
            message: 'Não foi possível realizar seu cadastro: ' + mensagem,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok',
                    handler: () => {
                        this.navCtrl.pop();
                    }
                }
            ]
        });
        alert.present();
    }
}
