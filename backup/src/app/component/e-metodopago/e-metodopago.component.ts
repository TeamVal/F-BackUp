import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-e-metodopago',
  templateUrl: './e-metodopago.component.html',
  styleUrls: ['./e-metodopago.component.css']
})
export class EMetodopagoComponent implements OnInit{
  constructor(public route:ActivatedRoute) {
  }
  ngOnInit(): void {

  }

}
