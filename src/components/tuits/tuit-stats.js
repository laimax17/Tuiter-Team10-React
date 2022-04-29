import React from 'react'
import { useEffect, useState } from 'react'
import * as service from '../../services/tuits-service'
import * as tuitService from '../../services/tuits-service'

const TuitStats = ({
  tuit,
  likeTuit = () => {},
  dislikeTuit = () => {},
  profile,
}) => {
  const [ifLike, setIfLike] = useState(null)
  const [privateStatus, setPrivateStatus] = useState('Set Private')

  const changePrivate = async () => {
    await tuitService.updateTuit(tuit._id, {
      ...tuit,
      isPrivate: !tuit.isPrivate,
    })

    setPrivateStatus(
      privateStatus == 'Set Private' ? 'Set Public' : 'Set Private'
    )
  }

  const findIfLike = () =>
    service.findIfUserLikesTuit('me', tuit._id).then((like) => setIfLike(like))

  const [ifDislike, setIfDislike] = useState(null)
  const findIfDislike = () =>
    service
      .findIfUserDislikesTuit('me', tuit._id)
      .then((dislike) => setIfDislike(dislike))

  const clickLike = async () => {
    await likeTuit(tuit)
    await findIfLike()
  }

  const clickDislike = async () => {
    await dislikeTuit(tuit)
    await findIfDislike()
  }

  return (
    <div className='row mt-2'>
      <div className='col'>
        <i className='far fa-message me-1'></i>
        {tuit.stats && tuit.stats.replies}
      </div>
      <div className='col'>
        <i className='far fa-retweet me-1'></i>
        {tuit.stats && tuit.stats.retuits}
      </div>
      <div className='col'>
        <span onClick={() => clickLike()}>
          {ifLike ? (
            <i className='fas fa-thumbs-up me-1' style={{ color: 'red' }}></i>
          ) : (
            <i className='far fa-thumbs-up me-1'></i>
          )}
          {tuit.stats && tuit.stats.likes}
        </span>
      </div>
      <div className='col'>
        <span onClick={() => clickDislike()}>
          {ifDislike ? (
            <i className='fas fa-thumbs-down me-1' style={{ color: 'red' }}></i>
          ) : (
            <i className='far fa-thumbs-down me-1'></i>
          )}
          {tuit.stats && tuit.stats.dislikes}
        </span>
      </div>
      <div className='col'>
        <i className='far fa-inbox-out'></i>
      </div>
      {tuit.postedBy._id == profile._id && (
        <div className='col'>
          <button
            type='button'
            className='btn btn-outline-primary btn-sm'
            onClick={changePrivate}
          >
            {privateStatus}
          </button>
        </div>
      )}
    </div>
  )
}
export default TuitStats
