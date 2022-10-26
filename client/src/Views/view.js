import React from 'react';
import { withRouter } from "react-router-dom";
import {  Container, Row, Col } from 'react-bootstrap'
import CircularProgress from '@mui/material/CircularProgress';
import Carpark from '../Models/Carpark';
import CarparkDetail from '../Component/CarparkDetail';
class View extends React.Component {
    constructor(props) {
        super(props)
        this.interval = null
        this.carparkApi = new Carpark()
        this.state = {
            carparks : null,
            selected : null,
            index : 0,
            count : 1,
            prevCount : null
        };
    }

    componentDidMount(){
        this.init()
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    componentDidUpdate(){
        clearInterval(this.interval)
        this.interval = setInterval(() => {
            var that = this
            this.myInterval(that)
        }, 10000);
    }

    shouldComponentUpdate(nextProps) {
        if(nextProps.count === 1){
            return true
        }
        return nextProps.count !== this.state.count
     }

    init = () => {
        if(this.state.carparks === null){
            this.carparkApi.GetApi(async (carparks, err) => {
                let data = (carparks && carparks[0]) ? carparks[0].carpark_data : []
                let sorted = await this.formatCarparkData(data)
                this.setState({ carparks : sorted ? sorted : null })
            })
        }
    }

    myInterval = (context) => {
        var count = context.state.count
        var prevCount = context.state.prevCount
        if(count === prevCount){
            return
        }
        var index = context.state.index
        context.carparkApi.GetApi(async (carparks, err) => {
            if(err === null){
                let data = (carparks && carparks[0]) ? carparks[0].carpark_data : []
                prevCount = count
                index += 1
                count += 1
                if(index >= data.length){
                    index = 0
                }
                let sorted = await context.formatCarparkData(data)
                context.setState({
                    carparks : sorted, 
                    index : index, 
                    count : count,
                    prevCount : prevCount
                })
            }
        })
    }

    async formatCarparkData(carparks){
        return new Promise (async (res,rej) => {
            if(!Array.isArray(carparks) || carparks.length === 0){
                res(carparks)
            }
            var checks = carparks.length
            var smallCarparks = []
            var mediumCarparks = []
            var bigCarparks = []
            var largeCarparks = []
            for(let i = 0 ; i < carparks.length ; i++){
                let carpark = carparks[i]
                let field = "carpark_info"
                let carpark_info = carpark[field]
                if(carpark_info.find(info => parseInt(info.total_lots) < 100)){
                    let cp = carpark
                    cp[field] = carpark_info.filter(info => parseInt(info.total_lots) < 100)
                    smallCarparks.push(cp)
                    // console.log(smallCarparks.filter((scp) => scp[field].find(a => a.total_lots > 100)))
                }
                else if(carpark_info.find(info => parseInt(info.total_lots) > 100 && parseInt(info.total_lots) < 300)){
                    let cp = carpark
                    cp[field] = carpark_info.filter(info => parseInt(info.total_lots) > 100 && parseInt(info.total_lots) < 300)
                    mediumCarparks.push(cp)
                }
                else if(carpark_info.find(info => parseInt(info.total_lots) > 300 && parseInt(info.total_lots) < 400)){
                    let cp = carpark
                    cp[field] = carpark_info.filter(info => parseInt(info.total_lots) > 300 && parseInt(info.total_lots) < 400)
                    bigCarparks.push(cp)
                }
                else if(carpark_info.find(info => parseInt(info.total_lots) > 400)){
                    let cp = carpark
                    cp[field] = carpark_info.filter(info => parseInt(info.total_lots) > 400)
                    largeCarparks.push(cp)
                }
                checks -= 1
                if(checks === 0){
                    smallCarparks = await this.SortDescending(smallCarparks)
                    mediumCarparks = await this.SortDescending(mediumCarparks)
                    bigCarparks = await this.SortDescending(bigCarparks)
                    largeCarparks = await this.SortDescending(largeCarparks)
                    let rtnObj = {
                        smallCarparks : smallCarparks,
                        mediumCarparks : mediumCarparks,
                        bigCarparks : bigCarparks,
                        largeCarparks : largeCarparks
                    }
                    res(rtnObj)
                }
            }
        })
    }

    async SortDescending(carparkArr){
        return new Promise (async (res,rej) => {
            await carparkArr.sort((carparkA,carparkB) => {
                let field = "carpark_info"
                if (carparkA[field].find(a => !carparkB[field].some(b => b.lots_available < a.lots_available))) {
                    return 1
                } else {
                    return -1
                }
            })
            res(carparkArr)
        })
    }


    render() {
        var carparks = this.state.carparks
        if(!carparks){
            return(<CircularProgress style={{position:"absolute", transform : "translate(-50%, -50%", top :"50%", left:"50%"}}/>)
        }
        // console.log(carparks)
        return (
            <Container>
                <Row>
                    <Col>
                        <span style={{display : "flex", alignSelf :"flex-start", fontSize:"26px", fontWeight:900}}>Carpark</span>
                    </Col>
                </Row>
                {Object.keys(carparks).map((key, index) => {
                    return(
                        <CarparkDetail
                            carparks={carparks[key]} 
                            key={index} 
                            size={key}
                            count={this.state.count}
                            index={this.state.index}
                        />
                    )
                })}
            </Container>
        )
    }

}


export default withRouter(View);