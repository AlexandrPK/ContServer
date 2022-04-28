import React from 'react'
import { Button } from 'antd';

// import classes from './LolButton.module.css';

const LolButton = ( {children, ...props}) => {
  return (
    <Button {...props} style={{margin:"5px"}}> 
    {children}
    </Button>
  )
}

export default LolButton