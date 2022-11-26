export const en = {
  docs: {
    gettingStarted: 'https://docs.prefect.io/getting-started/overview/',
    flows: 'https://docs.prefect.io/concepts/flows/',
    flowRuns: 'https://docs.prefect.io/ui/flow-runs/',
    blocks: 'https://docs.prefect.io/ui/blocks/',
    workQueues: 'https://docs.prefect.io/ui/work-queues/',
    notifications: 'https://docs.prefect.io/ui/notifications/',
    deployments: 'https://docs.prefect.io/ui/deployments/',
  },
  error: {
    activateDeployment: 'Failed to activate deployment',
    pauseDeployment: 'Failed to pause deployment',
    submitNotification: 'Failed to submit notification',
    activateNotification: 'Failed to activate notification',
    pauseNotification: 'Failed to pause notification',
    activateWorkQueue: 'Failed to activate work queue',
    pauseWorkQueue: 'Failed to pause work queue',
    delete: (type: string) => `Failed to delete ${type}`,
    scheduleFlowRun: 'Failed to schedule flow run',
    createWorkQueue: 'Failed to create work queue',
    updateWorkQueue: 'Failed to update work queue',
    updateBlock: 'Failed to update block',
    createBlock: 'Failed to create block',
    createNotification: 'Failed to create notification',
    updateNotification: 'Failed to update notification',
    createSchedule: 'Failed to create schedule',
    updateSchedule: 'Failed to update schedule',
    removeSchedule: 'Failed to remove schedule',
    createSavedSearch: 'Failed to create saved filter',
    deleteSavedSearch: 'Failed to delete saved filter',
    retryRun: 'Flow run retry failed',
    changeFlowRunState: 'Failed to change flow run state',
    changeTaskRunState: 'Failed to change task run state',
    cancelFlowRun: 'Failed to cancel flow run',
    createConcurrencyLimit: 'Failed to create concurrency limit',
  },
  success: {
    activateDeployment: 'Deployment active',
    pauseDeployment: 'Deployment paused',
    activateNotification: 'Notification active',
    pauseNotification: 'Notification paused',
    activateWorkQueue: 'Work queue active',
    pauseWorkQueue: 'Work queue paused',
    delete: (type: string) => `${type} deleted successfully!`,
    scheduleFlowRun: 'Flow run scheduled',
    createWorkQueue: 'Work queue has been created',
    updateWorkQueue: 'Work queue has been updated',
    updateBlock: 'Block updated successfully',
    createBlock: 'Block created successfully',
    createNotification: 'Notification created successfully',
    updateNotification: 'Updated notification successfully',
    createSchedule: 'Schedule added',
    updateSchedule: 'Schedule updated',
    removeSchedule: 'Schedule removed',
    createSavedSearch: 'Filter saved',
    deleteSavedSearch: 'Saved filter deleted',
    retryRun: 'Retrying run',
    changeFlowRunState: 'Flow run state changed',
    changeTaskRunState: 'Task run state changed',
    cancelFlowRun: 'Flow run cancelled',
    createConcurrencyLimit: 'Concurrency limit created',
  },
  info: {
    deprecatedWorkQueue: 'This work queue uses a deprecated tag-based approach to matching flow runs; it will continue to work but you can\'t modify it',
    deploymentMissingWorkQueue: 'This deployment doesn\'t have an associated work queue; runs will be scheduled but won\'t be picked up by your agents',
  },
}