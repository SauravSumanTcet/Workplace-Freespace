import { Component, OnInit, Input } from '@angular/core';
import { WfAppService } from '../wf-app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wf-desk-view',
  templateUrl: './wf-desk-view.component.html',
  styleUrls: ['./wf-desk-view.component.scss']
})
export class WfDeskViewComponent implements OnInit {

  desk;
  deskToViewObserver: Subscription

  isEditable: boolean = false;

  constructor(private appService: WfAppService) {

    this.deskToViewObserver = this.appService.stream$.subscribe(data => {
      this.desk = data;
      console.log(data);
    });

  }

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

  updateOccupancy(occFlag) {
    this.desk.isOccupied = occFlag;
  }
  updateType(val) {
    this.desk.type = val;
  }
  updateUser(val) {
    this.desk.user = val;
  }

  save() {
    this.appService.updateDesk(this.desk);
  }
}
