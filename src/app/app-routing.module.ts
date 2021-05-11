import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import {EditOpportunityComponent} from './edit-opportunity/edit-opportunity.component';
import { DeleteOpportunityComponent } from './delete-opportunity/delete-opportunity.component';
import {TrendsComponent} from './trends/trends.component';
import { GuardGuard } from './guard.guard';


const routes: Routes = [
 
  {
    path: 'homepage',
    component: HomepageComponent,
      canActivate:[GuardGuard]

  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path:'edit-opportunity',
    component:EditOpportunityComponent,
    canActivate:[GuardGuard]
  },

  {
    path:'delete-opportunity',
    component:DeleteOpportunityComponent,
    canActivate:[GuardGuard]
  },
  
  {
    path:'trends',
    component:TrendsComponent,
    canActivate:[GuardGuard]
  },
  {
    path: '**',
    pathMatch:'full',
    redirectTo:'login',
  
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
