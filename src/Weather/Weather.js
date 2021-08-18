import React, { Component } from 'react'
import axios from 'axios'
export class Weather extends Component {
    state = {
        data : null,
        curr : null
    }
    async componentDidMount(){
        const res = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${this.props.location.key}?apikey=${process.env.REACT_APP_WEATHER_API_KEY}`)
        const curr = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${this.props.location.key}?apikey=${process.env.REACT_APP_WEATHER_API_KEY}`)
        this.setState({data:res.data, curr:curr})
    }
    render() {
        const {data, curr} = this.state;
        return (
            <div>
                {data && curr &&
                <div className="container mt-5">
                    <div className="row">
                        <h1 className="text-center" >Current conditions for {this.props.location.name}</h1>
                        <div className="card text-center">
                            <div className="card-body">
                                <h5 className="card-title">{curr.data[0].WeatherText}</h5>
                                <p className="card-text">{curr.data[0].Temperature.Imperial.Value}f out right now.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row g-2 row-cols-md-5">
                        <h1 className="text-center" >5 day forecast for {this.props.location.name}</h1>
                        {data.DailyForecasts.map(e => {
                            return <div key={e.id} className="col">
                                <div className="card mt-2">
                                    <div className="card-body">
                                    <h5 className="card-title">Forecast for {e.Date}</h5>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">Low of {e.Temperature.Minimum.Value}{e.Temperature.Minimum.Value < 70 ? <i className="fas fa-snowman"></i> : <i className="fas fa-fire"></i> }</li>
                                            <li className="list-group-item">High of {e.Temperature.Maximum.Value}{e.Temperature.Minimum.Value < 70 ? <i className="fas fa-snowman"></i> : <i className="fas fa-fire"></i> }</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                    <div className="
                    "></div>
                </div>
                }
            </div>
        )
    }
}

export default Weather


