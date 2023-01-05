import { FlowRunSortValues, FlowSortValues, TaskRunSortValues } from '@/types/SortOptionTypes'

/** A list where results will be returned only if they match all the values in the list */
type all_ = { all_?: string[] }

/** A list where results will be returned if any of the values are included in the list */
type any_ = { any_?: string[] }
type like_ = { like_?: string }

/** A list where results will be returned if values don't match any in the list */
type not_any_ = { not_any_?: string[] }

/** Matches on boolean equality */
type eq_ = { eq_?: boolean }

/** Matches on boolean equality */
type exists_ = { exists_?: boolean }

/** If true, returns results whose key is null */
type is_null_ = { is_null_?: boolean }

/** A date-time string to include results starting at or before this time */
type before_ = { before_?: string }

/** A date-time string to include results starting at or after this time */
type after_ = { after_?: string | Date }

type operator_ = 'and_' | 'or_'

export interface Filter {
  id?: any_,
  name?: any_ & like_,
  tags?: all_ & is_null_,
  operator?: operator_,
}

export interface DeploymentFilter extends Filter {
  is_schedule_active?: eq_,
}

export interface FlowFilter extends Filter {
  flow_runs?: FlowRunFilter,
}

export type StateFilter = {
  type?: any_,
  name?: any_,
  operator?: operator_,
}

export type TimeFrameFilter = before_ & after_

export interface FlowRunFilter extends Filter {
  id?: any_ & not_any_,
  deployment_id?: any_ & is_null_,
  state?: StateFilter,
  flow_version?: any_,
  work_queue_name?: any_,
  /**
   * Flow run actual starts
   */
  start_time?: TimeFrameFilter,
  /**
   * Flow run scheduled starts
   */
  expected_start_time?: TimeFrameFilter,
  next_scheduled_start_time?: TimeFrameFilter,
  parent_task_run_id?: any_ & is_null_,
  task_runs?: TaskRunFilter,
}

export interface TaskRunFilter extends Filter {
  id?: any_ & not_any_,
  state?: StateFilter,
  start_time?: TimeFrameFilter,
  subflow_runs?: exists_,
}

export interface WorkerPoolFilter extends Omit<Filter, 'tags' | 'name'> {
  name?: any_,
  type?: any_,
}

export type PaginatedWorkerPoolFilter = {
  worker_pools?: WorkerPoolFilter,
  limit?: number,
  offset?: number,
}

export interface WorkerPoolQueueFilter extends Omit<Filter, 'tags' | 'name'> {
  name?: any_,
}

export type PaginatedFilter = {
  limit?: number,
  offset?: number,
}

type StringKeys<T extends Filter> = Extract<keyof T, string>
type Sortable<T extends Filter> = PaginatedFilter & {
  sort?: `${Uppercase<StringKeys<T>>}_${'ASC' | 'DESC'}`,
}

type RunSort<T extends string> = PaginatedFilter & {
  sort?: T,
}

export type DeploymentsFilter = { deployments?: DeploymentFilter }
export type FlowsFilter = { flows?: FlowFilter }
export type TaskRunsFilter = { task_runs?: TaskRunFilter }
export type FlowRunsFilter = { flow_runs?: FlowRunFilter }
export type WorkerPoolsFilter = { worker_pools?: WorkerPoolFilter }
export type WorkerPoolQueuesFilter = { worker_pool_queues?: WorkerPoolQueueFilter }

export type UnionFilters =
  & FlowsFilter
  & DeploymentsFilter
  & FlowRunsFilter
  & TaskRunsFilter
  & WorkerPoolsFilter
  & WorkerPoolQueuesFilter
  & (Sortable<FlowFilter & DeploymentFilter> | RunSort<FlowSortValues | FlowRunSortValues | TaskRunSortValues>)

interface Historical {
  history_start: string,
  history_end: string,
  history_interval_seconds: number,
}

export type FlowRunsHistoryFilter = UnionFilters & Historical