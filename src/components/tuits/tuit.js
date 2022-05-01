import React, { useEffect, useState } from 'react'
import TuitStats from './tuit-stats'
import TuitVideo from './tuit-video'
import { Link } from 'react-router-dom'
import { TuitContext } from '../tuiter'
import { useContext } from 'react'
import * as service from '../../services/security-service'

/**
 * @component renders a single tuit
 */
const Tuit = ({ tuit, deleteTuit, likeTuit, dislikeTuit }) => {
  const daysOld = (tuit) => {
    const now = new Date()
    const nowMillis = now.getTime()
    const posted = new Date(tuit.postedOn)
    const postedMillis = posted.getTime()
    const oldMillis = nowMillis - postedMillis
    let old = 0.0
    const secondsOld = oldMillis / 1000.0
    const minutesOld = secondsOld / 60.0
    const hoursOld = minutesOld / 60.0
    const daysOld = hoursOld / 24.0
    if (daysOld > 1) {
      old = Math.round(daysOld) + 'd'
    } else if (hoursOld > 1) {
      old = Math.round(hoursOld) + 'h'
    } else if (minutesOld > 1) {
      old = Math.round(minutesOld) + 'm'
    } else if (secondsOld > 1) {
      old = Math.round(secondsOld) + 's'
    }
    return old
  }

  const { handleZoom } = useContext(TuitContext)

  const [profile, setProfile] = useState({})
  useEffect(async () => {
    const user = await service.profile()
    setProfile(user)
  }, [])

  if (tuit.isPrivate && tuit.postedBy._id != profile._id) {
    return <div></div>
  }

  return (
    <div>
      <div>
        <li className='p-2 ttr-tuit list-group-item d-flex rounded-0'>
          <div className='pe-2'>
            {tuit.postedBy && (
              <img
                src={tuit.postedBy.avatar ? tuit.postedBy.avatar : ''}
                className='ttr-tuit-avatar-logo rounded-circle avatar-logo'
              />
            )}
          </div>
          <div className='w-100'>
            <i
              onClick={() => deleteTuit(tuit._id)}
              className='fas fa-remove fa-2x fa-pull-right'
            ></i>
            <Link to={`/tuit/${tuit._id}`}>
              <i className='float-end fas fa-circle-ellipsis me-1'></i>
            </Link>
            <h2 className='fs-5'>
              {tuit.postedBy && tuit.postedBy.username}@
              {tuit.postedBy && tuit.postedBy.email} -
              <span className='ms-1'>{daysOld(tuit)}</span>
            </h2>
            {tuit.tuit}
            {tuit.youtube && <TuitVideo tuit={tuit} />}
            <div className='row'>
              {tuit.image &&
                tuit.image.map((url, index) => (
                  <div
                    data-testid='background'
                    onClick={() => handleZoom(url)}
                    alt='Tuit Image'
                    className='m-1 img-thumbnail create-tuit-image'
                    key={index}
                    style={{
                      display: 'inline-block',
                      width: '150px',
                      height: '150px',
                      backgroundImage: `url(${url})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                    }}
                  />
                ))}
            </div>
            {tuit.address != '' && (
              <div
                className='row'
                style={{
                  marginTop: '20px',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  fontSize: '12px',
                }}
              >
                <i
                  className='fa fa-map-pin text-primary'
                  style={{ display: 'inline', width: '20px', height: '20px' }}
                ></i>
                <span
                  style={{
                    width: '400px',
                    fontFamily: 'raleway',
                    marginLeft: '-12px',
                  }}
                >
                  {tuit.address}
                </span>
              </div>
            )}
            <TuitStats
              tuit={tuit}
              likeTuit={likeTuit}
              dislikeTuit={dislikeTuit}
              profile={profile}
            />
          </div>
        </li>
      </div>
    </div>
  )
}
export default Tuit
