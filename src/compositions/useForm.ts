import { FormContext, FormOptions, useForm as useVeeForm } from 'vee-validate'

// using any because that's what vee-validate's useForm uses
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useForm<T extends Record<string, any>>(options?: FormOptions<T>): FormContext<T> {
  const { handleSubmit, ...rest } = useVeeForm(options)

  const submit: typeof handleSubmit = (onSuccess, onError) => {
    return handleSubmit(onSuccess, async (context) => {
      if (onError) {
        onError(context)
      }


    })
  }

  return {
    ...rest,
    handleSubmit: submit,
  }
}