import React, { Component } from "react";
import axios from 'axios';
import "../Account/Account.css";
import "./MyChildren.css";
import ChildForm from "../../components/ChildForm"


/**
 * @description Fetches all the details of children associated with a parent account
 * @class MyChildren
 * @implements BroweserRouter as Router
 * @extends React.Component
 * @type {MyChildren}
 * @example <MyChildren />
 * pre-condition: all the imports
 * post-condition: returns a form for all details of individual child
 * @param null
 * @returns {MyChildren}
 */

class MyChildren extends React.Component {

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

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(`http://127.0.0.1:8000/childaccount/child/${id}`)
            .then(res => {
                    this.setState({
                        Name: res.data.Name,
                        DOB: res.data.DOB,
                        Gender: res.data.Gender,
                        School: res.data.School,
                        SchoolGrade: res.data.SchoolGrade,
                        Aboutme: res.data.Aboutme,
                        FavoriteThing: res.data.FavoriteThing,
                        Dream: res.data.Dream,
                        SuperPowers: res.data.SuperPowers,
                        Support: res.data.Support,
                        Photo: res.data.Photo
                    });
                // console.log(res.data)
            })
    }


  render() {
      return (
          <div>
            <ChildForm Name={this.state.Name}
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
                requestType="put" id={this.props.match.params.id}/>
          </div>
      )
  }
}

export default MyChildren;
