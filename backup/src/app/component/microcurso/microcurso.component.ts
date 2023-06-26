import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-microcurso',
  templateUrl: './microcurso.component.html',
  styleUrls: ['./microcurso.component.css']
})
export class MicrocursoComponent implements OnInit{
  constructor(public route:ActivatedRoute){

  }
  ngOnInit(): void {

  }
}
