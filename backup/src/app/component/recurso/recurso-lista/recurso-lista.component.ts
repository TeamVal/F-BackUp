import { recusosA } from "src/app/model/recursosA";
import{ Component, OnInit, ViewChild} from '@angular/core'
import{ MatTableDataSource} from '@angular/material/table';
import { RecursoAService} from 'src/app/service/recursosA.service';
import { MatDialog } from '@angular/material/dialog'
import { RecursoDialogoComponent } from "./Recursos-Dialogo/Recurso-Dialogo.component";
import { MatPaginator } from "@angular/material/paginator";

@Component({
    selector: 'app-recurso-lista',
    templateUrl: './recurso-lista.component.html',
    styleUrls: ['./recurso-lista.component.css'],
})
export class RecursolistarComponent implements OnInit{
   dataSource:MatTableDataSource<recusosA>=new MatTableDataSource();
    lista:recusosA[]=[];
    displayedColumns:String[]=['Numero','Titulo','Tema','Tipocontenido','Url','Tamano','ceditar', 'celiminar'];
    private idMayor: number = 0;
    //PAGINACION
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    //PAGINACION
    constructor(private pS:RecursoAService, private dialog: MatDialog){}
  ngOnInit(): void {
  
    this.pS.list().subscribe((data)=>{ 
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.pS.getList().subscribe((data)=>{

      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.pS.getConfirmaEliminacion().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false;
      this.dataSource.paginator = this.paginator;
    });
  }
  confirmar(id: number) {
    this.idMayor = id;
    this.dialog.open(RecursoDialogoComponent);
  }
  eliminar(id: number) {
    this.pS.eliminar(id).subscribe(() => {
      this.pS.list().subscribe(data => {
        this.pS.setList(data);/* se ejecuta la línea 27 */
      });
    });
  }
  filtrar(e:any){
    this.dataSource.filter=e.target.value.trim();
  }
}
