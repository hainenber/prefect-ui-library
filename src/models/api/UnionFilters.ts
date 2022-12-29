import { DeploymentSortValues, FlowRunSortValues, FlowSortValues, TaskRunSortValues } from '@/types/SortOptionTypes'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace FilterOperation {
  /** A list where results will be returned only if they match all the values in the list */
  export type all_ = { all_?: string[] }

  /** A list where results will be returned if any of the values are included in the list */
  export type any_ = { any_?: string[] }
  export type like_ = { like_?: string }

  /** A list where results will be returned if values don't match any in the list */
  export type not_any_ = { not_any_?: string[] }

  /** Matches on boolean equality */
  export type eq_ = { eq_?: boolean }

  /** Matches on boolean equality */
  export type exists_ = { exists_?: boolean }

  /** If true, returns results whose key is null */
  export type is_null_ = { is_null_?: boolean }

  /** A date-time string to include results starting at or before this time */
  export type before_ = { before_?: string }

  /** A date-time string to include results starting at or after this time */
  export type after_ = { after_?: string }

  export type operator_ = 'and_' | 'or_'
}

export interface Filter {
  id?: FilterOperation.any_,
  name?: FilterOperation.any_ & FilterOperation.like_,
  tags?: FilterOperation.all_ & FilterOperation.is_null_,
  operator?: FilterOperation.operator_,
}

export interface DeploymentFilter extends Filter {
  is_schedule_active?: FilterOperation.eq_,
}

export type FlowFilter = Filter

export type StateFilter = {
  type?: FilterOperation.any_,
  name?: FilterOperation.any_,
  operator?: FilterOperation.operator_,
}

export type TimeFrameFilter = FilterOperation.before_ & FilterOperation.after_

export interface FlowRunFilter extends Filter {
  id?: FilterOperation.any_ & FilterOperation.not_any_,
  deployment_id?: FilterOperation.any_ & FilterOperation.is_null_,
  state?: StateFilter,
  flow_version?: FilterOperation.any_,
  work_queue_name?: FilterOperation.any_,
  /**
   * Flow run actual starts
   */
  start_time?: TimeFrameFilter,
  /**
   * Flow run scheduled starts
   */
  expected_start_time?: TimeFrameFilter,
  next_scheduled_start_time?: TimeFrameFilter,
  parent_task_run_id?: FilterOperation.any_ & FilterOperation.is_null_,
  task_runs?: TaskRunFilter,
}

export interface TaskRunFilter extends Filter {
  id?: FilterOperation.any_ & FilterOperation.not_any_,
  state?: StateFilter,
  start_time?: TimeFrameFilter,
  subflow_runs?: FilterOperation.exists_,
}

export type PaginatedFilter = {
  limit?: number,
  offset?: number,
}

export type RunSort<T extends string> = PaginatedFilter & {
  sort?: T,
}

export type DeploymentsFilter = { deployments?: DeploymentFilter }
export type FlowsFilter = { flows?: FlowFilter }
export type TaskRunsFilter = { task_runs?: TaskRunFilter }
export type FlowRunsFilter = { flow_runs?: FlowRunFilter }

export type UnionFilters =
  & FlowsFilter
  & DeploymentsFilter
  & FlowRunsFilter
  & TaskRunsFilter
  & RunSort<FlowSortValues | DeploymentSortValues | FlowRunSortValues | TaskRunSortValues>

interface Historical {
  history_start: string,
  history_end: string,
  history_interval_seconds: number,
}

export type FlowRunsHistoryFilter = UnionFilters & Historical