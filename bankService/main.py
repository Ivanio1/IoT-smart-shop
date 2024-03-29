import socket
import random

HOST = '127.0.0.1'
PORT = 65432


def process_request(data):
    return "OK" if random.random() < 0.95 else "Error"


def run_server():
    while True:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.bind((HOST, PORT))
            s.listen()
            while True:
                conn, addr = s.accept()
                with conn:
                    print('Connected by', addr)
                    data = conn.recv(1024)
                    result = process_request(data.decode())
                    conn.sendall(result.encode())


if __name__ == "__main__":
    run_server()
