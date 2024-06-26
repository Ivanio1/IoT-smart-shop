package com.example.qrcoderesolver.controller;

import java.io.IOException;
import java.util.List;

import com.example.qrcoderesolver.model.OrderService;
import com.example.qrcoderesolver.model.Product;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private final OrderService service;


    @GetMapping("/get-by-title")
    public ResponseEntity<List<Product>> getByTitle(@RequestParam String title, HttpServletRequest request) throws IOException, InterruptedException {
        return ResponseEntity.ok(service.getProductsByTitle(title,request.getHeader("Authorization")));
    }

    @PostMapping("/add-item-request")
    public ResponseEntity<Void> addItemRequest(@RequestParam Long productId,HttpServletRequest request) throws IOException, InterruptedException {
        return ResponseEntity.status(service.addItemRequest(productId,request.getHeader("Authorization"))).build();
    }
}
