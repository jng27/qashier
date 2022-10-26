import React from 'react';
import { withRouter } from "react-router-dom";
import { Row, Container, Col } from 'react-bootstrap'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Carpark from '../Models/Carpark';
import moment from 'moment';
import './view.css'
class View extends React.Component {
    constructor(props) {
        super(props)
        this.interval = null
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

    componentDidUpdate(){
        clearInterval(this.interval)
    }

    init = () => {
        if(this.state.carpark === null){
            this.carparkApi.GetApi((carpark, err) => {
                // console.log(carpark[0].carpark_data)
                let data = carpark[0] ? carpark[0].carpark_data : null
                this.setState({carpark : data, selected : err ? null : data[this.state.index]})
            })
        }
        this.interval = setInterval(() => {
            var count = this.state.count
            var prevCount = this.state.prevCount
            var index = this.state.index
            if(count === prevCount){
                return
            }
            this.carparkApi.GetApi((carpark, err) => {
                let data = carpark[0] ? carpark[0].carpark_data : null
                if(err == null){
                    prevCount = count
                    index += 1
                    count += 1
                    if(index >= data.length){
                        index = 0
                    }
                    this.setState({
                        carpark : data, 
                        selected : err ? null : data[this.state.index], 
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
                                            Last Updated : {moment.utc(selected.update_datetime).local().format('DD/MM/YYYY HH:mm:ss')}
                                        </label>
                                    </Col>
                                </Row>
                                <Row style={{marginTop:"20px"}}>
                                    <Col>
                                        <label id="carpark-label">
                                            Carpark Number : {selected.carpark_number}
                                        </label>
                                    </Col>
                                </Row>
                                {selected.carpark_info.map((info, index) => (
                                    <Row style={{marginTop:"20px"}} key={index}>
                                        <Col>
                                            <div id="size-wrapper">
                                                <span id="size-label">
                                                    Lot type : 
                                                </span>
                                                {" "}
                                                <span id="size">
                                                    {info.lot_type}
                                                </span>
                                            </div>
                                            <div id="size-wrapper">
                                                <span id="size-label">
                                                    Lots available : 
                                                </span>
                                                {" "}
                                                <span id="size">
                                                    {info.lots_available}
                                                </span>
                                            </div>
                                            <div id="size-wrapper">
                                                <span id="size-label">
                                                    Total lots : 
                                                </span>
                                                {" "}
                                                <span id="size">
                                                    {info.total_lots}
                                                </span>
                                            </div>
                                        </Col>
                                    </Row>
                                ))}
                            </CardContent>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }

}


export default withRouter(View);