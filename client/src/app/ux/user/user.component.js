/**
 * Created By Nguyen Cong Thanh on 07/05/2019 17:45.
 *
 * Copyright Intelin 2019.
 */

import React, { Component, Fragment } from 'react'
import { Route, Switch, Redirect } from "react-router-dom"

import TimelineComponent from './timeline/timeline.container'

import AppServices from '../../app.services'

export default class UserComponent extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { history } = this.props;
  }

  render() {

    const { match } = this.props

    return (
      <Switch>
        <Route exact path={`${match.url}${AppServices.constant.router.TIMELINE}`} component={TimelineComponent} />
        <Redirect to={{pathname: AppServices.services.authen.type[AppServices.services.authen.type.USER], state: {from: this.props.location}}} />
      </Switch>
    )
  }

}
