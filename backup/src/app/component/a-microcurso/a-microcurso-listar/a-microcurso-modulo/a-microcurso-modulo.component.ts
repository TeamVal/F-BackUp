import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-a-microcurso-modulo',
  templateUrl: './a-microcurso-modulo.component.html',
  styleUrls: ['./a-microcurso-modulo.component.css']
})
export class AMicrocursoModuloComponent implements OnInit {
  constructor(public route:ActivatedRoute){

  }
  ngOnInit(): void {

  }
}
