import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  movies: Movie[] = [
    new Movie('Velozes e Furiosos'),
    new Movie('Busca Implacavel')

  ];

  constructor(public navCtrl: NavController) {

  }

}
