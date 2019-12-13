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
import { SketchPicker, CirclePicker, EditableInput } from 'react-color';


class ItemsList extends React.Component {

    state = {
        displayColorPicker1: false,
        displayColorPicker2: false,
        displayColorPicker3: false,
        removing: false,
        item: {
            text: "",
            font_size: "",
            border_radius: "",
            border_thickness: "",
            background_color: "",
            border_color:"",
            color: ""
        },
        wireframe_size: {
            width: "500px",
            height: "600px",
            position: "relative"
        },
        goHome: false,
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
                if(doc.data().wireframes.length > key){//failsafe
                    if(doc.data().wireframes[key].title === myTitle)//confirm
                    {
                        console.log("testing")
                        if(JSON.stringify( newFrames[key].items) == JSON.stringify( doc.data().wireframes[key].items))
                            console.log("no changes")
                        else{
                            console.log(newFrames[key].items)
                            console.log("changes?")
                            console.log(doc.data().wireframes[key].items)

                        }
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
                border_radius: "",
                border_thickness: "",
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
    
        let items = this.props.wireframe.items;
        let key = items.length;
        var newX = 0;
        var newY = 0;
        for(var j = 0; j < 4; j++){
            //UNNCECESSARY FOR LOOP.
            //USED FOR DOUBLE CHECKING FOR MATCHING COORD'S
            for(var i = 0; i < key; i++ ){
                if(items[i].x == newX)
                    newX += 60;
                if(items[i].y == newY)
                    newY += 60
            }
        }

  
        
        const newItem = {
            "key":key,
            "element":"",
            "x":newX,
            "y":newY,
            "height":"60px",
            "width":"100px",
            "background_color":"#ffffff",
            "color":"#ffffff",
            "text":"",
            "font_size":20,
            "border_radius":2,
            "border_thickness":2,
            "border_color": "black"
             
        }
        //container, button, label, textfield
        switch(control){
            case 'container':
                console.log("container")
                newItem.element = "container";
                break;
            case 'button':
                console.log("creating new button")
                newItem.element = "button";
                newItem.text = "Button"
                newItem.height= "35px"
                newItem.width = "90px"
                newItem.color = "black"
                newItem.background_color = "gray"
                newItem.border_radius = 5;

                //text
                break;
            case 'label': 
                console.log("creating new label")
                newItem.element = "label";
                newItem.text = "Prompt for Input"
                newItem.width = "165px"
                newItem.height = "35px";
                newItem.color = "black";
                newItem.font_size = 20;
                //text
                break;
            case 'textfield':
                console.log("creating new TF")
                newItem.element = "textfield";
                newItem.text = "Input"
                newItem.width = "110px"
                newItem.height = "30px";
                newItem.color = "black";
                newItem.font_size = 15;
                newItem.border_thickness = 1;
                //text
                break;
            default:
                console.log("should not be here :(")
                break;
        }

        items.push(newItem);
        this.setState({item: newItem})
        this.props.wireframe.items = items;
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

    changeThickness = (e) => {
        const { target } = e;

        let newItem = this.state.item;
        newItem.border_thickness = target.value;

        this.setState({item: newItem})    
    }

    handleClick = (id) => {
        if(id == 1)
            this.setState({ displayColorPicker1: !this.state.displayColorPicker1 })
        else if(id == 2)
            this.setState({ displayColorPicker2: !this.state.displayColorPicker2 })
        else if(id == 3)
            this.setState({ displayColorPicker3: !this.state.displayColorPicker3 })


    };

    handleClose = (id) => {
        if(id == 1)
            this.setState({ displayColorPicker1: false })
        else if(id == 2)
            this.setState({ displayColorPicker2: false })
        else if(id == 3)
            this.setState({ displayColorPicker3: false })

    };

    handleChange = (whichColor, color2) => {
        let newitem = this.state.item;


        if(whichColor === 'color'){
            newitem.color = color2.hex;
        }
        else if(whichColor === 'background'){
            newitem.background_color = color2.hex;
        }
        else if(whichColor === 'border'){
            newitem.border_color = color2.hex;

        }



        this.setState({ item: newitem })

    };

    render() {
        const wireframe = this.props.wireframe;

        if(this.state.goHome)
            return <Redirect to="/" />;

        //let item = this.state.item;
        var item = this.state.item;
       
    
        if(this.state.removing)
            return <React.Fragment />

            const styles = {
                  swatch: {
                    display: 'inline-block',
                    cursor: 'pointer',
                  },
                  popover: {
                    position: 'absolute',
                    zIndex: '2',
                  },
                  cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                  },
           
              };

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
                                    {wireframe.items.map((item2, index) => 
                                   
                                    
                                         <ItemCard z-index={0} wireframe={wireframe} key={item2.key} item={item2} checkItem={item} onClick={this.selectControl} /> 
                                    )}
                                   
                                </div>                             
                </div>

                {/* RIGHT COLUMN */}
                <div className="groove_border col s3 " style={{height: "100%"}}>
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

                        <div className="input-field col s8">
                            <label style={{top: "-18px", color: "black"}}>Text Color</label>
                        </div>
                        <div className="col s4">
                        <div style={ styles.swatch } onClick={ this.handleClick.bind(this, 1) }>
                            <div style={{ width: '50px',
                                    height: '50px',
                                    borderStyle:'solid',
                                    borderWidth:'2px',
                                    borderRadius: '50%',
                                    background: item.color,}} />
                        </div>
                            { 
                            this.state.displayColorPicker1 ? <div style={ styles.popover }>
                            <div style={ styles.cover } onClick={ this.handleClose.bind(this, 1) }></div>
                            <SketchPicker color={ item.color } onChange={ this.handleChange.bind(this, 'color') }  >  </SketchPicker>
                            
                            </div> : null 
                            }
                        </div>

                        <div className="input-field col s8">
                            <label style={{top: "-18px", color: "black"}}>Background Color</label>
                        </div>
                        <div className="col s4">
                        <div style={ styles.swatch } onClick={ this.handleClick.bind(this, 2) }>
                            <div style={{ width: '50px',
                                    height: '50px',
                                    borderStyle:'solid',
                                    borderWidth:'2px',
                                    borderRadius: '50%',
                                    background: item.background_color,}} />
                        </div>
                            { 
                            this.state.displayColorPicker2 ? <div style={ styles.popover }>
                            <div style={ styles.cover } onClick={ this.handleClose.bind(this, 2) }></div>
                            <SketchPicker color={ item.background_color } onChange={ this.handleChange.bind(this, 'background') }  >  </SketchPicker>
                            
                            </div> : null 
                            }
                        </div>

                        <div className="input-field col s8">
                            <label style={{top: "-18px", color: "black"}}>Background Color</label>
                        </div>
                        <div className="col s4">
                        <div style={ styles.swatch } onClick={ this.handleClick.bind(this, 3) }>
                            <div style={{ width: '50px',
                                    height: '50px',
                                    borderStyle:'solid',
                                    borderWidth:'2px',
                                    borderRadius: '50%',
                                    background: item.border_color,}} />
                        </div>
                            { 
                            this.state.displayColorPicker3 ? <div style={ styles.popover }>
                            <div style={ styles.cover } onClick={ this.handleClose.bind(this, 3) }></div>
                            <SketchPicker color={ item.border_color } onChange={ this.handleChange.bind(this, 'border') }  >  </SketchPicker>
                            
                            </div> : null 
                            }
                        </div>

{/*                         <div className="input-field col s4">
                            <label style={{top: "-18px", color: "black"}}>Background Color</label>
                        </div>
                        <div className="col s8">
                        <div style={ styles.swatch } onClick={ this.handleClick2 }>
                            <div style={{ width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: item.background_color,}} />
                        </div>
                            { 
                            this.state.displayColorPicker ? <div style={ styles.popover }>
                            <div style={ styles.cover } onClick={ this.handleClose }></div>
                            <SketchPicker color={ this.state.color } onChange={ this.handleChange }  >  </SketchPicker>
                            
                            </div> : null 
                            }
                        </div>

                        <div className="input-field col s4">
                            <label style={{top: "-18px", color: "black"}}>Border Color</label>
                        </div>
                        <div className="col s8">
                        <div style={ styles.swatch } onClick={ this.handleClick2 }>
                            <div style={{ width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: item.border_color,}} />
                        </div>
                            { 
                            this.state.displayColorPicker ? <div style={ styles.popover }>
                            <div style={ styles.cover } onClick={ this.handleClose }></div>
                            <SketchPicker color={ this.state.color } onChange={ this.handleChange }  >  </SketchPicker>
                            
                            </div> : null 
                            }
                        </div> */}

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