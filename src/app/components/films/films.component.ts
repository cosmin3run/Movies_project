import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Film } from 'src/app/models/film';
import { ImdbService } from 'src/app/service/imdb.service';
import { Preferiti } from 'src/app/models/preferiti';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss'],
})
export class FilmsComponent implements OnInit {
  films!: Film[];
  userId: number = 0;
  apiURL = environment.apiURL;
  preferiti!: Preferiti[];

  constructor(
    private imdbSrv: ImdbService,
    private authSrv: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.authSrv.restore();

    this.userId = this.imdbSrv.getUserId();

    this.imdbSrv.recupera().subscribe((film: Film[]) => {
      this.films = film;
      this.userId = this.authSrv.userId() || 0;
    });

    this.http.get<Preferiti[]>(`${this.apiURL}/favorites`).subscribe((resp) => {
      let update: Preferiti[] = resp.filter(
        (film) => film.userId === this.userId
      );
      this.preferiti = update;
    });
  }

  isPreferiti(movieId: number): boolean {
    return (
      Array.isArray(this.preferiti) &&
      this.preferiti.some((movie) => movie.movieId === movieId)
    );
  }

  aggiungiRimovi(movieId: number) {
    if (this.isPreferiti(movieId)) {
      let val: any = this.preferiti.find((movie) => movie.movieId === movieId);
      if (val) {
        this.rimuoviPreferiti(val.id);
      }
    } else {
      this.aggPreferiti(movieId);
    }
  }

  rimuoviPreferiti(id: number) {
    this.imdbSrv.removeFavorite(id).subscribe(() => {
      this.getPrefe();
    });
  }

  aggPreferiti(movieId: number) {
    this.imdbSrv
      .addPreferiti(movieId, this.userId)
      .subscribe((preferiti: Preferiti) => {
        this.getPrefe();
      });
  }

  getPrefe() {
    this.imdbSrv.recuperaPreferiti().subscribe((preferiti: Preferiti[]) => {
      let userPrefe: Preferiti[] = preferiti.filter(
        (movie) => movie.userId === this.userId
      );
      this.preferiti = userPrefe;
    });
  }

  // aggiungiFavoriti(movie: Film, event: Event): void {
  //   const favorite: Preferiti = {
  //     movieId: movie.id,
  //     userId: this.userId,
  //   };

  //   this.http
  //     .post<Preferiti>(`${this.apiURL}/favorites`, favorite)
  //     .subscribe((response) => {
  //       console.log(response, 'Aggiunto');
  //     });

  //   let addBtn = event.currentTarget as HTMLButtonElement;
  //   addBtn.classList.toggle('text-danger');
  //   console.log(event.currentTarget);
  // }
}
