import React from 'react'
import ta from 'time-ago'
import {Link} from 'react-router-dom'

import {Media, MediaContent, MediaLeft, MediaRight, LevelItem, Icon, Content, Level, LevelLeft} from 'bloomer'
import './storybox.css'

export default function Storybox ({id, by, score, time, title, descendants, url}) {
  try { 
    var link = new URL(url)
  } catch (e) {
    link = ''
  }
  return (<Media>
    <MediaLeft>
    </MediaLeft>
    <MediaContent>
        <Content>
            <p>
              <Link to={`/story/${id}`}>
                <span className='title'>{`${title} `}</span>
              </Link>
              <a href={link.href}>
                <span className='urlname'>{link ? `(${link.hostname})`: ""}</span>
              </a>
            </p>
        </Content>
        <Level isMobile>
            <LevelLeft>
              <LevelItem className='score'><strong>{score}</strong></LevelItem>
              <LevelItem className='by' href='#'>
                <p>by<strong>{` ${by}`}</strong></p>
              </LevelItem>
              <LevelItem className='descendants' issize='small'>
                <Link to={`/story/${id}`}>
                  <p>{`${descendants} comments`}</p>
                </Link>
              </LevelItem>
              <LevelItem className='timeago' href='#'>
                <i>{ta.ago(new Date() - time)}</i>
              </LevelItem>
            </LevelLeft>
        </Level>
    </MediaContent>
    <MediaRight></MediaRight>
</Media>)
}