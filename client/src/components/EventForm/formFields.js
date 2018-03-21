export default [
  { name: 'title', label: 'Event Title', required: true },
  { name: 'squad', label: 'Squad', required: true },
  { name: 'date', label: 'Date and Time', type: 'date', required: true },
  { name: 'location', label: 'Location', type: 'location', required: false },
  {
    name: 'minimum',
    label: 'Minimum Participants',
    type: 'numeric',
    required: false
  },
  {
    name: 'reminderattendance',
    label: 'Send attendance reminder emails ',
    type: 'toggle',
    required: false
  },
  {
    name: 'reminderconfirmation',
    label: 'Send confirmation emails ',
    type: 'toggle',
    required: false
  },
  {
    name: 'recipients',
    label: 'Recipient List',
    noValueError: 'Please provide a comma seperated list of emails.',
    required: true
  }
];
