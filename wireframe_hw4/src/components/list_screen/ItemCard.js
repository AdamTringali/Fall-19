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
        rndStyle: {
            x:this.props.item.x,
            y:this.props.item.y,
            background: "gray"
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
        /*let {wireframe} = this.props;
        //let title = wireframe.title;
        wireframe.selected = -1;
        this.setState({selected: -1});*/

    }

    handleDrag = (deltaX, deltaY) => {

        console.log("handledrag ")
        //console.log(deltaY);
       

      }

    handleStop = (deltaX, deltaY) => {
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
    }

    onDragStop = (test) => {
        console.log("ondragstop");
        console.log(test);
    }

    onResizeStop = (test) => {
        console.log("onresize")
        console.log(test);

    }

    selectControl = (test, key) => {
        console.log("selecting control");

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
                    <Rnd
                    style={{position: "sticky"}}
                      default={{
                        x: this.state.rndStyle.x,
                        y: this.state.rndStyle.y,}}
                      bounds="parent" >
                    <button onBlur={this.stopFocus} id={item.key} 
                    style={{ height: '100%', width:'100%', fontSize: item.font_size + 'px'}} 
                    onClick={this.selectControl.bind(this, item.key)}>
                    {item.text}</button>
                    </Rnd>
                )
             }

             if(item.element === 'label'){
                return (   
                    <Rnd
                    style={{position: "sticky", background:"gray"}}
                      default={{
                        x: this.state.rndStyle.x,
                        y: this.state.rndStyle.y, }}
                      bounds="parent">
                     <span 
                     style={{ height: '100%',textAlign:"justify", width:'100%', fontSize: item.font_size + 'px'}}
                      onClick={this.selectControl.bind(this, item.key)}>
                          {item.text}
                          </span>
                    </Rnd>
                )
             }

             if(item.element === 'textfield'){
                console.log("textfield")
                
                
             }

             if(item.element === 'container'){
               // console.log("button")
               
                
             }

             return <React.Fragment />

       
       
    }
}
export default ItemCard;