import { FormControl } from '@angular/forms';
import { Item } from './../../models/interfaces';
import { Component, OnDestroy } from '@angular/core';
import { map, publish, Subscription, switchMap } from 'rxjs';
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
  campoBusca = new FormControl();
  subscription: Subscription;
  livro: Book;

  constructor(private service: LivroService) { }

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
    map((items) => this.livrosResultadoParaLivros(items))
  );
  
  // buscarLivros(){
  //   this.subscription = this.service.buscar(this.campoBusca.value).subscribe({
  //     next: (items) => {
  //       console.log("Requisições ao servidor")
  //       this.listaLivros = this.livrosResultadoParaLivros(items);
  //     },
  //     error: erro => console.error(erro)
  //   })
  // }

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[]{
    return items.map(item => {
      return new LivroVolumeInfo(item);
    })
  };

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}



