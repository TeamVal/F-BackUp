import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-a-recurso',
  templateUrl: './a-recurso.component.html',
  styleUrls: ['./a-recurso.component.css']
})
export class ARecursoComponent implements OnInit{
  ngOnInit(): void {

  }
  constructor(public route:ActivatedRoute){}
}
