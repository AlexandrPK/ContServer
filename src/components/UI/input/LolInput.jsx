import React from 'react'
import classes from './LolInput.module.css'; 

const LolInput = (props) => {
  return (
    <input className={classes.lolInput} {...props} />
  )
}

export default LolInput