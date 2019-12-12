import React from 'react';
import { relative } from 'path';
import ResizableRect from 'react-resizable-rotatable-draggable'
import Moveable from "react-moveable";
import Draggable from 'react-draggable';
import { Resizable, ResizableBox } from 'react-resizable';
import { Rnd } from 'react-rnd';
import { getFirestore } from 'redux-firestore';


class ItemCard extends React.Component {

    state = {
        selected: -1,
        rnd: {
            x:this.props.item.x,
            y:this.props.item.y,
            width:this.props.item.width,
            height:this.props.item.height,
            style: {
               // position: "relative", 
                background:"gray", 
                overflow:"hidden",
                zIndex: "6",
                "borderRadius":`${this.props.item.border_radius}px`,
                "borderThickness":`${this.props.item.border_thickness}px`,



            }
        },

        style2: {
            top: this.props.item.top,
            left: this.props.item.left,
            fontSize: this.props.item.font_size,
            background: this.props.item.background_color,
        }
        
    
    }


    stopFocus = () => {
        console.log("stopping focus?");
        let {wireframe} = this.props;
        //let title = wireframe.title;
        wireframe.selected = -1;
        this.setState({selected: -1});

    }


    handleDrag = (deltaX, deltaY) => {

        console.log("handledrag ")
        //console.log(deltaY);
       

      }

  /*  handleStop = (deltaX, deltaY) => {
        console.log("handle stop");
        //console.log(this.state.style)
        var lastX = deltaY.lastX;
        var lastY = deltaY.lastY;

        //console.log("lastx: " + lastX + " lastY: " + lastY) 

        var style2 = {...this.state.style2}
        style2.left = lastX;
        style2.top = lastY;
        this.setState({style2});

        this.props.item.left = lastX;
        this.props.item.top = lastY;
    }

    onClick= () => {
        console.log("on click");
    }*/

    onDragStop = (test, info) => {
       // console.log("ondragstop");
        //console.log("oldinfo: x: " + this.state.rnd.x + ", y: " + this.state.rnd.y);
        let newCoord = {...this.state.rnd};
        newCoord.x = info.x;
        newCoord.y = info.y;
        this.setState({rnd: newCoord})

        this.props.item.x = newCoord.x;
        this.props.item.y = newCoord.y;
       // console.log("newinfo: x: " + newCoord.x + ", y: " + newCoord.y);

    }

    onResizeStop = (test, info, ref) => {
        console.log("onresizestop");

        let newSize = {...this.state.rnd};
        newSize.height = ref.style.height;
        newSize.width = ref.style.width;
        this.setState({rnd: newSize})

        this.props.item.height = newSize.height;
        this.props.item.width = newSize.width;

    }

    selectControl = (test, e) => {
        //console.log("selecting control");

        this.setState({selected: test});

        let {wireframe} = this.props;
        let title = wireframe.title;
        
        const fireStore = getFirestore();
        fireStore.collection('user_wireframes').get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
                for(var i = 0; i < doc.data().wireframes.length; i++){
                    if(doc.data().wireframes[i].title === title){
                        let cpy = doc.data().wireframes;
                        cpy[i].selected = test;
                        fireStore.collection('user_wireframes').doc(doc.id).update({wireframes: cpy});


                    }
                }                 
            })
        })
        wireframe.selected = test;
        //console.log("selected: " + wireframe.selected)

        //e.stopPropagation();
    }

    /*
    onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}

    onResizeStop={(e, direction, ref, delta, position) => {
        this.setState({
        width: ref.style.width,
        height: ref.style.height,
        ...position,
        });
    }}
  */
    render() {
        const { item } = this.props;  

  

            if(item.element === 'button'){
                return(
                    <Rnd className="r2"
                    style={this.state.rnd.style}
                      default={{
                        x: this.state.rnd.x,
                        y: this.state.rnd.y,
                        height: this.state.rnd.height,
                        width: this.state.rnd.width,
                        }}
                      bounds="parent" 
                      onDragStop={this.onDragStop.bind(this)}
                      onResizeStop={this.onResizeStop.bind(this)}> 
                    <button id={item.key} 
                    onBlur={this.stopFocus}
                    style={{ height: '100%', width:'100%', fontSize: item.font_size + 'px', position:"relative"}} 
                    onClick={this.selectControl.bind(this, item.key)}>
                    {item.text}</button>
                    </Rnd>
                )
             }

             if(item.element === 'label'){
                return (   
                    <Rnd
                    style={this.state.rnd.style}
                      default={{
                        x: this.state.rnd.x,
                        y: this.state.rnd.y,
                        height: this.state.rnd.height,
                        width: this.state.rnd.width
                    }}
                      bounds="parent"
                      onDragStop={this.onDragStop.bind(this)}
                      onResizeStop={this.onResizeStop.bind(this)}>
                     <div
                     onBlur={this.stopFocus}
                     style={{ height: '100%',textAlign:"justify", width:'100%', fontSize: item.font_size + 'px'}}
                      onClick={this.selectControl.bind(this, item.key)}
                       tabIndex="0"
                      >
                          {item.text}
                          </div>
                    </Rnd>
                )
             }

             if(item.element === 'textfield'){
                //console.log("textfield?")
                return (
                    <Rnd
                    style={{ border:"groove ",
                    overflow:"hidden",
                    zIndex: "6"

                    }}
                    default={{
                        x: this.state.rnd.x,
                        y: this.state.rnd.y, 
                        height: this.state.rnd.height,
                        width: this.state.rnd.width}}
                    bounds="parent"
                    onDragStop={this.onDragStop.bind(this)}
                      onResizeStop={this.onResizeStop.bind(this)}>
                
                        
                    <input id="inp" style={{height: '100%', width:'100%', fontSize: item.font_size + 'px', cursor:"grab" }}
                    onClick={this.selectControl.bind(this, item.key)} placeholder={item.text} >
                       
                    </input>
                    


                    </Rnd>
                    
                )
             }

             if(item.element === 'container'){
                console.log("container")

               return (
                <Rnd
                style={{ border:"groove #969696",
                overflow:"hidden",
                zIndex: "3"
                }}
                default={{
                    x: this.state.rnd.x,
                    y: this.state.rnd.y, 
                    height: this.state.rnd.height,
                    width: this.state.rnd.width}}
                bounds="parent"
                onDragStop={this.onDragStop.bind(this)}
                onResizeStop={this.onResizeStop.bind(this)}>

                    <div 
                    onClick={this.selectControl.bind(this, item.key)}
                    tabIndex="0"
                    style={{width: "100%", height:"100px"}}>
                    </div>
                
                </Rnd>
                
        
               )
               

             }

             return <React.Fragment />

       
       
    }
}
export default ItemCard;