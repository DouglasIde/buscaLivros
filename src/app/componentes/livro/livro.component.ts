import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css']
})
export class LivroComponent implements OnInit {

  @Input() livro: Book;
  modalAberto: boolean;

  ngOnInit(){
    console.log(this.livro);
  }

  onModalChange(evento: boolean) {
    this.modalAberto = evento;
  }
}
