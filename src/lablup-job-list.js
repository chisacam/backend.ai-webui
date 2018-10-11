/**
@license
Copyright (c) 2015-2018 Lablup Inc. All rights reserved.
 */

import { PolymerElement, html } from '@polymer/polymer';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/iron-ajax/iron-ajax';
import '@polymer/paper-dialog/paper-dialog';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icons/hardware-icons';
import '@vaadin/vaadin-grid/vaadin-grid.js';

import {afterNextRender} from '@polymer/polymer/lib/utils/render-status.js';


class LablupJobList extends PolymerElement {
    static get is() {
        return 'lablup-job-list';
    }

    static get properties() {
        return {
            condition: {
                type: String,
                default: 'running'  // finished, running, archived
            },
            jobs: {
                type: Object,
                value: {}
            }
        };
    }

    ready() {
        super.ready();
    }

    connectedCallback() {
        super.connectedCallback();
        afterNextRender(this, function () {
            /*
            this._requestBot.url = '/job/get/' + this.condition;
            this._requestBot.method = 'get';
            this._requestBot.body = JSON.stringify({
                'condition': this.condition
            });
            const req = this._requestBot.generateRequest();
            req.completes.then(req => {
                this.jobs = req.response;
            }).catch(err => {
                if (req.response && req.response.error_msg) {
                    setNotification(req.response.error_msg);
                } else {
                    setNotification(err);
                }
            });
            this._requestBot.method = 'post';*/
        });
    }

    _isRunning() {
        return this.condition === 'running';
    }

    _indexFrom1(index) {
        return index + 1;
    }

    _terminateKernel(e) {
        const termButton = e.target;
        const controls = e.target.closest('#controls');
        const kernelId = controls.kernelId;

        this._requestBot.url = '/job/kernel/terminate/' + kernelId;
        this._requestBot.method = 'delete';
        const req = this._requestBot.generateRequest();
        req.completes.then((req) => {
            termButton.setAttribute('disabled', '');
            setNotification('Session will soon be terminated');
        }).catch((err) => {
            if (req.response && req.response.error_msg) {
                setNotification(req.response.error_msg);
            } else {
                setNotification(err);
            }
        });
        this._requestBot.method = 'post';
    }
    static get template() {
        return html`
        <style include="iron-flex iron-flex-alignment shared-button-styles">
            vaadin-grid {
                border: 0;
                font-size: 14px;
            }
            paper-item {
                height: 30px;
                --paper-item-min-height: 30px;
            }
            iron-icon {
                width: 16px;
                height: 16px;
                min-width: 16px;
                min-height: 16px;
                padding: 0;
            }
            paper-icon-button {
                --paper-icon-button: {
                    width: 25px;
                    height: 25px;
                    min-width: 25px;
                    min-height: 25px;
                    padding: 3px;
                    margin-right: 5px;
                };
            }
            div.indicator,
            span.indicator {
                font-size: 9px;
                margin-right: 5px;
            }
        </style>

        <vaadin-grid theme="row-stripes column-borders compact" aria-label="Job list" items="[[jobs.result]]">
            <vaadin-grid-column width="40px" flex-grow="0" resizable>
                <template class="header">#</template>
                <template>[[_indexFrom1(index)]]</template>
            </vaadin-grid-column>

            <vaadin-grid-column resizable>
                <template class="header">Job ID</template>
                <template>
                    <paper-item style="padding:0">
                        <paper-item-body two-line>
                            <div>[[item.kernel_id]]</div>
                            <div secondary class="indicator">[[item.access_key]]</div>
                        </paper-item-body>
                    </paper-item>
                </template>
            </vaadin-grid-column>

            <vaadin-grid-column resizable>
                <template class="header">Starts</template>
                <template>
                    <div class="layout vertical">
                        <span>[[item.started_at]]</span>
                        <span class="indicator">([[item.elapsed]])</span>
                    </div>
                </template>
            </vaadin-grid-column>

            <vaadin-grid-column resizable>
              <template class="header">Configuration</template>
              <template>
                  <div class="layout horizontal center flex">
                      <iron-icon class="fg green" icon="hardware:memory"></iron-icon>
                      <span>[[item.cpu_capacity]]</span>
                      <span class="indicator">core</span>
                      <iron-icon class="fg green" icon="fa-web-application:microchip"></iron-icon>
                      <span>[[item.ram_capacity]]</span>
                      <span class="indicator">[[item.ram_unit]]</span>
                      <!-- <iron-icon class="fg yellow" icon="device:storage"></iron-icon> -->
                      <!-- <span>[[item.storage_capacity]]</span> -->
                      <!-- <span class="indicator">[[item.storage_unit]]</span> -->
                  </div>
              </template>
            </vaadin-grid-column>

            <vaadin-grid-column resizable>
              <template class="header">Using</template>
              <template>
                  <div class="layout horizontal center flex">
                      <iron-icon class="fg blue" icon="hardware:memory"></iron-icon>
                      <span>[[item.cpu_used]]</span>
                      <span class="indicator">[[item.cpu_unit]]</span>
                      <iron-icon class="fg blue" icon="hardware:device-hub"></iron-icon>
                      <span>[[item.io_used]]</span>
                      <span class="indicator">[[item.io_unit]]</span>
                  </div>
              </template>
            </vaadin-grid-column>

            <vaadin-grid-column resizable>
              <template class="header">Control</template>
              <template>
                  <div id="controls" class="layout horizontal flex center"
                       kernel-id="[[item.kernel_id]]">
                      <paper-icon-button disabled class="fg"
                                         icon="assignment"></paper-icon-button>
                      <template is="dom-if" if="[[_isRunning()]]">
                          <paper-icon-button disabled class="fg controls-running"
                                             icon="build"></paper-icon-button>
                          <paper-icon-button disabled class="fg controls-running"
                                             icon="alarm-add"></paper-icon-button>
                          <paper-icon-button disabled class="fg controls-running"
                                             icon="av:pause"></paper-icon-button>
                          <paper-icon-button class="fg red controls-running" icon="delete"
                                             on-tap="_terminateKernel"></paper-icon-button>
                      </template>
                  </div>
              </template>
            </vaadin-grid-column>
        </vaadin-grid>
        `;
    }
}

customElements.define(LablupJobList.is, LablupJobList);
