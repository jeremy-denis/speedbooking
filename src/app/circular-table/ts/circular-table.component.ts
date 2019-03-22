import { Component, Input, OnInit } from '@angular/core';

import { Events } from 'ionic-angular';

@Component({
  selector: 'circular-table',
  templateUrl: 'circular-table.component.html',
})

export class CircularTableComponent implements OnInit {
	@Input() persons:any;
	@Input() label:any;
	
	posItems;
	mainTop;
	mainLeft;
	
	init() {
		this.posItems = [];	
		
		for(let i = 0, l = this.persons.length; i < l; i++) {
			let tmp:any = {};
			
			if (i != 3)
				tmp.lef = (32*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)+32).toFixed(0);
			else
				tmp.lef = (32*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)+42).toFixed(0);
			
			tmp.left = tmp.lef + '%';
			
			tmp.to = (30*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)+30).toFixed(0);
			if (tmp.to == 80 || (tmp.to > 40 && tmp.to < 60))
				tmp.to = 60;
			
			tmp.top = tmp.to + '%';
			
			if (i == 0) {
				this.mainTop =  'calc('+(tmp.to) + '% + 60px)';
				this.mainLeft = 'calc('+(tmp.lef) + '% + 14px)';
			}
			
			
			this.posItems.push(tmp);
		}
	}
	
	setMyStyles(index) {
		let styles = {
			'top': this.mainTop,
			'left': this.mainLeft
		};
		return styles;
	}
	
	ngOnInit(): void {
		this.init();
    }
    
    constructor(public events: Events) {
		
    }
}

