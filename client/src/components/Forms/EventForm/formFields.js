export default [
  { name: 'title', label: 'Event Title', page: 1, required: true },
  { name: 'squad', label: 'Squad (Optional)', page: 1, type: 'squad' },
  {
    name: 'date',
    label: 'Date and Time',
    page: 1,
    type: 'date',
    required: true
  },
  {
    name: 'location',
    label: 'Location',
    page: 1,
    type: 'location',
    required: false
  },
  {
    name: 'minimum',
    label: 'Minimum Participants',
    page: 2,
    type: 'numeric',
    required: false
  },
  {
    name: 'reminderattendance',
    label: 'Send attendance reminder emails ',
    page: 2,
    type: 'toggle',
    required: false
  },
  {
    name: 'reminderconfirmation',
    label: 'Send confirmation emails ',
    page: 2,
    type: 'toggle',
    required: false
  },
  {
    name: 'recipients',
    label: 'Recipient List',
    page: 2,
    noValueError: 'Please provide a comma seperated list of emails.',
    required: false
  }
];
