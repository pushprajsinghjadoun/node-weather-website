const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Pushpraj Singh Jadoun'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Pushpraj Singh Jadoun'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Pushpraj Singh Jadoun'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide search term'
        })
    }
    geocode(req.query.address, (error, {latitude, logitude, location}={})=> {
        if(error){
            return res.send({error})
        }
        forecast(logitude,latitude,(error,forecastdata) => {
            if(error)
            {
                return res.send(error)
            }
            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
            })
        
        })
    })
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address:req.query.address
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        res.send({
            error:'You must provide search term'
        })
    }
    req.query.search
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        error:'help artical not found'
    })
})

app.get('*', (req,res) => {
    res.render('error', {
        error:"My error 404"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})