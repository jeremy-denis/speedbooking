webpackJsonp([0],{

/***/ 58:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 58;

/***/ }),

/***/ 64:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 64;

/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/app/run/run.service.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_pouchdb__ = __webpack_require__(116);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RunService = (function () {
    function RunService() {
        var _this = this;
        this.onDatabaseChange = function (change) {
            var index = _this.findIndex(_this.runs, change.id);
            var run = _this.runs[index];
            if (change.deleted) {
                if (run) {
                    _this.runs.splice(index, 1); // delete
                }
            }
            else {
                change.doc.Date = new Date(change.doc.Date);
                if (run && run._id === change.id) {
                    _this.runs[index] = change.doc; // update
                }
                else {
                    _this.runs.splice(index, 0, change.doc); // insert
                }
            }
        };
        this.runs = [];
    }
    RunService.prototype.initDB = function () {
        this._db = new __WEBPACK_IMPORTED_MODULE_1_pouchdb__["a" /* default */]('run.db');
    };
    RunService.prototype.add = function (run) {
        if (run.Date == 'Invalid Date') {
            delete run.Date;
        }
        return this._db.post(run);
    };
    RunService.prototype.update = function (run) {
        return this._db.put(run);
    };
    RunService.prototype.delete = function (run) {
        return this._db.remove(run);
    };
    RunService.prototype.getAll = function () {
        var _this = this;
        if (this._db === undefined || this.runs.length == 0) {
            return this._db.allDocs({ include_docs: true, reduce: false, inclusive_end: false })
                .then(function (docs) {
                _this.runs = docs.rows.map(function (row) {
                    return row.doc;
                });
                // Listen for changes on the database.
                _this._db.changes({ live: true, since: 'now', include_docs: true })
                    .on('change', _this.onDatabaseChange);
                return _this.runs;
            })
                .catch(function (err) {
                console.log(err);
            });
        }
        else {
            return Promise.resolve(this.runs);
        }
    };
    RunService.prototype.findIndex = function (array, id) {
        var low = 0, high = array.length, mid;
        while (low < high) {
            mid = (low + high) >>> 1;
            array[mid]._id < id ? low = mid + 1 : high = mid;
        }
        return low;
    };
    return RunService;
}());
RunService = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [])
], RunService);

//# sourceMappingURL=run.service.js.map
// CONCATENATED MODULE: ./src/app/services/author.service.ts
/* harmony import */ var author_service___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var author_service___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AuthorService = (function () {
    function AuthorService() {
        this.nextAuthor = 0;
        this.authors = ['austen',
            'balzac',
            'camus',
            'dumas',
            'eco',
            'flaubert',
            'giono',
            'hugo',
            'irving',
            'joyce',
            'king',
            'lovecraft',
            'moliere',
            'nietzsche',
            'perault',
            'pagnol',
            'queneau',
        ];
    }
    AuthorService.prototype.next = function () {
        var tmp = this.nextAuthor;
        if (this.nextAuthor >= this.authors.length - 1)
            this.nextAuthor = 0;
        else
            this.nextAuthor += 1;
        return this.authors[tmp];
    };
    AuthorService.prototype.setAuthorIndex = function (index) {
        this.nextAuthor = index;
    };
    AuthorService.prototype.previous = function () {
        this.nextAuthor -= 1;
    };
    AuthorService.prototype.getAll = function () {
        return this.authors;
    };
    return AuthorService;
}());
AuthorService = author_service___decorate([
    author_service___WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"]()
], AuthorService);

//# sourceMappingURL=author.service.js.map
// CONCATENATED MODULE: ./src/pages/SessionCreateModalPage/Person.ts
var Person = (function () {
    function Person() {
        this.alias = '';
        this.author = '';
    }
    Person.prototype.setAuthor = function (auth) {
        this.author = auth;
        return this;
    };
    return Person;
}());

