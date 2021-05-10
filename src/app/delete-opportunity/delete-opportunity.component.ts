import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {ManagementService} from'../management.service';
import{HomepageComponent} from '../homepage/homepage.component';

@Component({
  selector: 'app-delete-opportunity',
  templateUrl: './delete-opportunity.component.html',
  styleUrls: ['./delete-opportunity.component.css']
})
export class DeleteOpportunityComponent implements OnInit {

  constructor(public managementService:ManagementService,public dialogRef:MatDialogRef<HomepageComponent>) { }

  ngOnInit(): void {
  }
  onDelete() {
    console.log(this.managementService.id);
    this.managementService.deleteOpportunity(this.managementService.id).subscribe((res)=>{
      this.managementService.form.reset();
      this.managementService.initializeFormGroup();
      
      this.onClose();   
    });
}

onClose() {
this.managementService.form.reset();
this.managementService.initializeFormGroup();
this.dialogRef.close();
}
}
