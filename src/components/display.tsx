import React from 'react'
import {
  WiSunrise,
  WiSunset,
  WiStrongWind,
  WiHumidity,
  WiThermometerExterior,
  WiThermometer,
} from 'react-icons/wi'

interface IProps {
  city: {
    coord: {
      lon: number
      lat: number
    }
    weather: {
      id: number
      main: string
      description: string
      icon: string
    }[]

    base: string
    main: {
      temp: number
      feels_like: number
      temp_min: number
      temp_max: number
      pressure: number
      humidity: number
    }
    visibility: number
    wind: {
      speed: number
      deg: number
    }
    clouds: {
      all: number
    }
    dt: number
    sys: {
      type: number
      id: number
      message: number
      country: string
      sunrise: number
      sunset: number
    }
    timezone: number
    id: number
    name: string
    cod: number
  }
  handleChange: (value: { value: string }) => void
}

function handleSubmit(e: React.SyntheticEvent) {
  e.preventDefault()
}

export default function Display(props: IProps) {
  const sunrise = new Date(props.city.sys.sunrise * 1000)
  const sunset = new Date(props.city.sys.sunset * 1000)
  const sunrise1 = sunrise.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })
  const sunset1 = sunset.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const [value, setValue] = React.useState({ value: '' })
  function handleValue(event: React.ChangeEvent<HTMLInputElement>) {
    setValue((oldValue) => ({ ...oldValue, value: event.target.value }))
  }

  return (
    <div className="maindis">
      <form action="submit" onSubmit={handleSubmit}>
        <input
          className="input--display"
          type="text"
          value={value.value}
          onChange={handleValue}
          placeholder="Digite a cidade..."
        />
        <button
          className="button--display"
          type="submit"
          onClick={() => props.handleChange(value)}
        >
          FIND
        </button>
      </form>
      {props.city.name && (
        <main className="main--display">
          <h2>{props.city.name}</h2>
          <p id="main--temp">{`${props.city.main.temp.toFixed(2)}ºC`}</p>
          <div className="icon--description">
            <img
              src={`http://openweathermap.org/img/wn/${props.city.weather[0].icon}@2x.png`}
              alt="weather icon"
            />
            <p id="capitalized">{`${props.city.weather[0].description} `}</p>
          </div>
          <hr />
          <p id="details">Details</p>
          <section className="sun">
            <div id="sunset">
              <WiSunrise className="icons" />
              <p>{sunrise1}</p>
            </div>
            <div id="main--arch">
              <div id="arch" />
            </div>
            <div id="sunrise">
              <WiSunset className="icons" />
              <p>{sunset1}</p>
            </div>
          </section>
          <section className="minorInfos">
            <article className="minorInfo">
              <WiStrongWind className="icons" />
              {`${Math.floor(props.city.wind.speed * 3.6)} km/h`}
            </article>
            <article className="minorInfo">
              <WiHumidity className="icons" />
              {`${props.city.main.humidity}%`}
            </article>
            <article className="minorInfo">
              <WiThermometer className="icons" />
              {`${props.city.main.temp_max.toFixed(2)}ºC`}
            </article>
            <article className="minorInfo">
              <WiThermometerExterior className="icons" />
              {`${props.city.main.temp_min.toFixed(2)}ºC`}
            </article>
          </section>
        </main>
      )}
      <footer>
        *Para resultados mais precisos acrescentar estado e/ou código do país
        separados por vírgulas
      </footer>
    </div>
  )
}
