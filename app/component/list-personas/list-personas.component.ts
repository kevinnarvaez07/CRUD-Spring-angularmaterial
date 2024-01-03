import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Persona } from '../../interface/persona';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AgregarEditarPersonaComponent } from '../agregar-editar-persona/agregar-editar-persona.component';
import { PersonaService } from '../../service/persona.service';
import { MatSnackBar } from '@angular/material/snack-bar';


// AGREGADO EN LA TABLA
// const listPersonas: Persona[] = [
//   {nombre: "Kevin", tipoDoc: 'Cedula', identificacion: 1.0079, telefono: 1234234, email : "knarvaez@gmail.com", solicitud: "queja", terminos: "true"},
//   {nombre: "Santiago", tipoDoc: 'Cedula', identificacion: 1.0079, 

// ];
@Component({
  selector: 'app-list-personas',
  templateUrl: './list-personas.component.html',
  styleUrl: './list-personas.component.css'
})

export class ListPersonasComponent implements OnInit, AfterViewInit  {
  //conectar con los campos del modelo
  displayedColumns: string[] = ['id','nombre', 'tipoDoc', 'identificacion', 'telefono', 'email', 'solicitud', 'acciones'];
  dataSource: MatTableDataSource<Persona>;
  loading: boolean = false;

//paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( public dialog: MatDialog, 
    private personaService : PersonaService,
    private _snackBar: MatSnackBar ){

    this.dataSource = new MatTableDataSource();
  }
  ngOnInit(): void {
    this.obtenerPersonas();
  }
 

//inicializacion paginator // cambiar nombre //inicializar sort para ordenar en los nombre de la tabla
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator._intl.itemsPerPageLabel = "Elementos por pagina"
   
    
  }

  //utilizar el service por inyeccion************************************/
  obtenerPersonas(){
    this.loading = true;
    this.personaService.obtenerListaDeContactos().subscribe(data =>{ 
      this.loading = false;
       this.dataSource.data = data;

       //paginator
       this.dataSource.paginator = this.paginator;
       this.dataSource.paginator._intl.itemsPerPageLabel = "Elementos por pagina"
       this.dataSource.sort = this.sort;
    })
  }

  //filtrar con los nombres
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //abrir el dialog
  addEditPersona(id?: number) {
    const dialogRef = this.dialog.open(AgregarEditarPersonaComponent, {
      width: '600px',
      // disableClose: true,
      data: {id: id}
     
    });
  //cerrar dialog con mensaje
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.obtenerPersonas();
      }
      
    });

  }

  //eliminar persona
  deletePersona(id: number){
    this.loading = true;
    this.personaService.eliminarContacto(id).subscribe(data => { 
    this.obtenerPersonas();
    this.mensajeExito();
   })
  }

  mensajeExito(){
    this._snackBar.open('El usuario fue eliminado con Exito', 'Ok',{
      duration: 3000
    });
  }

 
  } 
