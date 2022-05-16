const core = require('@actions/core');
const { createLogger } = require('./createLogger');
const CONSTANTS = require('./constants');

async function checkIsPRApproved(label, fetchReviews) {
  const checkIsPRApprovedLogger = createLogger('checkIsPRApproved');

  const reviews = await fetchReviews();
  if (!reviews.data.length) {
    core.info(
      checkIsPRApprovedLogger(
        `${label} applied but PR doesn't have necessary dev approvals`
      )
    );
    return false;
  }
  const isApproved =
    reviews.data.filter((review) => {
      return review.state === 'APPROVED';
    }).length >= 2;

  if (!isApproved) {
    core.info(
      checkIsPRApprovedLogger(
        `${label} applied but PR doesn't have necessary dev approvals`
      )
    );
    return false;
  }

  core.info(checkIsPRApprovedLogger('-> PR has necessary dev approvals'));
  return true;
}

async function getStatusFromPRLabels(
  fetchReviews,
  matching_labels,
  ticketType
) {
  const getStatusFromPRLabelsLogger = createLogger('getStatusFromPRLabels');
  let status = '';
  if (matching_labels.includes(CONSTANTS.GH_READY_FOR_REVIEW)) {
    status = CONSTANTS.JIRA_CODE_REVIEW;
  } else if (matching_labels.includes(CONSTANTS.GH_WORK_IN_PROGRESS)) {
    status = CONSTANTS.JIRA_DEV_IN_PROGRESS;
  } else if (matching_labels.includes(CONSTANTS.GH_DEV_APPROVED)) {
    const isApproved = await checkIsPRApproved(
      CONSTANTS.GH_DEV_APPROVED,
      fetchReviews
    );

    if (!isApproved) {
      return status;
    }

    if (
      [
        CONSTANTS.JIRA_TICKET_TYPE.TASK,
        CONSTANTS.JIRA_TICKET_TYPE.SUB_TASK,
      ].includes(ticketType)
    ) {
      status = CONSTANTS.JIRA_APPROVAL;
    } else {
      status = CONSTANTS.JIRA_READY_FOR_TESTING;
    }
  } else if (
    matching_labels.includes(CONSTANTS.GH_READY_FOR_QC) &&
    ticketType !== CONSTANTS.JIRA_TICKET_TYPE.BUG
  ) {
    status = CONSTANTS.JIRA_QA_VERIFICATION;
  } else if (
    matching_labels.includes(CONSTANTS.GH_QC_APPROVED) &&
    ticketType !== CONSTANTS.JIRA_TICKET_TYPE.BUG
  ) {
    status = CONSTANTS.JIRA_RESOLVED;
  }

  core.info(getStatusFromPRLabelsLogger(`New status => ${status}`));

  return status;
}

module.exports = {
  getStatusFromPRLabels,
};
