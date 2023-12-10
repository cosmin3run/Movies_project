import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Preferiti } from 'src/app/models/preferiti';
import { environment } from 'src/environments/environment';
import { ImdbService } from 'src/app/service/imdb.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userId: string | null = null;
  nome: string | null = null;
  cognome: string | null = null;
  email: string | null = null;
  apiURL = environment.apiURL;
  preferiti!: Preferiti[];
  safeUrl: any;

  id: number = 0;

  constructor(private http: HttpClient, private imdbSrv: ImdbService) {}

  ngOnInit(): void {
    this.id = this.imdbSrv.getUserId();
    this.http.get<Preferiti[]>(`${this.apiURL}/favorites`).subscribe((resp) => {
      let update: Preferiti[] = resp.filter((film) => film.userId === this.id);
      this.preferiti = update;
      if (this.preferiti.length === 0) {
        let noPref = document.getElementById('noPref') as HTMLParagraphElement;
        noPref.innerText = 'Non hai aggiunto nessun film nei preferiti';
      }
      console.log(this.preferiti[0].yt_link);
    });

    const user = localStorage.getItem('user');

    if (user) {
      const info = JSON.parse(user);
      const utente = info.user;

      this.userId = utente.id;
      this.nome = utente.nome;
      this.cognome = utente.cognome;
      this.email = utente.email;
    }
  }
}
