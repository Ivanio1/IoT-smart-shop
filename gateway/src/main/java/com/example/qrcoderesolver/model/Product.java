package com.example.qrcoderesolver.model;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Integer expirationPoints;
    private Integer expirationPointsDecreaseSpeed;
    private Double currentPrice;
    private String title;
    private ProductType productType;
    private Double initialPrice;

}
