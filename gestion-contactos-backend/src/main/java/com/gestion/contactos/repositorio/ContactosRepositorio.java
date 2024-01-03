package com.gestion.contactos.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gestion.contactos.modelo.Contactos;


public interface ContactosRepositorio
 extends JpaRepository<Contactos, Long>{

}
