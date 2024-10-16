import { LivrosResultado, Item } from './../models/interfaces';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private readonly API_Livro = 'https://www.googleapis.com/books/v1/volumes'
  constructor(private http: HttpClient) { }

  buscar(valorDigitado: string): Observable<LivrosResultado>{
    const params = new HttpParams().append('q', valorDigitado);
    return this.http.get<LivrosResultado>(this.API_Livro, { params })
    .pipe(
      tap(returnAPI => console.log("Fluxo do TAP: ", returnAPI)),
      map(resultado => resultado || {totalItems: 0, items: [] }),
      tap(resultado => console.log("Fluxo após o MAP: ", resultado)),
      catchError((erro: HttpErrorResponse) => {
        console.error('Erro ao buscar livros:', erro);
        return of({totalItems: 0, items: []});
      })
    );
  }
}
