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
      <div className="box clearfix">
        <div className="media clearfix">
          <div className="media-left">
            <figure className="image is-64x64">
              <img src={this.props.img} />
            </figure>
          </div>
          <div className="media-content"> 
            <h3 className="subtitle launchName">{this.props.name}</h3>
          </div>
        </div>
        <ul className="content">
          <li><p className="name">Launch Window Start Time:</p> {this.props.windowstart}</li>
          <li><p className="name">Rocket Name:</p> {this.props.rocketName}</li>
          <li><p className="name">List of Space Agencies:</p> {this.props.spaceAgencies}</li>
          <li><p className="name">Launch Location Name/Country:</p> {this.props.locationName}</li>
        </ul>
                  <div className="button favs"><i className="fa fa-star-o" aria-hidden="true"></i>  Add to Favorites</div>
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
              <a href="" className="is-link favLink"><i className="fa fa-star-o" aria-hidden="true"></i>  Favorites</a>
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
