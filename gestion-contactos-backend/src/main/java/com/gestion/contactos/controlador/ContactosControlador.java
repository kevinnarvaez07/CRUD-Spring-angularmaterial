package com.gestion.contactos.controlador;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gestion.contactos.excepciones.ResourceNotFoundException;
import com.gestion.contactos.modelo.Contactos;
import com.gestion.contactos.repositorio.ContactosRepositorio;




@RestController
@RequestMapping("/api/v1/")
@CrossOrigin(origins = "http://localhost:4200/")
public class ContactosControlador {
	
	@Autowired 
	private ContactosRepositorio repositorio;
	
	@GetMapping("/contactos")
	public List<Contactos> listarTodosLosContactos(){
		return repositorio.findAll();
	}
	
	//guardar contacto
	@PostMapping("/contactos")
	public Contactos guardarContactos(@RequestBody Contactos contactos) {
		return repositorio.save(contactos);
	}
	
	//buscar empleado
	@GetMapping("/contactos/{id}")
	public ResponseEntity<Contactos> obtenerContactoPorId(@PathVariable Long id){
		Contactos contactos = repositorio.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException( "No existe el usuario con ese ID : " + id));
			return ResponseEntity.ok(contactos);
	}
	
	@PutMapping("/contactos/{id}")
	public ResponseEntity<Contactos> actualizarContacto(@PathVariable Long id,@RequestBody Contactos detallesContactos){
		Contactos contactos = repositorio.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException( "No existe el usuario con ese ID : " + id));
	
		
		contactos.setNombre(detallesContactos.getNombre());
		contactos.setTipoDoc(detallesContactos.getTipoDoc());
		contactos.setIdentificacion(detallesContactos.getIdentificacion());
		contactos.setTelefono(detallesContactos.getTelefono());
		contactos.setEmail(detallesContactos.getEmail());
		contactos.setSolicitud(detallesContactos.getSolicitud());
		
		Contactos contactoActualizado = repositorio.save(contactos);
		return ResponseEntity.ok(contactoActualizado);
	}
	
@DeleteMapping("/contactos/{id}")
	
	public  ResponseEntity<Map<String, Boolean>> eliminarContacto(@PathVariable Long id ){
		Contactos contactos = repositorio.findById(id)
						
				.orElseThrow(() -> new ResourceNotFoundException("No existe el empleado con el ID :" + id));
		
		repositorio.delete(contactos);
		Map<String, Boolean> respuesta = new HashMap<>();
		respuesta.put("eliminar",Boolean.TRUE);
		return ResponseEntity.ok(respuesta);
	}

}
