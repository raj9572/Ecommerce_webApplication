import React from 'react'
import { BsFillCartCheckFill } from 'react-icons/bs';
import { BiErrorCircle } from 'react-icons/bi';
import { useParams } from 'react-router-dom'
import './Payments.scss'
import { resetCart} from '../../redux/cartSlice'
import { useDispatch } from 'react-redux';
const Payments = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const status = params.status;

const infoData = {
    success:{
    message:"your order has been placed",
    cta:'shop more',
    icon:<BsFillCartCheckFill/>
    },
    failed:{
        message:"payments has been failed",
        cta:'shop more',
        icon:<BiErrorCircle/>
    }
}

if(status === 'success'){
 dispatch(resetCart())
}


  return (
    <div className='Payments'>
      <div className="icon">{infoData[status].icon}</div>
      <h2 className='message'>{infoData[status].message}</h2>
      <div className="btn btn-primary">{infoData[status].cta}</div>
    </div>
  )
}

export default Payments
