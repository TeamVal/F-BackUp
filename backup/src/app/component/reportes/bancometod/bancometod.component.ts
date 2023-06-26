import { Component,OnInit } from '@angular/core';
import { BancoDTO } from 'src/app/model/bancoDTO';
import { MatTableDataSource } from '@angular/material/table';
import { MetodopagoService } from 'src/app/service/metodopago.service';

@Component({
  selector: 'app-bancometod',
  templateUrl: './bancometod.component.html',
  styleUrls: ['./bancometod.component.css']
})
export class BancometodComponent implements OnInit{
  bancoCounts: BancoDTO[] = [];
  dataSource: MatTableDataSource<BancoDTO> = new MatTableDataSource();
  displayedColumns: string[] = ['nombre','count']

  constructor(private pS: MetodopagoService) { }

  ngOnInit(): void {
    this.pS.getBancoCountMetodo().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  getBancoCountMetodo(): void {
    this.pS.getBancoCountMetodo()
      .subscribe((data: BancoDTO[]) => {
        this.bancoCounts = data;
      });
  }
}
