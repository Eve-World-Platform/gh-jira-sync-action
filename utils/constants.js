const JIRA_DEV_IN_PROGRESS = 'DEV IN PROGRESS';
const JIRA_READY_FOR_DEVELOPMENT = 'READY FOR DEVELOPMENT';
const JIRA_READY_FOR_INTEGRATION = 'READY FOR INTEGRATION';
const JIRA_DEV_COMPLETE = 'DEV COMPLETE';
const JIRA_CODE_REVIEW = 'IN CODE REVIEW';
const JIRA_QA_VERIFICATION = 'QA VERIFICATION';
const JIRA_READY_FOR_TESTING = 'READY FOR TESTING';
const JIRA_RESOLVED = 'Resolved';
const JIRA_CODE_MERGED_TO_DEVELOP = 'CODE MERGED TO DEVELOP';
const JIRA_NEW = 'NEW';
const JIRA_TODO = 'TO-DO';
const JIRA_APPROVAL = 'APPROVAL';
const JIRA_DONE = 'Done';
const GH_READY_FOR_REVIEW = 'Ready for Review';
const GH_READY_FOR_QC = 'Ready for QC';
const GH_WORK_IN_PROGRESS = 'Work in Progress';
const GH_DEV_APPROVED = 'Dev Approved';
const GH_QC_APPROVED = 'QC Approved';
const GH_LABELS = [
  GH_READY_FOR_REVIEW,
  GH_READY_FOR_QC,
  GH_WORK_IN_PROGRESS,
  GH_DEV_APPROVED,
  GH_QC_APPROVED,
];

const JIRA_TICKET_TYPE = {
  BUG: 'Bug',
  STORY: 'Story',
  TASK: 'Task',
  SUB_TASK: 'Sub-task',
};

const WORKFLOW_NAME = {
  [JIRA_TICKET_TYPE.TASK]: 'Task workflow',
  [JIRA_TICKET_TYPE.BUG]: 'Defect workflow',
  [JIRA_TICKET_TYPE.SUB_TASK]: 'Task workflow',
  [JIRA_TICKET_TYPE.STORY]: 'User Story Android and iOS workflow',
};

module.exports = {
  JIRA_DEV_IN_PROGRESS,
  JIRA_READY_FOR_DEVELOPMENT,
  JIRA_READY_FOR_INTEGRATION,
  JIRA_DEV_COMPLETE,
  JIRA_CODE_REVIEW,
  JIRA_READY_FOR_TESTING,
  JIRA_RESOLVED,
  JIRA_QA_VERIFICATION,
  JIRA_CODE_MERGED_TO_DEVELOP,
  JIRA_NEW,
  JIRA_TODO,
  JIRA_APPROVAL,
  JIRA_DONE,
  GH_READY_FOR_REVIEW,
  GH_WORK_IN_PROGRESS,
  GH_DEV_APPROVED,
  GH_QC_APPROVED,
  GH_READY_FOR_QC,
  GH_LABELS,
  JIRA_TICKET_TYPE,
  WORKFLOW_NAME,
};
