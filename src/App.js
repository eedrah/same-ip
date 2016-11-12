import React from 'react'
import Radium from 'radium'

import db from './db'
import calcDuration from './fns/calcDuration'

const styles = {
  page: {
    margin: '10px auto',
    maxWidth: '400px',
    textAlign: 'center'
  }
  // heading: {
  //   'color': '#A02020'
  // },
  // subheading: {
  //   'color': '#2020A0'
  // }
}

const style = {
  rules: {
    'html, body, #app': {
      height: '100%',
      margin: 0,
      padding: 0,
      backgroundColor: '#EEEEEE'
    },
    h1: {
      margin: 0
    }
  }
}

class App extends React.Component {
  componentWillMount () {
    db.ref('/').on('value', (data) => {
      this.setState(data.val())
    })
  }
  render () {
    if (!this.state || !this.state.lastCheckIn || !this.state.lastMessages) {
      return (
        <div style={styles.page}>
          <Radium.Style {...style} />
          <h1 style={styles.heading}>Loading...</h1>
        </div>
      )
    }
    const lastMessage = this.state.lastMessages[this.state.lastMessages.length - 1]
    return (
      <div style={styles.page}>
        <Radium.Style {...style} />
        <h1 style={styles.heading}>Jesse, are you still alive?!!</h1>
        <p style={styles.subheading}>{'Yes, yes I am, as of ' + calcDuration(this.state.lastCheckIn) + ' ago.'}</p>
        <h2 style={styles.messageHeading}>{'The last message received was ' + calcDuration(lastMessage.datetime) + ' ago. It said:'}</h2>
        <p style={styles.message}>{lastMessage.text}</p>
      </div>
    )
  }
}

module.exports = Radium(App)
