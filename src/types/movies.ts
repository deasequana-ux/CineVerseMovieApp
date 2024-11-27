export interface MovieStateProps {
    Movies :Movies[] | []
    Movie:Movie | null,
    MoviesLoading:boolean,
    MovieLoading:boolean,
    MoviesError:string,
    MovieError:string,
    Search:string,
    Type:string,
    Year:string,
    Page:number,
    TotalPage:number
}


export type Movies = {
    imdbID: string;
    Title: string;
    Year: string;
    Type: string;
    Poster: string;
}

export type Movie = {
    Poster:string,
    Title:string,
    Actors:string,
    Awards:string,
    Year:string,
    Plot:string,
    Genre:string,
    Director:string,
    Ratings:Rating[]
}

export type Rating = {
    Source:string,
    Value:String
}