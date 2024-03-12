package com.example.qrcoderesolver.model;

public class ResponseMessage {
    private int status;
    private Object answer;

    public ResponseMessage(int status, Object answer) {
        this.status = status;
        this.answer = answer;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public Object getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}