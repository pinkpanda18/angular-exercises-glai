import { Component, OnInit } from '@angular/core';
import { of, merge, asyncScheduler, from } from 'rxjs';
import { every, subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-my-test',
  templateUrl: './my-test.component.html',
  styleUrls: ['./my-test.component.css']
})
export class MyTestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //this.subscribeOnOperator(); 

    from([1, 2, 3, 4, 5, 6]).pipe(
        every(x => x < 5), 
    )
    .subscribe(x => console.log(x)); // -> false

    from([1, 2, 3, 4, 5, 6], asyncScheduler).pipe(
        every(x => x < 5), 
    )
    .subscribe(x => console.log("hey")); // -> false
  }


  subscribeOnOperator(){
    const a = of(1, 2, 3).pipe(subscribeOn(asyncScheduler));
    const b = of(4, 5, 6);
    
    merge(a, b).subscribe(console.log);
  }
  mergeSubscribeOperators(){ 
    const a = of(1, 2, 3);
    const b = of(4, 5, 6);
    
    merge(a, b).subscribe(console.log);
  }

}