//# sourceMappingURL=Person.js.map
// CONCATENATED MODULE: ./src/pages/SessionCreateModalPage/SessionCreateModalPage.ts
/* harmony import */ var SessionCreateModalPage___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
var SessionCreateModalPage___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SessionCreateModalPage___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var SessionCreateModalPage_SessionCreateModalPage = (function () {
    function SessionCreateModalPage(platform, authorService, navCtrl, params, events, runService, viewCtrl) {
        this.platform = platform;
        this.authorService = authorService;
        this.navCtrl = navCtrl;
        this.events = events;
        this.runService = runService;
        this.viewCtrl = viewCtrl;
        this.run = {};
        this.run.persons = [];
        var tmp = params.get('run');
        if (tmp != undefined) {
            this.run = tmp;
            this.run.persons.forEach(function (person) {
                person.previous = [];
            });
            this.authorService.setAuthorIndex(this.run.persons.length);
        }
    }
    SessionCreateModalPage.prototype.ngOnInit = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.runService.initDB();
        });
    };
    SessionCreateModalPage.prototype.goBack = function () {
        this.viewCtrl.dismiss();
    };
    SessionCreateModalPage.prototype.validated = function () {
        var _this = this;
        this.platform.ready().then(function () {
            var ret = (!(_this.run.time > 0));
            return ret;
        });
    };
    SessionCreateModalPage.prototype.alreadyMeet = function (person, personToAdd) {
        if (person.previous == undefined)
            person.previous = [];
        return person.previous.includes(personToAdd.author);
    };
    SessionCreateModalPage.prototype.notViewAll = function (table, person) {
        var toAdd = true;
        var i = 0;
        var len = table.length;
        for (i; i < len; i++) {
            if (this.alreadyMeet(table[i], person) && this.alreadyMeet(person, table[i])) {
                toAdd = false;
            }
        }
        return toAdd;
    };
    SessionCreateModalPage.prototype.findRunPers = function (persons, persSearch) {
        var len = persons.length;
        var i = 0;
        var pers = undefined;
        for (i; i < len; i++) {
            if (persons[i].previous.length < this.run.persons.length) {
                if (persSearch.author == persons[i].author) {
                    pers = persons[i];
                    break;
                }
            }
        }
        return pers;
    };
    SessionCreateModalPage.prototype.findNotViewedPerson = function (run, persons, table, inver) {
        var _this = this;
        if (persons.length == 0)
            return;
        var person = undefined;
        var i = 0;
        var len = persons.length;
        if (inver) {
            for (i = (len - 1); i >= 0; i--) {
                if (table.length == 0 || this.notViewAll(table, persons[i])) {
                    person = persons[i];
                    persons.splice(i, 1);
                    break;
                }
            }
        }
        else {
            for (i; i < len; i++) {
                if (table.length == 0 || this.notViewAll(table, persons[i])) {
                    person = persons[i];
                    persons.splice(i, 1);
                    break;
                }
            }
        }
        if (person != undefined) {
            person = this.findRunPers(run.persons, person);
            table.forEach(function (persOnTable) {
                persOnTable = _this.findRunPers(run.persons, persOnTable);
                if (persOnTable.previous == undefined)
                    persOnTable.previous = [];
                persOnTable.previous.push(person.author);
                if (person.previous == undefined)
                    person.previous = [];
                person.previous.push(persOnTable.author);
            });
        }
        return person;
    };
    SessionCreateModalPage.prototype.createTable = function (run, pers, copyTables, nbTable) {
        var _this = this;
        var table = {};
        table.persons = [];
        if (copyTables != undefined) {
            copyTables.forEach(function (oneTable) {
                if (oneTable.persons.length > 0 && table.persons.length < run.max && table.persons.length <= run.persons.length) {
                    var inver = void 0;
                    if (run.persons.length % 1 === 0) {
                        if (run.persons.length <= 9) {
                            inver = (run.tours.length == 2 && nbTable == 1 && table.persons.length == 0);
                        }
                    }
                    else {
                        inver = (run.tours.length == 1 && nbTable == 1 && table.persons.length == 1);
                    }
                    var person = _this.findNotViewedPerson(run, oneTable.persons, table.persons, inver);
                    if (person != undefined) {
                        table.persons.push(person);
                    }
                }
            });
        }
        else {
            while (pers.length > 0 && table.persons.length < run.max && table.persons.length <= run.persons.length && !(pers.length == 2 && table.persons.length + 1 == run.max)) {
                var inver = false;
                if (run.persons.length % 1 === 0) {
                    inver = (run.tours.length == 0);
                }
                var person = this.findNotViewedPerson(run, pers, table.persons, inver);
                if (person != undefined) {
                    table.persons.push(person);
                }
                else {
                    break;
                }
            }
        }
        return table;
    };
    SessionCreateModalPage.prototype.notPlaceAll = function (tables, max) {
        var personPlaced = 0;
        if (tables.length > 0) {
            tables.forEach(function (table) {
                personPlaced += table.persons.length;
            });
        }
        var ret = (personPlaced < max);
        return ret;
    };
    SessionCreateModalPage.prototype.createTour = function (run) {
        var tour = {};
        tour.tables = [];
        var pers = run.persons.slice();
        var copyTables = undefined;
        if (run.tours[0] != undefined) {
            copyTables = __WEBPACK_IMPORTED_MODULE_2_jquery__["extend"](true, [], run.tours[0].tables);
        }
        var nbPers = run.persons.length;
        var table;
        while (this.notPlaceAll(tour.tables, nbPers)) {
            table = this.createTable(run, pers, copyTables, tour.tables.length);
            if (table.persons.length > 0) {
                tour.tables.push(table);
            }
            else {
                break;
            }
        }
        tour.remainTurn = 0;
        tour.tables.forEach(function (table) {
            if (table.persons.length > tour.remainTurn) {
                tour.remainTurn = table.persons.length;
            }
        });
        return tour;
    };
    SessionCreateModalPage.prototype.notSeeAll = function (run) {
        var ret = undefined;
        run.persons.forEach(function (person) {
            if (person.previous == undefined)
                person.previous = [];
            if (ret == undefined) {
                ret = !(person.previous.length >= (run.persons.length - 1));
            }
            else {
                ret = ret || !(person.previous.length >= (run.persons.length - 1));
            }
        });
        return ret;
    };
    SessionCreateModalPage.prototype.repartition = function (run) {
        run.tours = [];
        while (this.notSeeAll(run)) {
            run.tours.push(this.createTour(run));
        }
    };
    SessionCreateModalPage.prototype.save = function () {
        var _this = this;
        this.viewCtrl.dismiss();
        this.repartition(this.run);
        this.runService.add(this.run).then(function (success) {
            _this.events.publish('runAdded', {});
        })
            .catch(function (err) {
            console.error('cant add data', err.tx, err.err);
        });
    };
    SessionCreateModalPage.prototype.addPerson = function () {
        this.run.persons.push(new Person().setAuthor(this.authorService.next()));
    };
    SessionCreateModalPage.prototype.deleteLast = function () {
        if (this.run.persons.length > 0) {
            this.run.persons.pop();
            this.authorService.previous();
        }
    };
    return SessionCreateModalPage;
}());
SessionCreateModalPage_SessionCreateModalPage = SessionCreateModalPage___decorate([
    SessionCreateModalPage___WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-session-create-modal-page',template:/*ion-inline-start:"/home/theocrite/work/ionic2/SpeedBooking/src/pages/SessionCreateModalPage/SessionCreateModalPage.html"*/'<ion-header >\n  <ion-navbar>\n	<button class="left noDesign primary0Color" ion-button icon-only (click)="this.goBack()">\n		<ion-icon name="arrow-back"></ion-icon>	\n	</button>\n    <ion-title class="neutreBackground primary1Color">\n		<span class="primary2Color">Speed</span><span class="primary1Color">B<ion-icon class="primary0Color" name="book"></ion-icon>king</span>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	<ion-item class="eighty">\n		<ion-label class="primary1Color" stacked>Run Duration (in seconds)</ion-label>\n		<ion-input type="text" class="primary2Color" placeholder="Duration" [(ngModel)]="run.time"></ion-input>\n	</ion-item>\n	\n	<ion-item class="eighty">\n		<ion-label class="primary1Color" stacked>Max Per Table</ion-label>\n		<ion-input type="text" class="primary2Color" placeholder="Max" [(ngModel)]="run.max"></ion-input>\n	</ion-item>\n	\n	<button ion-button icon-only class="right addButton secondary0Color primary0Background" (click)="deleteLast()">\n		<ion-icon name="person"></ion-icon>\n		<ion-icon name="remove"></ion-icon>\n	</button>\n	<button ion-button icon-only class="right addButton secondary0Color primary0Background" (click)="addPerson()">\n		<ion-icon name="person"></ion-icon>	\n		<ion-icon name="add"></ion-icon>	\n	</button>\n	<div class="clear"></div>\n	<div class="persons">\n		<ion-row class="onePersonLine primary2Border" *ngFor="let person of run.persons;let $index = index;">\n			<ion-col></ion-col>\n			<ion-col><span class="firstLetter primary1Color">{{person.author.charAt(0)}}</span>{{person.author.substring(1)}}</ion-col>\n			<ion-col><ion-input type="text" placeholder="Alias" [(ngModel)]="person.alias"></ion-input></ion-col>\n			<ion-col *ngIf="$index != (run.persons.length - 1)"></ion-col>\n			<ion-col *ngIf="$index == (run.persons.length - 1)" (click)="deleteLast()"><div class="roundButton primary0Background">-</div></ion-col>\n		</ion-row>\n	</div>\n		\n	<button class="saveButton secondary0Color primary0Background" (click)="this.save()" [disabled]="!(time > 0) && max > 0 && persons.length > 0">\n		Save\n	</button>\n</ion-content>\n'/*ion-inline-end:"/home/theocrite/work/ionic2/SpeedBooking/src/pages/SessionCreateModalPage/SessionCreateModalPage.html"*/,
        providers: [RunService, AuthorService]
    }),
    SessionCreateModalPage___metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], AuthorService, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */], RunService, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */]])
], SessionCreateModalPage_SessionCreateModalPage);

