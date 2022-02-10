import React from 'react'
import Data from './Data'

export default function Dashboard() {
    return (
      <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Room</th>
          <th scope="col">EnterTime</th>
          <th scope="col">ExitTime</th>
          <th scope="col">Number_of_beacons</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td colspan="2">Larry the Bird</td>
          <td>@twitter</td>
          <td>@fat</td>
        </tr>
      </tbody>
      <Data></Data>
    </table>





     )
}