export interface Post {
    title:string,
    topic:string,
    date:Date,
    tag:string[],
    people:string[],
    content:{
        files:string[],
        image:string[],
        videos:string[],
        text:string
    }
}