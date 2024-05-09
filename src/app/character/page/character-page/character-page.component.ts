import { Component, Input, OnInit, inject } from '@angular/core';
import { Character } from '../../interface/character.interface';
import { CharacterService } from '../../service/character.service';
import { StatusCharacterComponent } from '../../component/status-character/status-character.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Episode } from '../../../episode/interface/episode.interface';
import { EpisodeService } from '../../../episode/service/Episode.service';
import { EpisodeComponent } from '../../../episode/component/episode/episode.component';

@Component({
  selector: 'app-character-page',
  standalone: true,
  imports: [CommonModule, RouterLink, StatusCharacterComponent, EpisodeComponent],
  templateUrl: './character-page.component.html',
  styles: ``
})
export class CharacterPageComponent implements OnInit {

  @Input()
  public id?: number; //param input route

  public character!: Character;
  private characterService = inject(CharacterService);
  private episodeService = inject(EpisodeService);
  public episodes: Episode[] = [];
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
      });
  }

  getEpisodes(ids: number[]) {
    if( ids.length === 1) {
      this.episodeService.getSingleEpisode(ids[0])
        .subscribe( episode => this.episodes.push(episode));
    }else{
      this.episodeService.getMultipleEpisodes(ids)
      .subscribe(episodes => this.episodes = episodes.reverse());
    }
  }

  getEpisodesByCharacter(character: Character, numberEpisodes: number = 10) {
    if (!character) throw new Error("Character doesn't exist");
    if (numberEpisodes <= 0) throw new Error("The number of episodes must be greater than zero");

    let lastEpisodes: string[] = [];

    if (character.episode.length <= numberEpisodes) {
      lastEpisodes = character.episode;
    } else {
      lastEpisodes = character.episode.slice(character.episode.length - numberEpisodes);
    }

    if (lastEpisodes.length === 1) {
      this.idsEpisodes.push(this.getIdEpisodeFromUrl(lastEpisodes[0]));
    } else {
      lastEpisodes.map(urlEpisode => {
        this.idsEpisodes.push(this.getIdEpisodeFromUrl(urlEpisode));
      });
    }
  }

  getIdEpisodeFromUrl(url: string): number {
    return parseInt(url.slice(url.lastIndexOf('/') + 1));
  }

}