//# sourceMappingURL=SessionCreateModalPage.js.map
// CONCATENATED MODULE: ./src/pages/admin/admin.ts
/* harmony import */ var admin___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var admin___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var admin___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var admin___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var admin_AdminPage = (function () {
    function AdminPage(navCtrl, modalCtrl, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.events.subscribe('editRun', function (data) {
            if (!_this.edited) {
                _this.showAddSessionPopup(data);
            }
        });
    }
    AdminPage.prototype.showAddSessionPopup = function (data) {
        var _this = this;
        if (!this.edited) {
            this.edited = true;
            var myModal = this.modalCtrl.create(SessionCreateModalPage_SessionCreateModalPage, data);
            myModal.present();
            myModal.onDidDismiss(function () {
                _this.edited = false;
            });
        }
    };
    return AdminPage;
}());
admin_AdminPage = admin___decorate([
    admin___WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-admin',template:/*ion-inline-start:"/home/theocrite/work/ionic2/SpeedBooking/src/pages/admin/admin.html"*/'<ion-header>\n  <ion-navbar>\n	<ion-title class="neutreBackground primary1Color">\n      <span class="primary2Color">Speed</span><span class="primary1Color">B<ion-icon class="primary0Color" name="book"></ion-icon>king</span>\n    </ion-title>\n    \n    <ion-buttons class="primary0Color" end>\n		<button class="primary0Color" ion-button icon-only (click)="this.showAddSessionPopup()">\n			<ion-icon name="add-circle"></ion-icon>	\n		</button>\n	</ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	<run></run>\n</ion-content>\n'/*ion-inline-end:"/home/theocrite/work/ionic2/SpeedBooking/src/pages/admin/admin.html"*/
    }),
    admin___metadata("design:paramtypes", [admin___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], admin___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */], admin___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]])
], admin_AdminPage);

//# sourceMappingURL=admin.js.map
// CONCATENATED MODULE: ./src/pages/profile/profile.ts
/* harmony import */ var profile___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var profile___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var profile___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var profile___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProfilePage = (function () {
    function ProfilePage(navCtrl, authorService, events, toastCtrl) {
        this.navCtrl = navCtrl;
        this.authorService = authorService;
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.alias = localStorage.getItem('alias');
        this.selectedAuthor = localStorage.getItem('author');
        this.authors = this.authorService.getAll();
    }
    ProfilePage.prototype.save = function () {
        localStorage.setItem('alias', this.alias);
        localStorage.setItem('author', this.selectedAuthor);
        var toast = this.toastCtrl.create({
            message: 'Save Done !!!',
            duration: 2000
        });
        toast.present();
    };
    return ProfilePage;
}());
ProfilePage = profile___decorate([
    profile___WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-profile',template:/*ion-inline-start:"/home/theocrite/work/ionic2/SpeedBooking/src/pages/profile/profile.html"*/'<ion-header>\n  <ion-navbar>\n	<ion-title class="neutreBackground primary1Color">\n      <span class="primary2Color">Speed</span><span class="primary1Color">B<ion-icon class="primary0Color" name="book"></ion-icon>king</span>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	<div class="">\n		<ion-item>\n			<ion-label class="primary1Color" stacked>Alias</ion-label>\n			<ion-input class="primary2Color" type="text" placeholder="Alias" [(ngModel)]="alias"></ion-input>\n		</ion-item>\n		<ion-item class="">\n			<ion-label class="primary1Color" stacked>Author</ion-label>\n			<ion-select class="primary2Color" [(ngModel)]="selectedAuthor">\n				<ion-option *ngFor="let author of authors" [value]="author.author">{{author.author}}</ion-option>\n			</ion-select>\n		</ion-item>\n	</div>\n	\n	<button class="saveButton secondary0Color primary0Background" (click)="this.save()">\n		Save\n	</button>\n</ion-content>\n'/*ion-inline-end:"/home/theocrite/work/ionic2/SpeedBooking/src/pages/profile/profile.html"*/,
        providers: [AuthorService]
    }),
    profile___metadata("design:paramtypes", [profile___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], AuthorService, profile___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */], profile___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */]])
], ProfilePage);

//# sourceMappingURL=profile.js.map
// CONCATENATED MODULE: ./src/pages/user/user.ts
/* harmony import */ var user___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var user___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_ble__ = __webpack_require__(70);
var user___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var user___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserPage = (function () {
    function UserPage(navCtrl, ble) {
        this.navCtrl = navCtrl;
        this.ble = ble;
        this.table = "Cafe Rundor";
        this.user = localStorage.getItem('alias') + " - " + localStorage.getItem('author');
    }
    UserPage.prototype.scan = function () {
        this.devices = this.ble.scan([], 10);
    };
    UserPage.prototype.connect = function (data) {
        this.deviceId = data.id;
        this.theConnect = this.ble.connect(this.deviceId);
    };
    UserPage.prototype.disconnect = function () {
        this.ble.disconnect(this.deviceId);
    };
    UserPage.prototype.sendResult = function () {
        if (this.deviceId != undefined && this.ble.isConnected(this.deviceId)) {
        }
    };
    return UserPage;
}());
UserPage = user___decorate([
    user___WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-user',template:/*ion-inline-start:"/home/theocrite/work/ionic2/SpeedBooking/src/pages/user/user.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title class="neutreBackground primary1Color">\n      <span class="primary2Color">Speed</span><span class="primary1Color">B<ion-icon class="primary0Color" name="book"></ion-icon>king</span>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	\n	<h1 class="primary1Color">table : {{table}}</h1>\n	<vote *ngIf="user != undefined" [user]="user"></vote>\n  \n<div class="containerCircle">\n	<!--<div class="iconCircle" (click)="test = true">\n		<ion-icon name="bluetooth"></ion-icon>\n	</div>\n	<div [ngClass]="{\'bigIconCircle\' : (test)}">\n	\n	</div>-->\n	\n	\n</div>\n\n</ion-content>\n'/*ion-inline-end:"/home/theocrite/work/ionic2/SpeedBooking/src/pages/user/user.html"*/
    }),
    user___metadata("design:paramtypes", [user___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_ble__["a" /* BLE */]])
], UserPage);

//# sourceMappingURL=user.js.map
// CONCATENATED MODULE: ./src/pages/home/home.ts
/* harmony import */ var home___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var home___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var home___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var home___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var home_HomePage = (function () {
    function HomePage(navCtrl, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.events = events;
        this.items = [
            { icon: 'book', event: 'user' },
            { icon: 'person', event: 'profile' },
            { icon: 'settings', event: 'admin' }
        ];
        this.events.subscribe('admin', function (data) {
            _this.navCtrl.push(admin_AdminPage);
        });
        this.events.subscribe('profile', function (data) {
            _this.navCtrl.push(ProfilePage);
        });
        this.events.subscribe('user', function (data) {
            _this.navCtrl.push(UserPage, { 'one': true });
        });
    }
    return HomePage;
}());
home_HomePage = home___decorate([
    home___WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-home',template:/*ion-inline-start:"/home/theocrite/work/ionic2/SpeedBooking/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title class="neutreBackground primary1Color">\n      <span class="primary2Color">Speed</span><span class="primary1Color">B<ion-icon class="primary0Color" name="book"></ion-icon>king</span>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	<div class="placeCenter">\n		<circular-menu [opened]="true" [items]="this.items"></circular-menu>\n	</div>\n</ion-content>\n'/*ion-inline-end:"/home/theocrite/work/ionic2/SpeedBooking/src/pages/home/home.html"*/
    }),
    home___metadata("design:paramtypes", [home___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], home___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]])
], home_HomePage);

