/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import * as reducers from '@carbon/ibmdotcom-web-components/es/globals/services-store/reducers';
import ConnectMixin from '@carbon/ibmdotcom-web-components/es/globals/mixins/connect';
import { mapStateToProps, mapDispatchToProps } from '@carbon/ibmdotcom-web-components/es/components/masthead/masthead-container';
import DDSMastheadComposite from '@carbon/ibmdotcom-web-components/es/components/masthead/masthead-composite';
import links from './links';
import './index.scss';

const store = createStore(combineReducers(reducers), {}, applyMiddleware(thunkMiddleware, createLogger()));
customElements.define('app-masthead-container', class extends ConnectMixin(store, mapStateToProps, mapDispatchToProps)(DDSMastheadComposite) {});

document.addEventListener('DOMContentLoaded', () => {
  if (!process.env.CORS_PROXY) {
    document.getElementById('masthead-container').navLinks = links;
  }
});
