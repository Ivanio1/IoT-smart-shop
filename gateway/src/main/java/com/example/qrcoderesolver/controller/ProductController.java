package com.example.qrcoderesolver.controller;

import com.example.qrcoderesolver.model.Product;
import com.example.qrcoderesolver.model.ProductType;
import com.example.qrcoderesolver.model.ResponseMessage;
import com.example.qrcoderesolver.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.net.HttpURLConnection;
import java.net.ProtocolException;
import java.net.URI;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {

    private final ProductRepository productRepository;
  // private final RabbitService rabbitService;

    @GetMapping()
    public ResponseMessage getProduct(@RequestParam Integer id) {
        Product product = productRepository.findProductById(id);
        if ((product != null)) {
            System.out.println("OK");
            return new ResponseMessage(200, product);
        } else return new ResponseMessage(404, "Not found!");
    }


//    @GetMapping("/test")
//    public void push() {
//        rabbitService.sendToTerminal(List.of(1, 2, 3, 4, 5));
//    }

    @GetMapping("/getall")
    public ResponseMessage getAllProducts() {

        List<Product> productList = new ArrayList<>();

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .header("Authorization","Bearr eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0ZXN0IiwiaWF0IjoxNzExODA0NTA3LCJleHAiOjE3NDMzNjIxMDcsImF1ZCI6Ind3dy5leGFtcGxlLmNvbSIsInN1YiI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJ1aWQiOiIxIn0.ZDiN7xEbql2tsSz_3WbKOSSr7Llt1XmXQGjgZro5jLk")
                .uri(URI.create("http://213.159.215.149:8080/order/Order/get-products"))
                .build();

        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            String responseBody = response.body();
            ObjectMapper objectMapper = new ObjectMapper();
            Product[] products = objectMapper.readValue(responseBody, Product[].class);
            productList.addAll(Arrays.asList(products));
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseMessage(200, productList);
    }

}
