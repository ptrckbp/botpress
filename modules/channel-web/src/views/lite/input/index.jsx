import React, { Component } from 'react'

import style from './style.scss'

// TODO add dpad nav
export default class Send extends Component {
  componentDidMount() {
    this.textInput.focus()
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.focused && this.props.focused) {
      this.textInput.focus()
    }
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.props.send()
      e.preventDefault()
    }
  }

  handleKeyDown = e => {
    const shouldFocusPrevious = e.target.selectionStart === 0 && (e.key === 'ArrowUp' || e.key === 'ArrowLeft')
    if (shouldFocusPrevious) {
      this.props.focusPrevious()
    }

    const shouldFocusNext =
      e.target.selectionStart === this.textInput.value.length && (e.key === 'ArrowDown' || e.key === 'ArrowRight')
    if (shouldFocusNext) {
      this.props.focusNext()
    }
  }

  render() {
    return (
      <div className={style.input}>
        <textarea
          tabindex="1"
          ref={input => {
            this.textInput = input
          }}
          onBlur={this.props.onBlur}
          onFocus={this.props.onFocus}
          placeholder={this.props.placeholder}
          onChange={this.props.change}
          value={this.props.text}
          onKeyPress={this.handleKeyPress}
          onKeyDown={this.handleKeyDown}
          style={{
            color: this.props.config.textColorOnBackground
          }}
        />
      </div>
    )
  }
}
