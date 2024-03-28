package com.example.qrcoderesolver.controller;


import com.example.qrcoderesolver.model.Product;
import com.example.qrcoderesolver.model.ResponseMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.OutputStream;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.ArrayList;

@RestController
@RequiredArgsConstructor
@RequestMapping("/pay")
public class PaymentController {

    @PostMapping()
    public ResponseMessage getProduct(@RequestParam String type) {
       // if ((orders != null)) {
//            for (Product el : orders) {
//                System.out.println(el.toString());
//            }

//            if(type.equals("applePay")) ...
//            if(type.equals("sbp")) ...


            String serverAddress = "127.0.0.1";
            int serverPort = 65432;

            try (Socket socket = new Socket(serverAddress, serverPort)) {
                OutputStream out = socket.getOutputStream();
                out.write(type.getBytes());
                out.flush();

                byte[] buffer = new byte[1024];
                int bytesRead = socket.getInputStream().read(buffer);
                String response = new String(buffer, 0, bytesRead);
                System.out.println(response);

            } catch (IOException e) {
            }


            return new ResponseMessage(200, "OK");
        //} else return new ResponseMessage(404, "Not found!");
    }
}
