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
      favArr:[],
      displayNewSearch: false,
      searchResults:''
    }
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


    fetch(`https://launchlibrary.net/1.2/launch/${this.state.form.startDate}/${this.state.form.endDate}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({ searchResults: data.launches}); 
        console.log(this.state.searchResults)
      })
    }

  getFav = (id) => {
    console.log(id)
    const launchId = id;
    const filterById = (item)=>{
      if(item.id === launchId){
        return true;
      }
    }
    const fav = this.state.searchResults.filter(filterById);
    console.log(fav);
    this.props.handleFav(fav)
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
          <LaunchResults
            key={launch.id}
            id={launch.id}  
            name={launch.name}
            windowstart={launch.windowstart}
            rocketName={launch.rocket.name}
            // {launch.rocket.agencies.map((agency)=>
            spaceAgencies= {launch.rocket.agencies[0].name}
            locationName= {launch.location.name}
            img={launch.rocket.imageURL}
            getFav= {this.getFav}
          // )}
          />
        )}
 
      </div>
    </div>
    )
  }

}


class LaunchResults extends Component {
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
        <div className="button favs"  id={this.props.id} onClick={()=> {this.props.getFav(this.props.id)}}><i className="fa fa-star-o" aria-hidden="true"></i>  Add to Favorites</div>
      </div>
    )
  }

}


class Favorites extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }

  removeFav = () => {

  }
  render(){
    let favArr = this.props.favArr;
    return(
      <div>
      {favArr && favArr.length && favArr.map((fav)=>
      <LaunchResults 
        key={fav.id} 
        name={fav.name}
        windowstart={fav.windowstart}
        rocketName={fav.rocket.name}
        spaceAgencies= {fav.rocket.agencies[0].name}
        locationName= {fav.location.name}
        img={fav.rocket.imageURL}
      />
    )}
      </div>
    )
  }
}



class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      formPage: false,
      favArr: [] 
    }
  }

  handlePage = () => {
    this.setState({formPage: !this.state.formPage})
    console.log(this.state.formPage)
  }

  handleFav = (launch) => {
    console.log(launch);
    this.state.favArr.push(launch[0]);
    console.log(`favArr: ${this.state.favArr}`)
  }

  renderPage = () => {
    if(!this.state.formPage){
      return (
        <Form 
        handleFav = {this.handleFav}
        />
        )
    }else{
      return(
        <Favorites 
        favArr= {this.state.favArr}

        />
        )
    }

  }

  render() {
    return (
      <div className="Main">
        <section className="hero">
          <div className="hero-body">
            <div className="container">

              <h1 className="title">
                Launch App
              </h1>
              <h2 className="subtitle">
                choose a date to search
              </h2>
              <div onClick={()=>{this.handlePage()}} className="button is-link favLink"><i className="fa fa-star-o" aria-hidden="true"></i>  Favorites</div>
            </div>
          </div>
        </section>
        <section className="clearfix formContainer">
          {this.renderPage()}
        </section>

      </div>
    );
  }
}

export default Main;
