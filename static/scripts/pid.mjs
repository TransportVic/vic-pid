/**
 * A class used to represent a PID.
 */
export default class PID {

  /**
   * Shows the Listen for announcements screen 
   */
  showAnnouncementsMessage() {}

  /**
   * Hides the Listen for announcements screen 
   */
  hideAnnouncementsMessage() {}

  /**
   * Shows a fixed message on the screen. Typically, the fixed message will occupy the entire "next service" portion of the PID, while still showing the subsequent services
   * 
   * @param {string} text The message to be shown
   */
  showFixedMessage(text) {}

  /**
   * Hides a fixed message from the screen
   */
  hideFixedMessage() {}

  /**
   * Shows a main service message on the screen. Unlike a fixed message, this will typically continue to show the details of the next service, however its stopping pattern would be replaced by the message
   * 
   * @param {string} text The message to be shown
   */
  showMainServiceMessage(text) {}

  /**
   * Hides a main service message from the screen
   */
  hideMainServiceMessage() {}

  /**
   * Shows a next service message on the screen. Typically, this message will not block the main departure from showing on the PID. Instead, it alternates over the subsequent departures.
   * 
   * @param {string} text The message to be shown
   */
  showNextServiceMessage(text) {}

  /**
   * Hides a next service message from the screen
   */
  hideNextServiceMessage() {}

  /**
   * Updates the services being shown on the PID.
   * 
   * @param {object[]} services The services to be displayed on the screen
   */
  updateServices(services) {}

  formatEstimatedTime(estTime) {
    if (estTime < 1) return 'NOW'
    return estTime + ' min'
  }
}