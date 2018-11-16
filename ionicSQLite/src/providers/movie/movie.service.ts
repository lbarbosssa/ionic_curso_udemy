import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { SqliteHelperService } from '../sqlite-helper/sqlite-helper.service';

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

          this.db.executeSql('CREATE TABLE IF NOT EXISTS movie (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT)', {})
            .then(success => console.log('Movie table created successfully!', success))
            .catch((error: Error) => console.log('Error creating movie table!', error));

          return this.db;

        });

    }
    return this.sqliteHelperService.getDb();
  }


}
