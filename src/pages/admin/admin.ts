import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { SessionCreateModalPage } from '../SessionCreateModalPage/SessionCreateModalPage';

@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})

export class AdminPage {
	runs;
	edited;
	

	showAddSessionPopup(data): void {
		if (!this.edited) {
			this.edited = true;
			let myModal = this.modalCtrl.create(SessionCreateModalPage,data);
			
			myModal.present();
			
			myModal.onDidDismiss(() => {
				this.edited = false;
			});
		}
	}

	constructor(public navCtrl: NavController, public modalCtrl: ModalController, public events: Events) {
		this.events.subscribe('editRun', data => {
			if (!this.edited) {
				this.showAddSessionPopup(data);
			}
		});
	}
}
