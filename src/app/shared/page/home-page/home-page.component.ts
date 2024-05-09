import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../../../character/interface/character.interface';
import { CharacterService } from '../../../character/service/character.service';
import { CardCharacterComponent } from '../../../character/component/card-character/card-character.component';
import { LogoComponent } from '../../component/logo/logo.component';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, LogoComponent, CardCharacterComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {

  private characterService = inject(CharacterService);
  private listCharacter: Character[] = [];
  private currentPage: number = 1;
  private totalCharacter: number = 0;
  private nextPage: number = 0;

  searchCharacter = new FormControl();

  ngOnInit(): void {
    this.getAllCharacter(this.currentPage);

    this.searchCharacter.valueChanges.pipe(debounceTime(1000))
      .subscribe( (name) => {
        this.listCharacter = [];
        this.currentPage = 1;
        this.findCharacterByName(name);
      });
  }

  get characters() {
    return this.listCharacter;
  }

  getAllCharacter(page: number){
    this.characterService.getAllCharacter(page).subscribe(({ results, info }) => {
      this.totalCharacter = info.count;
      this.nextPage = parseInt(info.next.slice(-1));
      this.listCharacter = [...this.characters, ...results];
    });
  }

  loadCharacters(id: number){
    if( this.listCharacter.length < this.totalCharacter && this.listCharacter.at(-1)?.id === id ){
      this.getAllCharacter(this.nextPage);
    }
  }

  findCharacterByName(name :string){

    this.characterService.findCharacterByName(name)
      .subscribe( ({ results, info }) => {
        this.listCharacter = results;
        console.log(info.count);

      });
  }


}
