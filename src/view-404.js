import { LitElement, html, css } from 'lit';
import { Theme } from '@furo/framework/src/theme.js';
import { FBP } from '@furo/fbp/src/fbp.js';

import '@furo/route/src/furo-app-flow.js';
import '@furo/layout/src/furo-vertical-flex.js';
import '@furo/layout/src/furo-vertical-scroller.js';
import '@ui5/webcomponents-fiori/dist/ShellBar.js';
import '@ui5/webcomponents/dist/Button.js';
import '@ui5/webcomponents/dist/Title.js';
import '@ui5/webcomponents/dist/Icon.js';

import '@ui5/webcomponents-icons/dist/show.js';

/**
 * `view-404`
 * Message pages give feedback to the user when an app or list is empty, or when an error has occurred.
 * Should display the following text: “Sorry, we can’t find this page. Please check the URL you are using to call the app.”
 * The icon name is "document".
 *
 * @summary message pages
 * @customElement
 * @appliesMixin FBP
 */
class View404 extends FBP(LitElement) {
  /**
   * flow is ready lifecycle method
   */
  _FBPReady() {
    super._FBPReady();
  }

  /**
   * Themable Styles
   * @private
   * @return {CSSResult}
   */
  static get styles() {
    // language=CSS
    return (
      Theme.getThemeForComponent(this.name) ||
      css`
        :host {
          display: block;
          height: 100%;
        }

        :host([hidden]) {
          display: none;
        }

        div.initial {
          margin: 15% auto;
          text-align: center;
        }
      `
    );
  }

  /**
   * @private
   * @returns {TemplateResult}
   * @private
   */
  render() {
    // language=HTML
    return html`
      <furo-vertical-flex>
        <furo-vertical-scroller>
          <ui5-shellbar primary-title="Page not found" secondary-title="">
            <ui5-button icon="home" slot="startButton" @-click="--homeRequested"></ui5-button>
          </ui5-shellbar>

          <div class="initial">
            <ui5-icon name="document" style="width:6rem;height:6rem;"></ui5-icon>
            <ui5-title level="H1">Sorry, we can't find this page</ui5-title>
          </div>
        </furo-vertical-scroller>
      </furo-vertical-flex>

      <furo-app-flow ƒ-emit="--homeRequested" event="flow-home-page-requested"></furo-app-flow>
    `;
  }
}

window.customElements.define('view-404', View404);
