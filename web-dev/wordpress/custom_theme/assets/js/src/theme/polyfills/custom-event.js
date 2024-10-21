/**
 * Modern browsers already support new CustomEvent
 * Remember to switch to CustomEvent in your application
 */
// If IE
if (typeof window.CustomEvent !== typeof isNaN) {
    const customEvent = function (event, params) {
        params = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined
        }
        const evt = document.createEvent('CustomEvent')
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail)
        return evt
    }

    customEvent.prototype = window.Event.prototype

    window.CustomEvent = customEvent
}
