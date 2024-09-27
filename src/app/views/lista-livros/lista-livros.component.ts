import { Item } from './../../models/interfaces';
import { Component, OnDestroy } from '@angular/core';
import { publish, Subscription } from 'rxjs';
import { Book } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy{

  listaLivros: Book[];
  campoBusca = '';
  subscription: Subscription;
  livro: Book;

  constructor(private service: LivroService) { }

  buscarLivros(){
    this.subscription = this.service.buscar(this.campoBusca).subscribe({
      next: (items) => {
        this.listaLivros = this.livrosResultadoParaLivros(items);
      },
      error: erro => console.error(erro)
    })
  }

  livrosResultadoParaLivros(items): Book[]{
    const livros: Book[] = [];

    items.forEach(item => {
      livros.push(this.livro = {
        title: item.volumeInfo?.title,
        authors: item.volumeInfo?.authors,
        publisher: item.volumeInfo?.publisher,
        publishedDate: item.volumeInfo?.publishedDate,
        description: item.volumeInfo?.description,
        previewLink: item.volumeInfo?.previewLink,
        thumbnail: item.volumeInfo?.imageLinks?.thumbnail
    })
  });

    return livros;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}



