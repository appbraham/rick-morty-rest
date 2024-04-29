import { Component, Input } from '@angular/core';
import { StatusCharacterComponent } from '../status-character/status-character.component';
import { Character } from '../../interface/character.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-character',
  standalone: true,
  imports: [ CommonModule, StatusCharacterComponent],
  templateUrl: './card-character.component.html',
})
export class CardCharacterComponent {

  @Input({required : true})
  public character! : Character;

}
