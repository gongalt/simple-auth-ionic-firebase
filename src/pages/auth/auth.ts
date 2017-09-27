import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Events, Slides } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

// Validator
import { emailValidator, matchingPasswords } from '../../validators/validators';

import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
/**
 * Generated class for the AuthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {
  @ViewChild('pageSlider') pageSlider: Slides;
  tabs: any = '0';
  registration_form: FormGroup;
  login_form: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder,
  public alertCtrl: AlertController, public loadingCtrl: LoadingController, public authServe: AuthServiceProvider, public storage: Storage,
  public events: Events) {
    this.registration_form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required,  emailValidator])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      cpassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    },{validator: matchingPasswords('password', 'cpassword')});

    this.login_form = this.fb.group({
      email: ['', Validators.compose([Validators.required,  emailValidator])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthPage');
  }

  register(formName) {
    const loader = this.loadingCtrl.create({content: 'Loading...'});
    loader.present();
    if (this[formName].valid) {
      this.authServe.register(this[formName].value).then((user) => {
        const user_id = user.uid;
        delete this[formName].value.password;
        delete this[formName].value.cpassword;
        this.authServe.registerProfile(user_id, this[formName].value).then((success) => {
          loader.dismiss();
          this[formName].reset();
          const alert = this.alertCtrl.create({title:'Registration Successful!', buttons: ['Dismiss'], subTitle: 'You may now login.'});
          alert.present();
        })
      }).catch((error) => {
        console.log('error', error.message);
        loader.dismiss();
        const alert = this.alertCtrl.create({title:'Failed to Register!', buttons: ['Dismiss'], subTitle: error.message});
        alert.present();
      });
    } else {
      loader.dismiss();
      const alert = this.alertCtrl.create({title:'Failed to Register!', buttons: ['Dismiss'], subTitle:'Some inputs are invalid!'});
      alert.present();
    }
  }

  login(formName) {
    const loader = this.loadingCtrl.create({content: 'Loading...'});
    loader.present();
    if (this[formName].valid) {
      this.authServe.login(this[formName].value).then((success) => {
        loader.dismiss();
        this.storage.set('uid', success.uid);
        this[formName].reset();
        this.events.publish('login');
        this.navCtrl.push('HomePage');
      }).catch((error) => {
        console.log('error', error.message);
        loader.dismiss();
        const alert = this.alertCtrl.create({title:'Failed to Login!', buttons: ['Dismiss'], subTitle: error.message});
        alert.present();
      });
    } else {
      loader.dismiss();
      const alert = this.alertCtrl.create({title:'Failed to Login!', buttons: ['Dismiss'], subTitle:'Some inputs are invalid!'});
      alert.present();
    }
  }
  selectTab(index) {
    this.pageSlider.slideTo(index);
  }
  changeWillSlide($event) {
    this.tabs = $event._snapIndex.toString();
  }
}
