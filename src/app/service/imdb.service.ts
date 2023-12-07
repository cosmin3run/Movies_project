import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Film } from '../models/film';

@Injectable({
  providedIn: 'root'
})
export class ImdbService {

  apiURL = environment.apiURL

  constructor(private http: HttpClient) { }

  recupera() {
    return this.http.get<Film[]>(`${this.apiURL}/movies-popular`)
  }
}
