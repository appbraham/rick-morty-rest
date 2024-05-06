import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Character, CharacterResponse } from '../interface/character.interface';
import { environment } from '../../../environments/environment';
import { Episode } from '../../episode/interface/episode.interface';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private baseUrl:string = environment.baseUrl;
  private http = inject(HttpClient);

  getAllCharacter(page: number): Observable<CharacterResponse>{
    const params = new HttpParams().set('page', page);
    return this.http.get<CharacterResponse>(`${this.baseUrl}/character`, { params });
  }

  getSingleCharacter(id: number): Observable<Character>{
    return this.http.get<Character>(`${this.baseUrl}/character/${id}`);
  }

}
