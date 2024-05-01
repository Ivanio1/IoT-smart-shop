package com.example.qrcoderesolver.model;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    public List<Product> getSamples(String token) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .header("Authorization", "Bearer "+token)
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

    public List<Product> getProductsByTitle(String title, String token) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .header("Authorization", "Bearer "+token)
                .uri(URI.create("http://213.159.215.149:8080/order/Order/get-products-by-title?title=" + title))
                .build();

        return getProducts(request);
    }

    public int addItemRequest(Long productId, String token) throws IOException, InterruptedException {
        String body = "{\"itemId\": " + productId + "}";
        HttpRequest request = HttpRequest.newBuilder()
                .header("Authorization", "Bearer "+token)
                .header("content-type", "application/json")
                .uri(URI.create("http://213.159.215.149:8080/order/Order/add-item-request"))
                .method("POST", HttpRequest.BodyPublishers.ofString(body))
                .build();
        HttpClient client = HttpClient.newHttpClient();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        return response.statusCode();
    }
    @AllArgsConstructor
    public static class AddItemRequest {
        Long itemId;
    }
}