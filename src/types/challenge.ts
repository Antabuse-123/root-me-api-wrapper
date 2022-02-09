export class Challenge {
    private title: string;
    private description: string;
    private points: number;
    private authors : string[];
    private authors_id : number[];
    private date : string;
    private category : string;
    private difficulty : string;
    public constructor(title : string = "", description : string = "", points : number = -1, authors : string[] = [], date : string = "", category : string = "", difficulty : string = "", authors_id : number[] = []) {
        this.title = title;
        this.description = description;
        this.points = points;
        this.authors = authors;
        this.date = date;
        this.category = category;
        this.difficulty = difficulty;
        this.authors_id = authors_id;
    }
}