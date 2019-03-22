import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AdminPage } from '../admin/admin';
import { Events } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AuthorService } from '../../app/services/author.service';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html', 
  providers: [AuthorService]
})
export class ProfilePage {
	authors;
	selectedAuthor;
	alias;
	
  save() {
	localStorage.setItem('alias',this.alias);
	localStorage.setItem('author',this.selectedAuthor);

	const toast = this.toastCtrl.create({
		message: 'Save Done !!!',
		duration: 2000
	});

	toast.present();
  }
  
  constructor(public navCtrl: NavController, public authorService:AuthorService, public events: Events,public toastCtrl: ToastController) {
	this.alias = localStorage.getItem('alias'); 
	this.selectedAuthor = localStorage.getItem('author'); 
  
	this.authors = this.authorService.getAll();
  }
}
