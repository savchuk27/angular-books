import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from './book';

@Injectable()
export class BookService {

  private url = "https://fakerestapi.azurewebsites.net/api/v1/Books";
  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get<Array<Book>>(this.url);
  }

  createBook(book: Book) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<Book>(this.url, JSON.stringify(book), { headers: myHeaders });
  }
  updateBook(book: Book) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put<Book>(this.url, JSON.stringify(book), { headers: myHeaders });
  }
  deleteBook(id: string) {
    return this.http.delete<Book>(this.url + '/' + id);
  }
}