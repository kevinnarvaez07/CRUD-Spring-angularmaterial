package com.gestion.contactos.modelo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "contactos")
public class Contactos {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "nombre", length = 100, nullable = false)
	private String nombre;

	@Column(name = "tipoDoc", length = 100, nullable = false)
	private String tipoDoc;

	@Column(name = "identificacion", length = 100, nullable = false)
	private Long identificacion;

	@Column(name = "telefono", length = 100, nullable = false)
	private Long telefono;

	@Column(name = "email", length = 100, nullable = false)
	private String email;

	@Column(name = "solicitud", length = 100, nullable = false)
	private String solicitud;

	public Contactos() {

	}

	public Contactos(Long id, String nombre, String tipoDoc, Long identificacion, Long telefono, String email,
			String solicitud) {
		super();
		this.id = id;		this.nombre = nombre;
		this.tipoDoc = tipoDoc;
		this.identificacion = identificacion;
		this.telefono = telefono;
		this.email = email;
		this.solicitud = solicitud;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getTipoDoc() {
		return tipoDoc;
	}

	public void setTipoDoc(String tipoDoc) {
		this.tipoDoc = tipoDoc;
	}

	public Long getIdentificacion() {
		return identificacion;
	}

	public void setIdentificacion(Long identificacion) {
		this.identificacion = identificacion;
	}

	public Long getTelefono() {
		return telefono;
	}

	public void setTelefono(Long telefono) {
		this.telefono = telefono;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSolicitud() {
		return solicitud;
	}

	public void setSolicitud(String solicitud) {
		this.solicitud = solicitud;
	}

}
