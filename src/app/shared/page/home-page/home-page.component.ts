import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../../../character/interface/character.interface';
import { CharacterService } from '../../../character/service/character.service';
import { CardCharacterComponent } from '../../../character/component/card-character/card-character.component';
import { LogoComponent } from '../../component/logo/logo.component';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InfiniteScrollModule, LogoComponent, CardCharacterComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {

  private characterService = inject(CharacterService);
  private listCharacter: Character[] = [];
  private currentPage: number = 1;
  private nextPage: number = 0;

  searchCharacter = new FormControl();

  ngOnInit(): void {

    this.searchCharacter.valueChanges.pipe(debounceTime(1000))
    .subscribe( (name) => {
      this.listCharacter = [];
      this.findCharacterByName(name);
    });

    this.getAllCharacter(this.currentPage);
  }

  get characters() {
    return this.listCharacter;
  }

  getAllCharacter(page: number){
    this.characterService.getAllCharacter(page).subscribe(({ results, info }) => {
      this.nextPage = this.getCurrentPageByUrl(info.next);
      this.listCharacter = [...this.characters, ...results];
    });
  }

  onScroll(){
    this.getAllCharacter(this.nextPage);
  }

  findCharacterByName(name :string){

    this.characterService.findCharacterByName(name)
      .subscribe( ({ results, info }) => {
        this.listCharacter = results;
        console.log(info.count);
      });
  }

  getCurrentPageByUrl(url: string){
    const numberPage = parseInt(url.slice(url.lastIndexOf('=') + 1));
    return numberPage;
  }


}
