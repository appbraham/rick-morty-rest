import { Component, Input } from '@angular/core';
import { Episode } from '../../interface/episode.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-episode',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './episode.component.html',
  styles: ``
})
export class EpisodeComponent {

  @Input()
  public episodes: Episode[] = [];

}
