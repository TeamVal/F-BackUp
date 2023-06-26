import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-e-comentario',
  templateUrl: './e-comentario.component.html',
  styleUrls: ['./e-comentario.component.css']
})
export class EComentarioComponent implements OnInit{
  constructor(public route:ActivatedRoute){

  }
  ngOnInit(): void {

  }
}
