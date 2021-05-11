import { Component, OnInit,Inject } from '@angular/core';
import {Opportunity} from '../model/Opportunity';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';

import {ManagementService} from '../management.service';


@Component({
  selector: 'app-create-opportunity',
  templateUrl: './create-opportunity.component.html',
  styleUrls: ['./create-opportunity.component.css']
})
export class CreateOpportunityComponent implements OnInit {

 
  createForm: FormGroup;
  co!: Opportunity ;
  
 

  constructor(public dialog: MatDialogRef<CreateOpportunityComponent>,private managementService: ManagementService) { 
  }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      id: new FormControl(''),
      date:new FormControl('',Validators.required),
      post: new FormControl('',Validators.required),
      skill: new FormControl('',Validators.required),
      location: new FormControl('',Validators.required),
      minExperience: new FormControl('',[Validators.max(5), Validators.min(0)]),
      desc: new FormControl('',Validators.required),
      hiringManager: new FormControl('',Validators.required),
    });
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0]
 }
  
  get id() {
    return this.createForm.get('userId') as FormControl;
  }
  get date() {
    return this.createForm.get('date') as FormControl;
  }
  get post() {
    return this.createForm.get('post') as FormControl;
  }
  get skill() {
    return this.createForm.get('skill') as FormControl;
  }
  get location() {
    return this.createForm.get('location') as FormControl;
  }
  get minimumExperience() {
    return this.createForm.get('minExperience') as FormControl;
  }
  get desc() {
    return this.createForm.get('desc') as FormControl;
  }
  get hiringManager() {
    return this.createForm.get('hiringManager') as FormControl;
  }

  addOpportunity(){
    this.co={"id":0,"date":this.date.value,"post":this.post.value,"skill":this.skill.value,"location":this.location.value,"minExperience":this.minimumExperience.value,"desc":this.desc.value,"hiringManager":this.hiringManager.value}
    this.managementService.createOpportunity(this.co)
    .subscribe((response) => {
      window.location.reload();
     }
      , (error) => {
        console.log(error);
      });
    
    this.dialog.close();
  }


}