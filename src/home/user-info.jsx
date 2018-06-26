import React, {Component} from 'react';
import Icon from 'antd/lib/icon';
import userIcon from '../static/images/user_male_portrait.png';
import InfoList from './info-list'

class UserInfo extends Component {
    constructor(props){
        super(props);
        this.showInfoDetails = this.showInfoDetails.bind(this);
        this.state = {
            iconTypeState: false
        }
    }

    showInfoDetails (e) {
        this.setState({"iconTypeState": !this.state.iconTypeState},()=>{
            if(this.state.iconTypeState){

            }
        });
        e.stopPropagation();
    }

    render () {
        return (
            <div className="user-info">
                <div className="user-info-icon">
                    <img src={userIcon} alt="用户头像" title="用户头像"/>
                </div>
                <div className="user-info-name">
                    Username User
                </div>
                <div className="user-info-details">
                    <Icon type={this.state.iconTypeState?"down":"up"} onClick={this.showInfoDetails.bind(this)} />
                    {this.state.iconTypeState? <InfoList />:""}
                </div>
            </div>
        )
    }
};

export default UserInfo;