import { LitElement, html } from 'lit';
import { FBP } from '@furo/fbp/src/fbp.js';
import '@furo/config/src/furo-config-loader.js';
import '@furo/route/src/furo-app-flow-router.js';

// ui5 components need the i18n stuff before they start.
import('./configs/ui5Init.js').then(async () => {
  import('./main-stage.js');
});

/**
 * `main-app`
 *
 * @customElement
 */
class AppShell extends FBP(LitElement) {
  /**
   *
   * @returns {TemplateResult}
   */
  render() {
    // language=HTML
    return html` <main-stage @-app-flow="--flowEvent"></main-stage>

      <furo-app-flow-router
        url-space-regex="^${window.APPROOT}"
        ƒ-.config="--flowConfigLoaded"
        ƒ-trigger="--flowEvent"
        ƒ-back="--navBack"
      ></furo-app-flow-router>

      <furo-config-loader
        src="src/configs/flowConfig.json"
        section="flow"
        @-config-loaded="--flowConfigLoaded"
      ></furo-config-loader>`;
  }
}

window.customElements.define('app-shell', AppShell);
