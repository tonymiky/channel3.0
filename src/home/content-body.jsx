import React ,{Component} from 'react';
import Tabs from 'antd/lib/tabs';
import Demo from '../pages/demo'
const TabPane = Tabs.TabPane;

class Content extends Component {
    constructor(props){
        super(props);
        this.getScreenHeight = this.getScreenHeight.bind(this);
        this.add = this.add.bind(this);
        this.remove =  this.remove.bind(this);
        this.newTabIndex = 0;
        const panes = [
            { title: '决策流配置', content: <Demo />, key: '3467', closable: false }
        ];


        this.state = {
            activeKey: panes[0].key,
            panes,
        };
    }

    onChange = (activeKey) => {
        this.setState({ activeKey });
    }
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }
    add () {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
        this.setState({ panes, activeKey });
    }
    remove (targetKey) {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    }

    componentWillReceiveProps(){
        setTimeout(()=>{
            if(this.props.navNode!==null){
                var name = this.props.navNode.name;
                const panes = this.state.panes;
                const activeKey = `newTab${this.newTabIndex++}`;
                panes.push({ title: name , content: 'New Tab Pane'+activeKey, key: activeKey });
                this.setState({ panes, activeKey });
            }
        },0);

    }

    componentDidMount() {
        let content = this.refs["public-content-body"];
        let h       =  this.getScreenHeight ();

        content.style.height = h - 120 + 'px';
    }

    getScreenHeight () {
        return document.body.clientHeight;
    }

    render () {
        return (
            <div ref="public-content-body" className="public-content-body">
                <Tabs
                    animated
                    hideAdd
                    onChange={this.onChange}
                    activeKey={this.state.activeKey}
                    type="editable-card"
                    onEdit={this.onEdit}>
                    {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>{pane.content}</TabPane>)}
                </Tabs>
            </div>
        )
    }
};

export default Content;