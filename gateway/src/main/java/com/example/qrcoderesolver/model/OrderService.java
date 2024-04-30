package com.example.qrcoderesolver.model;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    public List<Product> getSamples() throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .header("Authorization", "Bearr eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9" +
                        ".eyJpc3MiOiJ0ZXN0IiwiaWF0IjoxNzExODA0NTA3LCJleHAiOjE3NDMzNjIxMDcsImF1ZCI6Ind3dy5leGFtcGxlLmNvbSIsInN1YiI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJ1aWQiOiIxIn0.ZDiN7xEbql2tsSz_3WbKOSSr7Llt1XmXQGjgZro5jLk")
                .uri(URI.create("http://213.159.215.149:8080/order/Order/get-products"))
                .build();

        return getProducts(request);
    }

    private List<Product> getProducts(HttpRequest request) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        String responseBody = response.body();
        ObjectMapper objectMapper = new ObjectMapper();
        Product[] products = objectMapper.readValue(responseBody, Product[].class);
        return List.of(products);
    }

    public List<Product> getProductsByTitle(String title) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .header("Authorization", "Bearr eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9" +
                        ".eyJpc3MiOiJ0ZXN0IiwiaWF0IjoxNzExODA0NTA3LCJleHAiOjE3NDMzNjIxMDcsImF1ZCI6Ind3dy5leGFtcGxlLmNvbSIsInN1YiI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJ1aWQiOiIxIn0.ZDiN7xEbql2tsSz_3WbKOSSr7Llt1XmXQGjgZro5jLk")
                .uri(URI.create("http://213.159.215.149:8080/order/Order/get-products-by-title?title=" + title))
                .build();

        return getProducts(request);
    }

}
