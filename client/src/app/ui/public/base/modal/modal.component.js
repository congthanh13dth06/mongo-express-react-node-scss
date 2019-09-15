import React, { Component, Fragment } from 'react';

import Button from '../button/button.component';
import Style from './modal.styles';
import Svg from '../svg/file.svg'

import LocalizeKey from '../../../../services/constants/localize'
import LocalizeService from '../../../../services/localize/localize.service'
import HelperService from '../../../../services/helper/helper.service'

class BaseModal extends Component {

    render() {
  
      const {
        element = 0, // 0 confirm // 1 notification
        style,
        className = '',
        yesClick,
        closeClick,
      } = this.props;
  
      const isShowElement = () => {
        switch (element) {
          case 0:
            return (
                <Fragment>
                <div className={Style.MODAL_LABEL}>{LocalizeService.getLocalize(LocalizeKey.MODAL_CONFIRM_TITLE)}</div>
                <div className={Style.MODAL_LOGO}></div>
                <div className={Style.MODAL_TEXT}>{LocalizeService.getLocalize(LocalizeKey.MODAL_CONFIRM_TEXT)}</div>
                </Fragment>
            )
            break;
          case 1:
            return (
             <Fragment></Fragment>
            )
            break;
        }
      }

      const isShowBtn = () => {
        switch (element) {
          case 0:
            return (
                <Fragment>
                <Button.primary
                    type="button"
                    text={LocalizeService.getLocalize(LocalizeKey.MODAL_CONFIRM_BTN)}
                    onClick={yesClick}
                    disabled={false}
                    style={{'width': '66%'}}
                    />
                </Fragment>
            )
            break;
          case 1:
            return (
             <Fragment></Fragment>
            )
            break;
        }
      }
  
      return (
        <div style={style} className={[Style.MODAL, className].join(' ')}>
            <div className={Style.MODAL_DIALOG}>
                <div className={Style.MODAL_CONTENT}>
                <div className={Style.MODAL_HEADER}>
                    <a href="" className={Style.MODAL_BTN_CLOSE} onClick={closeClick}>{Svg.DELETE_TEXT.content}</a>
                </div>
                <div className={Style.MODAL_BODY}>
                    {isShowElement()}
                </div>
                <div className={Style.MODAL_FOOTER}>
                {isShowBtn()}
                </div>
                </div>
            </div>
        </div>
      )
    }
  
  }

class ModalComponent {
    constructor() {
        if (!ModalComponent.instance) {
            this.confirm = React.forwardRef((props, ref) => {
                return <BaseModal {...props} onRef={ref} element={0}/>
            });
            this.notification = React.forwardRef((props, ref) => {
                return <BaseModal {...props} onRef={ref} element={1} />
            });
            ModalComponent.instance = this
        }
        return ModalComponent.instance
    }
}

export default new ModalComponent()