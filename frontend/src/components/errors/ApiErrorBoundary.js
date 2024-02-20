import React from "react";


const ApiErrorBoundary = (props) => {
    const { error } = props;
    return (
        error && Object.keys(error).map((key) => (
            <p key={key} style={{color: 'red'}}>{key}: {error[key]}</p>
        ))
    )
}

export default ApiErrorBoundary;