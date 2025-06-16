import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { LockerpageComponent } from './lockerpage/lockerpage.component';
import { UnlockerPageComponent } from './unlocker-page/unlocker-page.component';
import { GetdetailspageComponent } from './getdetailspage/getdetailspage.component';
import { DecodingpageComponent } from './decodingpage/decodingpage.component';
import { CodecrackedpageComponent } from './codecrackedpage/codecrackedpage.component';
import { ThankyoupageComponent } from './thankyoupage/thankyoupage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingpageComponent } from './landingpage/landingpage.component';
@NgModule({
  declarations: [
    AppComponent,
    WelcomepageComponent,
    LockerpageComponent,
    UnlockerPageComponent,
    GetdetailspageComponent,
    DecodingpageComponent,
    CodecrackedpageComponent,
    ThankyoupageComponent,
    LandingpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
