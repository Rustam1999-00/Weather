import React, { useEffect, useRef, useState } from 'react'
import Button from '@mui/material/Button';
import axios from 'axios';
import "./Home.css"
// ======================
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

// eafbbe8f57c5649128e1da7196686d17
import Bulutli from "../assets/images/images.jpg"
import Sun from "../assets/images/images (1).jpg"
import Doj from "../assets/images/ovc_-ra.svg"
import { ToastContainer, toast } from 'react-toastify';
export const Home = () => {
    const [datas, setData] = useState([])
    const [val, setVal] = useState('Tashkent')
    const terRef = useRef()

    const hendleSubmit = (evt) => {

        evt.preventDefault();
        const dats = terRef.current.value
        setVal(dats)
        terRef.current.value=''
        toast.success('Bajarildi')
  
    };
    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=eafbbe8f57c5649128e1da7196686d17&units=${"metric"}`)
            .then((data) => {
                if (data.data) {
                    setData(data)
                }
            })
            .catch((err) => console.log(err))
    }, [val])
 
    return (
        <div className='WeatherHome    '>
            <h1 className="text-center wethertext">Weather App</h1>
            <form onClick={hendleSubmit} className="form-control w-50 mx-auto shadow p-3 bg-primary bg-opacity-75 ">
                <input ref={terRef} className="input-group mb-3 p-2 rounded-2" type='text' placeholder="Shaxaringizni kiriting" />

                <Button className='d-block ms-auto' type="submit" variant="contained">Send</Button>
            </form>
            {/* <p>{datas.data ? datas.data.name : ''}</p>
            <p>{datas.data ? datas.data.weather[0].description : ''}</p>
            {datas.data ? <p>{datas.data.main.temp >= 0 ? (`harorat= ${datas.data.main.temp}C%`) : 'not'}</p> : ''} */}

            <div className='w-50 mx-auto mt-5'>
                {
                    datas.data ?
                        <div className={`w-75 mx-auto card p-3  bg-primary bg-opacity-50  pb-5 text-light`}>
                          <div>
                          <h2 className='text-center'>{datas.data.name}</h2>
                            <img className='d-block mx-auto rounded-3 bg-primary bg-opacity-50' src={datas.data.main.temp >= 15 ? Sun :datas.data.main.temp <= 15 ?Bulutli:datas.data.main.temp >= 0 ?Doj:Doj} width='300' height='250' alt="Weather" />
                            <hr/>
                          </div>
                            
                          <div>
                          <h4>Bugungi ob havo</h4>
                            <hr/>
                          <h6 className='text-info'><strong className='text-dark'>Harorati:</strong>{datas.data.main.temp >= 0 ? (`     ${datas.data.main.temp}   C"`):''}</h6>
                            <h6 className='text-info'><strong className='text-dark'>Holati:</strong>{ datas.data.weather[0].description}</h6>
                          </div>
                        </div>
                        : ''
                }
            </div>

        </div>
    )
}
