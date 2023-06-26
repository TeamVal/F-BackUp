import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-a-microcurso',
  templateUrl: './a-microcurso.component.html',
  styleUrls: ['./a-microcurso.component.css']
})
export class AMicrocursoComponent implements OnInit {
  constructor(public route:ActivatedRoute){

  }
  ngOnInit(): void {

  }
}
