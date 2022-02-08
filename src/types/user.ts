import {Challenge} from './challenge.js';

export class User{
    private id: number; // the id of the user
    private name: string; // the pseudo of the user
    private rank: number; // the ranking of the user
    private title : string; // the title of the user
    private solve : Challenge[]; // the list of solved challenges
    private score: number;  // the number of point from the user
    private challenges: Challenge[]; // the challenges created by the user
    public constructor(id : number = -1, name : string = "", rank : number = -1, title : string ="", solve : Challenge[] = [], score :number = -1, challenges  : Challenge[] = []){
        this.id = id;
        this.name = name;
        this.rank = rank;
        this.score = score;
        this.challenges = challenges;
        this.title = title;
        this.solve = solve;
    }
}