import React, { Component } from 'react';

import Button from '../button/button.component';
import ImageLogo from '../../../../../assets/images/image-otp.jpg'
import Style from './otp.styles'
import Svg from '../svg/file.svg'

import LocalizeKey from '../../../../services/constants/localize'
import LocalizeService from '../../../../services/localize/localize.service'
import HelperService from '../../../../services/helper/helper.service'

class BaseOTP extends Component {

  constructor(props) {
    super(props)

    this.state = {
      keyId: HelperService.generateKey(),
      maxLength: 0,
      isNumber: true,
      isKeyBack: false,
      codeArray: [],
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleOnFocus = this.handleOnFocus.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  UNSAFE_componentWillMount() {
    const { maxLength, characterIsNumber } = this.props;
    this.state.maxLength = maxLength;
    this.state.isNumber = characterIsNumber;
    this.state.codeArray = Array.from(Array(maxLength).keys())
  }

  handleKeyDown(e) {
    const key = e.which;
    let id = Number(e.target.id[e.target.id.length - 1]);
    if (this.state.isNumber) {
        if ((key <= 47 || key >= 58) && (key <= 95 || key >= 106) && key !== 8) {
            e.preventDefault()
        }
    }

    // if (key === 8) {
    //     if (id > 1) {
    //         if (document.getElementById(`${this.state.keyId}${id}`).value === '') {
    //             this.state.isKeyBack = true;
    //             document.getElementById(`${this.state.keyId}${parseInt(id) - 1}`).readOnly = false;
    //             document.getElementById(`${this.state.keyId}${parseInt(id) - 1}`).focus();
    //             document.getElementById(`${this.state.keyId}${parseInt(id) - 1}`).select();
    //         }
    //     }
    //   return
    // }
    // if (id < this.state.maxLength) {
    //     if (document.getElementById(`${this.state.keyId}${id}`).value.length == document.getElementById(`${this.state.keyId}${id}`).getAttribute('maxlength')) {
    //         this.state.isKeyBack = false;
    //         document.getElementById(`${this.state.keyId}${id}`).readOnly = true;
    //         document.getElementById(`${this.state.keyId}${parseInt(id) + 1}`).readOnly = false;
    //         document.getElementById(`${this.state.keyId}${parseInt(id) + 1}`).focus();
    //         document.getElementById(`${this.state.keyId}${parseInt(id) + 1}`).select();
    //     }
    // }
  }

  handleOnFocus(e) {
    // for (let i = 0; i < this.state.maxLength; i++) {
    //     let id = i + 1;
    //     if(!this.state.isKeyBack){
    //         if(document.getElementById(`${this.state.keyId}${id}`).value === ''){
    //             document.getElementById(`${this.state.keyId}${id}`).focus();
    //             return
    //         }
    //     }

    //     if (id !== 1) {
    //         if(document.getElementById(`${this.state.keyId}${id - 1}`).value === ''){
    //             document.getElementById(`${this.state.keyId}${id}`).readOnly = true;
    //         }
    //     }

    //     if(!document.getElementById(`${this.state.keyId}${id}`).readOnly){
    //         document.getElementById(`${this.state.keyId}${id}`).focus();
    //         return;
    //     }
    // }
  }

  handleOnChange(e){
    document.getElementById('border_bottom').style.borderBottomColor = (e.target.value !== '') ? '#57C5FF' : '#c2c2c2'
    this.props.onChange(e)
  }

  render() {

    const {
      maxLength,
      characterIsNumber,
      error = {status: false, message: ''},
      disabled,
      onClose,
      onResendOTP,
      refInput,
      isShowResendOtp,
      handleRefLineProcess,
      model
    } = this.props;

    let calc = (maxLength * 30) + ((maxLength + 1) * 20)

    if (calc < 420) {
      calc = 420
    } else if (calc > 540) {
      calc = (maxLength * 20) + ((maxLength + 1) * 10)
    } else {
      calc = calc
    }

    return (
      <div className={Style.OTP}>
          <div className={Style.HEADER}>
            <a className={Style.ICON_LEFT} href=""></a>
            <a className={`${Style.ICON_RIGHT} ${disabled ? Style.DISABLED : null}`} href="" onClick={onClose}>{Svg.OTP_DELETE}</a>
          </div>
          <div className={Style.PROGRESS_BAR}>
              <div className={[Style.LINE_PROCESS, isShowResendOtp ? Style.DONE : ''].join(' ')} ref={handleRefLineProcess} />
          </div>
          <div className={Style.GROUP_LOGO}>
              <h1 className={Style.TITLE}>{LocalizeService.getLocalize(LocalizeKey.OTP_TITLE_VERIFY)}</h1>
              <img className={Style.LOGO} src={ImageLogo} alt=""/>
          </div>
          <div className={Style.INFO}>
              {(model.isEmail)
                ? LocalizeService.getLocalize(LocalizeKey.OTP_VERIFY_INTRODUCTION_EMAIL)
                : LocalizeService.getLocalize(LocalizeKey.OTP_VERIFY_INTRODUCTION_PHONE)
              }
              <pre>{model.contact}</pre>
          </div>
          <div id="border_bottom" style={{width:`${calc}px`}} className={[Style.OUTER_INPUT, error.status ? Style.OUTER_INPUT_ERROR : ''].join(' ')}>
               <input className={Style.FIELD_INPUT} type="text" maxLength={maxLength}
                      autoComplete='off' onKeyDown={this.handleKeyDown} onFocus={this.handleOnFocus} onChange={this.handleOnChange}
                     disabled={disabled} ref={(input) => {refInput(0, input)}}
               />
          </div>
          <div className={Style.ERROR}>
              <p className={Style.ERROR_MESSAGE}>
                {(error.status) ? LocalizeService.getLocalize(error.message) : null }
              </p>
          </div>
          <div className={Style.GROUP_BTN}>
            <Button.primary
              type="submit"
              text={LocalizeService.getLocalize(LocalizeKey.OTP_BUTTON_RESEND)}
              onClick={onResendOTP}
              disabled={disabled || !isShowResendOtp}
              style={{'width': '100%'}}
            />
          </div>
      </div>
    )
  }

}

class OTPComponent {
    constructor() {
        if (!OTPComponent.instance) {
            this.primary = React.forwardRef((props, ref) => {
              return <BaseOTP {...props} refInput={ref} />
            });
            OTPComponent.instance = this
        }
        return OTPComponent.instance
    }
}

export default new OTPComponent()


// {this.state.codeArray.map((ele, key) => {
//   return (
//       <input key={ele} id={`${this.state.keyId}${key + 1}`} className={Style.FIELD_INPUT} type="text" maxLength={1}
//              autoComplete='off' onKeyDown={this.handleKeyDown} onFocus={this.handleOnFocus} onChange={this.handleOnChange}
//              disabled={disabled} ref={(input) => {refInput(key, input)}}
//       />
//   )
// })}
