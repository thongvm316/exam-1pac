import React from 'react'
import '../../assets/scss/components/modal.scss'

const Modal = ({ setOpenModal }) => {
  return (
    <div className='modal'>
      <div className='modal__container'>
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
          <h1>The United Kingdom Situation</h1>
        </div>

        <div className='modal__body'>
          <div className='modal__country-information'>
            <div className='modal__country-image'>
              <img
                src='https://images.pexels.com/photos/380707/pexels-photo-380707.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
                alt='country'
              />
            </div>

            <div className='modal__country-detail'>
              <p>
                Name: <span>Korea</span>
              </p>
              <p>
                Population: <span>Asia</span>
              </p>
              <p>
                Capital: <span>Asia</span>
              </p>
              <p>
                Region: <span>Asia</span>
              </p>
              <p>
                Subregion: <span>Asia</span>
              </p>
            </div>
          </div>

          <div className='modal__graph'></div>
        </div>

        {/* <div className='modal__footer'>
          <button
            onClick={() => {
              setOpenModal(false)
            }}
          >
            OK
          </button>
        </div> */}
      </div>
    </div>
  )
}

export default Modal