//# sourceMappingURL=home.js.map
// CONCATENATED MODULE: ./src/app/app.component.ts
/* harmony import */ var app_component___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var app_component___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(65);
var app_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var app_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var app_component_MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = home_HomePage;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    return MyApp;
}());
app_component_MyApp = app_component___decorate([
    app_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({template:/*ion-inline-start:"/home/theocrite/work/ionic2/SpeedBooking/src/app/app.html"*/'<ion-nav [root]="rootPage">\n\ncoucou</ion-nav>\n'/*ion-inline-end:"/home/theocrite/work/ionic2/SpeedBooking/src/app/app.html"*/
    }),
    app_component___metadata("design:paramtypes", [app_component___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], app_component_MyApp);

//# sourceMappingURL=app.component.js.map
// CONCATENATED MODULE: ./src/pages/vote/vote.ts
/* harmony import */ var vote___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var vote___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_dragula_ng2_dragula__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_dragula_ng2_dragula___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_dragula_ng2_dragula__);
var vote___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var vote___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var VotePage = (function () {
    function VotePage(platform, navCtrl, params, events, runService, viewCtrl, dragulaService) {
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.events = events;
        this.runService = runService;
        this.viewCtrl = viewCtrl;
        this.dragulaService = dragulaService;
        this.run = {};
        this.test = "bag-" + Math.floor(Math.random() * 100) + 1;
        this.run.persons = [];
        this.votedPerson = 0;
        var one = params.get('one');
        if (one) {
        }
        else {
            var tmp_1 = params.get('run');
            if (tmp_1 != undefined) {
                this.run = tmp_1;
                this.run.persons.forEach(function (person) {
                    if (person.votes == undefined) {
                        person.votes = [];
                        person.votes = tmp_1.persons.slice();
                        var cmp = 0;
                        var len = person.votes.length;
                        var persTmp = void 0;
                        for (cmp; cmp < len; cmp++) {
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
    VotePage.prototype.ngOnInit = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.runService.initDB();
        });
    };
    VotePage.prototype.goBack = function () {
        this.viewCtrl.dismiss();
    };
    VotePage.prototype.save = function () {
        var _this = this;
        this.viewCtrl.dismiss();
        this.dragulaService.destroy(this.test);
        if (this.run.Date == 'Invalid Date') {
            delete this.run.Date;
        }
        this.run.persons.forEach(function (person) {
            var votes = [];
            person.votes.forEach(function (vote) {
                var tmp = {};
                tmp.alias = vote.alias;
                tmp.author = vote.author;
                votes.push(tmp);
            });
            person.votes = votes;
        });
        this.runService.add(this.run).then(function (success) {
            _this.events.publish('runAdded', {});
            console.log(_this.run);
        })
            .catch(function (err) {
            console.error('cant add data', err.tx, err.err);
        });
    };
    VotePage.prototype.up = function (index) {
        var votedPerson = this.run.persons[this.votedPerson];
        if (index > 0) {
            var tmp = votedPerson.votes[index - 1];
            votedPerson.votes[index - 1] = votedPerson.votes[index];
            votedPerson.votes[index] = tmp;
        }
    };
    VotePage.prototype.down = function (index) {
        var votedPerson = this.run.persons[this.votedPerson];
        if (index < (this.run.persons[this.votedPerson].votes.length - 2)) {
            console.log('coucou');
            var tmp = votedPerson.votes[index + 1];
            votedPerson.votes[index + 1] = votedPerson.votes[index];
            votedPerson.votes[index] = tmp;
        }
    };
    return VotePage;
}());
vote___decorate([
    vote___WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    vote___metadata("design:type", Object)
], VotePage.prototype, "user", void 0);
VotePage = vote___decorate([
    vote___WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'vote',template:/*ion-inline-start:"/home/theocrite/work/ionic2/SpeedBooking/src/pages/vote/vote.html"*/'<ion-header *ngIf="!user">\n  <ion-navbar>\n	<button class="left noDesign primary0Color" ion-button icon-only (click)="this.goBack()">\n		<ion-icon name="arrow-back"></ion-icon>	\n	</button>\n	<ion-title class="neutreBackground primary1Color">\n      <span class="primary2Color">Speed</span><span class="primary1Color">B<ion-icon class="primary0Color" name="book"></ion-icon>king</span>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>	\n	<ion-item>\n		<ion-label class="primary1Color">Vote Pour : <span *ngIf="user != undefined">{{user}}</span></ion-label>\n		<ion-select *ngIf="!user" class="primary2Color" [(ngModel)]="votedPerson">\n			<ion-option *ngFor="let person of run.persons; let $index = index;" [value]="$index">{{person.author}}</ion-option>\n		</ion-select>\n	</ion-item>\n	\n	<div *ngIf="votedPerson >= 0 && run != undefined && run.persons.length > 0" class="listVote neutreBackground">\n		<ul  [dragula]=\'test\' [dragulaModel]=\'run.persons[votedPerson].votes\'>\n			<div *ngFor="let person of run.persons[votedPerson].votes;let $index = index;">\n				<ion-row class="onePersonLine"  *ngIf="person.author != run.persons[votedPerson].author">\n					<ion-col></ion-col>\n					<ion-col><span class="firstLetter primary1Color">{{person.author.charAt(0)}}</span>{{person.author.substring(1)}}</ion-col>\n					<ion-col>{{person.alias}}</ion-col>\n					<ion-col>\n						<ion-icon class="roundButton secondary0Color primary0Background" name="arrow-up" *ngIf="$index > 0" (click)="up($index)"></ion-icon>\n						<ion-icon class="roundButton secondary0Color primary0Background" name="arrow-down" *ngIf="$index < (run.persons[votedPerson].votes.length - 2)" (click)="down($index)"></ion-icon>\n					</ion-col>\n				</ion-row>\n			</div>\n		</ul>\n	</div>\n		\n	<button class="saveButton secondary0Color primary0Background" (click)="this.save()">\n		Save\n	</button>\n</ion-content>\n'/*ion-inline-end:"/home/theocrite/work/ionic2/SpeedBooking/src/pages/vote/vote.html"*/,
        providers: [RunService]
    }),
    vote___metadata("design:paramtypes", [vote___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], vote___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], vote___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], vote___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */], RunService, vote___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2_ng2_dragula_ng2_dragula__["DragulaService"]])
], VotePage);

