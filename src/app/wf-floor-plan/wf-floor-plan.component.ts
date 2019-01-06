import { Component, OnInit } from '@angular/core';
import { WfAppService } from '../wf-app.service';
import { Constants } from '../constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wf-floor-plan',
  templateUrl: './wf-floor-plan.component.html',
  styleUrls: ['./wf-floor-plan.component.scss'],

})
export class WfFloorPlanComponent implements OnInit {
  chairId = 0;
  deskToViewObserver: Subscription;
  chairArr = [];
  markerArr = [];
  constructor(private appService: WfAppService) {
    //Subscribing to the observable set in app.service
    this.deskToViewObserver = this.appService.viewStream$.subscribe(data => {
      if (data.taskFlag === 'UPDATE') {
        let chair = this.findChairById(data.id);
        if (data.isOccupied) {
          chair['style']['fill'] = Constants.OCCUPIED_CHAIR
        } else {
          chair['style']['fill'] = Constants.EMPTY_CHAIR
        }
      }
    });
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.findAllChairs();

    this.markerArr.forEach(element => {
      this.appService.updateChair(this.appService.fetchChairDetails(element.id));
    })

  }

  findAllChairs() {
    var allElements = document.getElementsByTagName("*");
    for (var i = 0; i < allElements.length; i++) {
      var element = allElements[i];
      if (element.getAttribute("sodipodi:nodetypes") === "cssssssss") {
        this.addCMarker(this.getPosition(element));
      }
    }
  }

  getPosition(el) {

    let bound = el.getBoundingClientRect();
    let coOrdinates = {
      x: bound.left - 25,
      y: bound.top - 100
    };
    return coOrdinates;

  }

  addCMarker(coOrdinates) {

    let svg = document.getElementsByTagName('svg')[0]; //Get svg element
    let cMarker = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); //Create a circle in SVG's namespace

    let chairId = '_chair' + this.chairId++;
    cMarker.setAttribute("id", chairId);
    cMarker.setAttribute("cx", coOrdinates.x);
    cMarker.setAttribute("cy", coOrdinates.y);
    cMarker.setAttribute("r", "10");
    cMarker.style.fill = Constants.EMPTY_CHAIR;
    cMarker.style.cursor = "pointer";

    svg.appendChild(cMarker);

    this.markerArr.push(cMarker);

  }

  findChairById(id) {
    return this.markerArr.filter(el => el.id === id)[0];
  }


  // Method to invoke when clicked on any chair
  getChairDetails(event) {

    if (event && event.path[0].tagName === 'circle') {
      //It's a chair
      let chairId = event.path[0].id;
      let chair = this.appService.fetchChairDetails(chairId);
      //storing x and y co-ordinates in case of new chair
      if (chair.posX == '' || chair.poxY == '') {
        let circle = this.findChairById(chairId);
        chair.posX = Math.round(circle.cx.baseVal.value);
        chair.posY = Math.round(circle.cy.baseVal.value);
      }
      //Let's see if a chair details is already present or accordingly update localStorage
      this.appService.viewDesk(chair);
    }

  }



}
