export class Movie {
   
    public id: string;
    //O id não está no contruct pois ele é gerado pelo SQlite
    
    constructor(
        public title: string
    ){}
}