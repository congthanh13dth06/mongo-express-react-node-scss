/**
 * Created By Nguyen Cong Thanh on 03/04/2019 15:46.
 *
 * Copyright Intelin 2019.
 */

import React from 'react';
import styles from './button.styles';
import enums from '../enums/enums';

const BaseButton = ({
                        text,
                        onClick,
                        disabled,
                        buttonType,
                        style,
                        id
                    }) => (
    <button id={id} style={style} disabled={disabled} onClick={onClick}
            className={[styles.BTN, styles[buttonType]].join(' ')}>{text}</button>
);

class ButtonComponent {
    constructor() {
        if (!ButtonComponent.instance) {
            Object.keys(enums.button).map(item => {
                this[enums.button[item]] = props => (
                    <BaseButton {...props} buttonType={enums.button[item].toUpperCase()}/>
                )
            })
            ButtonComponent.instance = this
        }
        return ButtonComponent.instance
    }
}

export default new ButtonComponent()
