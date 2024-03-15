package com.example.qrcoderesolver.controller;

import com.example.qrcoderesolver.model.Product;
import com.example.qrcoderesolver.model.ResponseMessage;
import com.example.qrcoderesolver.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {

    private final ProductRepository productRepository;

    @GetMapping()
    public ResponseMessage getProduct(@RequestParam Integer code) {
        Product product = productRepository.findByCode(code);
        if ((product != null)) {
            System.out.println("OK");
            return new ResponseMessage(200, product);
        } else return new ResponseMessage(404, "Not found!");
    }
}
