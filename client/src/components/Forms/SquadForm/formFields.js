/*
* List of fields for the form.
*/
export default [
  { name: 'name', label: 'Squad Name', required: true },
  {
    name: 'members',
    label: 'Recipient List',
    noValueError: 'Please provide a comma seperated list of emails.',
    required: false
  }
];
