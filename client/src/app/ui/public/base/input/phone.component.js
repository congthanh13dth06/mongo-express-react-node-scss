import React, { Component } from 'react';
import $ from 'jquery';

import DialPhone from '../../../../../assets/raw/dial_phone';
import Style from './input.styles';
import Svg from '../svg/file.svg';

import HelperService from '../../../../services/helper/helper.service'

class BasePhone extends Component {

  constructor(props) {
    super(props)

    this.state = {
      model: {
        dialCode: '+84',
        flag: 'FLAG_VN'
      },
      data: DialPhone,
      ui: {
        idDialPhone: `#${HelperService.generateKey()}`,
        idDialValue: `#${HelperService.generateKey()}`,
        idDropdown: `#${HelperService.generateKey()}`,
      }
    }

    // console.log(this.state)
    this.handleRef = this.handleRef.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  componentDidMount() {}

  handleRef(event) {
    const { idDialPhone, idDialValue, idDropdown } = this.state.ui
    $(idDialPhone).click(function() {
      $(this).find(idDropdown).slideDown("fast");
    });
    $(document).on("click", function(event) {
      let $trigger = $(idDialPhone);
      if ($trigger !== event.target && !$trigger.has(event.target).length) {
        $(idDropdown).slideUp("fast");
      }
    });
  }

  handleKeyDown(event) {
    const key = event.which;
    if ((key <= 47 || key >= 58) && (key <= 95 || key >= 106) && key !== 8) {
      event.preventDefault()
    }
  }

  handleOnClick(event) {
    event.preventDefault();
    this.handleOnChange(event);
  }

  handleOnChange(event) {
    const { idDialPhone, idDialValue, idDropdown } = this.state.ui
    const { model } = this.state;
    model.dialCode = event.target.id;
    this.setState((prevState) => ({
      model: model
    }), () => {
      $(idDropdown).slideUp("fast")
    })
  }

  render() {

    const {
      error = {
          status: false,
          message: ''
        },
        iconRight = {
          show: false,
          content: '',
          onClick: () => {}
        },
        text = null,
        placeholder = null,
        value = '',
        type = 'text',
        onChange = () => {},
        onBlur,
        onRef,
        disabled,
        id = 'inputPhone',
        maxLength,
        autoComplete = 'off',
        style,
        name,
    } = this.props;

    const iconLeftRight = (right, error) => {
      return `${Style.INPUT_CONTAINER} ${(right.show) ? Style.HAS_ICON_RIGHT : null} ${error.status ? Style.ERROR : null}`
    };

    return (
      <div style={style} className={iconLeftRight(iconRight, error)} ref={this.handleRef}>
        <div className={Style.LABEL_INPUT}>{text}</div>
        <div className={`${Style.GROUP_INPUT} ${Style.GROUP_INPUT_DIAL}`}>
          <div id={this.state.ui.idDialPhone.substr(1)} className={`${Style.DIAL_PHONE} ${(disabled) ? Style.DISABLED : null}`}>
            <span className={Style.ICON_LEFT}>{Svg.FLAG_VN.content}</span>
            <span className={Style.ICON_RIGHT}>{Svg.DROP_DOWN.content}</span>
            <input id={this.state.ui.idDialValue.substr(1)} className={Style.SELECT} type='button'
              value={this.state.model.dialCode} disabled={disabled} />
            <div id={this.state.ui.idDropdown.substr(1)} className={Style.DROP_DOWN_LIST} style={{minWidth: '160px', 'top': '58px', 'left': '-1px'}}>
              <ul className={`${Style.LIST_ITEMS} ${Style.SCROLL}`}>
                {
                  this.state.data.map((item, index) => {
                    return (
                      <li key={index} className={Style.ITEM}>
                        <a href="" id={item.dial_code} onClick={this.handleOnClick}
                          className={`${(this.state.model.dialCode === item.dial_code) ? Style.ACTIVE : null}`}>{Svg.FLAG_VN.content} {`${item.code} ${item.dial_code}`}</a>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
          {iconRight.show ? <span className={Style.ICON_RIGHT} onClick={iconRight.onClick}>{iconRight.content}</span> : null}
          <input
            id={id}
            type={type}
            onChange={onChange}
            value={value}
            onBlur={onBlur}
            ref={onRef}
            disabled={disabled}
            placeholder={placeholder}
            maxLength={maxLength}
            autoComplete={autoComplete}
            onKeyDown={this.handleKeyDown}
            className={Style.INPUT}
            name={name}
          />
        </div>
        <div className={Style.ERROR_MESSAGE}>{(error.status) ? error.message : null}</div>
      </div>
    )

  }

}

class PhoneComponent {
  constructor() {
    if (!PhoneComponent.instance) {
      this.primary = React.forwardRef((props, ref) => {
        return <BasePhone {...props} onRef={ref} />
      });
      PhoneComponent.instance = this
    }
    return PhoneComponent.instance
  }
}

export default new PhoneComponent()
