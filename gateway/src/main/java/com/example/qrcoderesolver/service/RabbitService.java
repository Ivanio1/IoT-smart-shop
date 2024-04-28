package com.example.qrcoderesolver.service;

import java.util.List;

import javax.sound.midi.Receiver;

import com.example.qrcoderesolver.config.RabbitConfig;
import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RabbitService {

    private final RabbitTemplate rabbitTemplate;
    private final Receiver receiver;

    public void sendToTerminal(List<Integer> products) {
        rabbitTemplate.convertAndSend(RabbitConfig.TOPIC_EXCHANGE_NAME, "terminal.order", products);
    }
}
