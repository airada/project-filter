import { Component, Input, Output, ViewChild, Renderer2, ElementRef, EventEmitter, OnInit, HostListener } from "@angular/core";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.css"],
})

export class FilterComponent implements OnInit {
  @Input() skills: string = '';
  @Output() filter_skill = new EventEmitter<string>();
  @ViewChild("input") input?: ElementRef;
  arrowkey_position: number = -1;
  input_focused: boolean = false;
  skills_list: Array<string> = [];
  private scroll_position: number = 0;
  search_size: number = 5;
  selected: Array<string> = [];
  suggestions: Array<string> = [];

  constructor(private renderer: Renderer2) {  }

  ngOnInit() { 
    this.skills_list = this.skills.split(",");
    this.suggestions = this.skills_list.slice(); 
  }

  private input_resize() {
    const length = this.input?.nativeElement.value.length;

    switch(length) {
      case 0:
        this.renderer.setAttribute(this.input?.nativeElement, "size", this.search_size.toString());
        break;
      case 1:
        this.renderer.setAttribute(this.input?.nativeElement, "size", "1");
        break;
      default:
        this.renderer.setAttribute(this.input?.nativeElement, "size", Math.round(length/2).toString());
        break;      
    }
  }

  @HostListener("keyup") onKeyUp() {
    this.input_resize();
  }

  @HostListener("focus") onFocus() {
    this.input_resize();
  }

  private set_scroll(position: number) {
    let dropdown_content = document.getElementById("dropdown-content");

    if (dropdown_content){
      dropdown_content.scrollTop = position;
    }
  }

  private reset_scroll() {
    this.arrowkey_position = -1;
    this.scroll_position = 0;
    this.set_scroll(0);
  }

  private emit_event(item: string) {
    switch (item) {
      case "C#": {
        this.filter_skill.emit("cs");
        break;
      }
      case "Project Management": {
        this.filter_skill.emit("pm");
        break;
      }
      case "HTML/CSS": {
        this.filter_skill.emit("htmlcss");
        break;
      }
      case "JavaScript": {
        this.filter_skill.emit("js");
        break;
      }
      default: {
        this.filter_skill.emit(item.toLowerCase());
        break;
      }
    }
  }

  keydown(event: KeyboardEvent) {
    switch (event.keyCode) {
      case 38: // Up Arrow Key
        if (this.arrowkey_position > -1) {
          this.arrowkey_position--;
          this.scroll_position -= 20;
          this.set_scroll(this.scroll_position);
        }
        break;
      case 40: // Down Arrow Key
        if (this.arrowkey_position < this.skills_list.length - 1) {
          this.arrowkey_position++;
          if (this.arrowkey_position > 0) {
            this.scroll_position += 20;
            this.set_scroll(this.scroll_position);
          }
        }
        break;
      case 8: // Backspace
        if (this.input?.nativeElement.value == "" && this.selected.length > 0) {
          let last_selected = this.selected.pop();
          
          if (last_selected){
            this.emit_event(last_selected);
          }
        }
        this.reset_scroll();
        break;
    }
  }

  private reset_input() {
    this.renderer.setProperty(this.input?.nativeElement, "value", "");
    this.renderer.setAttribute(this.input?.nativeElement, "size", this.search_size.toString());
  }

  private reset_suggestions() {
    this.suggestions = this.skills_list.slice();
  }

  toggle_skill(item: string) {
    this.reset_input();
    this.reset_suggestions();
    if (this.selected.indexOf(item) == -1) {
      this.selected.push(item);
    } else {
      this.selected.splice(this.selected.indexOf(item), 1);
    }
    this.emit_event(item);
  }

  private update_suggestions(list: Array<string>) {
    this.arrowkey_position = -1;
    this.suggestions.splice(0, this.suggestions.indexOf(list[0]));

    let last_index = list.pop();

    if (last_index){
      const last = this.suggestions.indexOf(last_index);
      this.suggestions.splice(last + 1, this.suggestions.length - last);
    }
  }

  private suggest(str: string) {
    let matches: Array<string> = [];
    this.reset_suggestions();
    const regex: RegExp = new RegExp("^" + str + "+");

    for (let i = 0; i < this.suggestions.length; i++) {
      if (this.suggestions[i].toLowerCase().search(regex) != -1) {
        matches.push(this.suggestions[i]);
      }
    }

    this.update_suggestions(matches);
  }

  search(item: string) {
    if(item == "" && (this.arrowkey_position != -1)){
      this.toggle_skill(this.suggestions[this.arrowkey_position]);
      return;
    }

    //Capitalize first letter
    const str = item.toLowerCase().charAt(0).toUpperCase() + item.toLowerCase().slice(1);

    if (this.skills_list.includes(str) && !(this.selected.includes(str))) {
      this.toggle_skill(str);
    } else if (this.selected.includes(str) && (this.suggestions.indexOf(str) == this.arrowkey_position)) {
      this.selected.splice(this.selected.indexOf(str), 1);
    } else if (this.arrowkey_position != -1) {
      this.toggle_skill(this.suggestions[this.arrowkey_position]);
    } else if (!this.skills_list.includes(str)){
      this.emit_event("invalid");
    }

    this.reset_input();
    this.reset_scroll();
    this.reset_suggestions();
  }

  content(mode: string) {
    this.reset_scroll();
    let inputValue = <HTMLInputElement>(document.getElementById("dropdown-content"));
    let box = <HTMLInputElement>(document.getElementById("box"));
    let caret = <HTMLInputElement>(document.getElementById("caret"));

    switch(mode){
      case "show":
        inputValue.classList.remove("hide");
        box.classList.add("box-bottom");
        caret.classList.add("caret-bottom");
        this.input_focused = true;
        break;
      case "hide":
        inputValue.classList.add("hide");
        box.classList.remove("box-bottom");
        caret.classList.remove("caret-bottom");
        this.input_focused = false;
        break;
      case "toggle":
        inputValue.classList.toggle("hide");
        box.classList.toggle("box-bottom");
        caret.classList.toggle("caret-bottom");
        break;
    }

  }

  modelChange(str: string) {
    this.content('show');
    if (!str) {
      this.reset_suggestions();
      return;
    }
    this.suggest(str.toLowerCase());
  }

  clear() {
    for (let i = 0; i < this.selected.length; i++) {
      this.emit_event(this.selected[i]);
    }
    this.selected = [];
  }

  includeBG(item: string) {
    if (this.selected.includes(item)) {
      return "dropdown-item bg-selected";
    } else {
      return "dropdown-item";
    }
  }
}