//# sourceMappingURL=vote.js.map
// CONCATENATED MODULE: ./src/pages/resultat/resultat.ts
/* harmony import */ var resultat___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var resultat___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var resultat___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var resultat___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ResultatPage = (function () {
    function ResultatPage(platform, navCtrl, params, events, runService, viewCtrl) {
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.events = events;
        this.runService = runService;
        this.viewCtrl = viewCtrl;
        this.run = {};
        this.run.persons = [];
        this.conflict = [];
        this.placed = [];
        var tmp = params.get('run');
        if (tmp != undefined) {
            this.run = tmp;
            this.run.persons.forEach(function (person) {
                person.cmp = 0;
                person.cmp2 = 0;
                //person.received = undefined;
            });
            this.repartitionPlusHaut();
            this.repartitionPlusContent();
        }
    }
    ResultatPage.prototype.ngOnInit = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.runService.initDB();
        });
    };
    ResultatPage.prototype.goBack = function () {
        this.viewCtrl.dismiss();
    };
    ResultatPage.prototype.notAllReceivedABook = function () {
        var ret = false;
        if (this.conflict.length > 0)
            return true;
        this.run.persons.forEach(function (person) {
            if (person.received == undefined) {
                ret = true;
                return;
            }
        });
        return ret;
    };
    ResultatPage.prototype.repartitionPlusContent = function () {
        var _this = this;
        var placed = [];
        this.run.persons.forEach(function (person) {
            person.received2 = person.votes[0].author;
            person.cmp2 = 0;
        });
        var confl = [];
        var cmp = 0;
        var cmpPers = 0;
        var oneConfl;
        var cmpConfl = 0;
        this.run.persons.forEach(function (person) {
            //console.log(confl);
            cmp = 0;
            cmpConfl = 0;
            for (cmpConfl; cmpConfl < confl.length; cmpConfl++) {
                oneConfl = confl[cmpConfl];
                if (oneConfl.author != undefined && oneConfl.author == person.received2) {
                    break;
                }
                else {
                    cmp++;
                }
            }
            //console.log(person.received2+ ':'+cmp+'=>'+cmpConfl);
            if (cmp == confl.length) {
                var tmp = {
                    'author': person.received2,
                    'nb': 1,
                    'index': []
                };
                tmp.index.push(cmpPers);
                confl.push(tmp);
            }
            else {
                confl[cmp].nb++;
                confl[cmp].index.push(cmpPers);
            }
            cmpPers++;
        });
        var winner = 0;
        var cmpVote = 0;
        var cmpPlaced = 0;
        var vote;
        var votePlaced;
        confl.forEach(function (oneConfl) {
            if (oneConfl.nb == 1) {
                placed.push(oneConfl.author);
            }
        });
        confl.forEach(function (oneConfl) {
            if (oneConfl.nb > 1) {
                winner = oneConfl.index[Math.floor(Math.random() * oneConfl.index.length)];
                placed.push(_this.run.persons[winner].received2);
                oneConfl.index.forEach(function (oneIndex) {
                    console.log(placed);
                    if (oneIndex != winner) {
                        for (cmpVote = 0; cmpVote < _this.run.persons[oneIndex].votes.length; cmpVote++) {
                            vote = _this.run.persons[oneIndex].votes[cmpVote];
                            votePlaced = false;
                            for (cmpPlaced = 0; cmpPlaced < placed.length; cmpPlaced++) {
                                if (placed[cmpPlaced] == vote.author || _this.run.persons[winner].received2 == vote.author) {
                                    votePlaced = true;
                                }
                            }
                            if (!votePlaced) {
                                _this.run.persons[oneIndex].cmp2 = cmpVote;
                                _this.run.persons[oneIndex].received2 = vote.author;
                                placed.push(_this.run.persons[oneIndex].received2);
                                break;
                            }
                        }
                    }
                });
            }
        });
    };
    ResultatPage.prototype.repartitionPlusHaut = function () {
        var _this = this;
        while (this.notAllReceivedABook()) {
            //console.log(this.conflict);
            //console.log(this.placed);
            this.run.persons.forEach(function (person) {
                if (person.received != undefined) {
                    var index = _this.conflict.indexOf(person.received);
                    var placedIndex = _this.placed.indexOf(person.received);
                    if (index != -1) {
                        ++person.cmp;
                        person.received = undefined;
                        _this.conflict.splice(index, 1);
                        _this.placed.splice(placedIndex, 1);
                    }
                }
                if (person.received == undefined) {
                    //console.log('@@@@@@@@@@'+person.cmp);
                    if (person.votes[person.cmp] != undefined && _this.placed.indexOf(person.votes[person.cmp].author) === -1) {
                        if (person.votes[person.cmp].author != person.author) {
                            _this.placed.push(person.votes[person.cmp].author);
                            person.received = person.votes[person.cmp].author;
                        }
                        ++person.cmp;
                    }
                    else {
                        if (_this.conflict.indexOf(person.votes[person.cmp].author) == -1) {
                            _this.conflict.push(person.votes[person.cmp].author);
                            //console.log('conflict:'+person.votes[person.cmp].author+'for : '+person.author);
                        }
                    }
                }
            });
        }
        //console.log(this.run.persons);
    };
    return ResultatPage;
}());
ResultatPage = resultat___decorate([
    resultat___WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'resultat',template:/*ion-inline-start:"/home/theocrite/work/ionic2/SpeedBooking/src/pages/resultat/resultat.html"*/'<ion-header>\n  <ion-navbar>\n	<button class="left noDesign primary0Color" ion-button icon-only (click)="this.goBack()">\n		<ion-icon name="arrow-back"></ion-icon>	\n	</button>\n    <ion-title class="neutreBackground primary1Color">\n      <span class="primary2Color">Speed</span><span class="primary1Color">B<ion-icon class="primary0Color" name="book"></ion-icon>king</span>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="primary1Color" padding>\n	<div Class="listVote neutreBackground">\n		<ion-row class="onePersonLine">\n			<ion-col>receveur</ion-col>\n			<ion-col>algorithme + haut</ion-col>\n			<ion-col>algorithme + content</ion-col>\n		</ion-row>\n		<ion-row class="onePersonLine primary2Border" *ngFor="let person of run.persons; let $index = index;">\n			<ion-col>{{person.author}}</ion-col>\n			<ion-col>{{person.received}}<span class="primary2Color">({{person.cmp}})</span></ion-col>\n			<ion-col>{{person.received2}}<span class="primary2Color">({{person.cmp2 + 1}})</span></ion-col>\n		</ion-row>\n	</div>\n</ion-content>\n'/*ion-inline-end:"/home/theocrite/work/ionic2/SpeedBooking/src/pages/resultat/resultat.html"*/,
        providers: [RunService]
    }),
    resultat___metadata("design:paramtypes", [resultat___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], resultat___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], resultat___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], resultat___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */], RunService, resultat___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */]])
], ResultatPage);

