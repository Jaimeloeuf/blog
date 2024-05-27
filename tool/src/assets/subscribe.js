import { sf } from "https://cdn.jsdelivr.net/npm/simpler-fetch@10.4.0/+esm";

// Initialise this asynchronously and only for the pages that load subscribeModal.
(function initialiseRecaptcha() {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src =
    "https://www.recaptcha.net/recaptcha/api.js?render=6Ldwb4InAAAAAP8Z6U1JnGq3WQ9pguOtWGh3kuHL";
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
        .execute("6Ldwb4InAAAAAP8Z6U1JnGq3WQ9pguOtWGh3kuHL", { action })
        .then(resolve)
        .catch(reject),
    ),
  );

const openSubscribeModalButtons = document.getElementsByClassName(
  "open-subscribe-modal-button",
);
const subscribeModal = document.getElementById("subscribe-modal");
const closeSubscribeModalButton = document.querySelector("dialog button");
const subscribeModalEmailInput = document.getElementById(
  "subscribe-modal-email-input",
);
const subscribeButton = document.getElementById("subscribe-button");
const loadingSpinner = document.getElementById("loading-spinner");
const loadingModal = document.getElementById("loading-modal");

// Can have more than one subscribe button for every single page, e.g. one in
// the headerFragment one in the footer.
Array.from(openSubscribeModalButtons).forEach(
  (openSubscribeModalButton) =>
    (openSubscribeModalButton.onclick = function () {
      // Clear input to ensure that on every new open, this is always empty
      subscribeModalEmailInput.value = "";
      subscribeModal.showModal();
    }),
);

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
    loadingSpinner.style.display = "flex";
    loadingModal.showModal();
  }

  loadingEnd() {
    this.isLoading = false;
    subscribeButton.removeAttribute("disabled");
    loadingSpinner.style.display = "none";
    loadingModal.close();
    subscribeModal.close();
  }

  async subscribe() {
    // If subscribe function is already running, ignore subsequent requests
    if (this.isLoading) {
      return;
    }

    this.loadingStart();

    try {
      const email = subscribeModalEmailInput?.value;

      if (typeof email !== "string" || email === "") {
        throw new Error("Invalid email!");
      }

      const { res, err } = await sf
        .useOnce(
          "https://prod-api.gcp-cr.thepmftool.com/v1/landing/contact-form/submit",
        )
        .POST()
        .useHeader({
          "x-recaptcha-token": await getRecaptchaToken("contactUs"),
        })
        .bodyJSON({
          name: "blog.JJSS.quest",
          email,
          message: "blog subscription",
        })
        .runJSON();

      if (err) {
        throw err;
      }
      if (!res.ok) {
        throw new Error(JSON.stringify(res, null, 2));
      }

      if (res.status === 201) {
        alert("Subscribed, you will get new posts in your inbox directly!");
      }
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

subscribeModalEmailInput.onkeydown = function (event) {
  // Enter key
  if (event.keyCode === 13) {
    Subscribe.singleton.subscribe();
  }
};
