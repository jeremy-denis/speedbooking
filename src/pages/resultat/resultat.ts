import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

import { RunService } from '../../app/run/run.service';

@Component({
  selector: 'resultat',
  templateUrl: 'resultat.html',
  providers: [RunService]
})
export class ResultatPage {
	conflict;
	placed;
	run:any;
  
	ngOnInit(): void {
		this.platform.ready().then(() => {
			this.runService.initDB();
		});
	}
	
	goBack(){
		this.viewCtrl.dismiss();
	}
	
	notAllReceivedABook() {
		let ret = false;
		if (this.conflict.length > 0) 
			return true;
			
		this.run.persons.forEach(person => {
			if (person.received == undefined) {
				ret = true;
				return;
			}
		});
		return ret;
	}
	
	repartitionPlusContent() {
		let placed = [];
		this.run.persons.forEach(person => {
			person.received2 = person.votes[0].author;
			person.cmp2      = 0
		});
		
		let confl = [];
		let cmp   = 0;
		let cmpPers  = 0;
		let oneConfl;
		let cmpConfl    = 0;
		
		this.run.persons.forEach(person => {
		//console.log(confl);
			cmp = 0;
			cmpConfl = 0;
			for (cmpConfl;cmpConfl < confl.length;cmpConfl++) {
				oneConfl = confl[cmpConfl];
				if (oneConfl.author != undefined && oneConfl.author == person.received2) {
					break;
				} else {
					cmp++;
				}
			}
			
		//console.log(person.received2+ ':'+cmp+'=>'+cmpConfl);
			if (cmp == confl.length) {
			let tmp = {
					'author':person.received2,
					'nb':1,
					'index':[]
				};
				tmp.index.push(cmpPers);
				
				confl.push(tmp);
			} else {	
				confl[cmp].nb++;
				confl[cmp].index.push(cmpPers);
			}
			cmpPers++;
		});
		
		let winner   = 0;
		let cmpVote  = 0;
		let cmpPlaced = 0;
		let vote;
		let votePlaced;
		
		confl.forEach(oneConfl => {
			if (oneConfl.nb == 1) {
				placed.push(oneConfl.author);
			}
		});
		
		confl.forEach(oneConfl => {
			if (oneConfl.nb > 1) {
				winner = oneConfl.index[Math.floor(Math.random() * oneConfl.index.length)];
				placed.push(this.run.persons[winner].received2);
				oneConfl.index.forEach(oneIndex => {
				
					console.log(placed);
					if (oneIndex != winner) {
						for (cmpVote=0;cmpVote < this.run.persons[oneIndex].votes.length;cmpVote++) {
							vote = this.run.persons[oneIndex].votes[cmpVote];
							votePlaced = false;
							
							for (cmpPlaced=0;cmpPlaced < placed.length;cmpPlaced++){
								if (placed[cmpPlaced] == vote.author || this.run.persons[winner].received2 == vote.author) {
									votePlaced = true;
								}
							}
							if (!votePlaced) {
								this.run.persons[oneIndex].cmp2      = cmpVote;
								this.run.persons[oneIndex].received2 = vote.author;
								placed.push(this.run.persons[oneIndex].received2);
								break;
							}
						}
					}
				});
			}
		});
	}
	
	repartitionPlusHaut() {
		while (this.notAllReceivedABook()) {
		//console.log(this.conflict);
		//console.log(this.placed);
			this.run.persons.forEach(person => {
				if (person.received != undefined) {
					let index = this.conflict.indexOf(person.received);
					let placedIndex = this.placed.indexOf(person.received);
					if (index != -1) {
						++person.cmp;
						person.received = undefined;
						this.conflict.splice(index, 1);
						this.placed.splice(placedIndex, 1);
					}
				}
				
				
				if (person.received == undefined) {
				//console.log('@@@@@@@@@@'+person.cmp);
					if (person.votes[person.cmp] != undefined && this.placed.indexOf(person.votes[person.cmp].author) === -1) {
						if (person.votes[person.cmp].author != person.author) {
							this.placed.push(person.votes[person.cmp].author);
							person.received = person.votes[person.cmp].author;
						}
						++person.cmp;
					} else {
						if (this.conflict.indexOf(person.votes[person.cmp].author) == -1) {
							this.conflict.push(person.votes[person.cmp].author);
							//console.log('conflict:'+person.votes[person.cmp].author+'for : '+person.author);
						}
					}
				}
			});
		}
		//console.log(this.run.persons);
	}
	
  constructor(public platform: Platform,public navCtrl: NavController, params: NavParams, public events: Events,public runService:RunService, public viewCtrl: ViewController) {
	this.run = {};
	
	this.run.persons = [];
	this.conflict    = [];
	this.placed      = [];
	let tmp = params.get('run');
	
	if (tmp != undefined) {
		this.run = tmp;
		this.run.persons.forEach(person => {
			person.cmp  = 0;
			person.cmp2 = 0;
			//person.received = undefined;
		});
		this.repartitionPlusHaut();
		this.repartitionPlusContent();
	}
  }
}
