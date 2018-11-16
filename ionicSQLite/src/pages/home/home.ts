import { Component } from '@angular/core';
import { NavController, AlertController, ItemSliding, AlertOptions, Loading, LoadingController } from 'ionic-angular';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../providers/movie/movie.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  movies: Movie[] = [
    new Movie('Velozes e Furiosos'),
    new Movie('Busca Implacavel')

  ];

  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public movieService: MovieService,
    public navCtrl: NavController
    ) {}

    onSave(type: string, item?: ItemSliding, movie?: Movie ): void{
      let title: string = type.charAt(0).toUpperCase() + type.substr(1);
      this.showAlert({
        itemSliding: item,
        title: `${title} movie`,
        type: type,
        movie: movie
      });

    }

    private showAlert(options: {itemSliding?: ItemSliding, title: string, type: string, movie?: Movie}): void{
      let alertOptions: AlertOptions = {
        title: options.title,
        inputs: [
          {
            name: 'title',
            placeholder: 'Movie title'
          }
        ],
        buttons: [
          'Calcel',
          {
            text: 'Save',
            handler: (data) => {

              let Loading: Loading = this.showLoading(`Saving ${data.title} movie...`);
              let contextMovie: Movie;
              
              switch(options.type){
                case 'crete':
                  contextMovie = new Movie(data.title);
                  break;
                
                case 'update':
                  options.movie.title = data.title;
                  contextMovie = options.movie;
                  break;
              }

              this.movieService[options.type](contextMovie)
                .then((result: any) => {
                  if(options.type === 'create') this.movies.unshift(result);
                  Loading.dismiss();
                  if (options.itemSliding) options.itemSliding.close();
                });
            }
          }
        ]
      };
      if (options.type === 'update'){
        alertOptions.inputs[0]['value'] = options.movie.title;
      }
      this.alertCtrl.create(alertOptions).present();
    }

    private showLoading(message?: string): Loading{
      let Loading: Loading = this.loadingCtrl.create({
        content: message || 'Please wait ...'
      });
        Loading.present();
        return Loading;

    }

}
