import { LivrosResultado, Item } from './../models/interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API_Livro = 'https://www.googleapis.com/books/v1/volumes'
  constructor(private http: HttpClient) { }

  buscar(valorDigitado: string): Observable<Item[]>{
    const params = new HttpParams().append('q', valorDigitado);
    return this.http.get<LivrosResultado>(this.API_Livro, { params })
    .pipe(
      tap((returnAPI => console.log("Fluxo do TAP: ", returnAPI))),
      map(resultado => resultado.items),
      tap(resultado => console.log("Fluxo após o MAP: ", resultado))
    );
  }
}
