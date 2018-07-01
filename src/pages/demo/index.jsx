import React, {Component} from 'react';
import {Button, Table, pagination}  from 'antd/lib';

class Demo extends Component {
    constructor(props){
        super(props);
    }
    render () {
        return (
            <div className="demo">
                <h1>决策流配置</h1>
                This is a React Demo example.
                <Button type="primary" onClick={this.props.opennewTab.bind(this, {name:"newTabView",id:"newTabView"})}>新建Tab页</Button>
            </div>
        )
    }
}

export default Demo;