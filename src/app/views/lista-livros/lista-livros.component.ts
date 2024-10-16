import { FormControl } from '@angular/forms';
import { Book, Item, LivrosResultado, VolumeInfo, ImageLinks } from './../../models/interfaces';
import { Component, OnDestroy } from '@angular/core';
import { catchError, debounceTime, EMPTY, filter, map, Subscription, switchMap, tap, throwError } from 'rxjs';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
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
    filter((valorDigitado) => valorDigitado.length >= 2),
    tap(() => console.log("Fluxo inicial")),
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
    tap({
      next: (retornoAPI) => {
        this.livrosResultado = retornoAPI;
        this.quantidadeDeLivros = retornoAPI.totalItems ? retornoAPI.totalItems.toString() : '0';
      }
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