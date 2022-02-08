
import got from 'got'
import { User } from './types/user.js';
import { Challenge } from './types/challenge.js';


export class Client {
    private api_key: string;
    private api_url: string;
    public constructor(api_key: string) {
        this.api_key = api_key;
        this.api_url = "https://api.www.root-me.org";
    }

    public async getUser(id : number): Promise<User> {
        let user = got.get(
            `${this.api_url}/auteurs/${id}`,
            {
                headers : {
                    cookie : `api_key=${this.api_key}`
                }
            }
        ).then(
            async (response) =>{
                if(response.statusCode != 200){
                    console.log("rate limited")
                    return new User();
                }
                let user = JSON.parse(response.body)
                let solved : Challenge[] = [];
                if(user.validations !== []){
                    for(let i : number = 0; user.validations[i] !== undefined; i++){
                        try{
                            let chall = await this.getChallenge(user.validations[i].id_challenge)
                            if(chall === new Challenge()){
                                console.error("rate limited")
                                return new User();
                            }
                            solved.push(chall)
                        }
                        catch (err){
                            console.error(err);
                        }
                        //await new Promise(f => setTimeout(f, 200));
                    }
                }
                let created : Challenge[] = []
                if(user.challenge !== []){
                    for(let i : number = 0; user.challenge[i] !== undefined; i++){
                        try{
                            let chall = await this.getChallenge(user.challenge[i].id_challenge);
                            if(chall === new Challenge()){
                                console.error("rate limited")
                                return new User();
                            }
                            created.push(chall)
                        }
                        catch (err){
                            console.error(err);
                        }
                        await new Promise(f => setTimeout(f, 200));
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
                console.error(err);
                return new User();
            }
        )
        return user;
        
    }

    public async getChallenge(id : number) : Promise<Challenge> {
        let challenge = got.get(
            `${this.api_url}/challenges/${id}`,
            {
                headers : {
                    cookie : `api_key=${this.api_key}`
                }
            })
            .then(
                (response) => {
                    if(response.statusCode != 200){
                        console.log("error")
                        return new Challenge()
                    }
                    let challenge = JSON.parse(response.body);
                    let auth : string[] = [];
                    let auth_id : number[] = [];
                    let authors = challenge[0].auteurs;
                    for (let i : number = 0; authors[i] !== undefined; i++) {
                        auth.push(authors[i].nom)
                        auth_id.push(parseInt(authors[i].id_auteur))
                    }
                    return new Challenge(
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
                    console.error(err);
                    return new Challenge();
                }
            )
            return challenge;
    }
}