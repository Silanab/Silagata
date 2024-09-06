import axios from 'axios';

let handler = async (m, { args }) => {
  if (!args[0]) throw "*اكتب اسم المدينة او البلد الذي تريد ان تعرف مناخه*";
  
  try {
    const cityName = args.join(' '); // Join args if multiple words are provided
    const apiKey = '060a6bcfa19809c2cd4d97a212b19273'; // Replace with your actual API key
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&units=metric&appid=${apiKey}`);
    
    const data = response.data;
    const name = data.name;
    const country = data.sys.country;
    const weather = data.weather[0].description;
    const temperature = `${data.main.temp}°C`;
    const minTemperature = `${data.main.temp_min}°C`;
    const maxTemperature = `${data.main.temp_max}°C`;
    const humidity = `${data.main.humidity}%`;
    const wind = `${data.wind.speed} km/h`;
    
    const weatherReport = `「 📍 」PLACE: ${name}\n「 🗺️ 」COUNTRY: ${country}\n「 🌤️ 」VIEW: ${weather}\n「 🌡️ 」TEMPERATURE: ${temperature}\n「 💠 」MINIMUM TEMPERATURE: ${minTemperature}\n「 📛 」MAXIMUM TEMPERATURE: ${maxTemperature}\n「 💦 」HUMIDITY: ${humidity}\n「 🌬️ 」WINDSPEED: ${wind}\n\nللمزيد من المعلومات، تواصل معنا عبر قناتنا على الواتساب: https://whatsapp.com/channel/0029VacrIfU3LdQdklKFR419`;
    
    m.reply(weatherReport);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return "*ERROR: Unable to fetch weather data*";
  }
};

handler.help = ['climate'];
handler.tags = ['الطقس'];
handler.command = /^(climate|weather)$/i;

export default handler;
