import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ActivityVideoPage } from '../activity-video/activity-video.page';
import { ActivityService } from '../activity.service';
import { Activity } from '../types';

import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.page.html',
  styleUrls: ['./activity-detail.page.scss'],
})
export class ActivityDetailPage implements OnInit {
  activityDetail: Observable<Activity>;
  uid;

  constructor(
    private _toastController: ToastController,
    private _angularFireStore: AngularFirestore,
    private _angularFireAuth: AngularFireAuth,
    private _socialShare: SocialSharing,
    private _modalController: ModalController,
    activityService: ActivityService,
    activatedRoute: ActivatedRoute
    ) {
      const activityID = activatedRoute.snapshot.params["activityID"];
      this.activityDetail = activityService.getActivity(activityID);

      console.log(this._angularFireAuth.currentUser.then(user => {
        this.uid = user.uid;
      }));
    }

  ngOnInit() {
  }
  
  share() {
    this.activityDetail.subscribe((activity)=> {
      this._socialShare.share("Look Here", activity.name, "", activity.cropped);
    });
  }

  async openModal() {
    const videoModal = await this._modalController.create({
      component: ActivityVideoPage
    });

    return await this.activityDetail.subscribe((activity)=> {
      videoModal.componentProps = {
        videoURL: activity.video_url
      };

      return videoModal.present();
    });
  }

  addToFavorites() {
    this.activityDetail.subscribe(
      (activity)=> {
        this._angularFireStore
          .collection("favorites")
          .doc(this.uid)
          .collection("favorites", (ref)=> {
            return ref.where("id", "==", activity.id)
          })
          .get()
          .subscribe((doc)=> {
            if(doc.empty){
              this._angularFireStore
              .collection("favorites")
              .doc(this.uid)
              .collection("favorites")
              .add(activity)
              .then(()=> {
                const toast = this._toastController.create({
                  message: "Activity" + activity.name +"Added",
                  duration: 4000,
                  position: "top"
                });
                toast.then((toastMessage)=>{
                  toastMessage.present();
                });
              });
            }
          })
      }
    );
  }

}
