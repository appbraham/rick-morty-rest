import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StatusCharacterComponent } from '../status-character/status-character.component';
import { Character } from '../../interface/character.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-character',
  standalone: true,
  imports: [ CommonModule, RouterLink, StatusCharacterComponent],
  templateUrl: './card-character.component.html',
})
export class CardCharacterComponent implements OnInit{

  @Input({required : true})
  public character! : Character;

  @Output()
  loadCharacters = new EventEmitter<number>();

  ngOnInit(): void {
    this.loadCharacters.emit(this.character.id);
  }

}
