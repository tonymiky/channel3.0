import React ,{Component} from 'react';

class Content extends Component {
    constructor(props){
        super(props);
        this.getScreenHeight = this.getScreenHeight.bind(this);
    }

    componentDidMount() {
        let content = this.refs["public-content-body"];
        let h       =  this.getScreenHeight ();

        content.style.height = h - 120 + 'px';
    }

    componentWillMount () {

    }

    getScreenHeight () {
        return document.body.clientHeight;
    }

    render () {
        return (
            <div ref="public-content-body" className="public-content-body">
                <div style={{"height": "2000px"}}>左侧导航</div>
            </div>
        )
    }
};

export default Content;