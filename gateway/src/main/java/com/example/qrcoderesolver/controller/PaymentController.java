package com.example.qrcoderesolver.controller;


import com.example.qrcoderesolver.model.Product;
import com.example.qrcoderesolver.model.ResponseMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequiredArgsConstructor
@RequestMapping("/pay")
public class PaymentController {

    @PostMapping()
    public ResponseMessage getProduct(@RequestParam String type, @RequestBody ArrayList<Product> orders) {
        System.out.println(type);
        if ((orders != null)) {
            for (Product el: orders){
                System.out.println(el.toString());
            }

//            if(type.equals("applePay")) ...
//            if(type.equals("sbp")) ...


            ///Логика отправки запроса в банк



            return new ResponseMessage(200, "OK");
        } else return new ResponseMessage(404, "Not found!");
    }
}
