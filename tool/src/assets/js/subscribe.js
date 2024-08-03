import { sf } from "https://cdn.jsdelivr.net/npm/simpler-fetch@10.4.0/+esm";

// Initialise this asynchronously and only for the pages that load subscribeCard.
(function initialiseRecaptcha() {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src =
    "https://www.recaptcha.net/recaptcha/api.js?render=6LdSsh4qAAAAAJgCceyn4aUuGBzj4R973rmFtxL0";
  document.getElementsByTagName("head")[0].appendChild(script);

  const recaptchaInterval = setInterval(function () {
    if (!window.grecaptcha || !window.grecaptcha.execute) {
      return;
    }
    clearInterval(recaptchaInterval);
    console.log("Recaptcha Initialised");
  }, 100);
})();

const getRecaptchaToken = (action) =>
  new Promise((resolve, reject) =>
    window.grecaptcha.ready(() =>
      window.grecaptcha
        .execute("6LdSsh4qAAAAAJgCceyn4aUuGBzj4R973rmFtxL0", { action })
        .then(resolve)
        .catch(reject),
    ),
  );

const subscribeCardEmailInput = document.getElementById(
  "subscribe-card-email-input",
);
const subscribeButton = document.getElementById("subscribe-button");
const loadingSpinner = document.getElementById("loading-spinner");
const loadingModal = document.getElementById("loading-modal");

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
    loadingSpinner.style.display = "flex";
    loadingModal.showModal();
  }

  loadingEnd() {
    this.isLoading = false;
    subscribeButton.removeAttribute("disabled");
    loadingSpinner.style.display = "none";
    loadingModal.close();
  }

  async subscribe() {
    // If subscribe function is already running, ignore subsequent requests
    if (this.isLoading) {
      return;
    }

    this.loadingStart();

    const email = subscribeCardEmailInput?.value;

    if (typeof email !== "string" || email === "") {
      alert("Invalid email!");
      this.loadingEnd();

      return;
    }

    const { res, err } = await sf
      .useOnce("https://api.jjss.quest/blog/subscribe")
      .POST()
      .useHeader({
        "x-recaptcha-token": await getRecaptchaToken("subscribeToBlog"),
      })
      .bodyJSON({ email })
      .runJSON();

    if (err) {
      alert(`Failed to subscribe: ${err}`);
      console.error(err);
      this.loadingEnd();

      return;
    }

    // If it is 409 "already subscribed", ignore it and let it be treated the
    // same as a successful subscription
    if (!res.ok && res.status !== 409) {
      const error = Error(JSON.stringify(res, null, 2));
      alert(`Failed to subscribe: ${error}`);
      console.error(error);
      this.loadingEnd();

      return;
    }

    alert("Subscribed, you will get new posts in your inbox directly!");
    this.loadingEnd();
  }
}

subscribeButton.onclick = function () {
  Subscribe.singleton.subscribe();
};

subscribeCardEmailInput.onkeydown = function (event) {
  // Enter key
  if (event.keyCode === 13) {
    Subscribe.singleton.subscribe();
  }
};
