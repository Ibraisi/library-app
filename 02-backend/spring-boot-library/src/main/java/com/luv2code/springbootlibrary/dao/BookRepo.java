package com.luv2code.springbootlibrary.dao;


import com.luv2code.springbootlibrary.Entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepo extends JpaRepository<Book,Long> {
}
