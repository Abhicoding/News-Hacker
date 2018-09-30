import React from 'react'
import ta from 'time-ago'

import {Media, MediaContent, MediaLeft, MediaRight, LevelItem, Icon, Content, Level, LevelLeft} from 'bloomer'

export default function Storybox ({by, score, time, title, descendants}) {
  return (<Media>
    <MediaLeft>
    </MediaLeft>
    <MediaContent>
        <Content>
            <p>{title}</p>
        </Content>
        <Level isMobile>
            <LevelLeft>
              <LevelItem><strong>{score}</strong></LevelItem>
              <LevelItem href='#'>
                <p>by<strong>{` ${by}`}</strong></p>
              </LevelItem>
              <LevelItem href='#' issize='small'>
                <p>{`${descendants} comments`}</p>
              </LevelItem>
              <LevelItem href='#'>
                <i>{ta.ago(new Date() - time)}</i>
              </LevelItem>
            </LevelLeft>
        </Level>
    </MediaContent>
    <MediaRight></MediaRight>
</Media>)
}