//# sourceMappingURL=resultat.js.map
// CONCATENATED MODULE: ./src/app/run/run.component.ts
/* harmony import */ var run_component___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var run_component___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_audio__ = __webpack_require__(68);
var run_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var run_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var run_component_RunComponent = (function () {
    function RunComponent(platform, modalCtrl, runService, nativeAudio, events, alertCtrl) {
        var _this = this;
        this.platform = platform;
        this.modalCtrl = modalCtrl;
        this.runService = runService;
        this.nativeAudio = nativeAudio;
        this.events = events;
        this.alertCtrl = alertCtrl;
        platform.ready().then(function () {
            _this.alarmReady = _this.nativeAudio.preloadSimple('alarm', 'assets/alarm.mp3').then(_this.onSucess, _this.onError);
            _this.events.subscribe('progressEnded', function (eventData) {
                _this.runs[eventData.id].launch = false;
                _this.runs[eventData.id].pause = false;
                if (_this.runs[eventData.id].tours[_this.runViewed].remainTurn > 0) {
                    _this.runs[eventData.id].tours[_this.runViewed].remainTurn -= 1;
                }
                if (_this.runs[eventData.id].tours[_this.runViewed].remainTurn == 0) {
                    if (_this.runViewed < _this.runs[eventData.id].tours.length - 1) {
                        _this.active += 1;
                        _this.runViewed += 1;
                    }
                }
                _this.showFinish('Session ' + eventData.id);
            });
            _this.events.subscribe('runViewed', function (eventData) {
                _this.runViewed = eventData;
            });
            _this.events.subscribe('runAdded', function (eventData) {
                _this.active = 0;
            });
        });
    }
    RunComponent.prototype.stopAlarm = function () {
        this.nativeAudio.stop('alarm');
    };
    RunComponent.prototype.vote = function (data) {
        var myModal = this.modalCtrl.create(VotePage, { 'run': data });
        myModal.present();
    };
    RunComponent.prototype.resultat = function (data) {
        var myModal = this.modalCtrl.create(ResultatPage, { 'run': data });
        myModal.present();
    };
    RunComponent.prototype.showFinish = function (titl) {
        var _this = this;
        if (!this.finished) {
            this.finished = true;
            this.alarm();
            var alert_1 = this.alertCtrl.create({
                title: titl + ' finish',
                subTitle: 'Click ok to stop the Alarm',
                buttons: [
                    {
                        text: 'Stop',
                        handler: function () {
                            //console.log('Stop Alarm clicked');
                            _this.stopAlarm();
                            _this.finished = false;
                        }
                    }
                ]
            });
            alert_1.present();
        }
    };
    RunComponent.prototype.alarm = function () {
        this.nativeAudio.loop('alarm');
    };
    RunComponent.prototype.deleteRun = function (run) {
        var _this = this;
        if (!this.deleted) {
            this.deleted = true;
            var alert_2 = this.alertCtrl.create({
                title: 'Confirm delete',
                message: 'Voulez vous supprimer ce run ?',
                buttons: [
                    {
                        text: 'Annuler',
                        role: 'cancel',
                        handler: function () {
                            //console.log('Cancel clicked');
                            _this.deleted = false;
                        }
                    },
                    {
                        text: 'Oui',
                        handler: function () {
                            _this.deleted = false;
                            if (run.Date == 'Invalid Date') {
                                delete run.Date;
                            }
                            _this.runService.delete(run).then(function () {
                                _this.getRuns(false);
                            });
                        }
                    }
                ]
            });
            alert_2.present();
        }
    };
    RunComponent.prototype.launch = function (run) {
        run.pause = !run.pause;
        run.opened = true;
        run.launch = true;
        this.events.publish('progressPause', {});
    };
    RunComponent.prototype.getRuns = function (launchRepart) {
        var _this = this;
        this.runService.getAll().then(function (runs) {
            _this.runs = runs;
            _this.runs.forEach(function (run) {
                run.pause = false;
            });
        });
    };
    RunComponent.prototype.openRun = function (run) {
        this.runs.forEach(function (oneRun) {
            if (oneRun._id != run._id)
                oneRun.opened = false;
        });
        run.opened = !run.opened;
        this.runViewed = 0;
    };
    RunComponent.prototype.init = function () {
        this.active = 0;
        this.runViewed = 0;
        this.calculated = false;
        this.runService.initDB();
        this.getRuns(true);
    };
    RunComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.init();
        });
    };
    RunComponent.prototype.editRun = function (run) {
        var tmp = {};
        tmp.run = run;
        this.events.publish('editRun', tmp);
    };
    RunComponent.prototype.onSucess = function (sucess) {
        console.log('SUCCESS');
    };
    RunComponent.prototype.onError = function (err) {
        console.error(err);
    };
    return RunComponent;
}());
run_component_RunComponent = run_component___decorate([
    run_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'run',template:/*ion-inline-start:"/home/theocrite/work/ionic2/SpeedBooking/src/app/run/run.component.html"*/'<div *ngIf="runs == undefined || runs.length == 0">\n No Run\n</div>\n\n<div *ngIf="runs != undefined && runs.length > 0">\n	<div *ngFor="let run of runs; let $index = index;" class="run">\n		<div class="runTitle">\n			<span class="primary1Color" (click)="openRun(run)">\n				<ion-icon *ngIf="run.opened" name="arrow-down"></ion-icon>\n				<ion-icon *ngIf="!run.opened" name="arrow-forward"></ion-icon>\n				Session {{$index}}\n			</span>\n			<button class="launchButton secondary0Color primary0Background" (click)="this.deleteRun(run)">\n				<ion-icon name="close"></ion-icon>\n			</button>\n			<button class="launchButton secondary0Color primary0Background" (click)="this.editRun(run)">\n				  <ion-icon name="build"></ion-icon>\n			</button>\n			<button class="launchButton secondary0Color primary0Background" (click)="this.launch(run)">\n				<ion-icon *ngIf="!run.pause" name="play"></ion-icon>\n				<ion-icon *ngIf="run.pause" name="pause"></ion-icon>\n			</button>\n			<div class="clear"></div>\n		</div>\n		<div class="myProgress" *ngIf="run.launch">\n			<progress-time [id]="$index" [noControl]="true" [maxTime]="run.time" [autoStart]="true"></progress-time>\n		</div>\n		<div *ngIf="run.opened && run.tours.length > 0" class="runContent neutreBackground">\n			<div *ngIf="run.tours != undefined && run.tours.length > 0" class="centered">\n				<card-map [active]="active" [leng]="run.tours.length"></card-map>\n			</div>\n			\n			<div *ngFor="let table of run.tours[runViewed].tables" class="table">\n				<circular-table [persons]="table.persons" [label]="run.tours[runViewed].remainTurn" *ngIf="table.persons.length > 1"></circular-table>\n			</div>\n			<div class="clear"></div>\n			\n			<button class="launchButton secondary0Color primary0Background left noLeft" (click)="this.vote(run)">\n				Vote\n			</button>\n			\n			<button class="launchButton secondary0Color primary0Background right" (click)="this.resultat(run)" [disabled]="run.persons[0].votes === undefined">\n				Resultat\n			</button>\n			<div class="clear"></div>\n		<!-- <progress-time [id]="run._id" [label]="\'Run\'" [maxTime]="time"></progress-time>-->\n		</div>\n	</div>\n</div>\n'/*ion-inline-end:"/home/theocrite/work/ionic2/SpeedBooking/src/app/run/run.component.html"*/,
        providers: [RunService]
    }),
    run_component___metadata("design:paramtypes", [run_component___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], run_component___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */], RunService, __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_audio__["a" /* NativeAudio */], run_component___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */], run_component___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], run_component_RunComponent);

