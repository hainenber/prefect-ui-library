export type CollectionFlowResponse = {
  description: {
    summary: string,
    returns: string,
    examples: string[],
  },
  documentation_url: string,
  entrypoint: string,
  install_command: string,
  logo_url: string,
  name: string,
  parameters: unknown,
  path_containing_flow: string,
  repo_url: string,
  slug: string,
}