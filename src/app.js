const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')


const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { title } = require('process')
const app = express()
const port = process.env.PORT || 3000

//Define path for express config
const publicDitectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templets/views')
const partialsPath = path.join(__dirname,'../templets/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup directory to serve
app.use(express.static(publicDitectoryPath))

app.get('',(req, res)=>{
    res.render('index',{
        title:'Weather App',
        name: 'Vipin Kumar'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me'        ,
        name:'Vipin Kumar about'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpful text',
        title:'Help',
        name:'Vipin Kumar help'
    })
})

app.get('/weather',(req,res)=>{
    const address = req.query.address
    if(!address){
        return res.send({
            error:'you must provide an address!'
        })
    }
    geocode(address, (errorGeo, {latitude, longitude, location}={})=>{
        if(errorGeo){
            return res.send({
                errorGeo:'Unable to find location'
            })
        }
            forcast(latitude, longitude,(errorForcast, {summary, temperature, precip}={})=>{
                if(!errorForcast){
                    res.send({
                        location:location,
                        title:summary,
                        temperature:temperature,
                        precip:precip
                    })
                    // console.log(summary, temperature, precip)
                } else{
                    return res.send({
                        errorForcast:'unable to find forcast'
                    })      
                }
            })
    })

    // res.send({
    //     title:'Weather Page',
    //     forcast:'It is sunny',
    //     location:'Amarut',
    //     address:req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'you must provide search term'
            }) 
    }

    console.log(req.query.search)
    res.send({
        product:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'Vipin Kumar',
        errorMessage:'Help Artical Not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Vipin Kuamr',
        errorMessage:'Page not found'
    })
})
app.listen(port, ()=>{
    console.log('Server is up on port on' + port)
})