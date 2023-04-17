import { recusosA } from "src/app/model/recursosA";
import{ Component, OnInit} from '@angular/core'
import{ MatTableDataSource} from '@angular/material/table';
import { RecursoAService} from 'src/app/service/recursosA.service';

@Component({
    selector: 'app-recurso-lista',
    templateUrl: './recurso-lista.component.html',
    styleUrls: ['./recurso-lista.component.css'],
})
export class RecursolistarComponent implements OnInit{
    dataSource:MatTableDataSource<recusosA>=new MatTableDataSource();
    lista:recusosA[]=[];
    displayedColumns:String[]=['Numero','Titulo','Tema','Tipocontenido','Url','Tamano'];
    constructor(private pS:RecursoAService){
  
    }
  ngOnInit(): void {
  
    this.pS.list().subscribe((data)=>{ 
      this.dataSource=new MatTableDataSource(data);
    })
  }
}