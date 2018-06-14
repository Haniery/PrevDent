import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { PacienteDTO } from '../../models/paciente.dto';
import { PacienteService } from '../../services/domain/paciente.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  paciente: PacienteDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public pacienteService: PacienteService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.pacienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.paciente = response;
          this.getImageIfExists
        },
        error => {});
    }
  }
  getImageIfExists() {
    this.pacienteService.getImageFromBucket(this.paciente.id)
    .subscribe(response => {
      this.paciente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.paciente.id}.jpg`;
    },
    error =>{});
  }
}
