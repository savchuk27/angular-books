import { TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { Book } from './book';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  providers: [BookService]
})
export class AppComponent implements OnInit {
  @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate: TemplateRef<any> | undefined;
  @ViewChild('editTemplate', { static: false }) editTemplate: TemplateRef<any> | undefined;

  editedBook: Book | null = null;
  books: Array<Book>;
  isNewRecord: boolean = false;
  statusMessage: string = "";
  searchStr: string = "";

  constructor(private serv: BookService) {
    this.books = new Array<Book>();
  }

  ngOnInit() {
    this.loadBooks();
  }

  //loading books
  private loadBooks() {
    this.serv.getBooks().subscribe((data: Array<Book>) => {
      this.books = data;
    });
  }

  // adding a book
  addBook() {
    this.editedBook = new Book("", "", "", "");
    this.books.push(this.editedBook);
    this.isNewRecord = true;
  }

  // edit the book
  editBook(book: Book) {
    this.editedBook = new Book(book.id, book.title, book.description, book.pageCount);
  }

  // loading one of two templates
  loadTemplate(book: Book) {
    if (this.editedBook && this.editedBook.id === book.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  // saving the book
  saveBook() {
    if (this.isNewRecord) {
      // add a book
      this.serv.createBook(this.editedBook as Book).subscribe(data => {
        this.statusMessage = 'Data added successfully',
          this.loadBooks();
      });
      this.isNewRecord = false;
      this.editedBook = null;
    } else {
      // change the book
      this.serv.updateBook(this.editedBook as Book).subscribe(data => {
        this.statusMessage = 'Data updated successfully',
          this.loadBooks();
      });
      this.editedBook = null;
    }
  }

  // cancel editing
  cancel() {
    // if canceled when adding, delete the last entry
    if (this.isNewRecord) {
      this.books.pop();
      this.isNewRecord = false;
    }
    this.editedBook = null;
  }

  // deleting a book
  deleteBook(book: Book) {
    this.serv.deleteBook(book.id).subscribe(data => {
      this.statusMessage = 'Data deleted successfully',
        this.loadBooks();
    });
  }
}