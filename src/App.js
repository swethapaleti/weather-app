import { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    weatherData: {},
    city: "",
    isSuccess: false,
  };

  inputCity = (e) => {
    this.setState({
      city: e.target.value,
    });
  };
  
enterData = (e)=>{
  if (e.key==="Enter"){
    this.getData()
  }
}

  getData = async () => {
    const { city } = this.state;
    try {
        const data =
          await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=959b8b9c5403ef4ef29ff6ffd30ce8c7&units=metric`);
        if (data.ok === true) {
          const result = await data.json();
          console.log(result);
          this.setState({
            weatherData: result,
            isSuccess: true,
            city: "",
          });
        }
      }
     catch (e) {
      console.log(e);
    }
  };

  renderData = () => {
    const { weatherData } = this.state;
    const { name, sys, weather, main } = weatherData;
    const { country } = sys;
    const { temp } = main;
    const { icon, description } = weather["0"];
    return (
      <div className="weather-container">
        <h1 className="heading">
          {name}
          <span className="country">{country}</span>
        </h1>
        <h1 className="temp">{temp}</h1>
        <img className="icon"
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="city-img"
        />
        <p className="text">{description}</p>
      </div>
    );
  };

  render() {
    const { city, isSuccess } = this.state;
    return (
      <div className="bg-container">
        <div className="input-container"> <input className="input"
          onKeyDown={this.enterData}
          placeholder="Enter Your City Name"
          onChange={this.inputCity}
          value={city}
        />
        <button className="btn" type="button" onClick={this.getData}>Go</button>
        </div>
       
        {isSuccess && this.renderData()}
      </div>
    )
  }
}

export default App;
