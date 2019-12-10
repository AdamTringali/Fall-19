import React from 'react';
import { relative } from 'path';
import ResizableRect from 'react-resizable-rotatable-draggable'
import Moveable from "react-moveable";
import Draggable from 'react-draggable';
import { Resizable, ResizableBox } from 'react-resizable';
import { Rnd } from 'react-rnd';


class ItemCard extends React.Component {

    state = {
        new: true,
        color: "card z-depth-0 todo-list-link green lighten-3",
        test: ['s'],
        width: 50,
        height: 50,
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

    onDragStop = (test) => {
        console.log("ondragstop");
        console.log(test);
    }

    onResizeStop = (test) => {
        console.log("onresize")
        console.log(test);

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
            
                return    (
                    <Rnd
                    className="top-left"
                    style={this.state.rndStyle}
                    key={item.key}
                    onResizeStop={this.onResizeStop.bind(this)}
                    onDragStop={this.onDragStop.bind(this)}
                    default={{
                        x: this.state.rndStyle.x,
                        y: this.state.rndStyle.y,
                       
                        
                    }}
                    bounds="parent"
                    
                    >
                    <button className="button_card" style={this.state.style2}>asd</button>    
                    </Rnd>
                   
                )
             }

             if(item.element === 'label'){
                //console.log("label")
                /*return (
                        <label >Male</label>
                       

                )*/
             }

             if(item.element === 'textfield'){
                console.log("textfield")
                return(
                  <div>nn</div>
                        
                 
                )
               /* return (
                <Draggable>
                    <div className='resizable' style={style} >
                        <div className='resizers'>
                            <button  style={style}>asd</button>

                            <div className='resizer top-left'></div>
                            <div className='resizer top-right'></div>
                            <div className='resizer bottom-left'></div>
                            <div className='resizer bottom-right'></div>

                        </div>
                    </div>
              </Draggable>
)*/
                
                
             }

             if(item.element === 'container'){
               // console.log("button")
               
                
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