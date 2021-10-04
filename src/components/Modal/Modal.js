import React from 'react'
import axios from 'axios'
import moment from 'moment'
import queryString from 'query-string'

import Spinner from '../Spinner/Spinner'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import * as hcnd from 'highcharts/modules/no-data-to-display'

import '../../assets/scss/components/modal.scss'

hcnd(Highcharts)

const Modal = ({ setOpenModal, countryCode, countryName }) => {
  const [data, setData] = React.useState(null)
  const [dataDetailCountry, setDataDetailCountry] = React.useState([])
  const [selectYear, setSelectYear] = React.useState('2021')
  const [loading, setLoading] = React.useState(true)
  const [loadingChart, setLoadingChart] = React.useState(false)

  const handleChangeSelect = (e) => {
    setSelectYear(e.target.value)
    setLoadingChart(true)
  }

  const options = React.useMemo(
    () => ({
      chart: {
        type: 'column',
        height: 250,
      },
      title: {
        text: '',
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
        crosshair: true,
      },
      tooltip: {
        shared: true,
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
      series: [
        {
          name: 'Confirmed',
          data: dataDetailCountry.map((item) => item.Confirmed),
          color: '#FEB13B',
        },
        {
          name: 'Deaths',
          data: dataDetailCountry.map((item) => item.Deaths),
          color: '#e74c3c',
        },
        {
          name: 'Recovered',
          data: dataDetailCountry.map((item) => item.Recovered),
          color: '#27ae60',
        },
      ],
      lang: {
        noData: 'Can not get data of this country.',
      },
      noData: {
        style: {
          fontWeight: '400',
          fontSize: '13px',
          color: '#303030',
        },
      },
    }),
    [dataDetailCountry],
  )

  const formatConditionDate = (year, index) => {
    const format = `${year}-${index < 10 ? `0${index}` : index}`
    const endOfMonth = moment(format).endOf('month').format('DD')
    return `${format}-${endOfMonth}`
  } // eg: 2021-02-28

  const filterLastElOfEachMonth = React.useCallback(
    (db) => {
      let arr = []

      const lastElOfData = db[db.length - 1]
      const currentMonth = parseInt(moment(lastElOfData['Date']).format('MM'))

      for (let index = 1; index <= currentMonth; index++) {
        const lastElOfEachMonth = db.find((item) => {
          const dateOfItem = moment(item['Date']).format('YYYY-MM-DD')
          const endOfDateInMonth = formatConditionDate(selectYear, index)

          if (index !== currentMonth) {
            return dateOfItem === endOfDateInMonth && item.Province === '' // * use in case that country has data of each Province
          } else {
            // in case, if params.toDate = currentDate, and currentDate note up-to-date (value = 0) --> so should compare with data res from api (may be current - 1,2,3...) and render data
            return (
              dateOfItem ===
                moment(lastElOfData['Date']).format('YYYY-MM-DD') &&
              item.Province === '' // * use in case that country has data of each Province
            )
          }
        })

        arr.push(lastElOfEachMonth)
      }

      return arr
    },
    [selectYear],
  )

  React.useEffect(() => {
    const getData = async () => {
      try {
        const url = `http://api.countrylayer.com/v2/alpha/${countryCode}?access_key=f58063b2c195ed073bacf07987726a99`
        const { data } = await axios.get(url)

        data[
          'flag'
        ] = `https://flagcdn.com/w320/${countryCode.toLowerCase()}.jpg`
        setData(data)
      } catch (error) {
        console.log(error.response)
      }
    }

    getData()
  }, [countryCode])

  React.useEffect(() => {
    const getDetailCountrySituation = async () => {
      try {
        const currentYear = moment().format('YYYY')

        const startOfYearSelected = moment(selectYear)
          .startOf('year')
          .format('YYYY-MM-DD')
        const endOfYearSelected = moment(selectYear)
          .endOf('year')
          .format('YYYY-MM-DD')

        const currentDate = moment().format('YYYY-MM-DD')

        const params = {
          from: startOfYearSelected,
          to: selectYear === currentYear ? currentDate : endOfYearSelected,
        }

        const url = `https://api.covid19api.com/country/${countryName}?${queryString.stringify(
          params,
        )}`

        const { data } = await axios.get(url)

        setDataDetailCountry(filterLastElOfEachMonth(data))

        setLoading(false)
        setLoadingChart(false)
      } catch (error) {
        setLoading(false)
        setLoadingChart(false)
        console.log(error)
      }
    }

    getDetailCountrySituation()
  }, [selectYear, countryName, filterLastElOfEachMonth])

  return (
    <div className='modal'>
      <div className='modal__container'>
        {loading ? (
          <Spinner className='modal__spinner' />
        ) : (
          <>
            <div className='modal__title'>
              <h1>
                {countryName === 'united-kingdom'
                  ? 'United Kingdom'
                  : data?.name}{' '}
                Situation
              </h1>
            </div>

            <div className='modal__body'>
              <div className='modal__country-information'>
                <div className='modal__country-image'>
                  <img src={data?.flag} alt='country' />
                </div>

                <div className='modal__country-detail'>
                  <p>
                    Name:{' '}
                    <span>
                      {countryName === 'united-kingdom'
                        ? 'United Kingdom'
                        : data?.name}
                    </span>
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
                <div className='modal__graph-title'>
                  <h4>Statistics</h4>
                  {countryName === 'united-states' ? null : (
                    <>
                      <select
                        className='modal__graph-dropdown'
                        value={selectYear}
                        onChange={handleChangeSelect}
                      >
                        <option value='2020'>2020</option>
                        <option value='2021'>2021</option>
                      </select>
                    </>
                  )}
                </div>
                {loadingChart ? (
                  <Spinner className='modal__spinner-chart' />
                ) : (
                  <HighchartsReact highcharts={Highcharts} options={options} />
                )}
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
