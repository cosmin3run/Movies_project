import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Film } from '../models/film';
import { Auth } from '../auth/auth';
import { Preferiti } from '../models/preferiti';

@Injectable({
  providedIn: 'root',
})
export class ImdbService {
  apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}
  recupera() {
    return this.http.get<Film[]>(`${this.apiURL}/movies-popular`);
  }

  recuperaPreferiti() {
    return this.http.get<Preferiti[]>(`${this.apiURL}/favorites`);
  }

  addPreferiti(
    movieId: number,
    title: string,
    overview: string,
    yt_link: string,
    poster_path: string,
    release_date: string,
    userId: number
  ) {
    const preferiti: Preferiti = {
      movieId: movieId,
      title: title,
      userId: userId,
      overview: overview,
      yt_link: yt_link,
      poster_path: poster_path,
      release_date: release_date,
    };
    console.log(preferiti);

    return this.http.post<Preferiti>(`${this.apiURL}/favorites`, preferiti);
  }

  getUserId(): number {
    const user = localStorage.getItem('user');
    if (user) {
      const userData: Auth = JSON.parse(user);
      return userData.user.id;
    }
    return 0;
  }
  getUserInfo(): Auth | null {
    const user = localStorage.getItem('user');
    if (user) {
      const userInfo: Auth = JSON.parse(user);
      return userInfo;
    }
    return null;
  }
  removeFavorite(id: number) {
    return this.http.delete<Preferiti>(`${this.apiURL}/favorites/${id}`);
  }
}
