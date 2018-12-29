import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WfAppService {
  desk: Subject<any> = new Subject()
  stream$: Observable<any> = this.desk.asObservable()
  viewDesk(desk) {
    this.desk.next(desk);
  }
  constructor() { }

  //Declaring key that stores the floor plan into localstorage
  private storageKey = 'wf-floor-plan'

  storeCurrentFloorPlan(planObj) {
    localStorage.setItem(this.storageKey, JSON.stringify(planObj));
  }

  fetchCurrentFloorPlan() {
    return JSON.parse(localStorage.getItem(this.storageKey));
  }

  updateDesk(deskObj) {
    let floorPlan = this.fetchCurrentFloorPlan();
    floorPlan.deskList.map(el => {
      if (el.id === deskObj.id) {
        Object.assign(el,deskObj);
      }
    });

    this.storeCurrentFloorPlan(floorPlan);
  }
}
