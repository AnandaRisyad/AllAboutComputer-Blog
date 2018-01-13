export interface User {
    username:string,
    realname:string,
    email:string,
    phone:number
    dob:Date,
    joined:Date,
    about : {
        address:    string,
        image:  string,
        age:    number,
        likes:  number,
        followers:  string[],
        follows:    string[],
        posts:      number,
        bio:    string,
        website:    string,
        device : {
            pc:     string,
            phones: string
        },
        
        hobby:  string,
        programmer:     boolean,
        job:    string
    }
    
}