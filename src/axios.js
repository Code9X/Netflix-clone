import axios from "axios";
import {baseUrl} from './Constants/constants'

const instance = axios.create({
    baseURL: baseUrl ,   
});

export default instance






/*
creating axios instance 
go to axios npm -scroll down -axios instance
avoid:  timeout: 1000,
        headers: {'X-Custom-Header': 'foobar'}

in  const instance = axios.create({
    baseURL:{your url from constant.js}
        */