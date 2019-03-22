import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { Events } from 'ionic-angular';

@Component({
  selector: 'progress-time',
  templateUrl: 'progress-time.component.html',
})

export class ProgressTimeComponent implements OnInit {
	@Input() id?;
	@Input() label?;	
	@Input() noControl?;	
	@Input() autoStart?;	
	@Input() maxTime;
	value;
	updateEach;
	inPause;
	time;
	formatedTime;
	refTime;

    private timer;
    private sub: Subscription;
	
	formatTime(seconds) {
        this.formatedTime = '';
        for(var key in this.refTime){
            if(Math.floor(seconds / this.refTime[key]) > 0){
				
				if (this.formatedTime >= 1) {
					if (this.formatedTime.length == 1) {
						this.formatedTime = '0' + this.formatedTime;
					}
					this.formatedTime += Math.floor(seconds / this.refTime[key]).toString() + ':';
				}
				else
					this.formatedTime += Math.floor(seconds / this.refTime[key]).toString();
                seconds = seconds - this.refTime[key] * Math.floor(seconds / this.refTime[key]);

            }
        }
        
        if (this.formatedTime.length == 1) {
			this.formatedTime = '0' + this.formatedTime;
        }
        
        if (this.formatedTime.length == 2) {
			if (seconds < 60)
					this.formatedTime = '00:'+this.formatedTime;
				else
					this.formatedTime = this.formatedTime+':00';
        }
    }
	
	updateTime(ticks): void {
		this.value += 1;
		
		this.formatTime(this.value);
		
		if (this.value >= this.maxTime) {
			this.end();
			this.postpone();
		}
    }
    
    pause() {console.log('PAAAUSSSSE');
		this.inPause = !this.inPause;
		if (this.sub == undefined) {
		console.log('undefined');
			this.timer   = Observable.timer(1000,1000);
			this.sub     = this.timer.subscribe(t => this.updateTime(t));
		} else {
		console.log('undefined');
			this.end();
			this.sub = undefined;
		}
    }
    
    ngOnInit(): void {
		this.inPause = false;
		this.value   = 0;
		this.timer   = Observable.timer(1000,1000);
		this.sub     = this.timer.subscribe(t => this.updateTime(t));
		if (this.autoStart) {
			this.pause();
			this.pause();
		}
    }
    
    end() {
        this.sub.unsubscribe();
    }
    
    postpone() {
        this.events.unsubscribe('progressPause');
		this.events.publish('progressEnded', this);
    }
    
    constructor(public events: Events) {
		this.refTime = {
			year: 31557600,
			month: 2629746,
			day: 86400,
			hour: 3600,
			minute: 60,
			second: 1
		}
		
		this.events.subscribe('progressPause', eventData => { 
			this.pause();
		});
    }
}

