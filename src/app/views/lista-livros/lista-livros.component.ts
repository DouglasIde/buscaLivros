import { FormControl } from '@angular/forms';
import { Item } from './../../models/interfaces';
import { Component } from '@angular/core';
import { catchError, debounceTime, EMPTY, filter, map, switchMap, tap, throwError } from 'rxjs';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  campoBusca = new FormControl();
  mensagemErro = '';

  constructor(private service: LivroService) { }

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(300),
    filter((valorDigitado) => valorDigitado.length >= 2),
    tap(() => console.log("Fluxo inicial")),
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
    tap((retornoAPI) => console.log(retornoAPI)),
    tap(() => console.log("Requisição ao servidor")),
    map((items) => this.livrosResultadoParaLivros(items)),
    catchError(() => {
      this.mensagemErro = 'Ops!! ocorreu um erro. Recarregue a página e tente novamente.'
      return EMPTY;
    }
  ));
  
  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[]{
    return items.map(item => {
      return new LivroVolumeInfo(item);
    })
  };
}