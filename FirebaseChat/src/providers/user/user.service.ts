import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireDatabase } from "angularfire2/database";
import { User } from '../../models/user.models';


@Injectable()
export class UserService {

  constructor(
    public db: AngularFireDatabase,
    public http: HttpClient
    ) {
    console.log('Hello UserProvider Provider');
  }

  create(user: User, uuid: string): Promise<void> {
    return this.db.object(`/users/${uuid}`)
      .set(user)
      .catch();
  }

}
