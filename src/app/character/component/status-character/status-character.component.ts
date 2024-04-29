import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Status } from '../../interface/character.interface';

@Component({
  selector: 'app-status-character',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-character.component.html',
})
export class StatusCharacterComponent {

  @Input()
  public status!: string;

}
