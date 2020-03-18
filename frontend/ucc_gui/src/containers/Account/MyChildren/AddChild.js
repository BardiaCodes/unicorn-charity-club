import React from "react";
import "../Info/Account.css";
import "./MyChildren.css";
import ProfileForm from "../../../components/Account/ProfileForm"


/**
 * @description Creates a form for all details of individual child
 * @class AddChild
 * @implements BroweserRouter as Router
 * @extends React.Component
 * @type {AddChild}
 * @example <AddChild />
 * pre-condition: all the imports
 * post-condition: returns a form for all details of individual child
 * @param null
 * @returns {AddChild}
 */
class AddChild extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Name: "",
            DOB: "",
            Gender:"",
            School: "",
            SchoolGrade: "",
            Aboutme: "",
            FavoriteThing: "",
            Dream: "",
            SuperPowers: "",
            Support: "",
            Photo: "",
        }
    }


  render() {
      return (
          <div>
            <ProfileForm Name={this.state.Name}
                         DOB={this.state.DOB}
                         Gender={this.state.Gender}
                         School={this.state.School}
                         SchoolGrade={this.state.SchoolGrade}
                         Aboutme={this.state.Aboutme}
                         FavoriteThing={this.state.FavoriteThing}
                         Dream={this.state.Dream}
                         SuperPowers={this.state.SuperPowers}
                         Support={this.state.Support}
                         Photo={this.state.Photo}
                         requestType="post" id={null}/>
          </div>
      )
  }
}

export default AddChild;
