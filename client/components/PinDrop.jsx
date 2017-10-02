import React from 'react'
import Nav from './Nav.jsx'

class PinDrop extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      Name: '',
      eventTitle: '',
      Description: '',

    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange (e) {
    //Update form as user inputs text
    e.preventDefault();
    var key = e.target.name
    var value = e.target.value
    this.setState({ [key]: value })
  }

  onSubmit (e) {
    //Axios request for signing up
    e.preventDefault();
    var name = this.state.name;
    var eventTitle = this.state.eventTitle;
    var Description = this.state.Description;
    var obj = {
      name: name,
      eventTitle: eventTitle,
      Description: Description
    }

      this.props.partyInfo(obj);


    }

    render() {
      return (
        <div className="container">
          <div className="row">
            <div className="center-block">
              <form className="signup-form" id="signup" onSubmit={this.onSubmit.bind(this)}>
                <label>Name: </label>
                <input onChange={this.onChange.bind(this)} type="text" name="name" />
                <label>Event Title: </label>
                <input onChange={this.onChange.bind(this)} type="text" name="eventTitle" />
                <label>Description: </label>
                <input onChange={this.onChange.bind(this)} type="text" name="Description" />
                <input type='submit'  value='Party Time!'/>
                <button onClick={this.props.onClick}>Save Party</button>
              </form>
              </div>
            </div>
          </div>
        );
      }
}

export default PinDrop
