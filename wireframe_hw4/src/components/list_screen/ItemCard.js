import React from 'react';
import { relative } from 'path';
import ResizableRect from 'react-resizable-rotatable-draggable'
import Moveable from "react-moveable";
import Draggable from 'react-draggable';


class ItemCard extends React.Component {

 

    state = {
        new: true,
        color: "card z-depth-0 todo-list-link green lighten-3",
    
        style: {
            position: "relative",
            top: this.props.item.top,
            left: this.props.item.left
        },

        style2: {
            top: this.props.item.top,
            left: this.props.item.left,
            //transform: `translate( 10px ,10px )`

        }
        
    
    }

    selectControl = () => {
        console.log("selecting control");
        this.setState({zoomable: 'nw, ne, sw, se'})
    }

    handleDrag = (deltaX, deltaY) => {
        this.setState({new: false});

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
    render() {
        const { item } = this.props;  
        //console.log(item);
        var style;
        if(this.state.new === true)
            style = this.state.style;
        else
            style = this.state.style2;


      
            if(item.element === 'button'){
                
                return    <Draggable
                            onDrag={this.handleDrag}
                            onStop={this.handleStop}
                            >
                        <button className="aa" style={style}>asd</button>
                    </Draggable>
                   
                
             }

             if(item.element === 'label'){
                //console.log("button")
                
             }

             if(item.element === 'textfield'){
                //console.log("button")
                
             }

             if(item.element === 'container'){
                //console.log("button")
                
             }

             return <React.Fragment />

        
            return (
                <ResizableRect
                
                height={100}
                width={100}
                position={relative}
                onResize={this.handleResize}
                >
                    <button className="aa" style={this.state.style}>asd</button>

                </ResizableRect>
                
            );
       
       
    }
}
export default ItemCard;