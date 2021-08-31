import Tonic from 'https://cdn.jsdelivr.net/gh/optoolco/tonic@v13.3.5/index.esm.js';
import MyFields from './my-fields.js';

(async () => {
  /**
   * Fetch questions from service
   */

  const request = new Request('https://putsreq.com/RWhI8ht10y5kqfmemrML');

  let response = await fetch(request);

  if (response.status === 200) {
    response = await response.json();
  }

  /**
   * Render Fields
   */

  Tonic.add(MyFields);

  let fields = document.getElementById('js-fields');

  fields.state = response;

  /**
   * Validation is initialized in the re-render method
   */

  fields.reRender();

  /**
   * Submission handler
   */

  document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    if (document.querySelector('#submit-message')) {
      document.querySelector('#submit-message').remove();
    }

    if (event.target.checkValidity()) {
      let data = new FormData(event.target);
      let body = [];

      for (let e of data.entries()) {
        body.push({
          'name': e[0],
          'value': e[1]
        });
      }

      let submission = await fetch(request, {
        method: 'POST',
        body: JSON.stringify(body)
      });

      let message = document.createElement('p');

      message.setAttribute('id', 'submit-message');

      submission = await submission.json();

      message.innerHTML = submission.message;

      message.setAttribute('aria-live', 'polite');

      form.appendChild(message);
    }
  });
})();