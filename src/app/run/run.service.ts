import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

import { Run } from './run';

@Injectable()
export class RunService {
  runs: Run[];
  private _db;

	initDB() {
		this._db = new PouchDB('run.db');
	}

	add(run) {
		if (run.Date == 'Invalid Date') {
			delete run.Date;
		}
		return this._db.post(run);
	}   

	update(run) {
		return this._db.put(run);
	}

	delete(run) {  
		return this._db.remove(run);
	}
	
	getAll() {
		if (this._db === undefined || this.runs.length == 0) {
			return this._db.allDocs({include_docs:true, reduce:false, inclusive_end:false})
				.then(docs => {
					this.runs = docs.rows.map(row => {
						return row.doc;
					});

					// Listen for changes on the database.
					this._db.changes({ live: true, since: 'now', include_docs: true})
						.on('change', this.onDatabaseChange);

					return this.runs;
				})
				.catch (err => {
					console.log(err);
				});
		} else {
			return Promise.resolve(this.runs);
		}
	}
  
	private onDatabaseChange = (change) => {  
		var index = this.findIndex(this.runs, change.id);
		var run = this.runs[index];

		if (change.deleted) {
			if (run) {
				this.runs.splice(index, 1); // delete
			}
		} else {
			change.doc.Date = new Date(change.doc.Date);
			if (run && run._id === change.id) {
				this.runs[index] = change.doc; // update
			} else {
				this.runs.splice(index, 0, change.doc) // insert
			}
		}
	}

	private findIndex(array, id) {  
		var low = 0, high = array.length, mid;
		while (low < high) {
			mid = (low + high) >>> 1;
			array[mid]._id < id ? low = mid + 1 : high = mid
		}
		return low;
	}
  
	constructor() {
		this.runs = [];
	}
}
