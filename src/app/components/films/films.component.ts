import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film';
import { ImdbService } from 'src/app/service/imdb.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {

  films!: Film[]
  constructor(private imdbSrv: ImdbService) { }

  ngOnInit(): void {
    this.imdbSrv.recupera().subscribe((film: Film[]) => {
      this.films = film;
    })
  }

}
