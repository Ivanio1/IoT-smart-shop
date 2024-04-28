package com.example.qrcoderesolver.repository;

import com.example.qrcoderesolver.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query("SELECT q FROM Product q WHERE q.id = :id")
    Product findProductById(Integer id);
}
