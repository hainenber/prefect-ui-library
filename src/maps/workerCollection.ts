import {
  BaseJobTemplateResponse,
  PrefectWorkerCollectionResponse,
  WorkerCollectionItem,
  WorkerCollectionItemResponse
} from '@/models'
import { MapFunction } from '@/services/Mapper'
import { SchemaValues, WorkerBaseJobTemplate, SchemaProperty } from '@/types/schemas'

export const mapPrefectWorkerCollectionResponseToWorkerCollectionItemArray: MapFunction<
PrefectWorkerCollectionResponse,
WorkerCollectionItem[]
> = function(source) {
  return Object.values(source).reduce<WorkerCollectionItemResponse[]>(
    (acc, package_data) => [...acc, ...Object.values(package_data)],
    [],
  ).map((worker_data) => ({
    defaultBaseJobConfiguration: worker_data.default_base_job_configuration,
    description: worker_data.description,
    documentationUrl: worker_data.documentation_url,
    installCommand: worker_data.install_command,
    logoUrl: worker_data.logo_url,
    type: worker_data.type,
  }))
}

type MapSchemaValuesSource = {
  values: SchemaValues,
  schema: WorkerBaseJobTemplate,
}

export const mapWorkerSchemaValuesToWorkerSchemaValuesRequest: MapFunction<
MapSchemaValuesSource,
WorkerBaseJobTemplate
> = function(source) {
  const { values = {}, schema } = source

  if (schema.variables !== undefined) {
    schema.variables.properties = schema.variables.properties ?? {}
  }

  const keys = Object.keys(schema.variables?.properties ?? {})

  keys.forEach((key) => {
    if (schema.variables?.properties && values[key] !== undefined) {
      const property = schema.variables.properties[key] as
        | SchemaProperty
        | undefined

      if (property !== undefined) {
        property.default = values[key]
      }
    }
  })

  return schema
}
