import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('alert', [
      state('open', style({
        opacity: 1
      })),
      state('closed', style({
        opacity: 0
      })),
      transition('open => closed', [
        animate('1s 2s ease-out')
      ]),
      transition('closed => open', [
        animate('1.5s ease-in')
      ]),
    ]),
  ]
  
})
export class AppComponent implements OnInit {
  skillExist = true;
  // Angular,Art,Bootstrap,C#,Design,Flask,HTML/CSS,Java,JavaScript,Project Management,Python,Unity
  skill_tags: Array<string> = ["angular","art","bootstrap","cs","design","flask","htmlcss","java","javascript","pm","python","unity"];
  chosen_skill: any = [];
  selected_skill: any;

  constructor() {}

  ngOnInit() {}

  filter($event: string) {
    if($event == "invalid"){
      //ease in error message
      this.skillExist = false;

      //wait 3s, then ease out
      setTimeout( () => {
        this.skillExist = true;
      }, 3000);

      return;
    }

    this.selected_skill = $event;

    if (this.chosen_skill.includes(this.selected_skill)) {
      this.chosen_skill.splice(this.chosen_skill.indexOf(this.selected_skill), 1);
    } else {
      this.chosen_skill.push(this.selected_skill);
    }

    console.log(this.chosen_skill);

    this.filter_skill();
  }

  filter_skill() {
    let len = this.chosen_skill.length;

    for (let i = 0; i < this.skill_tags.length; i++) {
      if (len === 0) {
        this.toggle_class(this.skill_tags[i], false); //removes hidden class, if it exists
      } else if (len >= 1) {
        this.toggle_class(this.skill_tags[i], true); //adds hidden class to all projects
      }
    }

    if (len === 1) {
      this.toggle_class(this.chosen_skill[0], false);
    } else if (len > 1) {
      let elements = document.querySelectorAll("." + this.chosen_skill[0]);

      elements.forEach((element) => {
        const result = this.chosen_skill.every((val: string) =>
          element.classList.contains(val)
        );
        if (result) {
          element.classList.remove("hidden");
        }
      });
    }
  }

  toggle_class(skill: string, flag: boolean) {
    let elements = document.querySelectorAll("." + skill);
    elements.forEach((element) => {
      element.classList.toggle("hidden", flag);
    });
  }
}
