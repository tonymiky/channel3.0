import React ,{Component} from 'react';

//一级菜单
function Li(props) {
    let navArr= props.navList;
    let arr = [];

    let FirstList = [];

    for(let i=0;i<navArr.length;i++){
        navArr[i].children=[];
        if(navArr[i].pId==="0"){
            FirstList.push(navArr[i]);
        };
    }

    FirstList.map((item, index)=>{
        arr.push(<li key={'nav_00'+index} >
                <span onClick={props.nodeClick.bind(this, {item}, navArr,{index})} className={props.index.index==index && props.toggle ?
                                "navigation-root root-active" :
                                "navigation-root"}>{item.name}</span>
            {<SecondLi nodeMouseover={props.nodeMouseover}
                       nodeMouseout={props.nodeMouseout}
                       item={item}
                       navArr={navArr}
                       index={index}
                       curIndex={props.index}
                       secondIndex={props.secondIndex}
                        toggle={props.toggle}/>}
        </li>);
        return item;
    });
    return arr;
}

//二级菜单
function SecondLi(props) {
    let id = props.item.id;
    let navArr = props.navArr;
    let index = props.index;
    let curIndex = props.curIndex;
    let secondList = [];
    let toggle = props.toggle;

    navArr.map((item, index)=>{
        if(item.pId===id){
            secondList.push(
                <li key={"navSecondList_00"+(index+1)}
                    onMouseOver={props.nodeMouseover.bind(this,{item}, navArr, secondList.length+1)}
                    onMouseOut={props.nodeMouseout.bind(this)}>
                    <span>{item.name}</span>
                    <ThirdLi item={item}
                             navArr={navArr}
                             index={secondList.length+1}
                             curIndex={props.secondIndex} />
                </li>
            )
        }
        return item;
    })

    return  (index===curIndex.index && toggle ) ?
                <ul id="navigation-list-second" className="navigation-list-second">
                    {secondList}
                </ul> :
            '';
}

//三级菜单
function ThirdLi(props) {
    let id = props.item.id;
    let navArr = props.navArr;
    let thirdList = [];
    let index = props.index;
    let curIndex = props.curIndex;

    navArr.map((item, index)=>{
        if(item.pId===id){
            thirdList.push(
                <li key={"navThirdList_00"+(index+1)}>
                    <span onClick={props.linkTo}>{item.name}</span>
                </li>
            )
        }
    })

    return (
        (curIndex===index) ? <ul className="navigation-list-third">
            {thirdList}
        </ul> :
        ""
    )
}

class Navigation extends Component {
    constructor (props){
        super(props);
        this.getScreenHeight = this.getScreenHeight.bind(this);
        this.navScroll       = this.navScroll.bind(this);
        this.getStyle        = this.getStyle.bind(this);
        this.nodeClick       = this.nodeClick.bind(this);
        this.nodeMouseover   = this.nodeMouseover.bind(this);
        this.nodeMouseout    = this.nodeMouseout.bind(this);
        this.state = {
            index: -1,
            secondIndex: -1,
            navHeight: "",
            toggle: false,
            thirdShow: false
        }
    }

    componentDidMount () {
        let h   = this.getScreenHeight();
        let nav = this.refs["public-navigation"];
        let navbody = this.refs["public-navigation-list"];


        this.setState({"navHeight": navbody.clientHeight});
        this.navScroll(navbody);

        nav.style.height = h + 'px';
        console.log('左侧菜单可以滚动的y坐标距离：'+(navbody.clientHeight - h))
    }

    getScreenHeight () {
        return document.body.clientHeight -70;
    }

    nodeClick(obj, navList, index,ev){
        this.setState({"index": index});
        this.setState({"toggle":!this.state.toggle});
        this.setState({"navHeight": this.refs["public-navigation-list"].clientHeight});
        ev.stopPropagation();
    }

    nodeMouseover(item, navList, index, ev){
        var _this = this;
        this.setState({"secondIndex": index});
        console.log(ev.target)
        if(ev.target.parentNode.parentNode.className==="navigation-list-third" || ev.target.parentNode.className==="navigation-list-third" || ev.target.className==="navigation-list-third"){
            console.log("当前的三级菜单")
            if(this.timer){
                clearTimeout(_this.timer);
            }
        }
        ev.stopPropagation();
    }

    nodeMouseout(ev){
        var _this = this;
        this.timer = setTimeout(()=>{
            _this.setState({"secondIndex":-1});
            console.log("清空this.timer。。。。。。")
        },2000);
        ev.stopPropagation();
    }

    navScroll (obj){
         obj.onmousedown = (e)=>{
            let startY = e.clientY;
            document.onmousemove = (e)=>{
                this.setState({"navHeight": this.refs["public-navigation-list"].clientHeight},()=>{
                    let moveToValue = (this.state.navHeight-this.getScreenHeight()>0)?(this.state.navHeight-this.getScreenHeight()):0;

                    console.log("导航可以移动的距离-moveToValue: " + moveToValue, "导航的高度-navHeight: "+this.state.navHeight);

                    let endY = e.clientY;
                    let distence = endY - startY;

                    let t = parseInt(this.getStyle(obj, "top"), 10);

                    if(parseInt(obj.style.top, 10)>=0 && distence>=0) {
                        obj.style.top = 0;
                        return false;
                    }else if(Math.abs(parseInt(obj.style.top, 10)) >= moveToValue && distence<=0){
                        obj.style.top = -1*moveToValue + 'px';
                        return false;
                    }

                    if(distence<0){
                        obj.style.top = t - 30 + 'px';
                    }else{
                        obj.style.top = t + 30 + 'px';
                    }
                });

                e.preventDefault();
                e.stopPropagation();
            }
            document.onmouseup = (e)=>{
                document.onmousemove = null;
                document.onmouseup = null;

                e.preventDefault();
                e.stopPropagation();
            }
            e.preventDefault();
            e.stopPropagation();
        }
    }

    getStyle(eleId, name){
        var ele = document.getElementById(eleId.id);
        if (ele.currentStyle) {
            return ele.currentStyle[name];
        } else {
            return window.getComputedStyle(eleId, false)[name];
        }
    }

    render () {
        return (
            <div ref="public-navigation"
                 className="public-navigation">
                <div ref="public-navigation-list"
                     id="public-navigation-list"
                     className="navigation-list" style={{"top": 0}}>
                    <ul className="navigation-list-first">
                        <Li navList={this.props.navList}
                            nodeClick={this.nodeClick}
                            nodeMouseover={this.nodeMouseover}
                            nodeMouseout={this.nodeMouseout}
                            index={this.state.index}
                            secondIndex={this.state.secondIndex}
                            toggle={this.state.toggle} />
                    </ul>
                </div>
            </div>
        )
    }
};

export default Navigation;