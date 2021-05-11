import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ManagementService} from '../management.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css']
})
export class TrendsComponent implements OnInit {

  view: any[] = [600, 300];
  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel1 = 'Location';
  xAxisLabel2 = 'Skills';
  xAxisLabel3 = 'Minimum Experience';

  showYAxisLabel = true;
  yAxisLabel = 'Count';
  timeline = true;
  colorScheme = "vivid";

  public skills;
  public location;
  public minExperience
  showLabels = true;
  public arr1: any[];
  public arr2: any[];
  public arr3: any[];

  constructor(private router: Router,private _snackBar: MatSnackBar, private managementService: ManagementService) { }

  ngOnInit(): void {

    this.managementService.getAllSkills().subscribe((val) => {
      this.skills = val;
      this.arr1=[];
      for(let i=0;i<val['skills'].length;i++){
        this.arr1.push({
          name: val['skills'][i],
          value: val['countOfFrequency'][i]
        });
      }
     
      //console.log(val['skills']);
      //console.log(val['countOfFrequency']);
  }, error => {

  });
  this.managementService.getAlllocation().subscribe((val) => {
    this.location = val;
    
    this.arr2=[];
      for(let i=0;i<val['location'].length;i++){
        this.arr2.push({
          name: val['location'][i],
          value: val['countOfFrequency'][i]
        });
      }
    //console.log(this.arr2);
}, error => {

});
this.managementService.getAllminExperience().subscribe((val) => {
  this.location = val;
  
  this.arr3=[];
    for(let i=0;i<val['minExperience'].length;i++){
      this.arr3.push({
        name: val['minExperience'][i],
        value: val['countOfFrequency'][i]
      });
    }
  //console.log(this.arr3);
}, error => {

});

  }
  goback() {
    
    this.router.navigate(['homepage']);
}
 
}
