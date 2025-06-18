import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { LockerpageComponent } from './lockerpage/lockerpage.component';
import { GetdetailspageComponent } from './getdetailspage/getdetailspage.component';
import { DecodingpageComponent } from './decodingpage/decodingpage.component';
import { CodecrackedpageComponent } from './codecrackedpage/codecrackedpage.component';
import { ThankyoupageComponent } from './thankyoupage/thankyoupage.component';
import { LandingpageComponent } from './landingpage/landingpage.component';

const routes: Routes = [
  {path:'landing-page',component:LandingpageComponent},
  {path:'welcome-page',component:WelcomepageComponent},
  {path: 'locker-page', component:LockerpageComponent},
  {path: 'getDetails-page', component:GetdetailspageComponent},
  {path: 'decode-page', component: DecodingpageComponent},
  {path: 'codecracked-page', component:CodecrackedpageComponent},
  {path: 'thankyou-page', component:ThankyoupageComponent },
  {path:'**',component:WelcomepageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
