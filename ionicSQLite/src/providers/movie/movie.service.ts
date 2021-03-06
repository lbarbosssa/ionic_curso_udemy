import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { SqliteHelperService } from '../sqlite-helper/sqlite-helper.service';
import { Movie } from '../../models/movie.model';

@Injectable()
export class MovieService {

  private db: SQLiteObject;
  private isFirstCall: boolean = true;

  constructor(
    public sqliteHelperService: SqliteHelperService
  ) { }

  private getDb(): Promise<SQLiteObject> {
    if (this.isFirstCall) {

      this.isFirstCall = false;

      return this.sqliteHelperService.getDb('dynamicbox.db')
        .then((db: SQLiteObject) => {

          this.db = db;

          //this.db.executeSql('CREATE TABLE IF NOT EXISTS movie (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT)', {})
          this.db.executeSql('CREATE TABLE IF NOT EXISTS movie (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT)')
            .then(success => console.log('Movie table created successfully!', success))
            .catch((error: Error) => console.log('Error creating movie table!', error));

          return this.db;

        });

    }
    return this.sqliteHelperService.getDb();
  }

  getAll(orderBy?: string): Promise<Movie[]>{
    return this.getDb()
      .then((db: SQLiteObject) => {

        //return <Promise<Movie[]>>this.db.executeSql(`SELECT * FROM ORDER BY id ${order || 'DESC'}`, {})
        return <Promise<Movie[]>>this.db.executeSql(`SELECT * FROM ORDER BY id ${orderBy || 'DESC'}`)
          .then(resultSet => {
            let list: Movie[] = [];

            for (let i = 0; i < resultSet.rows.length; i++){
              list.push(resultSet.rows.item(i));
            }

            return list;
          }).catch((error: Error) => console.log('Error executing method getAll!', error));
    
    });
  }

  create(movie: Movie): Promise<Movie>{
    return this.db.executeSql('INSERT INTO movie (title) values (?)' [movie.title])
      .then(resultSet => {
        movie.id = resultSet.insertId;
        return movie;
      }).catch((error: Error) => { let errorMsg: string = '...'; console.log(errorMsg); return Promise.reject(errorMsg); });
  }

  update(movie: Movie): Promise<boolean>{
    return this.db.executeSql('UPDATE movie set title=? where id =?' [movie.title, movie.id])
      .then(resultSet => resultSet.rowsAffected >= 0 )
      .catch((error: Error) => { return Promise.reject(error); });
  }

  delete(id: number): Promise<boolean>{
    return this.db.executeSql('DELETE FROM movie WHERE id=?', [id])
    .then(resultSet => resultSet.rowsAffected > 0)
    .catch((error: Error) => { return Promise.reject(error); });
  }

  getById(id: number): Promise<Movie> {
    return this.db.executeSql('SELECT * FROM movie WHERE id=?', [id])
      .then(resultSet => resultSet.rows.item(0))
      .catch((error: Error) => console.log(`Error fetching movie with id ${id}`, error));
  }

}
