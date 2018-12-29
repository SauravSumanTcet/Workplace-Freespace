import { Component, OnInit } from '@angular/core';
import { FloorPlan } from '../model/FloorPlan';
import { Desk } from '../model/Desk';
import { WfAppService } from '../wf-app.service';

@Component({
  selector: 'app-wf-floor-plan',
  templateUrl: './wf-floor-plan.component.html',
  styleUrls: ['./wf-floor-plan.component.scss']
})
export class WfFloorPlanComponent implements OnInit {

  //Iterable array of all the desks on floor
  public mainArr = [];

  //Object to store complete floor plan
  public floorPlan;

  //Object to store the desk when one is selected
  public selectedDesk;

  constructor(private appService: WfAppService) {

    //If a plan already stored in localstorage, storing in local floorPlan object
    this.floorPlan = this.appService.fetchCurrentFloorPlan();

    if (!this.floorPlan) {
      this.floorPlan = new FloorPlan();

      //Hardcoding width and height on purpose
      this.floorPlan.floorWidth = 400;
      this.floorPlan.floorHeight = 400;
      this.floorPlan.deskList = [];

      for (let i = 0; i < this.floorPlan.maxDesks; i++) {
        let desk: Desk = {
          id: i, isOccupied: false, type: null, chairId: i, width: 50, height: 50
        }

        this.floorPlan.deskList.push(desk);
      }
    }


    this.getMainArr();
  }

  //Generating iterable array 
  getMainArr() {
    this.appService.storeCurrentFloorPlan(this.floorPlan);

    let colArr = [];
    let rowArr = [];
    let rowWidth = 0;
    let colHeight = 0;

    this.floorPlan.deskList.forEach(desk => {
      rowWidth += desk.width;
      if (rowWidth <= this.floorPlan.floorWidth) {
        rowArr.push(desk);
      }
      if (colHeight < this.floorPlan.floorHeight && rowWidth >= this.floorPlan.floorWidth) {
        colArr.push(rowArr);
        colHeight += desk.height;
        rowWidth = 0;
        rowArr = [];
      }
    })
    colArr.push(rowArr);

    this.mainArr = colArr;
  }

  //Selecting desk
  selectDesk(id, row, col) {

    id = id.split('_')
    id = id[id.length - 1];

    this.selectedDesk = this.floorPlan.deskList.filter(desk => desk.id == id)[0]
    this.appService.viewDesk(this.selectedDesk);

    this.appService.storeCurrentFloorPlan(this.floorPlan);

  }

  ngOnInit() {

  }
}
