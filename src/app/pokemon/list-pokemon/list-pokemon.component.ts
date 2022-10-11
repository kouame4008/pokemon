import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styles: [
  ]
})
export class ListPokemonComponent implements OnInit {
  pokemonList: Pokemon[];

  constructor(
    private pokemoneService: PokemonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pokemoneService.getPokemonList()
      .subscribe(pokemonList => this.pokemonList = pokemonList)
  }

  selectPokemon(pokemon: Pokemon) {
    this.router.navigate(['pokemons', pokemon.id]);
  }

}
