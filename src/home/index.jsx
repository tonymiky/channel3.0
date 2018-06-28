import React, {Component} from 'react';
import Navigation from './navigation';
import Header from './header';
import Body from './content-body';
import Footer from './footer';

class Index extends Component {

    constructor(props){
        super(props);
        this.getNavData = this.getNavData.bind(this);
        this.state = {
            navNode: null
        }
    }

    getNavData (data) {
        if(data.item.isParent==="0"){
            this.setState({"navNode": data.item},()=>{
                console.log("来自index.jsx：");
                console.log(this.state.navNode);
            });
        }
    }

    render () {
        return (
            <div className="index">
                <Header></Header>
                <div className="public-body">
                    <div className="public-body-left">
                        <Navigation navList={this.props.navList} getNavData={this.getNavData} />
                    </div>
                    <div className="public-body-right">
                        <Body navNode={this.state.navNode}></Body>
                        <Footer></Footer>
                    </div>
                </div>
            </div>
        )
    }
};

export default Index;