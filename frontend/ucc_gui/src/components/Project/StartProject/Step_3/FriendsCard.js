import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from "@material-ui/core/CardContent";
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import UploadPhoto from "../../../../image/Default-profile-picture.png";
import "../../../../containers/ProjectCommon.css"

class ImgMediaCard extends React.Component {

    searchResultImageClick(value) {
        this.props.searchResultImageClick([this.props.imageSrc, this.props.imageId, this.props.imageName])
    }

    removeInviteClick(value)
    {
        this.props.removeInviteClick(this.props.imageId)
    }

    render() {
        return (
            <Card onClick={this.searchResultImageClick.bind(this)} style={{border:"2px solid"}}>
                <CardActionArea style={{padding: "3px"}} >
                    <CardMedia
                        className="friends_search_card"
                        style={{objectFit: "contain"}}
                        component="img"
                        image={this.props.imageSrc?this.props.imageSrc:UploadPhoto}
                        alt="Charity Project"

                    />
                    <CardContent className="friends_search_card_text">
                        {this.props.imageName}
                    </CardContent>

                </CardActionArea>
                {this.props.removeInviteClick?(
                <CardActions>
                    <div style={{width:"100%", textAlign:"center"}}>
                        <Button size="small" color="primary" onClick={this.removeInviteClick.bind(this)}>
                            Remove Invite
                        </Button>
                    </div>
                </CardActions>):(<div/>)}
            </Card>
        );
    }
}


export default ImgMediaCard;
