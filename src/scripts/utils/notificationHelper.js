class NotificationHelper {
  static sendNotification({ title, options }) {
    if (!this._isAvaibility()) {
      console.log('Notification not supported in this browser');
      return;
    }

    if (!this._isPermissionGranted()) {
      console.log('User did not granted permission');
      this._requestPermission();
      return;
    }

    this._showNotification({ title, options });
  }

  static _isAvaibility() {
    return ('Notification' in window);
  }

  static _isPermissionGranted() {
    return Notification.permission === 'granted';
  }

  static async _requestPermission() {
    const status = await Notification.requestPermission();

    if (status === 'denied') {
      console.log('Notification Denied');
    } else if (status === 'default') {
      console.log('Permission closed');
    }
  }

  static async _showNotification({ title, options }) {
    const serviceWorkerRegistration = await navigator.serviceWorker.ready;
    serviceWorkerRegistration.showNotification(title, options);
  }
}

export default NotificationHelper;
