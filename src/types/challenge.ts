export class Challenge {
    private id : number; // The is of the challenge
    private title: string; // Name of the challenge
    private description: string; // Quick description of the challenge
    private points: number; // Points given to the user for solving the challenge
    private authors : string[]; // Authors of the challenge
    private authors_id : number[]; // Author's id of the authors of the challenge
    private date : string; // Date of creation of the challenge
    private category : string; // Category of the challenge
    private difficulty : string; // Difficulty of the challenge
    public constructor(
        id : number = -1, title : string = "", description : string = "", points : number = -1, authors : string[] = [],
        date : string = "", category : string = "", difficulty : string = "", authors_id : number[] = []
    ) {
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

    /**
     * get the challenge's id
     * @returns number
     */

    public getId() : number {
        return this.id;
    }

    /**
     * get the challenge's title
     * @returns string
     */

    public getTitle() : string {
        return this.title;
    }

    /**
     * get the challenge's description
     * @returns string
     */

    public getDescription() : string {
        return this.description;
    }

    /**
     * get the challenge's points
     * @returns number
     */

    public getPoints() : number {
        return this.points;
    }

    /**
     * get the challenge's authors names
     * @returns string[]
     */

    public getAuthors() : string[] {
        return this.authors;
    }

    /**
     * get the challenge's release date
     * @returns string
     */

    public getDate() : string {
        return this.date;
    }

    /**
     * get the challenge's category
     * @returns string
     */

    public getCategory() : string {
        return this.category;
    }

    /**
     * ge the challenge's difficulty
     * @returns string
     */

    public getDifficulty() : string {
        return this.difficulty;
    }

    /**
     * get the challenge's authors id
     * @returns number[]
     */

    public getAuthorsId() : number[] {
        return this.authors_id;
    }
}