import pika
import time

def consume_message(ch, method, properties, body):
    print("Received:", body.decode())

def main():
    credentials = pika.PlainCredentials('rmuser', 'rmpassword')
    parameters = pika.ConnectionParameters('localhost', 5672, '/', credentials)

    connection = pika.BlockingConnection(parameters)
    channel = connection.channel()

    channel.exchange_declare(exchange='order', exchange_type='topic')
    result = channel.queue_declare(queue='', exclusive=True)
    queue_name = result.method.queue

    channel.queue_bind(exchange='order', queue=queue_name, routing_key='#')

    print(' [*] Waiting for messages. To exit press CTRL+C')

    channel.basic_consume(queue=queue_name, on_message_callback=consume_message, auto_ack=True)

    try:
        channel.start_consuming()
    except KeyboardInterrupt:
        channel.stop_consuming()

    connection.close()

if __name__ == '__main__':
    while True:
        main()
        time.sleep(60)  # Wait for a minute before restarting the loop
