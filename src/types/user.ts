export class User{
    readonly id: number; // the id of the user
    private name: string; // the pseudo of the user
    private rank: number; // the ranking of the user
    private title : string; // the title of the user
    private solve : number[]; // the array of the ids of challenges solvedd by the user
    private score: number;  // the number of point from the user
    private challenges: number[]; // the array of the ids of challenges created by the user
    public constructor(id : number = -1, name : string = "", rank : number = -1, title : string ="", solve : number[] = [], score :number = -1, challenges  : number[] = []){
        this.id = id;
        this.name = name;
        this.rank = rank;
        this.score = score;
        this.challenges = challenges;
        this.title = title;
        this.solve = solve;
    }
    // GETTERS
    public getId() : number {
        return this.id;
    }
    public getName() : string {
        return this.name;
    }
    public getRank() : number {
        return this.rank;
    }
    public getTitle() : string {
        return this.title;
    }
    public getSolve() : number[] {
        return this.solve;
    }
    public getScore() : number {
        return this.score;
    }
    public getChallenges() : number[] {
        return this.challenges;
    }
}