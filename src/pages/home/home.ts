import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  credenciais : CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController,
    public authService: AuthService) { 
  }
  
  ionViewWillEnter() { 
    this.menu.swipeEnable(false);
  }
  ionViewDidLeave() { 
    this.menu.swipeEnable(true);
  }

  login() {
    this.authService.authenticate(this.credenciais)
    .subscribe(
      response => {
        console.log(response.headers.get('Auth'));
        this.navCtrl.setRoot('CategoriasPage');
      },
      error => {}
    )
  }
}
