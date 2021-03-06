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

  const TICKET_TYPE = CONSTANTS.JIRA_TICKET_TYPE;

  if (ticketType === TICKET_TYPE.STORY) {
    status = forStoryTicketType(action, review, isPRMergedYet, matching_labels);
  } else if (ticketType === TICKET_TYPE.BUG) {
    status = forBugTicketType(action, review, isPRMergedYet, matching_labels);
  } else if (
    ticketType === TICKET_TYPE.TASK ||
    ticketType === TICKET_TYPE.SUB_TASK
  ) {
    status = forTaskOrSubTaskTicketType(
      action,
      review,
      isPRMergedYet,
      matching_labels
    );
  }
  core.info(getStatusFromPRStateLogger(`New status => ${status}`));

  return status;
}

function forTaskOrSubTaskTicketType(
  action,
  review,
  isPRMergedYet,
  matching_labels
) {
  let status = '';
  switch (action) {
    case 'opened':
    case 'reopened':
    case 'closed':
      // check if PR has no approved labels or,
      // if the PR is closed and not merged,
      // then set the new status to In Progress
      if (
        !(matching_labels.includes(CONSTANTS.GH_DEV_APPROVED) || isPRMergedYet)
      ) {
        status = CONSTANTS.JIRA_DEV_IN_PROGRESS;
      } else if (isPRMergedYet) {
        status = CONSTANTS.JIRA_DONE;
      }
      break;
    case 'submitted':
      // if the reviewer requests changes,
      // then set the new status to In Progress
      if (review.state === 'changes_requested') {
        status = CONSTANTS.JIRA_DEV_IN_PROGRESS;
      }
      break;
    default:
      status = '';
      break;
  }
  return status;
}

function forBugTicketType(action, review, isPRMergedYet, matching_labels) {
  let status = '';
  switch (action) {
    case 'opened':
    case 'reopened':
    case 'closed':
      // check if PR has no approved labels or,
      // if the PR is closed and not merged,
      // then set the new status to In Progress
      if (
        !(matching_labels.includes(CONSTANTS.GH_DEV_APPROVED) || isPRMergedYet)
      ) {
        status = CONSTANTS.JIRA_DEV_IN_PROGRESS;
      }
      break;
    case 'submitted':
      // if the reviewer requests changes,
      // then set the new status to In Progress
      if (review.state === 'changes_requested') {
        status = CONSTANTS.JIRA_DEV_IN_PROGRESS;
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
    case 'closed':
      // check if PR has no approved labels or,
      // if the PR is closed and not merged,
      // then set the new status to In Progress
      if (
        !(
          matching_labels.includes(CONSTANTS.GH_DEV_APPROVED) ||
          matching_labels.includes(CONSTANTS.GH_QC_APPROVED) ||
          isPRMergedYet
        )
      ) {
        status = CONSTANTS.JIRA_DEV_IN_PROGRESS;
      } else if (isPRMergedYet) {
        status = CONSTANTS.JIRA_CODE_MERGED_TO_DEVELOP;
      }
      break;
    case 'submitted':
      // if the reviewer requests changes,
      // then set the new status to In Progress
      if (review.state === 'changes_requested') {
        status = CONSTANTS.JIRA_DEV_IN_PROGRESS;
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
