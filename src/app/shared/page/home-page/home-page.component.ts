import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../../../character/interface/character.interface';
import { CharacterService } from '../../../character/service/character.service';
import { CardCharacterComponent } from '../../../character/component/card-character/card-character.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, CardCharacterComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {

  private service = inject(CharacterService);
  private listCharacter: Character[] = [];
  private currentPage: number = 1;
  private totalCharacter: number = 0;
  private nextPage: number = 0;

  ngOnInit(): void {
    this.getAllCharacter(this.currentPage);

  }

  get characters() {
    return this.listCharacter;
  }

  getAllCharacter(page: number){
    this.service.getAllCharacter(page).subscribe(({ results, info }) => {
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


}
