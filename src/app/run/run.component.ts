import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Run } from './run';
import { Platform } from 'ionic-angular';
import { RunService } from './run.service';
import { NativeAudio } from '@ionic-native/native-audio';
import { Events } from 'ionic-angular';
import { VotePage } from '../../pages/vote/vote';
import { ResultatPage } from '../../pages/resultat/resultat';
import { ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { ProgressTimeComponent } from './progress-time.component';


import {ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'run',
  templateUrl: 'run.component.html',
  providers: [RunService]
})

export class RunComponent implements OnInit {
	runs: any;
	time;
	alarmReady;
	calculated;
	active;
	runViewed;
	added;
	deleted;
	finished;
	
	stopAlarm() {
		this.nativeAudio.stop('alarm')
	}
	
	vote(data): void {
		let myModal = this.modalCtrl.create(VotePage,{'run':data});
		myModal.present();
	}
	
	resultat(data): void {
		let myModal = this.modalCtrl.create(ResultatPage,{'run':data});
		myModal.present();
	}
	
	showFinish(titl) {
		if (!this.finished) {
			this.finished = true;
			this.alarm();
			let alert = this.alertCtrl.create({
				title: titl + ' finish',
				subTitle: 'Click ok to stop the Alarm',
				buttons: [
				 {
					text: 'Stop',
					handler: () => {
					  //console.log('Stop Alarm clicked');
					  this.stopAlarm();
					  this.finished = false;
					}
				  }
				]
			});
			alert.present();
		}
	}
	
	alarm() {
		this.nativeAudio.loop('alarm');
	}
	
	deleteRun(run): void {
		if (!this.deleted) {
			this.deleted = true;
			let alert = this.alertCtrl.create({
			title: 'Confirm delete',
			message: 'Voulez vous supprimer ce run ?',
			buttons: [
			  {
				text: 'Annuler',
				role: 'cancel',
				handler: () => {
				  //console.log('Cancel clicked');
				  this.deleted = false;
				}
			  },
			  {
				text: 'Oui',
				handler: () => {
					this.deleted = false;
					if (run.Date == 'Invalid Date') {
						delete run.Date;
					}
					
					this.runService.delete(run).then(() => {
						this.getRuns(false);
					});
				}
			  }
			]
		  });
		  alert.present();
	  }
    }
    
    launch(run) {
		run.pause = !run.pause;
		run.opened = true;
		run.launch = true;
		
		this.events.publish('progressPause', {});
    }
	
	getRuns(launchRepart): void {
      this.runService.getAll().then(runs => { 
		this.runs  = runs;
		this.runs.forEach(run => {
			run.pause = false;
		});
      });
    }
    
    openRun(run) {
		this.runs.forEach(oneRun => {
			if (oneRun._id != run._id)
				oneRun.opened = false;
		});
		run.opened = !run.opened;
		this.runViewed = 0;
    }
    
    init() {
		this.active    = 0;
		this.runViewed = 0;
        this.calculated = false;
        this.runService.initDB();
		this.getRuns(true);
    }
    
    ngOnInit(): void {
		this.platform.ready().then(() => {
			this.init();
        });
    }
    
    editRun(run) {
		let tmp:any = {};
		tmp.run = run;
		this.events.publish('editRun', tmp);
    }
    
    onSucess(sucess) {
		console.log('SUCCESS');
    }
    
    onError(err) {
		console.error(err);
    }
  
  constructor(public platform: Platform,public modalCtrl: ModalController,private runService: RunService,private nativeAudio: NativeAudio,public events: Events,public alertCtrl: AlertController) {
      platform.ready().then(() => {
		  this.alarmReady = this.nativeAudio.preloadSimple('alarm', 'assets/alarm.mp3').then(this.onSucess, this.onError);
		  
		this.events.subscribe('progressEnded', eventData => {
			this.runs[eventData.id].launch = false;
			this.runs[eventData.id].pause = false;
			if (this.runs[eventData.id].tours[this.runViewed].remainTurn > 0) {
				this.runs[eventData.id].tours[this.runViewed].remainTurn -= 1;
			}
			
			if (this.runs[eventData.id].tours[this.runViewed].remainTurn == 0) {
				if (this.runViewed < this.runs[eventData.id].tours.length - 1) {
					this.active += 1;
					this.runViewed += 1;
				}
			}
			this.showFinish('Session ' +eventData.id);
		});
		
		this.events.subscribe('runViewed', eventData => { 
			this.runViewed = eventData;
		});
		
		this.events.subscribe('runAdded', eventData => { 
			this.active = 0
		});
		
		
	});
  }
}
