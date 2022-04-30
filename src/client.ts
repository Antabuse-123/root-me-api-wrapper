
import axios from 'axios';
import { User } from './types/user';
import { Challenge } from './types/challenge';


export class Client {
    readonly api_key: string; // The root me api key
    readonly api_url: string; 
    public constructor(api_key: string) {
        this.api_key = api_key;
        this.api_url = "https://api.www.root-me.org";
    }

    // Create a User object with his root me ID
    // Retrun a new user with default values if an error occured
    public async getUser(id : number): Promise<User> {
        let user = axios.get(
            `${this.api_url}/auteurs/${id}`,
            {
                headers : {
                    cookie : `api_key=${this.api_key}`
                }
            }
        ).then(
            async (response) =>{
                if(response.status !== 200){
                   throw new Error("Error while getting the user make sur that your api_key is correct");
                }
                // the response is automatically converted to a json object
                let user = response.data
                let solved : number[] = [];
                if(user.validations !== []){
                    for(let i : number = 0; user.validations[i] !== undefined; i++){
                        solved.push(parseInt(user.validations[i].id_challenge));
                    }
                }
                //// Gather the list of challenges created by the user
                let created : number[] = []
                if(user.challenges !== []){
                    for(let i : number = 0; user.challenges[i] !== undefined; i++){
                        created.push(parseInt(user.challenges[i].id_challenge));
                    }
                }    
                return new User(
                        id,
                        user.nom,
                        user.position,
                        user.rang,
                        solved,
                        parseInt(user.score),
                        created
                        )
                
            },
            (err) => {
                return new User();
            }
        )
        return user;
        
    }

    // Returns an array with the name and id of the first 50 user of the request
    public async getUserByName(name : string): Promise<any[][]> {
        let users = axios.get(
            `${this.api_url}/auteurs?nom=${name}`,
            {
                headers : {
                    cookie : `api_key=${this.api_key}`
                }
            }
        ).then(
            async (response) =>{
                if(response.status !== 200){
                    throw new Error("Error while getting the user make sur that your api_key is correct");
                }
                const resp = response.data[0];
                let array = [];
                if(resp === undefined) return [];
                for(let i : number = 0; resp[i] !== undefined; i++){
                    array.push([parseInt(resp[i].id_auteur), resp[i].nom])
                }
                return array;
            },
            (err) => {
                return [];
            }
        )
        return users;
    }

    // Get a challenges with the given id
    public async getChallenge(id : number) : Promise<Challenge> {
        let challenge = axios.get(
            `${this.api_url}/challenges/${id}`,
            {
                headers : {
                    cookie : `api_key=${this.api_key}`
                }
            })
            .then(
                (response) => {
                    if(response.status !== 200){
                        throw new Error("Error while getting the user make sur that your api_key is correct");
                    }
                    let challenge = response.data;
                    let auth : string[] = [];
                    let auth_id : number[] = [];
                    let authors = challenge[0].auteurs;
                    // Gather the information about the authors
                    for (let i : number = 0; authors[i] !== undefined; i++) {
                        auth.push(authors[i].nom)
                        auth_id.push(parseInt(authors[i].id_auteur))
                    }
                    return new Challenge(
                        id,
                        challenge[0].titre,
                        challenge[0].soustitre,
                        parseInt(challenge[0].score),
                        auth,
                        challenge[0].date_publication,
                        challenge[0].rubrique,
                        challenge[0].difficulte,
                        auth_id
                        );
                                
                },
                (err) => {
                    return new Challenge();
                }
            )
            return challenge;
    }

    public async getChallengeByName(name : string) : Promise<Challenge[]> {
        let challenge = axios.get(
            `${this.api_url}/challenges?titre=${name}`,
            {
                headers : {
                    cookie : `api_key=${this.api_key}`
                }
            })
            .then(
                async (response) => {
                    if(response.status !== 200){
                        throw new Error("Error while getting the user make sur that your api_key is correct");
                    }
                    let challenge = response.data[0];
                    if(challenge === undefined){
                        return [];
                    }
                    let challenges : Challenge[] = []
                    for(let i : number = 0; challenge[i] !== undefined; i++){
                        challenges.push(await this.getChallenge(parseInt(challenge[i].id_challenge)));
                    }
                    return challenges;   
                },
                (err) => {
                    return [];
                }
            )
            return challenge;
    }

    public async getAllChallengesId() : Promise<number[]> {
        let challenges_id : number[] = [];
        let end : boolean = false;
        let  i : number = 0;
        while(!end){
            challenges_id.concat(await axios.get(
                `${this.api_url}/challenges/?debut_challenges=${i}`,
                {
                    headers : {
                        cookie : `api_key=${this.api_key}`
                    }
                })
                .then(
                    async (response) => {
                        if(response.status !== 200){
                            throw new Error("Error while getting the user make sur that your api_key is correct");
                        }
                        let challenges = response.data[0];
                        end = response.data.length === 2 && i >0;
                        for(let i : number = 0; challenges[i] !== undefined; i++){
                            challenges_id.push(parseInt(challenges[i].id_challenge));
                        }
                        
                        return challenges_id;
                    })
                    
            )
            i += 50;
            await new Promise(f => setTimeout(f, 200));
        }
        return challenges_id;
    }
}