//# sourceMappingURL=run.component.js.map
// CONCATENATED MODULE: ./src/app/run/progress-time.component.ts
/* harmony import */ var progress_time_component___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
var progress_time_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var progress_time_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ProgressTimeComponent = (function () {
    function ProgressTimeComponent(events) {
        var _this = this;
        this.events = events;
        this.refTime = {
            year: 31557600,
            month: 2629746,
            day: 86400,
            hour: 3600,
            minute: 60,
            second: 1
        };
        this.events.subscribe('progressPause', function (eventData) {
            _this.pause();
        });
    }
    ProgressTimeComponent.prototype.formatTime = function (seconds) {
        this.formatedTime = '';
        for (var key in this.refTime) {
            if (Math.floor(seconds / this.refTime[key]) > 0) {
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
                this.formatedTime = '00:' + this.formatedTime;
            else
                this.formatedTime = this.formatedTime + ':00';
        }
    };
    ProgressTimeComponent.prototype.updateTime = function (ticks) {
        this.value += 1;
        this.formatTime(this.value);
        if (this.value >= this.maxTime) {
            this.end();
            this.postpone();
        }
    };
    ProgressTimeComponent.prototype.pause = function () {
        var _this = this;
        console.log('PAAAUSSSSE');
        this.inPause = !this.inPause;
        if (this.sub == undefined) {
            console.log('undefined');
            this.timer = __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].timer(1000, 1000);
            this.sub = this.timer.subscribe(function (t) { return _this.updateTime(t); });
        }
        else {
            console.log('undefined');
            this.end();
            this.sub = undefined;
        }
    };
    ProgressTimeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.inPause = false;
        this.value = 0;
        this.timer = __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].timer(1000, 1000);
        this.sub = this.timer.subscribe(function (t) { return _this.updateTime(t); });
        if (this.autoStart) {
            this.pause();
            this.pause();
        }
    };
    ProgressTimeComponent.prototype.end = function () {
        this.sub.unsubscribe();
    };
    ProgressTimeComponent.prototype.postpone = function () {
        this.events.unsubscribe('progressPause');
        this.events.publish('progressEnded', this);
    };
    return ProgressTimeComponent;
}());
progress_time_component___decorate([
    progress_time_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    progress_time_component___metadata("design:type", Object)
], ProgressTimeComponent.prototype, "id", void 0);
progress_time_component___decorate([
    progress_time_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    progress_time_component___metadata("design:type", Object)
], ProgressTimeComponent.prototype, "label", void 0);
progress_time_component___decorate([
    progress_time_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    progress_time_component___metadata("design:type", Object)
], ProgressTimeComponent.prototype, "noControl", void 0);
progress_time_component___decorate([
    progress_time_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    progress_time_component___metadata("design:type", Object)
], ProgressTimeComponent.prototype, "autoStart", void 0);
progress_time_component___decorate([
    progress_time_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    progress_time_component___metadata("design:type", Object)
], ProgressTimeComponent.prototype, "maxTime", void 0);
ProgressTimeComponent = progress_time_component___decorate([
    progress_time_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'progress-time',template:/*ion-inline-start:"/home/theocrite/work/ionic2/SpeedBooking/src/app/run/progress-time.component.html"*/' <div class="playIcon" *ngIf="!noControl">\n	<ion-icon *ngIf="!inPause" name="pause" (click)="this.pause()"></ion-icon>\n	<ion-icon *ngIf="inPause" name="play" (click)="this.pause()"></ion-icon>\n </div>\n <div class="timeDisplay primary1Color">\n	{{formatedTime}}\n </div>\n <div class="runTitle" *ngIf="label != undefined">\n	{{label}} {{id}} - {{time}}\n	<br/>\n </div>\n <progress id="avancement" value="{{value}}" max="{{maxTime}}"></progress>\n'/*ion-inline-end:"/home/theocrite/work/ionic2/SpeedBooking/src/app/run/progress-time.component.html"*/,
    }),
    progress_time_component___metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* Events */]])
], ProgressTimeComponent);

//# sourceMappingURL=progress-time.component.js.map
// CONCATENATED MODULE: ./src/app/circular-menu/ts/circular-menu.component.ts
/* harmony import */ var circular_menu_component___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var circular_menu_component___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var circular_menu_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var circular_menu_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CircularMenuComponent = (function () {
    function CircularMenuComponent(events) {
        this.events = events;
    }
    CircularMenuComponent.prototype.open = function () {
        this.opened = !this.opened;
        this.init();
    };
    CircularMenuComponent.prototype.launchEvent = function ($data, event) {
        this.events.publish(event, $data);
    };
    CircularMenuComponent.prototype.init = function () {
        this.posItems = [];
        for (var i = 0, l = this.items.length; i < l; i++) {
            var tmp = {};
            tmp.lef = (50 - 35 * Math.cos(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4);
            tmp.left = tmp.lef + '%';
            tmp.to = (50 + 35 * Math.sin(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4);
            tmp.top = tmp.to + '%';
            this.posItems.push(tmp);
        }
    };
    CircularMenuComponent.prototype.ngOnInit = function () {
        this.init();
    };
    return CircularMenuComponent;
}());
circular_menu_component___decorate([
    circular_menu_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    circular_menu_component___metadata("design:type", Object)
], CircularMenuComponent.prototype, "opened", void 0);
circular_menu_component___decorate([
    circular_menu_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    circular_menu_component___metadata("design:type", Object)
], CircularMenuComponent.prototype, "items", void 0);
CircularMenuComponent = circular_menu_component___decorate([
    circular_menu_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'circular-menu',template:/*ion-inline-start:"/home/theocrite/work/ionic2/SpeedBooking/src/app/circular-menu/ts/circular-menu.component.html"*/'<div class="circular-menu">\n  <div class="menu-button neutreBackground" (click)="open()">\n	  <div *ngIf="!opened">+</div>  \n	  <div *ngIf="opened">-</div>  \n  </div>\n  <div class="circle" [ngClass]="{\'open\':opened}">\n	<div *ngFor="let item of items; let $index = index;">\n		<button [style.top]="posItems[$index].top" [style.left]="posItems[$index].left" class="oneLink secondary{{$index}}Background primary{{$index}}Color" (click)="launchEvent(undefined,item.event)"><ion-icon name="{{item.icon}}"></ion-icon></button>\n	</div>\n  </div>\n</div>\n'/*ion-inline-end:"/home/theocrite/work/ionic2/SpeedBooking/src/app/circular-menu/ts/circular-menu.component.html"*/,
    }),
    circular_menu_component___metadata("design:paramtypes", [circular_menu_component___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]])
], CircularMenuComponent);

