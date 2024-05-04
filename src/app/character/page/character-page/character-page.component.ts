import { Component, Input, OnInit, inject } from '@angular/core';
import { Character } from '../../interface/character.interface';
import { CharacterService } from '../../service/character.service';
import { StatusCharacterComponent } from '../../component/status-character/status-character.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-character-page',
  standalone: true,
  imports: [ CommonModule, RouterLink, StatusCharacterComponent],
  templateUrl: './character-page.component.html',
  styles: ``
})
export class CharacterPageComponent implements OnInit{

  @Input()
  public id! : number;
  public character!:Character;
  private characterService = inject(CharacterService);

  ngOnInit(): void {
    this.getCharacter();
  }

  getCharacter(){
    return this.characterService.getSingleCharacter(this.id)
      .subscribe( character => this.character = character );
  }



}
