import React from 'react'

import './App.css'
import Display from './components/display'

function App() {
  const apiResp = {
    coord: {
      lon: 0,
      lat: 0,
    },
    weather: [
      {
        id: 0,
        main: '',
        description: '',
        icon: '',
      },
    ],
    base: '',
    main: {
      temp: -300,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0,
    },
    visibility: 0,
    wind: {
      speed: 0,
      deg: 0,
    },
    clouds: {
      all: 0,
    },
    dt: 0,
    sys: {
      type: 0,
      id: 0,
      message: 0,
      country: '',
      sunrise: 0,
      sunset: 0,
    },
    timezone: 0,
    id: 0,
    name: '',
    cod: 0,
  }

  const [state, setState] = React.useState({
    location: 'Vitória, Espírito Santo',
  })
  const [allState, setAllState] = React.useState(apiResp)

  const handleChange = (value: { value: string }) => {
    setState({ location: value.value })
  }

  React.useEffect(() => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${state.location}&limit=5&lang=pt_br&appid=974d45cc941d8eced29291f05f08cea1`
    )
      .then((resp) => resp.json())
      .then((data) => ({ lat: data[0].lat, lon: data[0].lon }))
      .then((obj) =>
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${obj.lat}&lon=${obj.lon}&lang=pt_br&units=metric&appid=974d45cc941d8eced29291f05f08cea1`
        )
      )
      .then((resp2) => resp2.json())
      .then((data2) => setAllState(data2))
  }, [state])

  return (
    <div className="App">
      <Display city={allState} handleChange={handleChange} />
      <div className="buttons" />
    </div>
  )
}
export default App
