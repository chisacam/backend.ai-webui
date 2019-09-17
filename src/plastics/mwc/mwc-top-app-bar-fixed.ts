/**
 @license
 Copyright 2015-2019 Lablup Inc.

 Original code by 2018 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
import {style} from '@material/mwc-top-app-bar/mwc-top-app-bar-css';
import {css, customElement} from 'lit-element';

import {TopAppBarFixedBase} from '@material/mwc-top-app-bar-fixed/mwc-top-app-bar-fixed-base';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-top-app-bar-fixed': TopAppBarFixed;
  }
}

@customElement('mwc-top-app-bar-fixed')
export class TopAppBarFixed extends TopAppBarFixedBase {
  static get styles() {
    return [style,
      css`
        .mdc-top-app-bar {
          width: calc(100% - var(--mdc-drawer-width, 256px));
        }
        .mdc-top-app-bar__title {
          padding-left:0;
        }
        .mdc-top-app-bar--prominent .mdc-top-app-bar__row {
          height: 96px;
        }
        .mdc-top-app-bar--prominent-fixed-adjust {
          padding-top: 96px;
        }
      `];
  }
}
