import React, { useEffect, useState } from 'react'
import Card from '../Components/Card/Card'

const UserScreen = () => {
    const [listData, setListData] = useState([])
    const fetchApi= async ()=>{
try{
    const result = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await result.json()
    setListData(data)
}catch(error){
    console.log("error res===",error)
    setListData([])
}

    }

useEffect(()=>{
    fetchApi();
})


  return (
    <div>
        {
            listData.map((item)=>{
                return <Card data={item}/>
            })
        }


        
    </div>
  )
}

export default UserScreen