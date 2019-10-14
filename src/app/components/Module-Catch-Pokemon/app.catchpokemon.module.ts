import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppPokemonComponent} from './app.catchpokemon';
import {AppPokemonRoutingModule} from './routing_catchpokemon';
import {PokemonListComponent} from './components/pokemon-list/pokemon-list.component';
import {PokemonServicesService} from './components/services/pokemon-services.service';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

@NgModule({
  declarations: [
    AppPokemonComponent,
    PokemonListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppPokemonRoutingModule,
    SnotifyModule
  ],
  exports: [

  ],
  providers: [
    PokemonServicesService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ],
  entryComponents: [],
  bootstrap: [AppPokemonComponent]
})
export class AppCatchpokemonModule {
}
