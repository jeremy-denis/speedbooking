import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AdminPage } from '../admin/admin';
import { ProfilePage } from '../profile/profile';
import { UserPage } from '../user/user';
import { Events } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items;
  
  constructor(public navCtrl: NavController, public events: Events) {
	this.items = [
		{icon:'book', event:'user'},
		{icon:'person', event:'profile'},
		{icon:'settings', event:'admin'}
	];
	
	this.events.subscribe('admin', data => { 
		this.navCtrl.push(AdminPage);
	});
	
	this.events.subscribe('profile', data => {
		this.navCtrl.push(ProfilePage);
	});
	
	this.events.subscribe('user', data => {
		this.navCtrl.push(UserPage,{'one':true});
	});
  }
}
