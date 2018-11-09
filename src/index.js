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
                inputValue={props.fontVW + "Rem"}
                handleChangeDimension={props.handleChangeDimension}
                dimensionChanged="fontVW"
                disabled={true} />
            </div>
        </div>
    )
}

class App extends React.Component
{
    constructor(props)
    {
        super(props)


        this.state = {
            screenHeight: 667,
            screenWidth: 375,

            componentHeight: 150,
            componentWidth: 300,
            fontSize: 12,
        }

        this.handleChangeDimension = this.handleChangeDimension.bind(this)
    }

    handleChangeDimension(dimension, value)
    {
        this.setState((currentState) => {
            let copyCurrent = currentState

            copyCurrent[dimension] = parseInt(value) || ""

            return({...copyCurrent})
        })
    }

    calculateResponsiveValue(parentDimension, childDimension)
    {
        return((100/parentDimension) * childDimension).toFixed(2)
    }

    calculateRem(px)
    {
        return (px/16).toFixed(2)
    }

    render()
    {

        let responsiveValues = {
            componentVH: this.calculateResponsiveValue(this.state.screenHeight, this.state.componentHeight),
            componentVW: this.calculateResponsiveValue(this.state.screenWidth, this.state.componentWidth),
            fontVW: this.calculateRem(this.state.fontSize)
        }

        return(
            <div id="body-wrapper">
                <h1 id="page-title">Responsive Dimension Calculator</h1>
                <InputsBox {...Object.assign({}, 
                    this.state, 
                    responsiveValues, 
                    {handleChangeDimension: 
                    this.handleChangeDimension})}/>
            </div>
        )
    }
}

ReactDOM.render(<App />,
                document.getElementById('root'))