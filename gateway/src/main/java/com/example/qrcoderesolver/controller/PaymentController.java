package com.example.qrcoderesolver.controller;


import com.example.qrcoderesolver.model.Product;
import com.example.qrcoderesolver.model.ResponseMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.OutputStream;
import java.net.Socket;
import java.util.ArrayList;

@RestController
@RequiredArgsConstructor
@RequestMapping("/pay")
public class PaymentController {

    @PostMapping()
    public ResponseMessage getProduct(@RequestParam String type, @RequestBody ArrayList<Product> orders) {
        if ((orders != null)) {
            String serverAddress = "127.0.0.1";
            int serverPort = 65432;
            try (Socket socket = new Socket(serverAddress, serverPort)) {
                OutputStream out = socket.getOutputStream();
                out.write(type.getBytes());
                out.flush();
                byte[] buffer = new byte[1024];
                int bytesRead = socket.getInputStream().read(buffer);
                String response = new String(buffer, 0, bytesRead);
                if (response.equals("OK")) {
                    return new ResponseMessage(200, "Payment successful!");
                } else return new ResponseMessage(400, "Payment error!");

            } catch (IOException e) {
                return new ResponseMessage(500, "Bank service unavailable!");
            }
        } else return new ResponseMessage(404, "Not found!");
    }
}
