import { LitElement, html, css } from 'lit';
import { FBP } from '@furo/fbp/src/fbp.js';

import '@furo/layout/src/furo-vertical-flex.js';
import '@furo/route/src/furo-app-flow.js';
import '@furo/route/src/furo-pages.js';
import '@furo/route/src/furo-location-updater.js';

import '@ui5/webcomponents-fiori/dist/ShellBar.js';
import '@ui5/webcomponents-fiori/dist/ShellBarItem.js';
import '@ui5/webcomponents/dist/TabContainer.js';
import '@ui5/webcomponents/dist/Tab.js';
import '@ui5/webcomponents/dist/Popover.js';
import '@ui5/webcomponents/dist/Avatar.js';

import './page-my-home.js';

/**
 * `view-homepage`
 * The SAP Fiori launchpad is a shell that hosts SAP Fiori apps, and provides the apps with services such as navigation,
 * personalization, embedded support, and application configuration.
 *
 * The launchpad is the entry point to SAP Fiori apps on mobile and desktop devices.
 * The launchpad displays a home page with tiles. Each tile represents a business application that the user can launch.
 * Tiles can also display live status indicators, such as the number of open tasks. The launchpad is role-based.
 * In other words, the user’s role determines which app tiles are shown.
 *
 * @summary SAP Fiori Launchpad
 * @customElement
 * @appliesMixin FBP
 */
class ViewHomepage extends FBP(LitElement) {
  /**
   * flow is ready lifecycle method
   */
  _FBPReady() {
    super._FBPReady();
    // this._FBPTraceWires();

    /**
     * Register hook on wire --pageActivated to
     * select the tabs
     */
    this._FBPAddWireHook('--pageActivated', e => {
      this._currentTab = e.hash.tab;
      if (this._currentTab === undefined) {
        // set default
        this._currentTab = 'home';
      }
      this.requestUpdate();
    });
  }

  static get styles() {
    // language=CSS
    return [
      css`
        :host {
          display: block;
          height: 100%;
        }

        :host([hidden]) {
          display: none;
        }

        furo-pages {
          height: 100%;
          overflow: hidden;
        }
      `,
    ];
  }

  /**
   * check if the current tab is selected
   * @param tab
   * @return {boolean}
   * @private
   */
  _checkInitialTab(tab) {
    return this._currentTab === tab;
  }

  /**
   * @private
   * @returns {TemplateResult|TemplateResult}
   */
  render() {
    // language=HTML
    return html`
      <ui5-popover ƒ-open-by="--notificationsRequested" placement-type="top">
        <div class="popover-content">
          <ui5-list header-text="Notifications" no-data-text="No data"></ui5-list>
        </div>
        <div slot="footer" class="popover-footer"></div>
      </ui5-popover>

      <furo-vertical-flex>
        <!-- The ui5-shellbar is meant to serve as an application header and includes numerous built-in features,
        such as: logo, profile image/icon, title, search field, notifications and so on.-->
        <ui5-shellbar
          @-notifications-click="--notificationsRequested(*.detail.targetRef)"
          primary-title="Webassembly Protocol Buffer Lab"
        >
          <ui5-avatar slot="logo" initials="FU" color-schema="Accent1" size="XS"></ui5-avatar>
        </ui5-shellbar>

        <!-- Sub navigation bar -->
        <ui5-tabcontainer
          class="full-width"
          collapsed
          fixed
          @-tab-select="--subTabSelected"
        >
          <!-- The ui5-tab represents a selectable item inside a ui5-tabcontainer.
               For the interaction with furo-pages to work, the attribute data-tab must be set. -->
          <ui5-tab
            text="My home"
            data-tab="home"
            ?selected="${this._checkInitialTab('home')}"
          ></ui5-tab>
        </ui5-tabcontainer>
        <furo-location-updater ƒ-set-hash="--subTabSelected(*.tab.dataset)"></furo-location-updater>

        <!-- Dynamic sub page handling -->
        <furo-pages ƒ-activate-page="--pageActivated(*.hash.tab)" default="home">
          <page-my-home name="home" ƒ-update-query="--pageActivated(*.query)"></page-my-home>
        </furo-pages>

        <furo-app-flow
          ƒ-emit="--searchPageRequested"
          event="flow-search-page-requested"
        ></furo-app-flow>
      </furo-vertical-flex>
    `;
  }
}

window.customElements.define('view-homepage', ViewHomepage);
