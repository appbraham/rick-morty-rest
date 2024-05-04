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
  public id!: number; //param input route

  public character!: Character;
  private characterService = inject(CharacterService);
  // public episodes: Episode[] = [];

  ngOnInit(): void {
    this.getCharacter();
  }

  getCharacter() {

    return this.characterService.getSingleCharacter(this.id)
      .subscribe(character => this.character = character);
  }


  getEpisodesByCharacter(character: Character): Episode[] {
    if (!character) throw Error("Character doesn't exist");

    const idEpisodes: number[] = [];

    const lastEpisodes = character.episode.slice(character.episode.length - 10).reverse();

    lastEpisodes.map(urlEpisode => {
      const id = parseInt(urlEpisode.slice(urlEpisode.lastIndexOf('/') + 1));
      idEpisodes.push(id);
    });

    return this.getEpisodes(idEpisodes);

  }

  getEpisodes(ids: number[]): Episode[]{

    let episodes: Episode[] = [];

    this.characterService.getMultipleEpisodes(ids)
      .subscribe( ( results ) => episodes = results );

    return episodes;
  }



}
