import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Pokemon } from './pokemon';

@Injectable()
export class PokemonService {

  constructor(
    private http: HttpClient
  ) { }

  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      tap(res => console.table(res)),
      catchError((err) => {
        console.table(err);
        return of([])
      })
    )
  }

  getPokemonById(pokemonId: number): Observable<Pokemon | undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap(res => console.table(res)),
      catchError((err) => {
        console.table(err);
        return of(undefined)
      })
    )
  }

  updatepokemon(pokemon: Pokemon): Observable<null> {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }

    return this.http.put(`api/pokemons`, pokemon, httpOptions).pipe(
      tap((res: any) => console.table(res)),
      catchError((err) => {
        console.table(err);
        return of(null)
      })
    )
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    }

    return this.http.post<Pokemon>(`api/pokemons`, pokemon, httpOptions).pipe(
      tap((res: any) => console.table(res)),
      catchError((err) => {
        console.table(err);
        return of()
      })
    )
  }

  deletePokemonById(pokemonId: number): Observable<null> {
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((res: any) => console.table(res)),
      catchError((err) => {
        console.table(err);
        return of()
      })
    )
  }

  getPokemonTypeLIst(): string[] {
    return ['Plante', 'feu', 'eau', 'Insect', 'normal', 'electrick', 'Poisson', 'Fee', 'Vol', 'Combat', 'Psy']
  }

  searchPokemonList(term: string): Observable<Pokemon[]> {
    if (term.length <= 1) {
      return of([])
    }
    return this.http.get<Pokemon[]>(`api/pokemons?name=${term}`).pipe(
      tap(res => console.table(res)),
      catchError((err) => {
        console.table(err);
        return of([])
      })
    )
  }

}
