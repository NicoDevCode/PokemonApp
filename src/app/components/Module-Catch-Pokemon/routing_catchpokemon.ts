import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppPokemonComponent} from './app.catchpokemon';
import {PokemonListComponent} from './components/pokemon-list/pokemon-list.component';

const AppCatchPokemonroutes: Routes = [
  {
    path: 'Modulo-Catch-Pokemon', component: AppPokemonComponent,
    children: [
      {path: '', redirectTo: 'pokemon_list', pathMatch: 'full' },
      {path: 'pokemon_list', component: PokemonListComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(AppCatchPokemonroutes)],
  exports: [RouterModule]
})
export class AppPokemonRoutingModule { }
