import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-lockerpage',
  templateUrl: './lockerpage.component.html',
  styleUrls: ['./lockerpage.component.css']
})
export class LockerpageComponent {
  
  isRevealMyImpactClicked: boolean  = false
  currentCodeClicked:any
  option:any
  correctAns:boolean
  codeBox:boolean = true
  popupOpen:boolean = false
  onSubmitBool:boolean
  finalSubmitDone:boolean = false
  wrongCount: number = 3
  @Output()
  revealMyImpact = new EventEmitter<boolean>


  onrevealMyImpactClicked(){
    this.revealMyImpact.emit(true)
  }

  onClickcode(code:string){
    this.denialInsights = this.shuffleOptions(this.denialInsights);
    this.currentCodeClicked = this.denialInsights[code]
    this.popupOpen = true
    this.option = undefined
    this.correctAns = false
    this.onSubmitBool = false
    this.codeBox = false
    console.log(this.currentCodeClicked)

  }

  closePopUp(){
    this.popupOpen = false
    this.currentCodeClicked = undefined
    this.option = undefined
    this.correctAns = false
    this.onSubmitBool = false
    this.codeBox = true
    this.wrongCount = 3
    
  }

  optionSelected(option:string){
    this.option = option
    

  }
  
  OnSubmitAnswer(){
    // console.log(this.currentCodeClicked)
    // console.log(this.option)
    if(this.wrongCount==1 && this.option != this.currentCodeClicked.answer){
      console.log("wrong count",this.wrongCount)
      this.closePopUp()
    }
    this.onSubmitBool = true
    if(this.option == this.currentCodeClicked.answer){
      this.correctAns = true
      // console.log(this.correctAns)
    }
    else{
      this.correctAns = false
      // console.log(this.correctAns)
      this.wrongCount-=1
      
    }
  }

  OnSubmitCorrectAnswer(){
    this.popupOpen = false
    this.finalSubmitDone = true
    this.wrongCount= 3
    this.codeBox= true
    console.log("Correct answer submited")
  }



  
  denialInsights = {
    "CO-197": {
      code: "CO-197",
      description: "Authorization Required / Missing",
      question: "If a provider delivers a service without obtaining prior authorization, what is the most likely outcome?",
      option1: "The claim is delayed but eventually paid",
      option2: "The claim is denied and not reimbursed",
      option3: "The patient is automatically billed",
      answer: "The claim is denied and not reimbursed",
      businessInsight: "Authorization issues account for 11.6% of all denials (Change Healthcare). These denials often result in total revenue loss, delayed treatment, and patient dissatisfaction.",
      aspRole: "We flag services needing auth upfront and secure it before care is delivered—minimizing denials and protecting revenue."
    },
    "CO-18": {
      code: "CO-18",
      description: "Duplicate Claim Submission",
      question: "What happens when the same claim is submitted more than once?",
      option1: "Both claims are processed normally",
      option2: "The payer flags one as a duplicate and may deny it",
      option3: "The patient gets double-billed",
      answer: "The payer flags one as a duplicate and may deny it",
      businessInsight: "Duplicate submissions are one of the top causes of unnecessary denials and can trigger payer audits, damaging payer-provider relationships.",
      aspRole: "ASP uses a dual-layer reconciliation check to detect and prevent duplicates, keeping your clean claim rate high and relationships strong."
    },
    "CO-50": {
      code: "CO-50",
      description: "Service Not Covered by the Payer",
      question: "If a service is not covered by the patient's insurance plan, what happens to the claim?",
      option1: "It is approved as an exception",
      option2: "It is denied and the provider does not get paid",
      option3: "The payer adjusts the amount",
      answer: "It is denied and the provider does not get paid",
      businessInsight: "These denials often stem from lack of benefit verification or outdated plan information. They result in direct revenue loss and patient frustration.",
      aspRole: "We validate benefits and coverage before care is scheduled. If a service isn’t covered, we flag it early—avoiding denials and protecting your bottom line."
    },
    "PR-49": {
      code: "PR-49",
      description: "Routine or Screening Procedure Not Covered",
      question: "Why would a routine screening (like an annual physical) be denied?",
      option1: "The patient has exceeded their benefit limit",
      option2: "It was performed without a diagnosis code",
      option3: "It’s considered not medically necessary or not covered under the plan",
      answer: "It’s considered not medically necessary or not covered under the plan",
      businessInsight: "Screening denials happen due to frequency limitations or lack of linked diagnosis. These are common and avoidable if payer rules are applied upfront.",
      aspRole: "ASP integrates payer medical necessity policies into our verification process. We flag screenings at risk of denial before service delivery, helping providers document correctly or reschedule if needed—avoiding PR-49 denials completely."
    },
    "CO-109": {
      code: "CO-109",
      description: "Claim Not Covered by This Payer/Contractor",
      question: "What happens when a claim is submitted to the wrong payer (e.g., commercial instead of Medicaid)?",
      option1: "Automatically redirected",
      option2: "Denied and must be resubmitted",
      option3: "Patient is contacted",
      answer: "Denied and must be resubmitted",
      businessInsight: "Wrong-payer submissions cause avoidable delays. MGMA notes this adds 7–14 days to the payment cycle and accounts for 8% of denials.",
      aspRole: "We verify real-time coverage and match each claim to the correct payer before submission—reducing denials and keeping AR moving."
    },
    "CO-16": {
      code: "CO-16",
      description: "Missing or Incomplete Information",
      question: "If a claim is submitted without complete patient or provider details, what is the likely outcome?",
      option1: "The payer processes it and requests missing info later",
      option2: "The claim is denied and needs to be reworked",
      option3: "The payer contacts the patient directly",
      answer: "The claim is denied and needs to be reworked",
      businessInsight: "The average cost to rework a claim is $25.20, and more than 60% of these denials are avoidable (MGMA). Rework also consumes valuable staff time and delays reimbursement.",
      aspRole: "At ASP, we validate every data point before submission. This rigor prevents incomplete claims and ensures first-pass claim success."
    }
  };
  
  
  
   shuffleOptions(denialInsights) {
    for (const code in denialInsights) {
      const item = denialInsights[code];
  
      // Gather options
      const options = [
        { key: 'option1', value: item.option1 },
        { key: 'option2', value: item.option2 },
        { key: 'option3', value: item.option3 }
      ];
  
      // Shuffle options
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
  
      // Reassign shuffled options
      options.forEach((opt, index) => {
        item[`option${index + 1}`] = opt.value;
      });
  
      // Update answer key to point to the new correct option
      const correctOption = options.find(opt => opt.value === item.answer);
      item.answer = correctOption.value; // Keep value the same for answer field (if value-based comparison is used)
    }
  
    return denialInsights;
  }
  

  
  

}
