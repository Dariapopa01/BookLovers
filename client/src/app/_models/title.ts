import { BookPhoto } from "./bookPhoto";
import { Genres } from "./genres";
import { Book } from "./book";


export class Title implements Book{
  rating: number;
  photoUrlB: string;
  id: number;
  title: string;
  author: string;
  aboutAuthor:string;
  description: string;
  genreId: number;
  genre: string;
  review: string;
  photoUrl: string;
  bphotos: BookPhoto[];
}
