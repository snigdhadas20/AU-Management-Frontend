import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Opportunity} from '../model/Opportunity';
import {ManagementService} from '../management.service';

@Component({
  selector: 'app-edit-opportunity',
  templateUrl: './edit-opportunity.component.html',
  styleUrls: ['./edit-opportunity.component.css']
})
export class EditOpportunityComponent implements OnInit {

  opportunityForm: FormGroup;
  received_data: any;
  updated_data: Opportunity;

  opportunity:any={
    post:"opportunity post",
    id:1,
    desc:"opportunity description",
    skill:"opportunity skill",
    minExperience:"min experience"
  }

  constructor(private router: Router,private route: ActivatedRoute,private managementService: ManagementService) {
    this.received_data = [];
      this.updated_data = { 
        id: 0,
        date:'',
        post: '',
        desc: '',
        skill: '', 
        minExperience: null ,
        location:'',
        hiringManager:''
        
      };

   }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      this.received_data = JSON.parse(params.data);
      //console.log('received data :', this.received_data);
      this.managementService.saveopportunityid(this.received_data[0]['id']);
    });
    this.opportunityForm = new FormGroup({
      skill: new FormControl(this.received_data[0]['skill']),
      desc: new FormControl(this.received_data[0]['desc']),
      minExperience:new FormControl(this.received_data[0]['minExperience']),
    });

  }

  goback() {
    
        this.router.navigate(['homepage']);
  }
   
  get skill() { 
    return this.opportunityForm.get('skill') as FormControl;
  }
  get desc() { 
    return this.opportunityForm.get('desc') as FormControl;
  }
  get minExperience() { 
    return this.opportunityForm.get('minExperience') as FormControl;
  }
  
  updateOpportunity(){
    this.received_data.map((x) => {
      this.updated_data = x;
    });
   // console.log(this.updated_data);
    
   
    this.updated_data.skill=this.skill.value;
    this.updated_data.desc=this.desc.value;
    this.updated_data.minExperience = this.minExperience.value;
   // console.log(this.updated_data);
    this.managementService.updateStatus(this.updated_data)
    .subscribe((response) => {
      response = null;
    });
  }

}
