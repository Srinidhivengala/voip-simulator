import socket
import time
import threading
import argparse
import requests

parser = argparse.ArgumentParser()
parser.add_argument("--listen-port", type=int, required=True)
parser.add_argument("--node-url", required=True)
args = parser.parse_args()

listen_port = args.listen_port
node_url = args.node_url

recv_count = 0

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind(("0.0.0.0", listen_port))

def receive_packets():
    global recv_count
    while True:
        data, addr = sock.recvfrom(1024)
        recv_count += 1

def post_stats():
    global recv_count
    while True:
        payload = {
            "received": recv_count
        }
        try:
            requests.post(f"{node_url}/update", json=payload, timeout=1.0)
        except Exception:
            pass
        time.sleep(1.0)

if __name__ == "__main__":
    threading.Thread(target=receive_packets).start()
    threading.Thread(target=post_stats).start()
    print(f"[RECV] listening on ('0.0.0.0', {listen_port})")
