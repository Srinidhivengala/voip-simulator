
# 📡 VOIP Simulator

![GitHub stars](https://img.shields.io/github/stars/Srinidhivengala/voip-simulator?style=social)
![GitHub forks](https://img.shields.io/github/forks/Srinidhivengala/voip-simulator?style=social)
![License](https://img.shields.io/badge/license-MIT-blue)

A **Voice Over IP (VoIP) Simulator** designed for testing, learning, and experimenting with VoIP protocols, signaling, and media streaming.

---

## 📖 Project Description

The VOIP Simulator is a software tool that mimics the core functionalities of a VoIP system.  
It provides simulation of call initiation, session management, RTP (Real-Time Protocol) streams, and basic signaling.  

**Key Features:**
- SIP signaling simulation
- Call setup and teardown
- RTP media streaming simulation
- Logging and monitoring
- Configurable parameters
- CLI or GUI interface

---

---

## ⚙️ Tech Stack

- **Language:** Python
- **Protocols:** SIP, RTP
- **Tools:** Wireshark (optional), Postman  
- **Others:** Socket programming, Threading for concurrency

---

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/voip-simulator.git
cd voip-simulator

python main.py --config config/settings.json
[INFO] SIP INVITE sent to User B
[INFO] 180 Ringing received
[INFO] 200 OK received
[INFO] ACK sent, call established
[RTP STREAMING] Sending audio packets...
[INFO] BYE sent, call terminated


## 📊 Call Flow Diagram

