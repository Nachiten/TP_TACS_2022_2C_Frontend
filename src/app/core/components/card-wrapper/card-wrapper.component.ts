import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-wrapper',
  templateUrl: './card-wrapper.component.html',
  styleUrls: ['./card-wrapper.component.scss']
})
export class CardWrapperComponent implements OnInit {
  @Input()
  containerWidth = 8;

  @Input()
  containerSize = 'xl';

  offset = 0;

  constructor() {
    if (this.containerWidth > 12 || this.containerWidth < 4)
      throw new Error('Container width cannot be more than 12 or less than 4');
  }

  ngOnInit(): void {
    this.offset = (12 - this.containerWidth) / 2;
  }
}
