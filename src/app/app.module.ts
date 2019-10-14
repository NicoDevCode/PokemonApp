import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import {AppCatchpokemonModule} from './components/Module-Catch-Pokemon/app.catchpokemon.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppCatchpokemonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
