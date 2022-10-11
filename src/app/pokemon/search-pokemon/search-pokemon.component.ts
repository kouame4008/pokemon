import { Router } from '@angular/router';
import { PokemonService } from './../pokemon.service';
import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Subject, Observable, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styles: [
  ]
})
export class SearchPokemonComponent implements OnInit {
  searchTerms = new Subject<string>();
  pokemon$: Observable<Pokemon[]>

  constructor(
    private pokemonService: PokemonService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.pokemon$ = this.searchTerms.pipe (
      debounceTime (300),
      distinctUntilChanged (),
      switchMap ((term) => this.pokemonService.searchPokemonList (term))
    )
  }

  search (term : string) {
    this.searchTerms.next(term);
  }

  goToDetail (pokemon : Pokemon) {
    this.router.navigate ([`pokemons/${pokemon.id}`])
  }

}
