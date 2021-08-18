import React, { Component, Fragment } from 'react'
import { NavBar } from './layout/NavBar'
import Weather from './Weather/Weather'
import Location from './Weather/Location'
import axios from 'axios'
export class App extends Component {
  state = {
    data : '',
    location: null
  }
  componentDidMount(){

  }
  render() {
    const searchLocations = async (loc) => {
      const res = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${process.env.REACT_APP_WEATHER_API_KEY}&q=${loc}`)
      this.setState({data:res.data})
    }
    const setLocation = async (loc) => {
      this.setState({location: loc})
    }
    return (
      <Fragment>
        <NavBar />
        {!this.state.location ? <Location data={this.state.data} setLocation={setLocation} searchLocations={searchLocations} /> : <Weather location={this.state.location} />}
        
      </Fragment>
    )
  }
}

export default App
