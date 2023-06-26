import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-e-foro',
  templateUrl: './e-foro.component.html',
  styleUrls: ['./e-foro.component.css']
})
export class EForoComponent implements OnInit{
  ngOnInit(): void {

  }
  constructor(public route:ActivatedRoute){}
}
