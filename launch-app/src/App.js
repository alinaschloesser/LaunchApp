import React, { Component } from 'react';
import './App.css';





class Form extends Component {
  constructor(props){
    super(props);
    this.state = {
      form: {
        id:"",
        startDate:"YYYY-MM-DD",
        endDate:"YYYY-MM-DD"
      },
      dates:[],
      displayNewSearch: false,
      searchResults:''
    }
  }

  componentDidMount() {
    
   }

  handleChange = (e) => {
    let form= this.state.form;
    form[e.target.name] = e.target.value;
    this.setState({form})
  }

  search = (form) => { 
    const newSearchId = Date.now();
    const newSearch = {
      id: newSearchId,
      startDate: form.startDate,
      endDate: form.endDate
    }
    // let resultsData = [];  

    this.state.dates.push(newSearch);
    fetch(`https://launchlibrary.net/1.2/launch/${this.state.form.startDate}/${this.state.form.endDate}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({ searchResults: data.launches}); 
        console.log(this.state.searchResults)
      })
    }

  displayNewSearch = () => {
    this.setState({displayNewSearch: !this.state.displayNewSearch})
  }

  render(){
    let display = this.state.displayNewSearch ? "none" : "block"
    let display2 = this.state.displayNewSearch ? "block" : "none" 
    return(
    <div>
      <div className="box form" >
        <div className="field" style={{display:display}}>
          <label className="label">Start Date</label>
          <div className="control">
            <input className="input" type="text" onChange={this.handleChange} name="startDate" placeholder="YYYY-MM-DD" />
          </div>
          <label className="label">End Date</label>
          <div className="control">
            <input className="input" type="text" onChange={this.handleChange} name="endDate" placeholder="YYYY-MM-DD" />
          </div>
        </div>
        <div className="control" style={{display:display}}>
          <button className="button is-link" onClick={()=>{this.search(this.state.form); this.displayNewSearch()}}>Submit</button>
        </div>
        <div className="control">
          <button className="button is-link newSearch" style={{display:display2}} onClick={this.displayNewSearch}>New Search</button>
        </div>
      </div>
      <div>
     {this.state.searchResults && this.state.searchResults.length && this.state.searchResults.map((launch)=>
          <SearchResults
            key={launch.id} 
            name={launch.name}
            windowstart={launch.windowstart}
            rocketName={launch.rocket.name}
            // {launch.rocket.agencies.map((agency)=>
            spaceAgencies= {launch.rocket.agencies[0].name}
            locationName= {launch.location.name}
            img={launch.rocket.imageURL}
          // )}
          />
        )}
 
      </div>
    </div>
    )
  }

}


class SearchResults extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <div className="box">
        <ul>
          <li>Launch Name: {this.props.name}</li>
          <li>Launch Window Start Time: {this.props.windowstart}</li>
          <li>Rocket Name: {this.props.rocketName}</li>
          <li>List of Space Agencies: {this.props.spaceAgencies}</li>
          <li>Launch Location Name/Country: {this.props.locationName}</li>
          <li>A Thumbnail Image of the Rocket: {this.props.img}</li>
          <li className="button">Favorites Button</li>
        </ul>
      </div>
    )
  }

}






class App extends Component {
  render() {
    return (
      <div className="App">
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Launch App
              </h1>
              <h2 className="subtitle">
                choose a date to search
              </h2>
            </div>
          </div>
        </section>
        <section className="clearfix formContainer">
          <Form />
        </section>

      </div>
    );
  }
}

export default App;
