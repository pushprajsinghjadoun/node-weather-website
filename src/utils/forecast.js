
const request = require('request')

const forecast = (latitude, longitude, callback) => 
{
    const url = 'http://api.weatherstack.com/current?access_key=2760b8cbaa2e41647a3a2b7edc66a923&query='+latitude+','+longitude+',&units=m'

    request({url, json:true}, (error,{ body }) => {

        if(error)
        {
            callback('Unable to connect to weather service!',undefined)
        } else if( body.error)
        {
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,'It is Currently ' +  body.current.temperature + ' degress out and It is '+ body.current.weather_descriptions)
        }

    })
}

module.exports = forecast