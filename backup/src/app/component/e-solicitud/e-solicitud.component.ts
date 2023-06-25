import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-e-solicitud',
  templateUrl: './e-solicitud.component.html',
  styleUrls: ['./e-solicitud.component.css']
})
export class ESolicitudComponent implements OnInit {
  ngOnInit(): void {

  }
  constructor(public route:ActivatedRoute){}
}
