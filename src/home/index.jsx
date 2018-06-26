import React, {Component} from 'react';
import Navigation from './navigation';
import Header from './header';
import Body from './content-body';
import Footer from './footer';

class Index extends Component {
    render () {
        return (
            <div className="index">
                <Header></Header>
                <div className="public-body">
                    <div className="public-body-left">
                        <Navigation navList={this.props.navList} />
                    </div>
                    <div className="public-body-right">
                        <Body></Body>
                        <Footer></Footer>
                    </div>
                </div>
            </div>
        )
    }
};

export default Index;