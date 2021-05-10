import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import {EditOpportunityComponent} from './edit-opportunity/edit-opportunity.component';
import { DeleteOpportunityComponent } from './delete-opportunity/delete-opportunity.component';
import {TrendsComponent} from './trends/trends.component';


const routes: Routes = [
  {
    path: '',
    pathMatch:'full',
    redirectTo:'/login',
  
  },
  {
    path: 'homepage',
    component: HomepageComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path:'edit-opportunity',
    component:EditOpportunityComponent,
  },

  {
    path:'delete-opportunity',
    component:DeleteOpportunityComponent,
  },
  
  {
    path:'trends',
    component:TrendsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
