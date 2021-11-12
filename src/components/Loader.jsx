import React from 'react'

function Loader() {
    return (
        <div className="container text-center my-5 p-5 bg-dark text-white" style={{boxShadow: "2px 2px 12px 0px"}}>
            <i className="fas fa-spinner fa-4x fa-spin"></i>
        </div>
    )
}

export default Loader
