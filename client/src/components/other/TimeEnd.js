import React, { useState, useEffect } from 'react'

const TimeStart = ({ product, socket }) => {
    const getTime = new Date().getTime();
    const currentTime = new Date(getTime);
    const [minutes, setMinutes] = useState(product.end)
    


    return (
        <span>:{product.end}</span>
    )
}
export default TimeStart
