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
  modalAberto: boolean = false;

  ngOnInit(): void {
    if (this.livro.publishedDate instanceof Date) {
      this.livro.publishedDate = (this.livro.publishedDate as Date).toISOString();
    }
  }

  onModalChange(evento: boolean) {
    this.modalAberto = evento;
  }
}
