export interface body{
    Email:string,
    password: string
}
export interface response{
    success:boolean,
    message:string,
    data?: {}
    error?:{}
}

export interface movieType{
    backdrop_path :String,
    title : String,
    overview : String,
    poster_path :String,
    original_language : String,
    release_date: String,
    video :string,
    favourite :Boolean
    type :String
}