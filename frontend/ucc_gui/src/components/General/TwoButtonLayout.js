import React from "react";
import Button from "react-bootstrap/Button";
import TextBlue from "./Text/TextBlue";
import TextWhite from "./Text/TextWhite";

class TwoButtonLayout extends React.Component {
    render() {
        return (
            <div style={{width:"60%", marginLeft:"25%", alignText:"center", marginBottom:"10px", justifyContent:"center"}}>
                <Button style={{ borderRadius : "50px 0px 0px 50px", backgroundColor:"white", border:"2px solid", borderRight: "0" }}
                        className = "backButton" variant="light" size="lg"
                        disabled={this.props.disabled}
                        onClick={this.props.button1Click}>
                    <b><TextBlue message={this.props.button1Text+ " "}/></b>
                </Button>
                <Button style={{ borderRadius : "0px 50px 50px 0px", border:"2px solid black"}}
                        className = "nextButton"
                        disabled={this.props.disabled}
                        variant="success" size="lg" onClick={this.props.button2Click}>
                    <b><TextWhite message={this.props.button2Text+ " "}/></b>
                </Button>
            </div>
        );
    }
}

export default TwoButtonLayout;