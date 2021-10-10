import { LitElement, html, css } from 'lit';
import { FBP } from '@furo/fbp/src/fbp.js';

import '@furo/route/src/furo-location.js';
import '@furo/route/src/furo-pages.js';

import './configs/iconset.js';

import './home/view-homepage.js';
import './view-404.js';

/**
 * `main-stage`
 *
 * @customElement
 * @appliesMixin FBP
 */
class MainStage extends FBP(LitElement) {
  /**
   * flow is ready lifecycle method
   */
  _FBPReady() {
    super._FBPReady();
  }

  /**
   *
   * @private
   * @return {CSSResult}
   */
  static get styles() {
    // language=CSS
    return [
      css`
        :host {
          height: 100%;
          display: block;
          background: var(--sapBackgroundColor);
          color: var(--sapTextColor);
          font-family: var(--sapFontFamily, '72'), '72full', Arial, Helvetica, sans-serif;
          font-size: var(--sapFontSize);
        }

        furo-pages {
          height: 100vh;
          overflow: hidden;
        }
      `,
    ];
  }

  /**
   * @private
   * @returns {TemplateResult}
   */
  render() {
    // language=HTML
    return html`
      <furo-pages ƒ-inject-location="--locationChanged" default="home">
        <!-- Page HOME - gives you broad overview of your current work situation (default page) -->
        <view-homepage name="home"></view-homepage>
        <!-- Page NOT FOUND  - fallback page if the requested page is not available -->
        <view-404 name="404"></view-404>
      </furo-pages>

      <furo-location
        url-space-regex="^${window.APPROOT}"
        @-location-changed="--locationChanged"
      ></furo-location>
    `;
  }
}

window.customElements.define('main-stage', MainStage);
