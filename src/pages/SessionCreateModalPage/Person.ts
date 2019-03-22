export class Person {
  alias: string = '';
  author: string = '';
  
  setAuthor(auth) {
	this.author = auth;
	return this;
  }
  
  constructor() {}
}
