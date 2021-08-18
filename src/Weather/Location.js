import React, { Component } from 'react'

export class Location extends Component {
    state = {
        text:  ''
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.text === ''){
            this.props.setAlert('Please enter something', 'dark')
        }else {
            this.props.searchLocations(this.state.text);
            // this.setState({text: ''})
        }
    }
    btnSubmit = (e) => {
        let location = {
            name : e.target.name,
            key : e.target.id
        }
        e.preventDefault();
        this.props.setLocation(location)
    }
    render() {
        return (
            <div className="container" >
                <form onSubmit={this.onSubmit} >
                <div class="input-group mt-5 mb-3">
                    <input type="text" name="text" onChange={this.onChange} class="form-control" placeholder="Please enter a city or zip" aria-label="Please enter a city or zip" aria-describedby="button-addon2"/>
                    <button class="btn btn-outline-secondary" type="submit" id="button-addon2">Zoom!</button>
                </div>
                </form>
                {!this.props.data ? '' : 
                <div className="row row-cols-md-3 g-5" >
                    {this.props.data.map((location, i) => {
                        return <div key={i} className="col">
                        <div  className="card" style={{width: "18rem"}}>
                            <div className="card-body">
                                <h5 className="card-title">{`${location.EnglishName}, ${location.AdministrativeArea.ID}, ${location.PrimaryPostalCode}`}</h5>
                                <button onClick={this.btnSubmit} name={location.EnglishName} id={location.Key} className="btn btn-info">View</button>
                            </div>
                        </div>
                    </div>
                    })}
                </div> }
            </div>
        )
    }
}

export default Location
