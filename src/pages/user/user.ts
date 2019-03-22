import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';


@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {
  deviceId;
  theConnect;
  devices;
  table;
  user;

  scan() {
	this.devices = this.ble.scan([], 10);
  }
  
  connect(data) {
	this.deviceId = data.id;
	this.theConnect = this.ble.connect(this.deviceId);
  }
  
  disconnect() {
	this.ble.disconnect(this.deviceId);
  }
  
  sendResult() {
	if (this.deviceId != undefined && this.ble.isConnected(this.deviceId)) {
	}
  }

  constructor(public navCtrl: NavController, private ble: BLE) {
	this.table = "Cafe Rundor";
	this.user = `${localStorage.getItem('alias')} - ${localStorage.getItem('author')}`;
  }
}
