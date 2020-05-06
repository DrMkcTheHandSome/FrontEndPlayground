import { Component, OnChanges, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'pm-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {
  @Output() ratingClicked: EventEmitter<string> =
    new EventEmitter<string>();
  starIconArray: Array<any> = new Array<any>();
  private _rating: number = 0;

  get rating(): number {
    return this._rating;
  }
  
  @Input() set rating(value: number){
  let starIcon: any = "<span class='fa fa-star'></span>";
    this.starIconArray = new Array<any>();
      for(let i = 1; i <= value; i++){
        this.starIconArray.push(starIcon);
      }
      this._rating = value;
  };

  ngOnInit(): void {

  }

  counter(value: number){
    return new Array(value);
  }

  onClick(): void {
    this.ratingClicked.emit(`The rating ${this._rating} was clicked! this is Star Component`);
  }
}
