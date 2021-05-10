import { Component, OnInit } from '@angular/core';
import { CreateOpportunityComponent } from '../create-opportunity/create-opportunity.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Opportunity} from'../model/Opportunity';

import { MatTableDataSource } from '@angular/material/table';

import {ManagementService} from '../management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { EditOpportunityComponent } from '../edit-opportunity/edit-opportunity.component';
import {DeleteOpportunityComponent} from '../delete-opportunity/delete-opportunity.component';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  displayedColumns: string[] = ['Date','Post', 'Skill', 'Location', 'Minimum Experience','Description','Hiring Manager','actions'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  listData: MatTableDataSource<any>;
  //filteredData: MatTableDataSource<any>;
  searchKey:String ;

  value : any;
  opportunities: Array<Opportunity> = [];
  receivedopportunities: Array<Opportunity> = [];
  opportunitiesexist :boolean;

  

  constructor(private managementService: ManagementService,private router:Router, private route:ActivatedRoute,public dialog: MatDialog) {
    this.value="";
    this.opportunities = [];
    this.receivedopportunities = [];
    this.opportunitiesexist = true;
   }

  ngOnInit(): void {
    this.retrieveOpportunities()
  }

  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }
  applyFilter() {
     //const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = this.searchKey.trim().toLowerCase();
 
    
    if (this.listData.paginator) {
      this.listData.paginator.firstPage();
      console.log(this.listData.filteredData.length);
      if(this.listData.filteredData.length==0)
      {
        
      }
    }
  }

  openCreateOpportunity(){
    this.dialog.open(CreateOpportunityComponent);
}

retrieveOpportunities() {

  this.managementService.retrieveOpportunities().subscribe((opportunities: Opportunity[]) => {
                    this.opportunities = opportunities;
                    //console.log(this.opportunities);
                    this.listData = new MatTableDataSource(this.opportunities);
                    this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.listData.filterPredicate = (data: any, filter) => {
          console.log(filter);
          const dataStr = JSON.stringify(data).toLowerCase();
          return dataStr.indexOf(filter) !== -1;
        };
        
                    //console.log("this.opportunities :",this.opportunities);
                    //console.log(typeof this.opportunities);
                    //console.log(this.listData);
 
                   });
 
   }

   onInfo(row){
    //       console.log(row.post);

    var data=[];
    
      data.push({id:row.id,date:row.date,post:row.post,skill:row.skill,location:row.location,minExperience:row.minExperience,desc:row.desc,hiringManager:row.hiringManager});
    
    console.log(data);
    console.log(typeof data);
    this.router.navigate(["edit-opportunity"],{queryParams:{data:JSON.stringify(data)},skipLocationChange: true,});
  
   }

   logOut(){
     this.router.navigate(['']);
   }
   openTrends(){
    this.router.navigate(['trends']);
   }
  
   onDelete(row){
    //console.log(JSON.stringify(row))
   this.managementService.populateFormId(row);
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "30%";
  this.dialog.open(DeleteOpportunityComponent,dialogConfig);
  this.dialog.afterAllClosed.subscribe((res)=>{
    this.retrieveOpportunities();
  });
}

}