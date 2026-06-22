console.log("Hello Weather App");

const apiKey = "5ba874a80044439c2660cd9411822417";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const backBtn = document.getElementById("backBtn");

function displayWeather(data){
    console.log(data);

    document.getElementById("searchArea").style.display = "none";
    document.getElementById("weatherInfo").classList.add("active");

    let iconCode = data.weather[0].icon;
    let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    let iconImg = document.getElementById("weatherIcon");
    iconImg.src = iconUrl;
    iconImg.style.display = "block";

    document.getElementById("tempValue").innerText = data.main.temp;
    document.getElementById("feels_like_Value").innerText = data.main.feels_like;
    document.getElementById("humidityValue").innerText = data.main.humidity;
    document.getElementById("windValue").innerText = data.wind.speed;

            
    let weatherMain = data.weather[0].main;

    if (weatherMain === "Clear") {
        document.body.style.background = "linear-gradient(135deg, #fef08a 0%, #f97316 100%)";
    } 
    else if (weatherMain === "Rain" || weatherMain === "Drizzle") {
        document.body.style.background = "linear-gradient(135deg, #94a3b8 0%, #475569 100%)";
    } 
    else if (weatherMain === "Clouds") {
        document.body.style.background = "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)";
    } 
    else {
        document.body.style.background = "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)";
    }
}

searchBtn.onclick = function(){
    let city = cityInput.value;
    
    if (!city) {
        alert("請輸入城市名稱！");
        return;
    }

    // 💡 改成連線到你自己的 Python 伺服器
    let url = 'http://127.0.0.1:8000/api/weather';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ city: city }) // 把使用者輸入的城市打包傳過去
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("找不到該城市");
        }
        return response.json();
    })
    .then(data => displayWeather(data))
    .catch(error => {
        alert("❌ 搜尋失敗，請檢查城市名稱是否正確（需輸入英文，如 Taipei）");
        console.error(error);
    });
}

cityInput.addEventListener("keydown", function(event){
    if(event.key == "Enter"){
        searchBtn.onclick();
    }
})

window.onload = function(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            let apiKey = "5ba874a80044439c2660cd9411822417";
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            fetch(url)
                .then(response => response.json())
                .then(data => displayWeather(data));
        });
    }
}

backBtn.onclick = function(){
    document.getElementById("searchArea").style.display = "block";
    document.getElementById("weatherInfo").classList.remove("active");

    cityInput.value = "";
    cityInput.focus();
}