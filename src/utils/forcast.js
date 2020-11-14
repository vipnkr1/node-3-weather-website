const request = require('request')

const forcast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=dd0d54e8d4d7f05747cd65c1234bccd3&query='+ latitude +',' + longitude
    request({url, json:true}, (error, {body})=>{
        if(error){
            callback(error, undefined)
        } else if(body.error){
            callback(error, undefined)
        }else{
            callback(undefined, {
                summary: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                precip: body.current.precip
            })
        }
        
    })
}


module.exports = forcast