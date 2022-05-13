const CONSTANTS = require('./constants');
const { createLogger } = require('./createLogger');
const core = require('@actions/core');

function getStatusFromPRState(
  action,
  review,
  isPRMergedYet,
  matching_labels,
  ticketType
) {
  const getStatusFromPRStateLogger = createLogger('getStatusFromPRState');
  let status = '';

  if (ticketType === CONSTANTS.JIRA_TICKET_TYPE.STORY) {
    status = forStoryTicketType(action, review, isPRMergedYet, matching_labels);
  } else if (ticketType === CONSTANTS.JIRA_TICKET_TYPE.BUG) {
    status = forBugTicketType(action, review, isPRMergedYet, matching_labels);
  }

  core.info(getStatusFromPRStateLogger(`New status => ${status}`));

  return status;
}

function forBugTicketType(action, review, isPRMergedYet, matching_labels) {
  let status = '';
  switch (action) {
    case 'opened':
    case 'reopened':
    case 'submitted':
    case 'closed':
      // check if PR has no approved labels or,
      // if the reviewer requests changes or,
      // if the PR is closed and not merged,
      // then set the new status to In Progress
      if (
        !(
          matching_labels.includes(CONSTANTS.GH_DEV_APPROVED) || isPRMergedYet
        ) ||
        review.state === 'changes_requested'
      ) {
        status = CONSTANTS.JIRA_IN_PROGRESS;
      }
      break;
    default:
      status = '';
      break;
  }
  return status;
}

function forStoryTicketType(action, review, isPRMergedYet, matching_labels) {
  let status = '';
  switch (action) {
    case 'opened':
    case 'reopened':
    case 'submitted':
    case 'closed':
      // check if PR has no approved labels or,
      // if the reviewer requests changes or,
      // if the PR is closed and not merged,
      // then set the new status to In Progress
      if (
        !(
          matching_labels.includes(CONSTANTS.GH_DEV_APPROVED) ||
          matching_labels.includes(CONSTANTS.GH_QC_APPROVED) ||
          isPRMergedYet
        ) ||
        review.state === 'changes_requested'
      ) {
        status = CONSTANTS.JIRA_DEV_IN_PROGRESS;
      } else if (isPRMergedYet) {
        status = CONSTANTS.JIRA_CODE_MERGED_TO_DEVELOP;
      }
      break;
    default:
      status = '';
      break;
  }
  return status;
}

module.exports = {
  getStatusFromPRState,
};
