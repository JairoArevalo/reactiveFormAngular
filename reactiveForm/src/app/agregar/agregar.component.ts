import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
interface Usuario{
  nombre:string,
  correo:string,
  password:string
}

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})


export class AgregarComponent implements OnInit {
  fomularioCreado: FormGroup
  constructor(private formBuilder: FormBuilder) { }
  usuarios:Array<Usuario> = new Array<Usuario>()
  esNuevo=true
  lugarEditar:number=-1
  ngOnInit(): void {

    this.crearFormulario();
  }
  
  crearFormulario(){
    this.fomularioCreado = this.formBuilder.group({
      nombre: ['',Validators.required],
      correo: ['@gmail.com',Validators.compose([Validators.required,Validators.email])],
      password: ['',Validators.compose([Validators.required,Validators.minLength(8)])]
    })


   }

   agregar(){
     this.usuarios.push(this.fomularioCreado.value as Usuario)
     console.log(this.usuarios)
     this.fomularioCreado.reset()
   }

   eliminarUsuario(ubicacionEliminar: number){
      this.usuarios.splice(ubicacionEliminar,1)
      this.fomularioCreado.reset();

   }
   editar(){
      this.usuarios[this.lugarEditar].nombre = this.fomularioCreado.value.nombre;
      this.usuarios[this.lugarEditar].correo = this.fomularioCreado.value.correo;
      this.usuarios[this.lugarEditar].password = this.fomularioCreado.value.password;
      this.fomularioCreado.reset()
      this.esNuevo = true;
      this.lugarEditar = -1
   }

   editarUsuario(ubicacionEditar: number){     
     this.fomularioCreado.setValue({
       nombre :this.usuarios[ubicacionEditar].nombre,
       correo: this.usuarios[ubicacionEditar].correo,
       password: this.usuarios[ubicacionEditar].password 
        
      })
      this.esNuevo=false
      this.lugarEditar = ubicacionEditar;
   }

}
