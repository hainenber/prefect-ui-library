/* eslint-disable camelcase */
import {
  AutomationAction,
  AutomationActionPauseDeployment,
  AutomationActionPauseWorkPool,
  AutomationActionPauseWorkQueue,
  AutomationActionResumeDeployment,
  AutomationActionResumeWorkPool,
  AutomationActionResumeWorkQueue
} from '@/automations/types/actions'
import {
  AutomationActionPauseDeploymentResponse,
  AutomationActionPauseWorkPoolResponse,
  AutomationActionPauseWorkQueueResponse,
  AutomationActionRequest,
  AutomationActionResponse,
  AutomationActionResumeDeploymentResponse,
  AutomationActionResumeWorkPoolResponse,
  AutomationActionResumeWorkQueueResponse
} from '@/automations/types/api/actions'
import { MapFunction } from '@/services/Mapper'

export const mapAutomationActionResponseToAutomationAction: MapFunction<AutomationActionResponse, AutomationAction> = function(response) {
  switch (response.type) {
    case 'pause-deployment':
    case 'resume-deployment':
      return mapPauseResumeDeploymentResponse(response)
    case 'pause-work-queue':
    case 'resume-work-queue':
      return mapPauseResumeWorkQueueResponse(response)
    case 'pause-work-pool':
    case 'resume-work-pool':
      return mapPauseResumeWorkPoolResponse(response)
    case 'cancel-flow-run':
      return response
    default:
      const exhaustive: never = response
      throw new Error(`Automation action type is missing case for: ${(exhaustive as AutomationActionResponse).type}`)
  }
}

export const mapAutomationActionToAutomationActionRequest: MapFunction<AutomationAction, AutomationActionRequest> = function(request) {
  switch (request.type) {
    case 'pause-deployment':
    case 'resume-deployment':
      return mapPauseResumeDeploymentRequest(request)
    case 'pause-work-queue':
    case 'resume-work-queue':
      return mapPauseResumeWorkQueueRequest(request)
    case 'pause-work-pool':
    case 'resume-work-pool':
      return mapPauseResumeWorkPoolRequest(request)
    case 'cancel-flow-run':
      return request
    default:
      const exhaustive: never = request
      throw new Error(`Automation action type is missing case for: ${(exhaustive as AutomationActionResponse).type}`)
  }
}

function mapPauseResumeDeploymentRequest(action: AutomationActionPauseDeployment | AutomationActionResumeDeployment): AutomationActionPauseDeploymentResponse | AutomationActionResumeDeploymentResponse {
  if (!action.deploymentId) {
    return {
      type: action.type,
      source: 'inferred',
    }
  }

  return {
    type: action.type,
    source: 'selected',
    deployment_id: action.deploymentId,
  }
}

function mapPauseResumeDeploymentResponse(action: AutomationActionPauseDeploymentResponse | AutomationActionResumeDeploymentResponse): AutomationActionPauseDeployment | AutomationActionResumeDeployment {
  if (action.source === 'inferred') {
    return {
      type: action.type,
      deploymentId: null,
    }
  }

  return {
    type: action.type,
    deploymentId: action.deployment_id,
  }
}

function mapPauseResumeWorkQueueRequest(action: AutomationActionPauseWorkQueue | AutomationActionResumeWorkQueue): AutomationActionPauseWorkQueueResponse | AutomationActionResumeWorkQueueResponse {
  if (!action.workQueueId) {
    return {
      type: action.type,
      source: 'inferred',
    }
  }

  return {
    type: action.type,
    source: 'selected',
    work_queue_id: action.workQueueId,
  }
}

function mapPauseResumeWorkQueueResponse(action: AutomationActionPauseWorkQueueResponse | AutomationActionResumeWorkQueueResponse): AutomationActionPauseWorkQueue | AutomationActionResumeWorkQueue {
  if (action.source === 'inferred') {
    return {
      type: action.type,
      workQueueId: null,
    }
  }

  return {
    type: action.type,
    workQueueId: action.work_queue_id,
  }
}

function mapPauseResumeWorkPoolRequest(action: AutomationActionPauseWorkPool | AutomationActionResumeWorkPool): AutomationActionPauseWorkPoolResponse | AutomationActionResumeWorkPoolResponse {
  if (!action.workPoolId) {
    return {
      type: action.type,
      source: 'inferred',
    }
  }

  return {
    type: action.type,
    source: 'selected',
    work_pool_id: action.workPoolId,
  }
}

function mapPauseResumeWorkPoolResponse(action: AutomationActionPauseWorkPoolResponse | AutomationActionResumeWorkPoolResponse): AutomationActionPauseWorkPool | AutomationActionResumeWorkPool {
  if (action.source === 'inferred') {
    return {
      type: action.type,
      workPoolId: null,
    }
  }

  return {
    type: action.type,
    workPoolId: action.work_pool_id,
  }
}