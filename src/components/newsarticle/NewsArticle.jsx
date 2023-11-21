import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import './NewsArticle.css'

function NewsArticle(props) {
    console.log("Newsarticle");
    return (
        <div>
            <div className='container'>
                <div className='row'>
                    {props.news.map((news, i) => (
                        <div key={i}>
                            <div className='py-3 my- rounded-3 shadow bg-body'>
                                <div className='row'>
                                    <div className='col-sm-12 col-md-4 col-lg-3 text-center'>
                                        <img src={news.urlToImage} height="300" width="300" className='image px-2' style={{ maxWidth: "100%" }} alt="" />
                                    </div>
                                    <div className='col-sm-12 col-md-8 col-lg-9'>
                                        <div className='container'>
                                            <p className='fw-bolder fs-3 lh-base'>{news.title}</p>
                                            <p>
                                                <strong>Description:</strong>{" "}
                                                {news.description?.substring(0, 200)}
                                            </p>
                                            <p>
                                                <strong>Author:</strong> {news.author}
                                            </p>
                                            <p className='text-muted publishedAt'>
                                                <FontAwesomeIcon className="clock" icon={faClock} />
                                                <span>{moment(news.publishedAt).fromNow()}</span>
                                            </p>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default React.memo(NewsArticle);