import { MockApi } from '@/../demo/services/MockApi'
import { FlowRun, GraphNode, RunHistory, StateUpdate, TimelineNode, FlowRunsHistoryFilter, UnionFilters } from '@/models'
import { IWorkspaceFlowRunsApi, mocker } from '@/services'

export class MockWorkspaceFlowRunsApi extends MockApi implements IWorkspaceFlowRunsApi {

  public async getFlowRun(flowRunId: string): Promise<FlowRun> {
    return await this.flowRuns.get(flowRunId)
  }

  public async getFlowRuns(filter: UnionFilters): Promise<FlowRun[]> {
    if (Object.keys(filter).length) {
      console.warn('MockWorkspaceFlowRunsApi has not implemented the filter argument of the getFlowRuns method')
    }

    return await this.flowRuns.getAll()
  }

  public async getFlowRunsCount(filter: UnionFilters): Promise<number> {
    if (Object.keys(filter).length) {
      console.warn('MockWorkspaceFlowRunsApi has not implemented the filter argument of the getFlowRunsCount method')
    }

    return await this.flowRuns.count()
  }

  public getFlowRunsHistory(filter: FlowRunsHistoryFilter): Promise<RunHistory[]> {
    if (Object.keys(filter).length) {
      console.warn('MockWorkspaceFlowRunsApi has not implemented the filter argument of the getFlowRunsCount method')
    }

    throw new Error('MockWorkspaceFlowRunsApi has not implemented the getFlowRunsHistory method')
  }

  public getFlowRunsGraph(): Promise<GraphNode[]> {
    throw new Error('MockWorkspaceFlowRunsApi has not implemented the getFlowRunGraph method')
  }

  public getFlowRunsTimeline(): Promise<TimelineNode[]> {
    throw new Error('MockWorkspaceFlowRunsApi has not implemented the getFlowRunGraph method')
  }

  public async retryFlowRun(): Promise<void> {
    return await Promise.resolve()
  }

  public async setFlowRunState(flowRunId: string, body: StateUpdate): Promise<void> {
    const flowRun = this.flowRuns.get(flowRunId)
    flowRun.state = mocker.create('state', [body.state])
    flowRun.stateType = flowRun.state.type

    return await Promise.resolve()
  }

  public resumeFlowRun(flowRunId: string): Promise<void> {
    const flowRun = this.flowRuns.get(flowRunId)
    flowRun.stateType = 'running'

    this.flowRuns.patch(flowRunId, flowRun)

    return Promise.resolve()
  }

  public async deleteFlowRun(flowRunId: string): Promise<void> {
    return await this.flowRuns.delete(flowRunId)
  }

}
