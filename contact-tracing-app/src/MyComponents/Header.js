import React from 'react'

export default function Header(props) {
    return (
      <>

         <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
    <a className="navbar-brand" href="#">DIBRIS</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">About</a>
        </li>
      </ul>   

        <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        </div>
      
      </div>
      <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="Room_Number" data-bs-toggle="dropdown" aria-expanded="false">
    Select Room
  </button>
  <ul class="dropdown-menu" aria-labelledby="Room_Number">
    <li><a class="dropdown-item" href="#">Room-1</a></li>
    <li><a class="dropdown-item" href="#">Room-2</a></li>
    <li><a class="dropdown-item" href="#">Room-3</a></li>
  </ul>
</div>
   </nav> 
   </>  



        
    )
}
Header.defaultProps = {
  searchBar : false
}