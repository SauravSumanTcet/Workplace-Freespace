import { Component, OnInit, Input } from '@angular/core';
import { WfAppService } from '../wf-app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wf-desk-view',
  templateUrl: './wf-desk-view.component.html',
  styleUrls: ['./wf-desk-view.component.scss']
})
export class WfDeskViewComponent implements OnInit {
  //Lets store the selected desk into desk object
  desk;
  deskToViewObserver: Subscription


  //Lets create modes - edit/save the selected desk as per below variable   
  isEditable: boolean = false;

  constructor(private appService: WfAppService) {

    //Subscribing to the observable set in app.service
    this.deskToViewObserver = this.appService.stream$.subscribe(data => {
      this.desk = data;
    });

  }

  //Method to toggle modes and when save is clicked calling save method
  toggleEditMode(editFlag) {
    this.isEditable = editFlag;
    //Save into localstorage
    if (!editFlag) {
      this.save();
    }
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.deskToViewObserver.unsubscribe();
  }

  //Method to update occupancy
  updateOccupancy(occFlag) {
    this.desk.isOccupied = occFlag;
  }

  //Method to update desk type
  updateType(val) {
    this.desk.type = val;
  }

  //Method to update desk user
  updateUser(val) {
    this.desk.user = val;
  }

  //Method to save current state of desk
  save() {
    this.appService.updateDesk(this.desk);
  }
}
