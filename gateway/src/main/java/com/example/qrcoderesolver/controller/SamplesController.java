package com.example.qrcoderesolver.controller;

import java.io.IOException;
import java.util.List;

import com.example.qrcoderesolver.model.OrderService;
import com.example.qrcoderesolver.model.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/samples")
public class SamplesController {
    private OrderService orderService;

    @GetMapping("/get-all")
    public ResponseEntity<List<Product>> getAllProducts() throws IOException, InterruptedException {
        return ResponseEntity.ok(orderService.getSamples());
    }

}

