import {css, html, LitElement} from 'lit';
import {FBP} from '@furo/fbp';

import '@furo/route/src/furo-app-flow.js';
import '@furo/data/src/furo-reverse-deep-link.js';
import '@furo/util/src/furo-markdown.js';
import '@furo/layout/src/furo-vertical-flex.js';
import '@furo/ui5/src/furo-ui5-button.js';

import '../x/layout-manager/furo-ui5-dynamic-page-layout.js';

/**
 * `page-my-home`
 * Implementation of the home page.
 *
 * @summary home page impl
 * @customElement
 * @appliesMixin FBP
 */
class PageMyHome extends FBP(LitElement) {
    constructor() {
        super();
        const go = new Go();
        WebAssembly.instantiateStreaming(fetch('./app.wasm'), go.importObject)
            .then(result => {
                go.run(result.instance);
                console.log(sum(2, 4));
                this.sayHi = getTmpl();
                this.md5 = getMD5(this.sayHi);

                let msg = {
                    "id": {
                        "id": {
                            "identifier": "-41001"
                        },
                        "display_name": "In Bearbeitung"
                    },
                    "internal_name": "Running",
                    "short_form": "ActRun"
                }

                console.log('*** Json string literal to proto.Message');
                this.wireFormatString = jsonToProto(JSON.stringify(msg));
                console.log(this.wireFormatString);

                console.log('*** Proto wire-format to Json string literal');
                console.log(protoToJson(this.wireFormatString));
                this.jsonFormatString = JSON.stringify(msg);
                console.log(JSON.stringify(msg));

                this.requestUpdate();
            })
            .catch(err => {
                console.error(err);
            });
    }

    /**
     * flow is ready lifecycle method
     */
    _FBPReady() {
        super._FBPReady();
        // this._FBPTraceWires();

        /**
         * furo flow based wire hook
         */
        this._FBPAddWireHook('--btnClicked', () => {
            window.alert('Congratulation! Furo flow based programming is active.');
        });
    }

    // language=CSS
    static styles =
        css`
            :host {
                display: block;
                height: 100%;
            }

            :host([hidden]) {
                display: none;
            }

            furo-vertical-scroller {
                padding-bottom: 1rem;
                box-sizing: border-box;
            }

            furo-markdown {
                background-color: transparent;
            }
        `

    /**
     *
     * @param query
     */
    updateQuery(query) {
        this._FBPTriggerWire('--queryUpdated', query);
    }

    /**
     * @private
     * @returns {TemplateResult|TemplateResult}
     */
    render() {
        // language=HTML
        return html`
            <furo-vertical-flex>
                <furo-ui5-dynamic-page-layout flex scroll padding>
                    <furo-markdown markdown="${this.sayHi}"></furo-markdown>
                    <p>MD5 Sum of markdown: ${this.md5}</p>

                    <p style="overflow-wrap: anywhere">Json string literal to proto.Message: ${this.wireFormatString}</p>
                    <p style="overflow-wrap: anywhere">proto.Message to Json: ${this.jsonFormatString}</p>

                    <furo-ui5-button design="Emphasized" @-click="--btnClicked"
                    >Hello Furo meets SAP Fiori!
                    </furo-ui5-button
                    >
                </furo-ui5-dynamic-page-layout>
            </furo-vertical-flex>
        `
    }
}

window.customElements.define('page-my-home', PageMyHome);
