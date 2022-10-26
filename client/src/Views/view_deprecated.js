import React from 'react';
import { withRouter } from "react-router-dom";
import { Row, Container, Col } from 'react-bootstrap'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Carpark from '../Models/Carpark';
// import './view.css'
class View extends React.Component {
    constructor(props) {
        super(props)
        this.carparkApi = new Carpark()
        this.state = {
            carpark : null,
            selected : null,
            index : 0,
            count : 1,
            prevCount : null
        };
    }

    componentDidMount(){
        this.init()
    }

    init = () => {
        if(this.state.carpark === null){
            this.carparkApi.GetCarpark((carpark, err) => {
                this.setState({carpark : carpark, selected : err ? null : carpark[this.state.index]})
            })
        }
        setInterval(() => {
            var count = this.state.count
            var prevCount = this.state.prevCount
            var index = this.state.index
            if(count === prevCount){
                return
            }
            this.carparkApi.GetCarpark((carpark, err) => {
                if(err == null){
                    prevCount = count
                    index += 1
                    count += 1
                    if(index >= carpark.length){
                        index = 0
                    }
                    this.setState({
                        carpark : carpark, 
                        selected : err ? null : carpark[this.state.index], 
                        index : index, 
                        count : count,
                        prevCount : prevCount
                    })
                }

            })
          }, 10000);
    }

    render() {
        var carpark = this.state.carpark
        var selected = this.state.selected
        if(!carpark || !selected){
            return(<></>)
        }
        return (
            <Container>
                <Row>
                    <Col>
                        <span style={{display : "flex", alignSelf :"flex-start", fontSize:"26px", fontWeight:900}}>Carpark</span>
                    </Col>
                </Row>
                <Row style={{marginTop:"20px"}}>
                    <Col>
                        <Card sx={{ minWidth:320 }}>
                            <CardContent>
                                <Row>
                                    <Col>
                                        <label id="carpark-label">
                                            {selected.name}
                                        </label>
                                    </Col>
                                </Row>
                                <Row style={{marginTop:"20px"}}>
                                    <Col>
                                        <div id="size-wrapper">
                                            <span id="size-label">
                                                Minimum : 
                                            </span>
                                            {" "}
                                            <span id="size">
                                                {selected.min}
                                            </span>
                                        </div>
                                        {selected.max !== -1 && (
                                            <div id="size-wrapper">
                                                <span id="size-label">
                                                    Maximum : 
                                                </span>
                                                {" "}
                                                <span id="size">
                                                    {selected.max}
                                                </span>
                                            </div>
                                        )}
                                    </Col>
                                </Row>
                            </CardContent>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }

}


export default withRouter(View);