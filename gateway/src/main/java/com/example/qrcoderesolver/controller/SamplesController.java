package com.example.qrcoderesolver.controller;

import java.io.IOException;
import java.util.Comparator;
import java.util.List;

import com.example.qrcoderesolver.model.OrderService;
import com.example.qrcoderesolver.model.Product;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/samples")
public class SamplesController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/get-all")
    public ResponseEntity<List<Product>> getAllProducts(HttpServletRequest request) throws IOException, InterruptedException {
        return ResponseEntity.ok(orderService.getSamples(request.getHeader("Authorization")));
    }

    @GetMapping("/title/consume")
    public ResponseEntity<Product> consumeQrCode(@RequestParam String title, HttpServletRequest request) throws IOException, InterruptedException {
        var productO = orderService.getProductsByTitle(title,request.getHeader("Authorization")).stream().max(Comparator.comparingInt(Product::getExpirationPoints));
        return productO.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}

