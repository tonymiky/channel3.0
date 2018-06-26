import React ,{Component} from 'react';
import UserInfo from './user-info';
import logoUrl from '../static/images/logo.png';
const logoTitle = "易鑫集团";
class Header extends Component {
    render () {
        return (
            <div className="public-header">
                <div className="public-logo">
                    <img src={logoUrl} alt={logoTitle} title={logoTitle} />
                    <h1>智能管理后台</h1>
                </div>
                <div className="public-links">
                    <ul className="public-links-lists">
                        <li><a href="">首页</a></li>
                        <li><a href="">问答</a></li>
                        <li><a href="">公告</a></li>
                    </ul>
                </div>
                <div className="public-user-info">
                    <UserInfo  />
                </div>
            </div>
        )
    }
};

export default Header;