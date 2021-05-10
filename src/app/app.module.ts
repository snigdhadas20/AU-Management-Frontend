import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {GoogleLoginProvider} from 'angularx-social-login';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
//import { MaterialModule } from "./material/material.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import { CreateOpportunityComponent } from './create-opportunity/create-opportunity.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { EditOpportunityComponent } from './edit-opportunity/edit-opportunity.component';
import { DeleteOpportunityComponent } from './delete-opportunity/delete-opportunity.component';
import { TrendsComponent } from './trends/trends.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { MyInterceptorInterceptor } from './my-interceptor.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    CreateOpportunityComponent,
    EditOpportunityComponent,
    DeleteOpportunityComponent,
    TrendsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatGridListModule,
    NgxChartsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatTableModule,
    SocialLoginModule,
  
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    FormsModule,
    HttpClientModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    MatExpansionModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '779982691442-kokudebfl2nb2n4pqbmtn1hamvckijrk.apps.googleusercontent.com'
            )
          },]
        } as SocialAuthServiceConfig,
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: MyInterceptorInterceptor,
        multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
