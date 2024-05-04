import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Episode, EpisodeResponse } from '../interface/episode.interface';
import { Character } from '../../character/interface/character.interface';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

  private baseUrl = environment.baseUrl;
  private http = inject(HttpClient);

  getMultipleEpisodes( ids: number[]):Observable<Episode[]>{
    return this.http.get<Episode[]>(`${this.baseUrl}/episode/${ids}`);
  }

}
