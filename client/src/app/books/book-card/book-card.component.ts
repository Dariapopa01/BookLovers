import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Title } from 'src/app/_models/title';
import { BooksService } from 'src/app/_services/books.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {
  @Input() titl: Title | undefined;
  @Input() title?:string;
  filter = false;

  constructor(private route: ActivatedRoute, private bookService: BooksService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  handleRating(rate: number){
    //alert(`The user selected ${rate}`);

  }
  registerToggle(){
    this.filter = !this.filter;
  }
  cancelRegisterMode(event: boolean){
    this.filter = event;
  }
addLike(titl: Title){
  this.bookService.addLike(titl.title).subscribe({
    next: () => this.toastr.success("You have added " + titl.title)
  })
}
addRead(titl: Title){
  this.bookService.addRead(titl.title).subscribe({
    next: () => this.toastr.success("You have added " + titl.title)
  })
}

addReading(){
  if(!this.title) return;
  this.bookService.addBook(this.title).subscribe({
    next: () => this.toastr.success("You liked book")
  })
}
}
