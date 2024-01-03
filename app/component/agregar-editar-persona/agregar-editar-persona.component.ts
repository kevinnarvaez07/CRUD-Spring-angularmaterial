import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Persona } from '../../interface/persona';
import { PersonaService } from '../../service/persona.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar-editar-persona',
  templateUrl: './agregar-editar-persona.component.html',
  styleUrl: './agregar-editar-persona.component.css'
})
export class AgregarEditarPersonaComponent implements OnInit{
  form :FormGroup;
  loading: boolean = false;
  operacion: string = "Agregar ";
  id: number | undefined;


  constructor(public dialogRef: MatDialogRef<AgregarEditarPersonaComponent>,
    private fb: FormBuilder,
     private personaService: PersonaService,
     private _snackBar: MatSnackBar,
     @Inject(MAT_DIALOG_DATA) public data: any,){
      this.form = this.fb.group({
        nombre : [null, Validators.required],
        tipoDoc : [null, Validators.required],
        identificacion : [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
        telefono : [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
        email : [null, [Validators.required, Validators.email]],
        solicitud : [null, Validators.required],
        terminos : [null, Validators.required]
      })
      this.id = data.id
    }

    ngOnInit(){
      this.esEditar(this.id);
    }
    //cambiar el nombre e iniciar en el modal con el id
    esEditar(id: number | undefined){
      if(id !== undefined) {
        this.operacion = 'Editar ';
        this.getPersona(id);
      }
    }

    //para que capture los datos service
    getPersona(id: number){
      this.personaService.obtenerContactoPorId(id).subscribe(data =>{
        this.form.patchValue({
          nombre: data.nombre,
          tipoDoc: data.tipoDoc,
          identificacion: data.identificacion,
          telefono: data.telefono,
          email: data.email,
          solicitud: data.solicitud,
          terminos: data.terminos
          
        })
      })

    }

//cerrar dialog
  cancelar(){
  this.dialogRef.close(false);
  }

  addEditPersona(){
    if(this.form.invalid){
      this.mensajeError();
      return;
    }
    const persona: Persona = {
      nombre: this.form.value.nombre,
      tipoDoc: this.form.value.tipoDoc,
      identificacion: this.form.value.identificacion,
      telefono : this.form.value.telefono,
      email : this.form.value.email,
      solicitud: this.form.value.solicitud,
      terminos: this.form.value.terminos
    }

    this.loading = true;
if(this.id == undefined){
  //es agregar registrar
  //registrar
  this.personaService.registrarContacto(persona).subscribe(data => {
    this.mensajeExito()
    console.log(data)
  })
}else {
  //es editar
  this.personaService.actualizarContacto(this.id, persona).subscribe(data =>{
    this.mensajeActualizado()
    console.log(data)
  })
}
this.loading = false;
this.dialogRef.close(true);


   
  }
mensajeExito(){
    this._snackBar.open('Formulario enviado con exito', '',{
      duration: 2000
    });
}
mensajeError(){
  this._snackBar.open('Llena el formulario correctamente', 'Error',{duration: 2000});
}

mensajeActualizado(){
  this._snackBar.open( `el usuario se ha actualizado con exito`, 'Ok',{duration: 2000});
}
}
