import { Injectable } from '@angular/core';

@Injectable()
export class AuthorService {
	nextAuthor = 0;
	authors = ['austen', 
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
	
	next() {
		let tmp = this.nextAuthor;
		if (this.nextAuthor >= this.authors.length -1)
			this.nextAuthor = 0;
		else
			this.nextAuthor += 1;
		return this.authors[tmp];
	}
	
	setAuthorIndex(index) {
		this.nextAuthor = index;
	}
	
	previous() {
		this.nextAuthor -= 1;
	}

	getAll() {
		return this.authors;
	}
}
