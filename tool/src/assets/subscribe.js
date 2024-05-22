const openSubscribeModalButton = document.getElementById(
  "open-subscribe-modal-button",
);
const subscribeModal = document.getElementById("subscribe-modal");
const closeSubscribeModalButton = document.querySelector("dialog button");
const subscribeModalEmailInput = document.getElementById(
  "subscribe-modal-email-input",
);
const subscribeButton = document.getElementById("subscribe-button");

console.log("in linked", openSubscribeModalButton);

openSubscribeModalButton.onclick = function () {
  subscribeModal.showModal();
};

// Close modal if user clicks outside of the main modal content
subscribeModal.onclick = function (event) {
  if (event.target.id === subscribeModal.id) {
    subscribeModal.close();
  }
};

closeSubscribeModalButton.onclick = function () {
  subscribeModal.close();
};

class Subscribe {
  static singletonInstance = null;

  /**
   * @return {Subscribe}
   */
  static get singleton() {
    if (Subscribe.singletonInstance === null) {
      Subscribe.singletonInstance = new Subscribe();
    }
    return Subscribe.singletonInstance;
  }

  isLoading = false;

  loadingStart() {
    this.isLoading = true;
    subscribeButton.setAttribute("disabled", true);
  }

  loadingEnd() {
    this.isLoading = false;
    subscribeButton.removeAttribute("disabled");
    subscribeModal.close();
  }

  async subscribe() {
    // If subscribe function is already running, ignore subsequent requests
    if (this.isLoading) {
      return;
    }

    this.loadingStart();

    try {
      // @todo Call API
    } catch (error) {
      alert(`Failed to subscribe: ${error}`);
      console.error(error);
    }

    this.loadingEnd();
  }
}

subscribeButton.onclick = function () {
  Subscribe.singleton.subscribe();
};

subscribeModalEmailInput.onkeydown = function () {
  // Enter key
  if (event.keyCode === 13) {
    Subscribe.singleton.subscribe();
  }
};
