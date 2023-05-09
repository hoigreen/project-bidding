import React from 'react'

const TimeStart = ({product, socket}) => {
    const getTime = new Date().getTime();

    var minuteFormatted = ''
    if(product.start < 10)
    {
        minuteFormatted = String("0" + product.start)
    }
    else
    {
        minuteFormatted = product.start;
    }

      return (
          <span>:{minuteFormatted}</span>
          )
}
export default TimeStart
