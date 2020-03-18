import React from "react";
import cookie from 'react-cookies'
import axiosConfig from '../../../axiosConfig'

/** @import CSS styles */
import "./Account.css";
import ProfileForm from "../../../components/Account/ProfileForm";

/**
 * @description Creates the My Account page for the user
 * @class Account
 * @implements BroweserRouter as Router
 * @extends React.Component
 * @type {Account}
 * @example <Account />
 * pre-condition: all the imports
 * post-condition: returns the Account page
 * @param null
 * @returns {Account}
 */


class Account extends React.Component {
    state = {
        email: '',
        first_name: '',
        last_name: '',
        mobile: '',
        address: '',
        profile_pic: '',
        dob: '',
        gender: '',
        aboutme: '',
        favorite_thing: '',
        dream: '',
        super_powers: '',
        support: '',
    };

    componentDidMount() {
        const user_emailid = cookie.load('user_emailid');
        axiosConfig.get(`myaccount/${user_emailid}`)
            .then(res => {
                    this.setState({
                        email: res.data.email,
                        first_name: res.data.first_name,
                        last_name: res.data.last_name,
                        mobile: res.data.mobile,
                        address: res.data.address,
                        profile_pic: res.data.profile_pic,
                        dob: res.data.dob,
                        gender: res.data.gender,
                        aboutme: res.data.aboutme,
                        favorite_thing: res.data.favorite_thing,
                        dream: res.data.dream,
                        super_powers: res.data.super_powers,
                        support: res.data.support,
                    });
            }).catch(error => console.log(error))
    }

    onDataChange(event){
        this.setState({ [event.target.name]: event.target.value });
     }

     onCheckboxDataChange(event){
        // do something here
     }

    onImageChange(event){
    this.setState({
        profile_pic: URL.createObjectURL(event.target.files[0]),
        finalImage: event.target.files[0]
    });
    }

    onSaveClicked(event) {
        event.preventDefault();
        let form_data = new FormData();
        try {
            form_data.append("email", this.state.email);
          form_data.append("first_name", this.state.first_name);
          form_data.append("last_name", this.state.last_name);
          form_data.append("dob", this.state.dob);
          form_data.append("gender", this.state.gender);
          form_data.append("Address", this.state.address);
          form_data.append("Aboutme", this.state.aboutme);
          form_data.append("FavoriteThing", this.state.favorite_thing);
          form_data.append("Dream", this.state.dream);
          form_data.append("SuperPowers", this.state.super_powers);
          form_data.append("Support", this.state.support);
          if (this.state.finalImage)
            form_data.append(
              "ProfilePic",
              this.state.finalImage,
              this.state.finalImage.name
            );
        }
        catch (err) {
          console.log(err);
        }

        axiosConfig.defaults.withCredentials = true;
        axiosConfig.defaults.xsrfHeaderName = "X-CSRFToken";
        return axiosConfig.put(`myaccount/${this.state.email}`, form_data,
            {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then(res => console.log(res))
            .catch(error => console.log(error));

  }

  render() {
    return (
            <div style={{ display: "block" }}>

                <ProfileForm
                     email={this.state.email}
                     first_name={this.state.first_name}
                     last_name={this.state.last_name}
                     address={this.state.address}
                     dob={this.state.dob}
                     gender={this.state.gender}
                     aboutme={this.state.aboutme}
                     favorite_thing={this.state.favorite_thing}
                     dream={this.state.dream}
                     super_powers={this.state.super_powers}
                     support={this.state.support}
                     profile_pic={this.state.profile_pic}
                     onDataChange={this.onDataChange.bind(this)}
                     onImageChange={this.onImageChange.bind(this)}
                     onSaveClicked={this.onSaveClicked.bind(this)}
                     onCheckboxDataChange={this.onCheckboxDataChange.bind(this)}
                     />
              {/* form ends here */}
            </div>
    );
  }
}

export default Account;
