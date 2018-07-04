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
    email: ['', [Validators.required, Validators.email]],
    tipo: ['', [Validators.required]],
    cpfOuCnpj: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
    password: ['', [Validators.required]],
    logradouro: ['', [Validators.required]],
    numero: ['', [Validators.required]],
    complemento: ['', []],
    bairro: ['', []],
    cep: ['', [Validators.required]],
    telefone: ['', [Validators.required]],
    telefone2: ['', []],
    telefone3: ['', []],
    estadoId: [null, [Validators.required]],
    cidadeId: [null, [Validators.required]]
  });

  }

  signupUser() {
    this.pacienteService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
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
}
