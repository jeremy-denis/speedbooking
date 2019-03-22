import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import * as $ from 'jquery';

import { RunService } from '../../app/run/run.service';
import { AuthorService } from '../../app/services/author.service';
import { Person } from './Person';

@Component({
  selector: 'page-session-create-modal-page',
  templateUrl: 'SessionCreateModalPage.html',
  providers: [RunService, AuthorService]
})
export class SessionCreateModalPage {
	run:any = {};
  
	ngOnInit(): void {
		this.platform.ready().then(() => {
			this.runService.initDB();
		});
	}
	
	goBack(){
		this.viewCtrl.dismiss();
	}
	
	validated() {
		this.platform.ready().then(() => {
			let ret = (!(this.run.time > 0));
			return ret;
		});
	}
	
	alreadyMeet(person, personToAdd) {
		if (person.previous == undefined)
			person.previous = [];
		return person.previous.includes(personToAdd.author);
	}
	
	notViewAll(table,person) {
		let toAdd = true;
		let i     = 0;
		let len = table.length;
		
		for(i; i < len; i++) {
			if (this.alreadyMeet(table[i],person) && this.alreadyMeet(person,table[i])) {
				toAdd = false;
			}
		}
		
		return toAdd;
	}
	
	findRunPers(persons, persSearch) {
		let len = persons.length;
		let i=0;
		let pers = undefined;
		
		for(i; i < len; i++) {
			if (persons[i].previous.length < this.run.persons.length) {
				if (persSearch.author == persons[i].author) {
					pers = persons[i];
					break;
				}
			}
		}
		return pers;
	}
	
	findNotViewedPerson(run, persons, table,inver) {
		if (persons.length == 0)
			return;
		let person = undefined;
		let i = 0;
		let len = persons.length;
		
		if (inver) {
			for(i = (len-1); i >= 0; i--) {
				if (table.length == 0 || this.notViewAll(table,persons[i])) {
					person = persons[i];
					persons.splice(i, 1);
					break;	
				}
			}
		} else {
			for(i; i < len; i++) {
				if (table.length == 0 || this.notViewAll(table,persons[i])) {
					person = persons[i];
					persons.splice(i, 1);
					break;	
				}
			}
		}
		
		if (person != undefined) {
			person = this.findRunPers(run.persons, person);
			table.forEach(persOnTable => {
				persOnTable = this.findRunPers(run.persons,persOnTable);
				if (persOnTable.previous == undefined)
					persOnTable.previous = [];
					
					persOnTable.previous.push(person.author);
				
				if (person.previous == undefined)
					person.previous = [];
					
					person.previous.push(persOnTable.author);
			});
		}
		return person;
	}
	
	createTable(run,pers,copyTables,nbTable) {
			let table:any = {};
			table.persons = [];
			
			if (copyTables != undefined) {
				copyTables.forEach(oneTable => {
					if (oneTable.persons.length > 0 && table.persons.length < run.max && table.persons.length <= run.persons.length) {
						let inver;
						if (run.persons.length % 1 === 0) {
							if (run.persons.length <= 9) {
								inver = (run.tours.length == 2 && nbTable == 1 && table.persons.length == 0);
							}
						} else {
							inver = (run.tours.length == 1 && nbTable == 1 && table.persons.length == 1);
						}
						let person = this.findNotViewedPerson(run, oneTable.persons, table.persons,inver);
						if (person != undefined) {
							table.persons.push(person);
						}
					}
				});
			} else {
				while (pers.length > 0 && table.persons.length < run.max && table.persons.length <= run.persons.length && !(pers.length == 2 && table.persons.length +1 == run.max)) {
					let inver = false;
					if (run.persons.length % 1 === 0) {
						inver = (run.tours.length == 0);
					}
					let person = this.findNotViewedPerson(run, pers, table.persons,inver);
					if (person != undefined) {
						table.persons.push(person);
					} else {
						break;
					}
				}
			}
		return table;
	}
	
	notPlaceAll(tables,max) {
		let personPlaced = 0;
		
		if (tables.length > 0) {
			tables.forEach(table => {
				personPlaced += table.persons.length;
			});
		}
		
		let ret = (personPlaced < max);
		return ret;
	}
	
	createTour(run) {
		let tour:any = {};
		tour.tables = [];
		let pers = run.persons.slice();
		let copyTables = undefined;
		
		if (run.tours[0] != undefined) {
			copyTables = $.extend(true, [], run.tours[0].tables);
		}
			
		let nbPers = run.persons.length;
		let table;
		while(this.notPlaceAll(tour.tables,nbPers)) {
			table = this.createTable(run,pers,copyTables, tour.tables.length);
			if (table.persons.length > 0) {
				tour.tables.push(table);
			} else {
				break;
			}
		}
		tour.remainTurn = 0;
		tour.tables.forEach(table => {
			if (table.persons.length > tour.remainTurn) {
				tour.remainTurn = table.persons.length;
			}
		});
		return tour;
	}
	
	notSeeAll(run) {
		let ret = undefined;
		run.persons.forEach(person => {
			if (person.previous == undefined)
				person.previous = [];
			
			if (ret == undefined) {
				ret = !(person.previous.length >= (run.persons.length - 1));
			} else {
				ret = ret || !(person.previous.length >= (run.persons.length - 1));
			}
		});
		return ret;
	}
	
	repartition (run) {
		run.tours = [];
		while (this.notSeeAll(run)) {
			run.tours.push(this.createTour(run));
		}
	}
  
  save() {
	this.viewCtrl.dismiss();
	
	this.repartition(this.run);
	
	this.runService.add(this.run).then(success => {
		this.events.publish('runAdded', {});
	})
	.catch(err => {
		console.error('cant add data', err.tx, err.err);
	});
  }
  
  addPerson() {
	this.run.persons.push(new Person().setAuthor(this.authorService.next()));
  }
  
  deleteLast() {
	if (this.run.persons.length > 0) {
		this.run.persons.pop();
		this.authorService.previous();
	}
  }
  
  constructor(public platform: Platform, public authorService:AuthorService, public navCtrl: NavController, params: NavParams, public events: Events,public runService:RunService, public viewCtrl: ViewController) {
	this.run.persons = [];
	
	let tmp = params.get('run');
	
	if (tmp != undefined) {
		this.run = tmp;	
		
		this.run.persons.forEach(person => {
			person.previous = [];
		});
		this.authorService.setAuthorIndex(this.run.persons.length);
	}
  }
}
