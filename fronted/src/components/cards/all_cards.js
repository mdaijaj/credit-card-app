import React, { useEffect, useState } from "react";
import Card from "react-credit-cards";
import axios from "axios"


export {ShowCards}

const ShowCards = () => {
    const [authorised, setAuthorised]= useState()
    const [cartlist, setCartlist]= useState([])

    const allCards=  async (token)=>{
        let newtoken= `Bearer ${token.access.token}`
        const response= await axios.get("https://interview-api.onrender.com/v1/cards", {
            headers: {
                'Authorization': newtoken,
            }
        })
        setCartlist(response.data.results)
    }

    useEffect(() => {
        let userInfo = localStorage.getItem('user')
        let users=JSON.parse(userInfo)
        console.log("users", users)
        users? setAuthorised(users) : ""
        allCards(users.tokens)
    }, [])

    
    return (
        <>
        {authorised===undefined?
            <>
            <h5 style={{color: "red", marginTop: "25px"}}>UnAauthorised User...</h5>
            <h6> please login valid User...</h6>
            </>
        :
        <div className="App-cards">
            <h3>Supported Cards</h3>
            <div className="App-cards-list">

            {cartlist?.map((item)=>(
                <>
                <h1>{}</h1>
                <Card
                    name={item.name}
                    number={item.cardNumber}
                    expiry={item.cardExpiration}
                    cvc="7860"
                />
                </>
                )
            )}
            </div>
        </div>
    }
    </>
    )
}
