import {Pipe, PipeTransform} from '@angular/core';
import { Book } from '../book';

@Pipe({
  name: 'searchPosts'
})
export class SearchPipe implements PipeTransform{
  transform(books: Book[], search: ''): Book[] {
    if (!search.trim()){
      return books;
    }
    return books.filter(book => {
      return book.title.toLowerCase().includes(search.toLowerCase());
    });
  }

}
