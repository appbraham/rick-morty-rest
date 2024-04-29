import { Component, OnInit, inject } from '@angular/core';
import { CardCharacterComponent } from '../../../character/component/card-character/card-character.component';
import { CommonModule } from '@angular/common';
import { Character } from '../../../character/interface/character.interface';
import { CharacterService } from '../../../character/service/character.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, CardCharacterComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {

  private service = inject(CharacterService);
  private listCharacter: Character[] = [];

  ngOnInit(): void {
    this.service.getAllCharacter().subscribe(({ results }) => this.listCharacter = results);
  }

  get characters() {
    return this.listCharacter;
  }


}
