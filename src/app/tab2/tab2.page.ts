import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  favoriteActivityList: Observable<any>;
  uid;

  constructor(
    private _angularFireStore: AngularFirestore,
    private _angularFireAuth: AngularFireAuth,
  ) {
    console.log(this._angularFireAuth.currentUser.then(user => {
      this.uid = user.uid;
    })
    .then(()=> {
    this.favoriteActivityList = _angularFireStore
      .collection("favorites")
      .doc(this.uid)
      .collection("favorites")
      .valueChanges();
    }
    ));
  }

}
