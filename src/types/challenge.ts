export class Challenge {
    readonly id : number; // The is of the challenge
    readonly title: string; // Name of the challenge
    readonly description: string; // Quick description of the challenge
    readonly points: number; // Points given to the user for solving the challenge
    readonly authors : string[]; // Authors of the challenge
    readonly authors_id : number[]; // Author's id of the authors of the challenge
    readonly date : string; // Date of creation of the challenge
    readonly category : string; // Category of the challenge
    readonly difficulty : string; // Difficulty of the challenge
    public constructor(id : number = -1, title : string = "", description : string = "", points : number = -1, authors : string[] = [], date : string = "", category : string = "", difficulty : string = "", authors_id : number[] = []) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.points = points;
        this.authors = authors;
        this.date = date;
        this.category = category;
        this.difficulty = difficulty;
        this.authors_id = authors_id;
    }
    // GETTERS
    public getId() : number {
        return this.id;
    }

    public getTitle() : string {
        return this.title;
    }

    public getDescription() : string {
        return this.description;
    }

    public getPoints() : number {
        return this.points;
    }

    public getAuthors() : string[] {
        return this.authors;
    }

    public getDate() : string {
        return this.date;
    }

    public getCategory() : string {
        return this.category;
    }

    public getDifficulty() : string {
        return this.difficulty;
    }

    public getAuthorsId() : number[] {
        return this.authors_id;
    }
}