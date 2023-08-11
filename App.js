import logo from './logo.svg';
import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButton from './component/TopButton';
import Input from './component/Input';
import TimeandLocation from './component/TimeandLocation';
import TemperatureAndDet from './component/TemperatureAndDet';
import Forecast from './component/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';
// import getWeatherData from './services/weatherService';

// import getFormattedWeatherData from './services/weatherService';


function App() {

const[query , setQuery] = useState({q:'Jaipur'});

const[units,setUnits] = useState('metric');
const[weather ,setWeather] =useState(null);


useEffect(()=>{
  const fetchWeather = async()=>{
    const data = await getFormattedWeatherData({...query,...units}).then((data)=>{
      setWeather(data);
    });
    console.log(data);
    };

    fetchWeather();
} ,[query ,units]);

 const formatBackground = ()=>{
  if(!weather) return  'from-cyan-700  to-blue-700 ';
  const thresold =20;
  if(weather.num <= thresold) return  'from-cyan-700  to-blue-700 '

  else{
    return 'from-yellow-700 to-orange-700'
  }

 }
 
  
  return (
    //{`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <TopButton setQuery = {setQuery}/>
  <Input setQuery=  {setQuery}/>

{weather && (
  <div> 
 
  <TimeandLocation weather = {weather}/>
   <TemperatureAndDet weather= {weather}/>
   <Forecast title="Hourly Forecast"/>
   <Forecast title="Daily Forecast"/>
</div>
)}

  
   

    </div>
  );
}

export default App;
