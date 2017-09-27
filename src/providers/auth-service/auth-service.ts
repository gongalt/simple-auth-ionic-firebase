import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from '@ionic/storage';

import * as firebase from 'firebase';
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  firebase_ref = firebase.database().ref();
  server_timestamp = firebase.database['ServerValue']['TIMESTAMP'];
  constructor(public http: Http, public db: AngularFireDatabase, public afAuth: AngularFireAuth, public storage: Storage) {
    console.log('Hello AuthServiceProvider Provider');
  }

	resetPassword(email) {
		return firebase.auth().sendPasswordResetEmail(email);
	}
	setNewPassword(password) {
		return firebase.auth().currentUser.updatePassword(password);
	}
	login(credential) {
		return this.afAuth.auth.signInWithEmailAndPassword(credential.email, credential.password);
	}
	logout() {
		return this.afAuth.auth.signOut();
	}
	register(register_form_data) {
	 	return this.afAuth.auth.createUserWithEmailAndPassword(register_form_data.email,register_form_data.password);
	}
	registerProfile(uid,register_form_data) {
		register_form_data.date_created = firebase.database['ServerValue']['TIMESTAMP'];
	 	register_form_data.date_modified = '';
	 	register_form_data.email_verified = false;
	 	return this.db.list('/users').update(uid, register_form_data);
	}
	verifyUserRegistered() {
	 return firebase.auth().currentUser.sendEmailVerification();
	}
	updateProfile(uid, data) {
	 data.date_modified = firebase.database['ServerValue']['TIMESTAMP'];
	 return this.db.object('users' + '/' + uid).update(data);
  }
  async getUserToken() {
    return await this.storage.get('uid');
  }
}
