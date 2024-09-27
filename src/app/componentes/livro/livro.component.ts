import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css']
})
export class LivroComponent implements OnInit {

  @Input() livro: LivroVolumeInfo;
  modalAberto: boolean;

  ngOnInit(): void {
    if (typeof this.livro.publishedDate === 'string') {
      this.livro.publishedDate = new Date(this.livro.publishedDate);
    }
  }

  onModalChange(evento: boolean) {
    this.modalAberto = evento;
  }
}
