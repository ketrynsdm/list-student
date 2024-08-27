import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Output() btnAdd = new EventEmitter<any>()
  @Input() label: string = ''
  @Input() disabled: boolean = false

  constructor() { }

  ngOnInit(): void {
  }


  _onclickChanger(event:any) {
    this.btnAdd.emit(event)
  }


}
