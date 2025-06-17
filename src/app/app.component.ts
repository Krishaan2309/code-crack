import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CodeCrack';
  isNextClicked:boolean = false
  isRevealMyImpactClicked:boolean = false
  formValue:any
  continueClicked:boolean
  clickHereBool:boolean

  showDecodingPage = true;

  onChildInitialized() {
    setTimeout(() => {
      this.showDecodingPage = false;
    }, 3000);
  }


  onNext(value:boolean){
    this.isNextClicked = value
  }

  onrevealMyImpactClicked(value:boolean){
    this.isRevealMyImpactClicked = value
  }

  onRevealClicked(formValue){
    this.formValue = formValue
  }
  onContinueClicked(cont){
    this.continueClicked = cont
  }

  clickHere(value){
    this.clickHereBool = value;

    // ✅ Skip WelcomePage
    this.isNextClicked = true;
  }


}


