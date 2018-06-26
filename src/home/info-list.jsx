import React, {Component} from 'react';
import Icon from 'antd/lib/icon';
class InfoList extends Component {
    render() {
        return (
            <div className="user-info-details-list">
                <div className="list myAcount">
                    <Icon type="user"></Icon>
                    <span>我的账号</span>
                </div>
                <div className="list myAcount">
                    <Icon type="edit"></Icon>
                    <span>修改密码</span>
                </div>
                <div className="list myAcount">
                    <Icon type="poweroff"></Icon>
                    <span>退出</span>
                </div>
            </div>
        )
    }
};

export default InfoList;