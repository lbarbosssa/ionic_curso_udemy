export class Movie {
   
    public id: number;
    //O id não está no contruct pois ele é gerado pelo SQlite
    
    constructor(
        public title: string
    ){}
}