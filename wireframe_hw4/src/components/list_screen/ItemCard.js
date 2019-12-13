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
                overflow:"hidden",
                zIndex: "6",
                //"borderRadius":`${this.props.checkItem.border_radius}px`,
                //"borderThickness":`${this.props.item.border_thickness}px`,



            }
        }
        
    
    }


    stopFocus = () => {
        console.log("stopping focus?");
        let {wireframe} = this.props;
        //let title = wireframe.title;
        wireframe.selected = -1;
        this.setState({selected: -1});

    }




    onDragStop = (test, info) => {

        let newCoord = {...this.state.rnd};
        newCoord.x = info.x;
        newCoord.y = info.y;
        this.setState({rnd: newCoord})

        this.props.item.x =  newCoord.x;
        this.props.item.y =  newCoord.y;
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

    render() {
        const { item } = this.props;  
        //this.checkBorder();

  

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
                    style={{ height: '100%', width:'100%', fontSize: item.font_size + 'px', 
                    position:"relative",
                    borderStyle:"solid",
                    color:this.props.item.color,
                    borderColor:this.props.item.border_color,
                    borderWidth:this.props.item.border_thickness + 'px',
                    background: this.props.item.background_color,
                    borderRadius:this.props.item.border_radius + 'px'}} 
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
                     style={{ height: '100%',textAlign:"-webkit-center", width:'100%', 
                     fontSize: item.font_size + 'px',
                     borderStyle:"solid",
                     color:this.props.item.color,
                     borderColor:this.props.item.border_color,
                     borderWidth:this.props.item.border_thickness + 'px',
                     background: this.props.item.background_color,
                     borderRadius:this.props.item.border_radius + 'px'}}
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
                    style={{ 
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
                
                        
                    <input id="inp" style={{height: '100%', width:'100%', fontSize: item.font_size + 'px', 
                    cursor:"grab",
                    background: this.props.item.background_color,
                    borderStyle:"solid",
                    paddingLeft:"10px",
                    color:this.props.item.color,
                    borderColor:this.props.item.border_color,
                    borderWidth:this.props.item.border_thickness + 'px',
                    borderRadius:this.props.item.border_radius + 'px' }}
                    onClick={this.selectControl.bind(this, item.key)} value={item.text} readOnly={true}
                    onBlur={this.stopFocus}>
                       
                    </input>
                    


                    </Rnd>
                    
                )
             }

             if(item.element === 'container'){
                //console.log("container")

               return (
                <Rnd
                style={{
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
                    onBlur={this.stopFocus}
                    onClick={this.selectControl.bind(this, item.key)}
                    tabIndex="0"
                    style={{width: "100%", height:"100%",
                    background: this.props.item.background_color,
                    borderStyle:"solid",
                    color:this.props.item.color,
                    borderColor:this.props.item.border_color,
                    borderWidth:this.props.item.border_thickness + 'px',
                    borderRadius:this.props.item.border_radius + 'px'}}>
                    </div>
                
                </Rnd>
                
        
               )
               

             }

             return <React.Fragment />

       
       
    }
}
export default ItemCard;