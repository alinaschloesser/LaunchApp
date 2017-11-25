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
    this.state.dates.push(newSearch);
    fetch(`https://launchlibrary.net/1.2/launch/${this.state.form.startDate}/${this.state.form.endDate}`, {method: 'GET'})
        .then(res => {return (res.json())})

       .then(launches => { this.setState({ searchResults: launches}); console.log(this.state.SearchResults);})

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
     {this.state.searchResults && this.state.searchResults.length && this.state.searchResults.launches.map((launch)=>
          <SearchResults
            key={launch.id} 
            name={launch.name}
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
      <div>
        <ul>
          <li>Name:{this.props.name}</li>
          <li>Launch Window Start Time</li>
          <li>Rocket Name</li>
          <li>List of Space agencies</li>
          <li>Launch Location Name/Country</li>
          <li>A Thumbnail Image of the Rocket</li>
          <li>Favorites Button</li>
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
