import React from 'react'
import classes from './LolButton.module.css';

const LolButton = ( {children, ...props}) => {
  return (
    <button {...props} className={classes.LolButton}> 
    {children}
    </button>
  )
}

export default LolButton