//# sourceMappingURL=circular-menu.component.js.map
// CONCATENATED MODULE: ./src/app/pin/ts/pin.component.ts
/* harmony import */ var pin_component___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var pin_component___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var pin_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var pin_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PinComponent = (function () {
    function PinComponent(events) {
        this.events = events;
    }
    PinComponent.prototype.open = function () {
        this.opened = !this.opened;
        this.init();
    };
    PinComponent.prototype.launchEvent = function ($data, event) {
        this.events.publish(event, $data);
    };
    PinComponent.prototype.init = function () {
        this.posItems = [];
        for (var i = 0, l = this.items.length; i < l; i++) {
            var tmp = {};
            tmp.lef = (50 - 35 * Math.cos(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4);
            tmp.left = tmp.lef + '%';
            tmp.to = (50 + 35 * Math.sin(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4);
            tmp.top = tmp.to + '%';
            this.posItems.push(tmp);
        }
    };
    PinComponent.prototype.ngOnInit = function () {
        this.init();
    };
    return PinComponent;
}());
pin_component___decorate([
    pin_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    pin_component___metadata("design:type", Object)
], PinComponent.prototype, "opened", void 0);
pin_component___decorate([
    pin_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    pin_component___metadata("design:type", Object)
], PinComponent.prototype, "items", void 0);
PinComponent = pin_component___decorate([
    pin_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'pin',template:/*ion-inline-start:"/home/theocrite/work/ionic2/SpeedBooking/src/app/pin/ts/pin.component.html"*/'<div class="circular-menu">\n  <div class="menu-button" (click)="open()">\n	  <div *ngIf="!opened">+</div>  \n	  <div *ngIf="opened">-</div>  \n  </div>\n  <div class="circle" [ngClass]="{\'open\':opened}">\n	<div *ngFor="let item of items; let $index = index;">\n		<button [style.top]="posItems[$index].top" [style.left]="posItems[$index].left" class="oneLink" (click)="launchEvent(undefined,item.event)"><ion-icon name="{{item.icon}}"></ion-icon></button>\n	</div>\n  </div>\n</div>\n'/*ion-inline-end:"/home/theocrite/work/ionic2/SpeedBooking/src/app/pin/ts/pin.component.html"*/,
    }),
    pin_component___metadata("design:paramtypes", [pin_component___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]])
], PinComponent);

//# sourceMappingURL=pin.component.js.map
// CONCATENATED MODULE: ./src/app/card-map/ts/card-map.component.ts
/* harmony import */ var card_map_component___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var card_map_component___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var card_map_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var card_map_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CardMapComponent = (function () {
    function CardMapComponent(events) {
        this.events = events;
        this.selected = 0;
    }
    CardMapComponent.prototype.init = function (nbCard) {
        this.tours = new Array(nbCard);
        this.tours.fill({});
    };
    CardMapComponent.prototype.launchEvent = function ($data) {
        this.selected = $data;
        this.events.publish('runViewed', $data);
    };
    CardMapComponent.prototype.ngOnInit = function () {
        this.init(this.leng);
    };
    return CardMapComponent;
}());
card_map_component___decorate([
    card_map_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    card_map_component___metadata("design:type", Object)
], CardMapComponent.prototype, "leng", void 0);
card_map_component___decorate([
    card_map_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    card_map_component___metadata("design:type", Object)
], CardMapComponent.prototype, "active", void 0);
CardMapComponent = card_map_component___decorate([
    card_map_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'card-map',template:/*ion-inline-start:"/home/theocrite/work/ionic2/SpeedBooking/src/app/card-map/ts/card-map.component.html"*/'<button ion-button *ngFor="let tour of tours; let $index = index;" (click)="this.launchEvent($index)" class="oneCard secondary0Color primary0Background" [ngClass]="{\'disabled\' : ($index < active), \'selectCard secondary0Background primary1Color\' : (selected == $index)}">\n	{{$index}}\n</button>\n<div class="clear"></div>\n'/*ion-inline-end:"/home/theocrite/work/ionic2/SpeedBooking/src/app/card-map/ts/card-map.component.html"*/,
    }),
    card_map_component___metadata("design:paramtypes", [card_map_component___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]])
], CardMapComponent);

//# sourceMappingURL=card-map.component.js.map
// CONCATENATED MODULE: ./src/app/circular-table/ts/circular-table.component.ts
/* harmony import */ var circular_table_component___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var circular_table_component___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var circular_table_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var circular_table_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CircularTableComponent = (function () {
    function CircularTableComponent(events) {
        this.events = events;
    }
    CircularTableComponent.prototype.init = function () {
        this.posItems = [];
        for (var i = 0, l = this.persons.length; i < l; i++) {
            var tmp = {};
            if (i != 3)
                tmp.lef = (32 * Math.cos(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI) + 32).toFixed(0);
            else
                tmp.lef = (32 * Math.cos(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI) + 42).toFixed(0);
            tmp.left = tmp.lef + '%';
            tmp.to = (30 * Math.sin(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI) + 30).toFixed(0);
            if (tmp.to == 80 || (tmp.to > 40 && tmp.to < 60))
                tmp.to = 60;
            tmp.top = tmp.to + '%';
            if (i == 0) {
                this.mainTop = 'calc(' + (tmp.to) + '% + 60px)';
                this.mainLeft = 'calc(' + (tmp.lef) + '% + 14px)';
            }
            this.posItems.push(tmp);
        }
    };
    CircularTableComponent.prototype.setMyStyles = function (index) {
        var styles = {
            'top': this.mainTop,
            'left': this.mainLeft
        };
        return styles;
    };
    CircularTableComponent.prototype.ngOnInit = function () {
        this.init();
    };
    return CircularTableComponent;
}());
circular_table_component___decorate([
    circular_table_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    circular_table_component___metadata("design:type", Object)
], CircularTableComponent.prototype, "persons", void 0);
circular_table_component___decorate([
    circular_table_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    circular_table_component___metadata("design:type", Object)
], CircularTableComponent.prototype, "label", void 0);
CircularTableComponent = circular_table_component___decorate([
    circular_table_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'circular-table',template:/*ion-inline-start:"/home/theocrite/work/ionic2/SpeedBooking/src/app/circular-table/ts/circular-table.component.html"*/'<div class="circular-table">\n  <div [ngStyle]="setMyStyles()" [style.top]="mainTop" [style.left]="mainLeft" class="menuButton primary2Color secondary2Background">{{label}}</div>\n  <div class="tableCircle open">\n	<div *ngFor="let person of persons; let $index = index;" class="primary1Color secondary1Background">\n		<div *ngIf="person != undefined" [style.top]="posItems[$index].top" [style.left]="posItems[$index].left" class="onePerson">{{person.author}}</div>\n	</div>\n  </div>\n</div>\n'/*ion-inline-end:"/home/theocrite/work/ionic2/SpeedBooking/src/app/circular-table/ts/circular-table.component.html"*/,
    }),
    circular_table_component___metadata("design:paramtypes", [circular_table_component___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]])
], CircularTableComponent);

//# sourceMappingURL=circular-table.component.js.map
// CONCATENATED MODULE: ./src/app/app.module.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_dragula__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_dragula___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_dragula__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_audio__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_ble__ = __webpack_require__(70);
var app_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = app_module___decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"]({
        declarations: [
            app_component_MyApp,
            run_component_RunComponent,
            ProgressTimeComponent,
            PinComponent,
            CircularMenuComponent,
            CircularTableComponent,
            CardMapComponent,
            home_HomePage,
            UserPage,
            admin_AdminPage,
            ProfilePage,
            VotePage,
            ResultatPage,
            SessionCreateModalPage_SessionCreateModalPage
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ng2_dragula__["DragulaModule"],
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicModule */].forRoot(app_component_MyApp)
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            app_component_MyApp,
            home_HomePage,
            admin_AdminPage,
            ProfilePage,
            VotePage,
            UserPage,
            ResultatPage,
            SessionCreateModalPage_SessionCreateModalPage
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_audio__["a" /* NativeAudio */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_ble__["a" /* BLE */],
            { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map
// CONCATENATED MODULE: ./src/app/main.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);



__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"]();
__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */]().bootstrapModule(AppModule);
//# sourceMappingURL=main.js.map

/***/ })

},[95]);
//# sourceMappingURL=main.js.map