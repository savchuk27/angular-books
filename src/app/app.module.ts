import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';
import { AppComponent }   from './app.component';
import { SearchPipe } from './pipes/search.pipe';
import { SortDirective } from './directive/sort.directive';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
    ],
  declarations: [ 
    AppComponent,
    SearchPipe,
    SortDirective
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }