import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Character, CharacterResponse } from '../interface/character.interface';
import { environment } from '../../../environments/environment';

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

}
