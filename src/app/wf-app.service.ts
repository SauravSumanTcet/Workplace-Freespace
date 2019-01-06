import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WfAppService {
  chair: Subject<any> = new Subject();

  viewStream$: Observable<any> = this.chair.asObservable();

  viewDesk(chair) {
    chair.taskFlag = 'VIEW';
    this.chair.next(chair);
  }

  updateChair(chair) {
    chair.taskFlag = 'UPDATE';
    this.chair.next(chair);
  }

  constructor() { }

  //Declaring key that stores the floor plan into localstorage
  private storageKey = 'wf-floor-plan';


  //Saving chair details into localstorage
  saveChairDetails(chair) {
    let plan = JSON.parse(localStorage.getItem(this.storageKey));
    if (plan) {
      plan[chair.id] = chair;
    } else {
      plan = {}
      plan[chair.id] = chair;
    }
    localStorage.setItem(this.storageKey, JSON.stringify(plan));
    this.updateChair(chair);
  }

  //Fetching chair object from localstorage if it exists
  fetchChairDetails(id) {
    let plan = JSON.parse(localStorage.getItem(this.storageKey));

    let chair;
    if (plan) {
      //If a chair already exist in localstorage with this id, return the same by storing into chair variable 
      if (plan[id]) {
        return plan[id];
      }
    }

    //But if no chair exists in localstorage with this id, create a new Chair Object and return the same, 
    
    chair = new Chair();
    chair.id = id;
    chair.posX = '';
    chair.posY = '';
    return chair;
  }
}

class Chair {
  id;
  posX;
  posY;
  isOccupied;
  type;
  department;
  constructor() {
    this.isOccupied = false;
    this.type = 'NA';
    this.department = 'NA';
  }
}