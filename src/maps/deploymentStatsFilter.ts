import { subSeconds } from 'date-fns'
import { FlowRunsFilter, TaskRunsFilter } from '@/models'
import { MapFunction } from '@/services/Mapper'
import { DeploymentStatsFilter } from '@/types/deployment'

export const mapDeploymentStatsFilterToFlowRunsFilter: MapFunction<DeploymentStatsFilter, FlowRunsFilter> = function(source) {
  const now = new Date()

  const filter: FlowRunsFilter = {
    deployments: {
      id: [source.deploymentId],
    },
    flowRuns: {
      expectedStartTimeAfter: subSeconds(now, source.timeSpanInSeconds),
      expectedStartTimeBefore: now,
    },
  }

  return filter
}

export const mapDeploymentStatsFilterToTaskRunsFilter: MapFunction<DeploymentStatsFilter, TaskRunsFilter> = function(source) {
  const now = new Date()

  return {
    flows: {
      id: [source.deploymentId],
    },
    taskRuns: {
      startTimeAfter: subSeconds(now, source.timeSpanInSeconds),
      startTimeBefore: now,
    },
  }
}


// import { subSeconds } from 'date-fns'
// import { DeploymentRunsFilter, TaskRunsFilter } from '@/models'
// import { MapFunction } from '@/services/Mapper'
// import { FlowStatsFilter } from '@/types/flow'

// export const mapFlowStatsFilterToFlowRunsFilter: MapFunction<FlowStatsFilter, FlowRunsFilter> = function(source) {
//   const now = new Date()

//   const filter: FlowRunsFilter = {
//     flows: source.flowId ? {
//       id: [source.flowId],
//     } : undefined,
//     deployments: source.deploymentId ? {
//       id: [source.deploymentId],
//     } : undefined,
//     flowRuns: {
//       expectedStartTimeAfter: subSeconds(now, source.timeSpanInSeconds),
//       expectedStartTimeBefore: now,
//     },
//   }

//   return filter
// }

// export const mapFlowStatsFilterToTaskRunsFilter: MapFunction<FlowStatsFilter, TaskRunsFilter> = function(source) {
//   const now = new Date()

//   return {
//     flows: source.flowId ? {
//       id: [source.flowId],
//     } : undefined,
//     deployments: source.deploymentId ? {
//       id: [source.deploymentId],
//     } : undefined,
//     taskRuns: {
//       startTimeAfter: subSeconds(now, source.timeSpanInSeconds),
//       startTimeBefore: now,
//     },
//   }
// }
