import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonServicesService {
  constructor(private  http: HttpClient) {
  }

  getPokemonList(url) {
    return this.http.get(url);
  }

}
