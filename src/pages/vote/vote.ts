import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { RunService } from '../../app/run/run.service';

@Component({
  selector: 'vote',
  templateUrl: 'vote.html',
  providers: [RunService]
})

export class VotePage {
	run:any;
	votedPerson:any;
	 test;
	 @Input() user;
	
	ngOnInit(): void {
		this.platform.ready().then(() => {
			this.runService.initDB();
		});
	}
	
	goBack(){
		this.viewCtrl.dismiss();
	}
	
	save() {
		this.viewCtrl.dismiss();
		this.dragulaService.destroy(this.test);
		if (this.run.Date == 'Invalid Date') {
			delete this.run.Date;
		}
		
		this.run.persons.forEach(person => {
			let votes = [];
			person.votes.forEach(vote => {
				let tmp:any = {};
				tmp.alias = vote.alias;
				tmp.author = vote.author;
				votes.push(tmp);
			});
			person.votes = votes;
		});
		
		this.runService.add(this.run).then(success => {
			this.events.publish('runAdded', {});
			console.log(this.run);
		})
		.catch(err => {
			console.error('cant add data', err.tx, err.err);
		});
	}
	
	up(index) {
		let votedPerson = this.run.persons[this.votedPerson];
		if (index > 0) {
			let tmp                      = votedPerson.votes[index - 1];
			votedPerson.votes[index - 1] = votedPerson.votes[index]; 
			votedPerson.votes[index]     = tmp;
		}
	}
	
	down(index) {
		let votedPerson = this.run.persons[this.votedPerson];
		if (index < (this.run.persons[this.votedPerson].votes.length - 2 )) {
			console.log('coucou');
			let tmp                      = votedPerson.votes[index + 1];
			votedPerson.votes[index + 1] = votedPerson.votes[index]; 
			votedPerson.votes[index]     = tmp;
		}
	}
	
	constructor(public platform: Platform,public navCtrl: NavController, params: NavParams, public events: Events,public runService:RunService, public viewCtrl: ViewController, private dragulaService: DragulaService) {
	this.run = {};
	this.test = "bag-"+Math.floor(Math.random() * 100) + 1;
	this.run.persons = [];
	this.votedPerson = 0
	
	let one = params.get('one');
	if (one) {
	} else {
	let tmp = params.get('run');
		if (tmp != undefined) {
			this.run = tmp;
			
			this.run.persons.forEach(person => {
				if (person.votes == undefined) {
					person.votes = [];
					person.votes = tmp.persons.slice();
					let cmp = 0;
					let len = person.votes.length;
					let persTmp;
					for (cmp;cmp < len;cmp++) {
						if (person.author == person.votes[cmp].author) {
							persTmp = person.votes[cmp];
							person.votes[cmp] = person.votes[person.votes.length - 1];
							person.votes[person.votes.length - 1] = persTmp;
						}
					}
				}
			});
		}
	}
	
	this.dragulaService.setOptions(this.test, {
      revertOnSpill: true
    });
  }
}
