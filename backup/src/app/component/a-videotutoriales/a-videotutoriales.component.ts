import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-a-videotutoriales',
  templateUrl: './a-videotutoriales.component.html',
  styleUrls: ['./a-videotutoriales.component.css']
})
export class AVideotutorialesComponent implements OnInit {
  constructor(public route:ActivatedRoute){

  }
  ngOnInit(): void {

  }
}
