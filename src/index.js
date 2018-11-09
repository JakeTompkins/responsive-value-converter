import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class Input extends React.Component
{
    constructor(props)
    {
        super(props)

        this.dimensionChanged = props.dimensionChanged
        this.handleChangeDimension = props.handleChangeDimension
    }

    render()
    {
        return(
            <div className="input-wrapper">
                <h2 className="tag">{this.props.tagValue}</h2>
                <input 
                className="input-field"
                onChange={(e) => this.handleChangeDimension(this.dimensionChanged, e.target.value)}
                value={this.props.inputValue}
                disabled={this.props.disabled}></input> 
            </div>
        )
    }
}

function InputsBox(props) 
{
    return(
        <div id="inputs-box">
            <div id="screen-dimensions-wrapper">
                <p className="title">Screen Dimensions</p>
                <Input 
                tagValue="Height"
                inputValue={props.screenHeight + "px"}
                handleChangeDimension={props.handleChangeDimension}
                dimensionChanged="screenHeight" />
                
                <Input 
                tagValue="Width"
                inputValue={props.screenWidth + "px"}
                handleChangeDimension={props.handleChangeDimension}
                dimensionChanged="screenWidth" />
            </div>

            <div id="components-dimensions-wrapper">
                <p className="title">Component Dimensions</p>
                <Input 
                tagValue="Height"
                inputValue={props.componentHeight + "px"}
                handleChangeDimension={props.handleChangeDimension}
                dimensionChanged="componentHeight" />

                <Input 
                tagValue="Width"
                inputValue={props.componentWidth + "px"}
                handleChangeDimension={props.handleChangeDimension}
                dimensionChanged="componentWidth" />

                <Input 
                tagValue="Font Size"
                inputValue={props.fontSize + "px"}
                handleChangeDimension={props.handleChangeDimension}
                dimensionChanged="fontSize" />
            </div>

            <div id="responsive-values-wrapper">
                <p className="title">Responsive Component Dimensions</p>
                <Input 
                tagValue="Height"
                type="text"
                inputValue={props.componentVH + "vh"}
                handleChangeDimension={props.handleChangeDimension}
                dimensionChanged="componentVH"
                disabled={true} />

                <Input 
                tagValue="Width"
                type="text"
                inputValue={props.componentVW + "vw"}
                handleChangeDimension={props.handleChangeDimension}
                dimensionChanged="componentVW"
                disabled={true} />

                <Input 
                tagValue="Font Size"
                type="text"
                inputValue={props.fontREM + "Rem"}
                handleChangeDimension={props.handleChangeDimension}
                dimensionChanged="fontREM"
                disabled={true} />
            </div>
        </div>
    )
}

function TitleBar(props)
{
    return(
        <div id="title-bar">
            <h1 id="page-title">{props.title}</h1>
        </div>
    )
}

function DisplayBox(props)
{
    return(
        <div id="display-box">
            <p id="example-text" style={{fontSize: props.size + "rem"}}>{props.text}</p>
        </div>
    )
}

class App extends React.Component
{
    constructor(props)
    {
        super(props)


        this.state = {
            screenHeight: window.innerHeight,
            screenWidth: window.innerWidth,

            componentHeight: 150,
            componentWidth: 300,
            fontSize: 48,

            componentVH: null,
            componentVW: null,
            fontREM: null
        }

        this.handleChangeDimension = this.handleChangeDimension.bind(this)
        this.setViewportDimensions = this.setViewportDimensions.bind(this)
        this.updateResponsiveValues = this.updateResponsiveValues.bind(this)
    }

    handleChangeDimension(dimension, value)
    {
        this.setState((currentState) => {
            let copyCurrent = currentState

            copyCurrent[dimension] = parseInt(value) || ""

            return({...copyCurrent})
        })
        this.updateResponsiveValues()
    }

    calculateResponsiveValue(parentDimension, childDimension)
    {
        return((100/parentDimension) * childDimension).toFixed(2)
    }

    calculateRem(px)
    {
        return (px/16).toFixed(2)
    }

    updateResponsiveValues()
    {
        this.setState((currentState) => {
            return(    
                {
                    componentVH: this.calculateResponsiveValue(currentState.screenHeight, currentState.componentHeight),
                    componentVW: this.calculateResponsiveValue(currentState.screenWidth, currentState.componentWidth),
                    fontREM: this.calculateRem(currentState.fontSize)
                })
        })
    }

    setViewportDimensions()
    {
        this.setState({screenHeight: window.innerHeight,
                       screenWidth: window.innerWidth})
    }

    componentWillMount()
    {
        this.updateResponsiveValues()
    }

    componentDidMount()
    {
        this.setViewportDimensions()
        window.addEventListener("resize", this.setViewportDimensions)
    }

    componentWillUnmount()
    {
        window.removeEventListener("resize", this.setViewportDimensions)
    }

    render()
    {

        return(
            <div id="body-wrapper">
                <TitleBar title="Responsive Value Calculator" />
                <DisplayBox 
                text="Example Text"
                size={this.state.fontREM} />
                <InputsBox {...Object.assign({}, 
                    this.state, 
                    {handleChangeDimension: 
                    this.handleChangeDimension})}/>
            </div>
        )
    }
}

ReactDOM.render(<App />,
                document.getElementById('root'))