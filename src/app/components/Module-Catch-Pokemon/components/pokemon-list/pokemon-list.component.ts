import {Component, ElementRef, OnInit} from '@angular/core';
import {PokemonServicesService} from '../services/pokemon-services.service';
import {SnotifyService, SnotifyPosition} from 'ng-snotify';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.sass']
})
export class PokemonListComponent implements OnInit {
  chatched_list = false;
  types = null;
  forms = null;
  pokemons: any = [];
  pokemons_catched: any = [];
  next_url = null;
  prev_url = null;
  loading = false;
  catching_msg = '';
  private pokemon_api_url = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private service: PokemonServicesService,
              private snotifyService: SnotifyService,
              private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.getPokemons(this.pokemon_api_url);
    this.ngAfterViewIni();
  }

  ngAfterViewIni() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'rgb(195, 208, 161)';
  }

  getPokemons(url) {
    this.loading = true;
    this.service.getPokemonList(url).subscribe(
      (data) => {
        this.pokemons = data['results'];
        this.prev_url = data['previous'];
        this.next_url = data['next'];
        this.bindData();
      }
    );
  }

  async bindData() {
    for (const pokemon in this.pokemons) {
      const url = this.pokemons[pokemon]['url'];
      const response = await fetch(url);
      const pokemon_data = await response.json();
      const abilities = [];
      for (const ability in pokemon_data['abilities']) {
        abilities.push(pokemon_data['abilities'][ability]['ability']['name']);
      }
      const types = [];
      for (const type in pokemon_data['types']) {
        types.push(pokemon_data['types'][type]['type']['name']);
      }

      const pokemons_forms_url = pokemon_data['forms'][0]['url'];
      const pokemon_form_request = await fetch(pokemons_forms_url);
      const pokemon_form_response = await pokemon_form_request.json();
      const form_urls = [];
      for (const form_url in pokemon_form_response['sprites']) {
        form_urls.push(pokemon_form_response['sprites'][form_url]);
      }

      this.pokemons[pokemon] = {
        id: pokemon_data['id'],
        name: pokemon_data['name'],
        features: {
          abilities: abilities,
          base_experience: pokemon_data['base_experience'],
          forms: form_urls,
          types: types,
          weight: pokemon_data['weight'],
          height: pokemon_data['height']
        }
      };
      console.log(this.pokemons[pokemon]);
    }
    this.stopLoad();
  }

  goToNextPage() {
    this.getPokemons(this.next_url);
  }

  goToPreviousPage() {
    this.getPokemons(this.prev_url);
  }

  catchPokemon(index) {
    const can_catch = Math.round(Math.random());
    const name = this.pokemons[index]['name'];
    const id = this.pokemons[index]['id'];

    if (!this.pokemonExist(id)) {
      if (can_catch) {
        this.snotifyService.success(`congrafts for catch to ${name}`, 'Success', {
          timeout: 2000,
          showProgressBar: false,
          closeOnClick: true,
          position: SnotifyPosition.rightTop
        });
        this.pokemons_catched.push(this.pokemons[index]);
        console.log(this.pokemons[index]);
      } else {
        this.snotifyService.error(`can't catch to ${name}`, 'Try again!', {
          timeout: 2000,
          showProgressBar: false,
          closeOnClick: true,
          position: SnotifyPosition.rightTop
        });
      }
    } else {
      this.snotifyService.error(`That pokemon already exist in your pokebag`, 'Opss!', {
        timeout: 2000,
        showProgressBar: false,
        closeOnClick: true,
        position: SnotifyPosition.rightTop
      });
    }

    setTimeout(() => {
      this.catching_msg = null;
    }, 2000);
  }

  pokemonExist(id) {
    return this.pokemons_catched.find(pokemon => pokemon.id === id);
  }

  stopLoad() {
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  showCatched(show) {
    this.chatched_list = show;
  }

}
