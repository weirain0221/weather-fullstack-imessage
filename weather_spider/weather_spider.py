from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

API_KEY = "5ba874a80044439c2660cd9411822417"

def send_imessage(msg):
    # ⚠️ 請把下面的引號內換成「你自己的 Apple ID (Email)」或「綁定 iMessage 的手機號碼」
    # 因為是傳給自己，所以接收者就是你自己
    MY_APPLE_ID = "chenboss0221@gmail.com" 
    
    # 用 AppleScript 控制「訊息」App 的指令
    script = f'tell application "Messages" to send "{msg}" to buddy "{MY_APPLE_ID}"'
    
    # 讓 Mac 系統執行這行指令
    os.system(f"osascript -e '{script}'")

@app.route('/api/weather', methods=['POST'])
def get_weather():
    req_data = request.get_json()
    city = req_data.get('city', 'Taipei')

    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric&lang=zh_tw"
    response = requests.get(url)

    if response.status_code == 200:
        weather_data = response.json()
        
        # 1. 萃取天氣資料
        temp = weather_data["main"]["temp"]
        feels_like = weather_data["main"]["feels_like"]
        humidity = weather_data["main"]["humidity"]
        weather_desc = weather_data["weather"][0]["description"]
        
        # 2. 組裝訊息文字（注意：iMessage 的換行是用 \n）
        apple_msg = f"陳任任天氣報：網頁有人查詢了【{city}】！\n⛅ 天氣：{weather_desc}\n Temp：{temp}°C (體感 {feels_like}°C)\n💧 濕度：{humidity}%"
        
        # 3. 觸發 Mac 發送 iMessage
        print(f"🚀 正在透過 Mac 訊息 App 發送 iMessage 通知到你的 iPhone...")
        send_imessage(apple_msg)
        
        return jsonify(weather_data), 200
    else:
        return jsonify({"error": "找不到城市"}), 404
if __name__ == '__main__':
    print("🚀 Python 天氣後端伺服器已啟動！正在監聽 http://127.0.0.1:8000")
    app.run(port=8000, debug=True)