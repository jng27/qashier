import React from 'react';
import { Row, Col } from 'react-bootstrap'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import './component.css'
class CarparkDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            carparks : null,
            filteredHighestAvail : null,
            filteredLowestAvail : null
        }
    }

    componentDidMount(){
        let props = this.props
        this.init(props)
    }

    async init(props){
        if(props){
            let carparks = Array.isArray(props.carparks) ? props.carparks : []
            let highestAvailLotsCarpark = carparks.length > 0 ? carparks[0] : null
            let lowestAvailLotsCarpark = carparks.length > 0 ? carparks[carparks.length - 1] : null
            // console.log(lowestAvailLotsCarpark)
            if(highestAvailLotsCarpark !== null && lowestAvailLotsCarpark !== null){
                let field = "carpark_info"
                highestAvailLotsCarpark[field] = await this.mySort(highestAvailLotsCarpark[field], "lots_available")
                lowestAvailLotsCarpark[field] = await this.mySort(lowestAvailLotsCarpark[field], "lots_available")
                let highestAvailLots = highestAvailLotsCarpark[field][0].lots_available
                let lowestAvailLots = lowestAvailLotsCarpark[field][0].lots_available
                let filteredHighestAvail = await carparks.filter((carpark) => { return carpark[field].some(c => c.lots_available === highestAvailLots)})
                let filteredLowestAvail = await carparks.filter((carpark) => { return carpark[field].some(c => c.lots_available === lowestAvailLots)})
                // console.log(filteredHighestAvail)
                // console.log(filteredLowestAvail)
                this.setState({ 
                    carparks : carparks, 
                    size : props.size,
                    filteredHighestAvail : filteredHighestAvail,
                    filteredLowestAvail : filteredLowestAvail,
                    count : props.count,
                    index : props.index
                })
            }else{
                this.setState({ 
                    carparks : carparks
                })
            }
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.count !== this.props.count){
            this.init(this.props)
        }
    }

    async mySort(array, field){
        return new Promise(async (res,rej) => {
            await array.sort((a,b) => {
                if(a[field] > b[field]){
                    return 1
                }else{
                    return -1
                }
            })
            res(array)
        })
    }

    render() {
        var carparks = this.state.carparks
        var size = this.state.size
        var filteredHighestAvail = this.state.filteredHighestAvail
        var filteredLowestAvail = this.state.filteredLowestAvail
        if(!carparks || !filteredHighestAvail || !filteredLowestAvail){
            return(<></>)
        }
        return (
            <Card sx={{ minWidth:320, border: '1px dotted' }} style={{marginTop:"20px"}}>
                <CardContent>
                    <Row style={{margin:"10px 0px"}}>
                        <Col>
                            <span id="carpark-label" style={{textTransform:"capitalize"}}>
                                Carpark Size : {size ? size.toString().replace("Carparks","") : ""}
                            </span>
                        </Col>
                    </Row>
                    <Divider/>
                    <Row style={{margin:"10px 0px"}}>
                        <Col>
                            <span id="carpark-label">
                                Highest Available Slots : {filteredHighestAvail[0]["carpark_info"][0]["lots_available"]}
                            </span>
                            <Divider style={{margin:"20px 0px"}}/>
                            <span id="carpark-label">
                                Lowest Available Slots : {filteredLowestAvail[0]["carpark_info"][0]["lots_available"]}
                            </span>
                        </Col>
                    </Row>
                    <Divider/>
                    <Row style={{margin:"10px 0px"}}>
                        <Col>
                            <span id="carpark-label">
                                Carparks with Highest Available Slots : {filteredHighestAvail.map(i => i.carpark_number).join(", ")}
                            </span>
                            <Divider style={{margin:"20px 0px"}}/>
                            <span id="carpark-label">
                                Carparks with Lowest Available Slots : {filteredLowestAvail.map(i => i.carpark_number).join(", ")}
                            </span>
                        </Col>
                    </Row>
                </CardContent>
            </Card>
        )
    }

}


export default (CarparkDetail);