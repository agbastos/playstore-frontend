import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  clienteDTO: ClienteDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocaluser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
      .subscribe(
        response => {
          this.clienteDTO = response;
          this.getImageIfExists();
        },
        error => {});
    }
  }

  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.clienteDTO.id)
    .subscribe(
      response => {
        this.clienteDTO.imageUrl = `${API_CONFIG.bucketBaseUrl}/imagens/cp${this.clienteDTO.id}.jpg`;
      },
      error => {}
    );
  }

}
