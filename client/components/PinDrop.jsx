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
    //Updates state as user inputs any text value into the forms defined in the render section. 
    e.preventDefault();
    var key = e.target.name
    var value = e.target.value
    this.setState({ [key]: value })
  }

  onSubmit (e) {
      // setting the text input values from the Host Party form, and then sets them to an object.
      // partyInfo, which is sent down from App.jsx, is then called with this object. 
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
          <div className="row text-center">
            <div className="center-block">
              <form className="signup-form form-inline" id="signup" onSubmit={this.onSubmit.bind(this)}>
                <label>Name: </label>
                <input className="form-control" onChange={this.onChange.bind(this)} type="text" name="name" />
                <label>Event Title: </label>
                <input className="form-control" onChange={this.onChange.bind(this)} type="text" name="eventTitle" />
                <label>Description: </label>
                <input className="form-control" onChange={this.onChange.bind(this)} type="text" name="Description" />
                <input type='submit'  value='Party Time!'/>
              </form>
              </div>
              <button className="btn center-block" onClick={this.props.onClick}>Save Party</button>
            </div>

        );
      }
}

export default PinDrop
