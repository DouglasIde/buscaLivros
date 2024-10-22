import { FormControl } from '@angular/forms';
import { Book, Item, LivrosResultado, VolumeInfo, ImageLinks } from './../../models/interfaces';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, filter, map, of, Subscription, switchMap, tap, throwError } from 'rxjs';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy{

  campoBusca = new FormControl();
  mensagemErro = '';
  livrosResultado: LivrosResultado;
  quantidadeDeLivros: string = '';
  subscription: Subscription;

  constructor(private service: LivroService) { }

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    filter((valorDigitado) => valorDigitado.length >= 2),
    tap(() => console.log("Fluxo inicial")),
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
    tap({
      next: (retornoAPI) => {
        this.livrosResultado = retornoAPI;
        this.quantidadeDeLivros = retornoAPI.totalItems ? retornoAPI.totalItems.toString() : '0';
      },
      error: (error) => console.error(error)
    }),
    catchError(() => {
      this.mensagemErro = 'Erro ao buscar livros. Tente novamente mais tarde.';
      return of({ totalItems: 0, items: [] });
    })
  );
  
  livrosResultadoParaLivros(items): Book[]{
    return items.map(item => {
      const VolumeInfo = item.volumeInfo;
      return {
        title: VolumeInfo.title,
        authors: VolumeInfo.authors ? VolumeInfo.authors.map(author => author.toString()) : [],
        publisher: VolumeInfo.publisher ? VolumeInfo.publisher.toString() : '',
        publishedDate: VolumeInfo.publishedDate instanceof Date ? VolumeInfo.publishedDate.toString() : VolumeInfo.publishedDate,
        description: VolumeInfo.description,
        pageCount: VolumeInfo.pageCount,
        categories: VolumeInfo.categories ? VolumeInfo.categories.map(category => category.toString()) : [],
        averageRating: VolumeInfo.averageRating,
        imageLinks: VolumeInfo.imageLinks && VolumeInfo.ImageLinks.thumbnail ? {thumbnail: VolumeInfo.imageLinks.thumbnail.toString()} : undefined
      } as Book;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}