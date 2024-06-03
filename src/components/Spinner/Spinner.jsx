import React from 'react';
import { ScaleLoader } from 'react-spinners';
import PropTypes from 'prop-types'
const Spinner = ({ smallHeight }) => {
    return (
     <div
      className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      <ScaleLoader size={100} color='blue' />
    </div>
  )
}

Spinner.propTypes = {
  smallHeight: PropTypes.bool,
}

export default Spinner;