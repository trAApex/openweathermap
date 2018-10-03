import React from "react";

import Titles from './components/Titles';
import Form from './components/Form';
import Weather from "./components/Weather";

const API_KEY = "996a1ab9cd1da02350e8a73a1f1e0315";

class App extends React.Component {

    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        icon: '',
        error: undefined
    }

    getWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`)
        const data = await api_call.json();

        if(city && country) {
            this.setState({ 
                temperature: data.main.temp,
                city: data.name,
                country: data.sys.country,
                humidity: data.main.humidity,
                description: data.weather[0].description,
                icon: data.weather[0].icon,
                error: ""
            });
        } else {
            this.setState({ 
                temperature: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                description: undefined,
                icon: undefined,
                error: "Please enter the value."
            });
            
        }
    }
    render() {
        return(
            <div>
                <div className="wrapper">
                    <div className="main">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-5 title-container">
                                    <Titles />
                                </div>
                                <div className="col-xs-7 form-container">
                                    <Form getWeather={this.getWeather}/>
                                    <Weather 
                                        temperature={this.state.temperature}
                                        city= {this.state.city}
                                        country= {this.state.country}
                                        humidity= {this.state.humidity}
                                        description= {this.state.description}
                                        icon= {this.state.icon}
                                        error= {this.state.error}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};



export default App;