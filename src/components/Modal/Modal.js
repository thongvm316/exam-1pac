import React from 'react'
import Spinner from '../Spinner/Spinner'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import axios from 'axios'

import '../../assets/scss/components/modal.scss'

const Modal = ({ setOpenModal, countryCode }) => {
  const [data, setData] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  const options = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Statistics',
    },
    subtitle: {
      text: '',
    },
    xAxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
    yAxis: {
      title: {
        text: false,
      },
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: false,
        },
        enableMouseTracking: true,
        marker: {
          enabled: true,
        },
      },
    },
    xAxis: {
      crosshair: true,
    },
    series: [
      {
        name: 'Tokyo',
        data: [
          7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6,
        ],
      },
      {
        name: 'London',
        data: [
          3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8,
        ],
      },
      {
        name: 'Korean',
        data: [
          3.9, 2.2, 7.7, 8.5, 15.9, 15.2, 17.0, 21.6, 14.2, 26.3, 6.6, 32.8,
        ],
      },
    ],
  }

  React.useEffect(() => {
    const getData = async () => {
      try {
        const url = `http://api.countrylayer.com/v2/alpha/${countryCode}?access_key=92835e4eeb6ba3f732cae29dabda6fed`
        const { data } = await axios.get(url)

        data[
          'flag'
        ] = `https://flagcdn.com/w320/${countryCode.toLowerCase()}.jpg`
        setData(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error.response)
      }
    }

    // getData() // ! change loading
  }, [])

  return (
    <div className='modal'>
      <div className='modal__container'>
        {loading ? (
          <Spinner className='modal__spinner' />
        ) : (
          <>
            <div className='modal__closeButton'>
              <button
                onClick={() => {
                  setOpenModal(false)
                }}
              >
                X
              </button>
            </div>

            <div className='modal__title'>
              <h1>{data?.name} Situation</h1>
            </div>

            <div className='modal__body'>
              <div className='modal__country-information'>
                <div className='modal__country-image'>
                  <img src={data?.flag} alt='country' />
                </div>

                <div className='modal__country-detail'>
                  <p>
                    Name: <span>{data?.name}</span>
                  </p>
                  <p>
                    Capital: <span>{data?.capital}</span>
                  </p>
                  <p>
                    Region: <span>{data?.region}</span>
                  </p>
                </div>
              </div>

              <div className='modal__graph'>
                <HighchartsReact highcharts={Highcharts} options={options} />
              </div>
            </div>

            <div className='modal__footer'>
              <button
                onClick={() => {
                  setOpenModal(false)
                }}
              >
                OK
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Modal
