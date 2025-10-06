import socket
import time
import threading
import argparse
import random
import requests

parser = argparse.ArgumentParser()
parser.add_argument("--peer-ip", required=True)
parser.add_argument("--peer-port", type=int, required=True)
parser.add_argument("--node-url", required=True)
args = parser.parse_args()

peer_ip = args.peer_ip
peer_port = args.peer_port
node_url = args.node_url

sent_count = 0
dropped_count = 0
packet_loss = 0.02  # 2%
jitter = 30  # ms

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

def send_packets():
    global sent_count, dropped_count
    while True:
        time.sleep(0.02)  # ~50 packets/sec
        sent_count += 1
        if random.random() < packet_loss:
            dropped_count += 1
            continue
        jitter_delay = random.uniform(0, jitter) / 1000.0
        time.sleep(jitter_delay)
        sock.sendto(b"VoIP packet", (peer_ip, peer_port))

def post_stats():
    global sent_count, dropped_count
    while True:
        payload = {
            "sent": sent_count,
            "dropped": dropped_count,
            "packet_loss": packet_loss,
            "jitter_ms": jitter
        }
        try:
            requests.post(f"{node_url}/update", json=payload, timeout=1.0)
        except Exception:
            pass
        time.sleep(1.0)

if __name__ == "__main__":
    threading.Thread(target=send_packets).start()
    threading.Thread(target=post_stats).start()
    print(f"[SIM] sending to {peer_ip}:{peer_port} at ~50 pps")
