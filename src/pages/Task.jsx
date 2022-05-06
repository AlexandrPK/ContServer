import React from 'react'
import { useParams } from 'react-router-dom'
import Layout from 'antd/lib/layout/layout'
const Task = () => {
    const {id} = useParams()
  return (
      <Layout style={{ background: "#fff" }}>
        <h1 style={{ margin: "20px", textAlign:"center" }}>Тут есть задание № {id}</h1>
      </Layout>
    
  )
}

export default Task