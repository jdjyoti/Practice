import React, { Component } from 'react'
import mqtt from 'mqtt';

var client;

export default class Data extends Component {

    constructor(props) {
        super(props);
        this.state = {
            beaconList: [],
            limit: ''
        };
    }

    componentDidMount() {
        console.log('hi');
        const settings = {
            port: 8080,
            clientId: 'dashboard'
        };
        client = mqtt.connect('mqtt://localhost', settings);
        client.on('connect', function () {
            client.subscribe('/dashboard');
        });
        setInterval(this.getPublishedMessage, 3000);
    }

    // getPublishedMessage = () => {
    //     client.on('message', function (topic, message) {
    //         console.log(message);
    //         if (message.toString().includes("beaconId")) {
    //             this.setState({ beaconList: JSON.parse(message.toString()) });
    //         }
    //         else {
    //             if (message.toString().includes("crowd"))
    //             this.setState({ limit: message.toString() });
    //             else {
    //                 this.setState({ limit: '' });
    //             }
    //         }
    //     });
    // }

    render() {
        // let { beaconList, limit } = this.state;
        // let dataSize;
        // if (beaconList.length == 0) {
        //     dataSize = "No Beacons Active"
        // } else {
        //     dataSize = null;
        // }
        // const data_minimal_width = {
        //     columns: [
        //         {
        //             label: 'Name',
        //         },
        //         {
        //             label: 'Room Number',
        //         },
        //         {
        //             label: 'Beacon ID',
        //         },
        //         {
        //             label: 'Status',
        //         },
        //         {
        //             label: 'Entered at',
        //         }
        //     ],
        //     rows: beaconList
        // };
        // if (dataSize) {
        //   return (
        //     <div className="content">
        //       <div className="container-fluid">
        //         <h3>{dataSize}</h3>
        //       </div>
        //     </div>
        //   );
        // } else {
        //   return (
        //     <div className="content">
        //       <div className="container-fluid">
        //         <h1>
        //           <Blink color='red' text={limit}></Blink>
        //         </h1>
        //         <MDBTable striped bordered>
        //           <MDBTableHead columns={data_minimal_width.columns} />
        //           <MDBTableBody rows={data_minimal_width.rows} />
        //         </MDBTable>
        //       </div>
        //     </div>
        //   );
        //  }

         return (
            <div className="content">
            </div>
          );
    };
}
