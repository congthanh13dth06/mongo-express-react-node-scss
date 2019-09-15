import React, { Component, Fragment } from 'react';
import Cleave from 'cleave.js/react';

import DateComponent from '../date/date.component'
import Style from './input.styles';
import Svg from '../svg/file.svg'

class BaseInput extends Component {

  render() {

    const {
      element = 0, // 0 input 1 dateInline
      error = {
        status: false,
        message: ''
      },
      iconLeft = {
        show: false,
        content: ''
      },
      iconRight = {
        show: false,
        content: '',
        onClick: () => {}
      },
      text = "",
      placeholder = null,
      value = "",
      type = 'text',
      onChange,
      onBlur,
      onRef,
      disabled,
      id,
      maxLength,
      autoComplete = 'off',
      keyDown,
      style,
      tooltip = false,
      tooltipText = ' ',
      name,
      className = '',
      date = {
        selected: new Date(),
        onChange: () => {},
        options: {date: true, datePattern: ['d', 'm', 'Y']},
        minDate: new Date(),
        maxDate: undefined
      }
    } = this.props;

    const iconLeftRight = (iconLeft, iconRight, error) => {
      return `${Style.INPUT_CONTAINER} ${(iconLeft.show) ? Style.HAS_ICON_LEFT : ''} ${iconRight.show ? Style.HAS_ICON_RIGHT : ''} ${error.status ? Style.ERROR : ''}`
    };

    const isShowTooltip = () => {
      return (
        (tooltip)
          ? (
            <div className={Style.TOOLTIP}>
                <button tooltip={tooltipText} tooltip-position="right" disabled>{Svg.TOOL_TIP.content}</button>
            </div>
          ) : null
      )
    }

    const isShowIconLeft = () => {
      return (iconLeft.show) ? <span className={Style.ICON_LEFT}>{iconLeft.content}</span> : null
    }

    const isShowIconRight = () => {
      return (iconRight.show) ? <span className={Style.ICON_RIGHT} onClick={iconRight.onClick}>{iconRight.content}</span> : null
    }

    const isShowElement = () => {
      switch (element) {
        case 0:
          return (
            <input
              id={id}
              type={type}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              ref={onRef}
              disabled={disabled}
              placeholder={placeholder}
              maxLength={maxLength}
              autoComplete={autoComplete}
              onKeyDown={keyDown}
              className={[Style.INPUT, className].join(' ')}
              name={name}
            />
          )
          break;
        case 1:
          return (
            <Fragment>
              <Cleave
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                ref={onRef}
                disabled={disabled}
                placeholder={placeholder}
                maxLength={maxLength}
                autoComplete={autoComplete}
                onKeyDown={keyDown}
                className={[Style.INPUT, className].join(' ')}
                name={name}
                options={date.options}
              />
            </Fragment>
          )
          break;
      }
    }

    return (
      <div style={style} className={iconLeftRight(iconLeft, iconRight, error)}>
        <div className={Style.LABEL_INPUT}>
          {text}
          {isShowTooltip()}
        </div>
        <div className={Style.GROUP_INPUT}>
          {isShowIconLeft()}
          {isShowIconRight()}
          {isShowElement()}
        </div>
        {(element == 1) ? <DateComponent.inline disabled selected={date.selected} onChange={date.onChange} minDate={date.minDate} maxDate={date.maxDate} /> : null}
        <div className={Style.ERROR_MESSAGE}>{(error.status) ? error.message : null}</div>
      </div>
    )
  }

}

class InputComponent {
    constructor() {
        if (!InputComponent.instance) {
            this.primary = React.forwardRef((props, ref) => {
                return <BaseInput {...props} onRef={ref} element={0}/>
            });
            this.dateInline = React.forwardRef((props, ref) => {
                return <BaseInput {...props} onRef={ref} element={1} />
            });
            InputComponent.instance = this
        }
        return InputComponent.instance
    }
}

export default new InputComponent()
