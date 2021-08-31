# Front-end Assignment

Create an **accessible form** that uses questions fetched from a REST endpoint. The questions will ask for **personally identifiable information** from public users who will fill it out. For this particular exercise the CSS styling of the form does not need to be considered but the HTML layout will be. Create an application script in `js/default.js` using **JavaScript ES syntax**. Use as many native features as possible such as the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and **async**/**await**.

## Instructions

Initial instructions can be found at the [@NYCOpportunity/front-end-assignment](https://github.com/NYCOpportunity/front-end-assignment) repository.

## Wrapping Up

* This example uses [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and **async**/**await** to retrieve the questions from the form service as instructed by the assignment.

* I chose to use the native web component framework [Tonic](https://tonicframework.dev/) to render the fields in the form. **This was one of the more challenging aspects that I would revisit given more time to increase my familiarity with the framework**. The labels are rendered above the input in a logical reading order for screen readers. Additionally, the radio question also uses the `<fieldset>` element to group the inputs along with the `<legend>` element as the label.

* Validation is done using the [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation) per the instructions. A blur event listener is added to the fields once they render within the Tonic fields component. If they do not pass validation a new node containing the validation message is added just before the question input with the `aria-live="polite"` attribute. The input has the `aria-invalid="true"` added along with the `aria-describedby` attribute that targets the message node's id.

* The submission handler checks the validity of the form and will not submit unless it passes. It uses the [FormData API](https://developer.mozilla.org/en-US/docs/Web/API/FormData) to collect the form data and create a stringified JSON body to `POST` to the form service. A new message node with the server response is added to the form to let users know wether the submission was successful or not. It also uses the `aria-live="polite"` attribute to announce itself to screen-readers.

* To secure this form in a production environment, an authentication service provided by the form service would be required. This would be in the form of oAuth or some other token that can be signed by the application and validated by the form service when a validated request is submitted to the service. Other options include session tokens or NONCEs rendered by the application on the server-side that can be placed in the HTML document when it's rendered and passed to a server-side proxy service in the application that submits the data to the form service.

* To prevent spam I would add [Google reCAPTCHA](https://www.google.com/recaptcha/about/) to the form. This would require users to check a box to ensure they are not robots submitting the form.
