import React, { Component } from 'react';
import $ from 'jquery';

import Style from './input.styles';
import Svg from '../svg/file.svg';

import LocalizeService from '../../../../services/localize/localize.service'
import HelperService from '../../../../services/helper/helper.service'

class BaseSelect extends Component {

  constructor(props) {
    super(props);

    this.state = {
      model: {
        current: {
          text: '',
          value: ''
        },
        list: []
      },
      ui: {
        idSelectDropdown: `#${HelperService.generateKey()}`,
        idSelectComponent: `#${HelperService.generateKey()}`
      }
    }

    // console.log(this.state)
    this.handleRef = this.handleRef.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  componentDidMount() {
    let { list, current } = this.props;
    const { model } = this.state;
    list = list || [{
      text: '1',
      value: 0
    }],
    current = current || {
      text: '1',
      value: 0
    }
    model.current = current
    model.list = list
    this.setState((prevState) => ({
      model: model
    }))
  }

  handleRef(event) {
    const { ui } = this.state
    $(ui.idSelectComponent).click(function() {
      $(this).find(ui.idSelectDropdown).slideDown("fast");
    });
    $(document).on("click", function(event) {
      let $trigger = $(ui.idSelectComponent);
      if ($trigger !== event.target && !$trigger.has(event.target).length) {
        $(ui.idSelectDropdown).slideUp("fast");
      }
    });
  }

  handleOnClick(event, item) {
    event.preventDefault();
    const { ui } = this.state
    const { onChange, name } = this.props
    this.setState((prevState) => ({
      model: {
        ...prevState.model,
        current: item
      }
    }), () => {
      $(ui.idSelectDropdown).slideUp("fast")
      onChange({
        target: {
          name: name,
          value: item.value
        }
      })
    })
  }

  render() {

    const {
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
        text = null,
        placeholder = null,
        type = 'text',
        onChange = () => {},
        name,
        onRef,
        disabled,
        autoComplete = 'off',
        keyDown,
        style,
        isSearch = false,
        list = [{
          text: '1',
          value: 0
        }],
        current = {
          text: '1',
          value: 0
        }
    } = this.props;

    const iconLeftRight = (left, right, error) => {
      return `${Style.INPUT_CONTAINER} ${left.show ? Style.HAS_ICON_LEFT : null} ${right.show ? Style.HAS_ICON_RIGHT : null} ${error.status ? Style.ERROR : null}`
    };

    return (
      <div id={this.state.ui.idSelectComponent.substr(1)} style={style} className={`${iconLeftRight(iconLeft, iconRight, error)} ${disabled ? Style.DISABLED : null}`} ref={this.handleRef}>
        <div className={Style.LABEL_INPUT}>{text}</div>
        <div className={Style.GROUP_INPUT}>
          {iconLeft.show ? <span className={Style.ICON_LEFT}>{iconLeft.content}</span> : null}
          {iconRight.show ? <span className={Style.ICON_RIGHT} onClick={iconRight.onClick}>{iconRight.content}</span> : null}
          <input
            type={type}
            ref={onRef}
            disabled={disabled}
            placeholder={placeholder}
            autoComplete={autoComplete}
            className={Style.INPUT}
            readOnly={true}
            style={{'cursor': 'pointer'}}
            value={LocalizeService.getLocalize(this.state.model.current.text)}
         />
        </div>
        <div className={Style.ERROR_MESSAGE}>{(error.status) ? error.message : null}</div>
        <div id={this.state.ui.idSelectDropdown.substr(1)} className={`${Style.DROP_DOWN_LIST} ${disabled ? Style.DISABLED : null}`}>
          {isSearch
            ? (
              <div className={Style.GROUP_SEARCH}>
                <input
                  className={Style.SEARCH_LIST}
                  type="text"
                  autoComplete='off'
                  placeholder='Search'
                  onKeyDown={keyDown}
                />
                <span className={Style.ICON_SEARCH}>{Svg.SEARCH_DROP_DOWN.content}</span>
              </div>
            )
            : null
          }
          <ul className={`${Style.LIST_ITEMS} ${Style.SCROLL}`}>
            {
              this.state.model.list.map((item, index) => {
                return (
                  <li key={index} className={Style.ITEM}>
                    <a href="" className={item.value == this.state.model.current.value ? Style.ACTIVE : null} onClick={(event) => {this.handleOnClick(event, item)}}>{LocalizeService.getLocalize(item.text)}</a>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )

  }

}

class SelectComponent {
  constructor() {
    if (!SelectComponent.instance) {
      this.primary = React.forwardRef((props, ref) => {
        return <BaseSelect { ...props} onRef={ref}/>
      });
      SelectComponent.instance = this
    }
    return SelectComponent.instance
  }
}

export default new SelectComponent()
