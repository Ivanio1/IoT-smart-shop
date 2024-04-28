package com.example.qrcoderesolver.controller;

import com.example.qrcoderesolver.model.Product;
import com.example.qrcoderesolver.model.ResponseMessage;
import com.example.qrcoderesolver.repository.ProductRepository;
import com.example.qrcoderesolver.service.RabbitService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {

    private final ProductRepository productRepository;
    private final RabbitService rabbitService;

    @GetMapping()
    public ResponseMessage getProduct(@RequestParam Integer code) {
        Product product = productRepository.findProductById(code);
        if ((product != null)) {
            System.out.println("OK");
            return new ResponseMessage(200, product);
        } else return new ResponseMessage(404, "Not found!");
    }


    @GetMapping("/test")
    public void push() {
        rabbitService.sendToTerminal("lol");
    }

    @GetMapping("/getall")
    public ResponseMessage getAllProducts() {
//        запрос на orderservice

        List<Product> productList = new ArrayList<>();

//        productList.add(new Product(1, "Хлеб бородинский", 9999,"Мука, вода, соль, дрожжи",50,"Свежий"));
//        productList.add(new Product(2, "Молоко",8888, "Молоко",80,"Не свежий"));
//        productList.add(new Product(3, "Хлеб бородинский", 9999,"Мука, вода, соль, дрожжи",50,"Свежий"));
//        productList.add(new Product(4, "Молоко",8888, "Молоко",80,"Не свежий"));
//        productList.add(new Product(5, "Хлеб бородинский", 9999,"Мука, вода, соль, дрожжи",50,"Свежий"));
//        productList.add(new Product(6, "Молоко",8888, "Молоко",80,"Не свежий"));
//        productList.add(new Product(7, "Хлеб бородинский", 9999,"Мука, вода, соль, дрожжи",50,"Свежий"));
//        productList.add(new Product(8, "Молоко",8888, "Молоко",80,"Не свежий"));
//        productList.add(new Product(9, "Хлеб бородинский", 9999,"Мука, вода, соль, дрожжи",50,"Свежий"));
//        productList.add(new Product(10, "Молоко",8888, "Молоко",80,"Не свежий"));


//        if ((products != null)) {
//            System.out.println("OK");
//            return new ResponseMessage(200, products);
//        } else return new ResponseMessage(404, "Not found!");
        return new ResponseMessage(200, productList);
    }

}
