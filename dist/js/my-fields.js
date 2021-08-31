import Tonic from 'https://cdn.jsdelivr.net/gh/optoolco/tonic@v13.3.5/index.esm.js';

class MyFields extends Tonic {
  render() {
    let markup = '';

    for (let index = 0; index < this.state.length; index++) {
      const q = this.state[index];

      if (this[q.type])
        markup = `${markup}${this[q.type](q)}<br><br>`;
    }

    return this.html`
      ${this.html(markup)}

      ${this.html(this.submit())}
    `;
  }

  updated() {
    let fields = this.querySelectorAll('input');

    for (let index = 0; index < fields.length; index++) {
      const field = fields[index];

      field.addEventListener('blur', event => {
        let id = `message-${event.target.id}`;

        if (event.target.parentNode.querySelector(`#${id}`)) {
          event.target.parentNode.querySelector(`#${id}`).remove();

          event.target.removeAttribute('aria-invalid');
          event.target.removeAttribute('aria-describedby');
        }

        if (!event.target.validity.valid) {
          let message = document.createElement('div');

          message.innerHTML = event.target.validationMessage;
          message.setAttribute('id', id)
          message.setAttribute('aria-live', 'polite');

          event.target.parentNode.insertBefore(message, event.target);

          event.target.setAttribute('aria-invalid', 'true');
          event.target.setAttribute('aria-describedby', id);
        }
      });
    }
  }

  tel(q) {
    q.pattern = '[0-9]{10}';

    return this.text(q);
  }

  email(q) {
    return this.text(q);
  }

  text(q) {
    return `
      <label for="${q.id}">${q.label}</label><br>
      <input id="${q.id}" name="${q.name}" type='${q.type}' ${(q.pattern) ? `pattern="${q.pattern}"` : ''} ${(q.required) ? 'required' : ''} />
    `;
  }

  radio(q) {
    let options = '';

    for (let i = 0; i < q.options.length; i++) {
      const opt = q.options[i];

      options = `
        ${options}

        <label for="${opt.id}">
          <input value="${opt.value}" id="${opt.id}" name="${q.name}" type="${q.type}" ${(q.required) ? 'required' : ''} />
          ${opt.label}
        </label><br>
      `;
    }

    return `
      <fieldset>
        <legend>${q.legend}</legend>

        ${options}
      </fieldset>
    `;
  }

  submit() {
    return `<button type="submit">Submit</button>`;
  }
}

export default MyFields;
