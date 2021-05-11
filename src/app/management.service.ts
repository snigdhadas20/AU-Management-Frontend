import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Opportunity} from './model/Opportunity';
import {Emails} from './model/Email';
import Login from './model/Login';
import Token from './model/Token';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
  })
  export class ManagementService {
      id: number;
      constructor(private http: HttpClient,public snackBar: MatSnackBar) {}


      config: MatSnackBarConfig = {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      };
    
    
      success(msg): void {
        this.config.panelClass = ['notification', 'success'];
        this.snackBar.open(msg, '', this.config);
      }
      
    
      warn(msg): void {
        this.config.panelClass = ['notification', 'warn'];
        this.snackBar.open(msg, '', this.config);
      }
      
      public getAllSkills() {
        return this.http.get('http://localhost:8080/getAll/Skills')
        .pipe(
          retry(3)
          // catchError(this.handleError)
        );
    }
    public getAlllocation() {
      return this.http.get('http://localhost:8080/getAll/locations')
      .pipe(
        retry(3)
        // catchError(this.handleError)
      );
  }
  public getAllminExperience() {
    return this.http.get('http://localhost:8080/getAll/MinExp')
    .pipe(
      retry(3)
      // catchError(this.handleError)
    );
}
      saveopportunityid(id: number) {
        this.id = id;
        console.log('saving id :', this.id);
      }


      updateStatus(ticket: Opportunity): Observable<any> {
        console.log(ticket);
    
        return this.http
          .post<Opportunity>('http://localhost:8080/editRecord/', ticket)
          .pipe(
            retry(3)
            // catchError(this.handleError)
          );
      }

      createOpportunity(newOpportunity:Opportunity):Observable<any>{
        return this.http.post<Opportunity>('http://localhost:8080/addOpportunity', newOpportunity)
          .pipe(
              retry(3),
              //catchError(this.handleError)
            );
        
      }
     createEmail(newEmail:Emails):Observable<any>{
        return this.http.post<Emails>('http://localhost:8080/addEmail/', newEmail)
          .pipe(
              retry(3),
              //catchError(this.handleError)
            );
      }

      retrieveOpportunities(): Observable<Opportunity[]> {
        return this.http
          .get<Opportunity[]>('http://localhost:8080/getAllOpprtunity')
          .pipe(
            retry(3)
            // catchError(this.handleError)
          );
      }
      deleteOpportunity(id:number):Observable<void>{
        return this.http.delete<void>('http://localhost:8080/deleteRecord/'+id)
          .pipe(
              retry(3),
              //catchError(this.handleError)
            );
        
      }
      public login(req: Login): Observable<Token>{
        return this.http.post<Token>('http://localhost:8080/api/allowed/login/', req);
      }

       /* getEmail(email:Emails):Observable<any>{
          return this.http.get<Emails>('http://localhost:8080/addEmail', email)
          .pipe(
            retry(3),
            //catchError(this.handleError)
          );
        }*/
      
    form: FormGroup = new FormGroup({
      $key: new FormControl(null),
      id:new FormControl(null),
      date: new FormControl(''),
      post: new FormControl(''),
      skill: new FormControl(''),
      location: new FormControl(''),
      minExperience: new FormControl(''),
      desc: new FormControl(''),
      hiringManager:new FormControl(''),
      
    });

    initializeFormGroup() {
      this.form.setValue({
        $key: null,
        id:null,
        date:'',
        post: '',
        skill: '',
        location: '',
        minExperience: '',
        desc: '',
        hiringManager:'',
      });
    }

    populateForm(row,id) {
      this.form.setValue({
        $key: id,
        id:row.id,
        date:row.date,
        post: row.post,
        skill: row.skill,
        location: row.location,
        minExperience: row.minExperience,
        desc: row.desc,
        hiringManager: row.hiringManager,
      });
    
      

    }
    populateFormId(row) {
      this.id=row.id;
    }

  }