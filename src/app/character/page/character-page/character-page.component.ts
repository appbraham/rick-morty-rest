import { Component, Input, OnInit, inject } from '@angular/core';
import { Character } from '../../interface/character.interface';
import { CharacterService } from '../../service/character.service';
import { StatusCharacterComponent } from '../../component/status-character/status-character.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Episode } from '../../../episode/interface/episode.interface';

@Component({
  selector: 'app-character-page',
  standalone: true,
  imports: [CommonModule, RouterLink, StatusCharacterComponent],
  templateUrl: './character-page.component.html',
  styles: ``
})
export class CharacterPageComponent implements OnInit {

  @Input()
  public id?: number; //param input route

  public character!: Character;
  private characterService = inject(CharacterService);
  public episodes: Episode | Episode[] = [];
  public idsEpisodes: number[] = [];

  ngOnInit(): void {
    this.getCharacter();
  }

  getCharacter() {
    if (!this.id) throw new Error("Id doesn't exist");
    return this.characterService.getSingleCharacter(this.id)
      .subscribe(character => {
        this.character = character;
        this.getEpisodesByCharacter(character);
        this.getEpisodes(this.idsEpisodes);
        console.log(this.idsEpisodes);
      });
  }

  getEpisodes(ids: number[]) {
    this.characterService.getMultipleEpisodes(ids)
      .subscribe(episodes => this.episodes = episodes);
  }

  getEpisodesByCharacter(character: Character) {
    if (!character) throw new Error("Character doesn't exist");

    let lastEpisodes: string[] = [];

    if (character.episode.length <= 10) {
      lastEpisodes = character.episode.reverse();
    } else {
      lastEpisodes = character.episode.slice(character.episode.length - 10).reverse();
    }

    if (lastEpisodes.length === 1) {
      this.idsEpisodes.push( this.getIdEpisodeFromUrl(lastEpisodes[0]));
    } else {
      lastEpisodes.map(urlEpisode => {
        this.idsEpisodes.push(this.getIdEpisodeFromUrl(urlEpisode));
      });
    }
    console.log(this.idsEpisodes);
  }

  getIdEpisodeFromUrl(url: string): number{
    return parseInt(url.slice(url.lastIndexOf('/') + 1));
  }
}
