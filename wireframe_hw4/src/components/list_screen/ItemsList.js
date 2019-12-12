import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import { Button } from 'react-materialize'
import { Draggable, Droppable } from 'react-drag-and-drop'
import ResizableRect from 'react-resizable-rotatable-draggable'
import {Rnd} from 'react-rnd';
import {DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'


class ItemsList extends React.Component {

    state = {
        removing: false,
        target2: {
            position: 'relative',
            height: '520px',
            overflow: 'auto',
            marginBottom: '100px',
            
        },
        item: {
            text: "",
            font_size: "",
            border_radius: 0,
            border_thickness: 0,
        },
        wireframe_size: {
            width: "500px",
            height: "600px",
            position: "relative"
        },
        goHome: false,
        zoomable: '',
        test: [
            { id: 1, type: 'button'}
        ],
        items: [
            { id: 1, name: 'Container', type: '_container' },
            { id: 2, name: 'Label', type: '_label' },
            { id: 3, name: 'Button', type: '_button' },
            { id: 4, name: 'Textfield' , type:'_textfield' }
        ],
        style: {
            background:"red"
        }
    }

    
    componentDidMount(){
        document.addEventListener("keydown", this.deleteControl, false);
    }



    deleteControl = (e) => {
        if (e.repeat) { return }
        let {wireframe} = this.props;
        let {id} = this.props;
        let selected = wireframe.selected;
        let newItems = wireframe.items;
        let key = wireframe.key;

        if(e.keyCode === 8){                    
            console.log("delete, selected: " + selected);

            if(selected >= 0){
                this.setState({removing: true});
                if(!wireframe.items[selected]){
                    this.setState({removing: false});
                    return;
                }
                console.log("deleting control text: " + wireframe.items[selected].text + " key: " + selected);
                console.log(newItems);
                newItems.splice(selected,1);
                console.log(newItems);
                console.log("key: " + key);

                for(var i = 0; i < newItems.length; i++){
                    newItems[i].key = i;
                }
                wireframe.items = newItems;
                wireframe.selected = -1;


                

                //const fireStore = getFirestore();
                //fireStore.collection('user_wireframes').doc(id).update({wireframes: cpy});
                /* fireStore.collection('user_wireframes').get().then(function(querySnapshot){
                querySnapshot.forEach(function(doc) {
                        let data = doc.data();
                        if(data.firstName === user.firstName && data.lastName === user.lastName)
                        {
                            console.log(data);
                            let cpy = data.wireframes;
                            let item = {
                                title: "Unknown",
                                key: cpy.length,
                                items: []                
                            }
                            cpy.push(item)
                            fireStore.collection('user_wireframes').doc(doc.id).update({wireframes: cpy});
                        }
            
                        
                    })
                }) */
            }
            else
            {

            }
        }
        
        this.setState({removing: false});

    }

    submitChange = () => {
        let newFrames = this.props.wireframes;
        let myTitle = this.props.wireframe.title;
        let key = this.props.wireframe.key;
        
        const fireStore = getFirestore();
        fireStore.collection('user_wireframes').get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
                if(doc.data().wireframes.length > key){
                    if(doc.data().wireframes[key].title === myTitle)
                    {
                        fireStore.collection('user_wireframes').doc(doc.id).update({wireframes: newFrames});
                    }
                }
            })
        })
    }

    cancelChange = () => {
        console.log("cancel");
        this.setState({goHome: true});

    }

    selectControl = () =>{
        console.log("selecting control")
    }

    changeText = (e) => {
        
            const { target } = e;
        // console.log("changing text" );
            console.log(target.value);
            let newItem = this.state.item;
            newItem.text = target.value;

            this.setState({item: newItem})
    }

    changeFontSize = (e) => {
        //let res = this.checkSelected();

        if(e){
            console.log("valid");
            const { target } = e;
            console.log(target.value);
            let newItem = this.state.item;
            newItem.font_size = target.value;
            this.setState({item: newItem})
        }
    }

    checkSelected = () => {
        const wireframe = this.props.wireframe;

        if(wireframe.selected >= 0){
            this.setState({item: wireframe.items[wireframe.selected]});
            return true;
        }
        else
        {
            let newItem= {
                text: "",
                font_size: "",
            };
            this.setState({item: newItem});
            return false;

        }
    }

    changeWireframeHeight = (e) => {

        const { target } = e;
        var wireframe_size = {...this.state.wireframe_size};
        wireframe_size.height = target.value;

        this.setState({wireframe_size})

    }   
    
    changeWireframeWidth = (e) => {

        const { target } = e;
        var wireframe_size = {...this.state.wireframe_size};
        wireframe_size.width = target.value;

        this.setState({wireframe_size})

    }   

    addControl = (control, e2) => {
        console.log("add control: " + control);
    }
    
    clicking = (e) => {
        
        console.log("unselect me now")
    }

    changeRadius = (e) => {
        const { target } = e;

        let newItem = this.state.item;
        newItem.border_radius = target.value;

        this.setState({item: newItem})
    }

    changeThickness = () => {
        console.log("changing thickness")
    }

    render() {
        const wireframe = this.props.wireframe;

        if(this.state.goHome)
            return <Redirect to="/" />;

        //let item = this.state.item;
        var item;
        if(wireframe.selected >= 0)
            item = wireframe.items[wireframe.selected];
        else
            item = this.state.item;
       
    
        if(this.state.removing)
            return <React.Fragment />

    

        return (
            
            <div className="todo-lists section" style={{height:"900px"}}>

                <div className="row" style={{height:"90%"}}>

                {/* LEFT COLUMN */}
                <div className="groove_border col s2" style={{height: "80%"}} > <p className="right-align"></p> 
                
                    <div className="row">
                        <i className="material-icons col s3">zoom_in</i>
                        <i className="material-icons col s3">zoom_out</i>
                    </div>

                    <div className="item-container ">
                        <div className="row">

                            <div className="groove_border col s12 offset-s1" onClick={this.addControl.bind(this, 'container')}
                            style={{width: "80%", height:"70px", border:"groove #969696"}}>
                            </div>
                            <br/>
                            <p className="center-align">Container</p>
                            <br/>


                            <div className="center-align">
                                <label className="center-align" style={{fontSize: "15px", color:"black"}} onClick={this.addControl.bind(this, 'label')}>Prompt for Input</label>
                            </div>
                            <div className="center-align">
                                <label className="" style={{fontSize: "15px", color:"black"}} >Label</label>
                            </div>
                            <br/>
                            <br/>


                                <div className="center-align">
                                    <button style={{width: "100px", height: "25px"}} onClick={this.addControl.bind(this, 'button')} >Submit</button>
                                </div>
                                <div className="center-align">
                                    Button
                                </div>
                                <br/>
                                <br/>

                                <div className="center-align">
                                 <input  type="text" style={{border: "groove", height: "25px", width:"80%", borderRadius: "5px", color:"gray"}} value="Item" readOnly={true} onClick={this.addControl.bind(this, 'textfield')}/>
                                 <div className="center-align" className="" style={{fontSize: "15px"}}>Textfield</div>
                                </div>
                                
                                
                        </div>


                        

                    </div>
                    <br/>
                    <br/>
                    <div className="row">
                        <button className="btn col s10" type="submit" name="action" onClick={this.submitChange}>Submit
                            <i className="material-icons right">send</i>
                        </button>
                        <br/>
                        <br/>
                        <button className="btn col s10" type="submit" name="action" onClick={this.cancelChange}>Close
                            <i className="material-icons right">close</i>
                        </button>
                       
                    </div>


                </div>

                {/* CENTER COLUMN */}
                <div className="target groove_border col s7 " style={{paddingLeft:"40px", paddingBottom:"40px", height:"100%"}}> <p>target</p> 
                                <div className=" groove_border" 
                                 style={this.state.wireframe_size} onClick={this.checkSelected} 
                                  >        
                                    {wireframe.items.map((item, index) => 
                                   
                                    
                                         <ItemCard z-index={0} wireframe={wireframe} key={item.key} item={item} onClick={this.selectControl} /> 
                                    )}
                                   
                                </div>                             
                </div>

                {/* RIGHT COLUMN */}
                <div className="groove_border col s3 " style={{height: "90%"}}>
                    <h5 className="center-align">Wireframe</h5>
                    <div className="row">
                        <div className="input-field col s4">
                            <label style={{top: "-5px", color: "black"}}>Height</label>
                        </div>
                        <div className="input-field col s8">
                            <input id="height" type="text"  style={{border: "groove", height: "30px", borderRadius: "5px"}} defaultValue={this.state.wireframe_size.height} onChange={this.changeWireframeHeight}/>
                        </div>
                        <div className="input-field col s4">
                            <label style={{top: "-5px", color: "black"}} >Width</label>
                        </div>
                        <div className="input-field col s8">
                            <input id="width" type="text"  style={{border: "groove", height: "30px", borderRadius: "5px"}} defaultValue={this.state.wireframe_size.width} onChange={this.changeWireframeWidth} />
                        </div>
                    </div>
                    <h5 className="center-align">Control</h5>
                    <div className="row">
                        <div className="input-field col s4">
                            <label style={{top: "-5px", color: "black"}}>Text</label>
                        </div>
                        <div className="input-field col s8">
                            <input  type="text" style={{border: "groove", height: "30px", borderRadius: "5px"}} value={item.text} onChange={this.changeText}/>
                        </div>
                        <div className="input-field col s4">
                            <label style={{top: "-5px", color: "black"}}>Font Size</label>
                        </div>
                        <div className="input-field col s8">
                            <input  type="text" style={{border: "groove", height: "30px", borderRadius: "5px"}} value={item.font_size} onChange={this.changeFontSize}/>
                        </div>
                        <div className="input-field col s4">
                            <label style={{top: "-18px", color: "black"}} >Border Radius</label>
                        </div>
                        <div className="input-field col s8">
                            <input id="border_radius" type="text" style={{border: "groove", height: "30px", borderRadius: "5px"}} value={item.border_radius} onChange={this.changeRadius} />
                        </div>
                        <div className="input-field col s4">
                            <label style={{top: "-18px", color: "black"}}>Border Thickness</label>
                        </div>
                        <div className="input-field col s8">
                            <input id="thickness" type="text" style={{ border: "groove", height: "30px", borderRadius: "5px"}} value={item.border_thickness} onChange={this.changeThickness}/>
                        </div>
                    </div>

                </div>


                </div>

            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const wireframe = ownProps.wireframe;
    const id = ownProps.id;
    const key = wireframe.key
    const wireframes = state.wireframe[0].wireframes;
    

    return {
        id,
        wireframes, 
        key,
        wireframe,
        auth: state.firebase.auth,
    };
};


export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'wireframes' },
    ]),
)(ItemsList);