import { useDispatch } from "react-redux"
import { useLazyQuery, useMutation } from "@apollo/client"
import { createAlertMessage } from "../slicers/alertMessageSlice"

export const useFetchingMethod = (gqlType: any, setState?: any) => {
  const dispatch = useDispatch()
  const fetchingMethod = gqlType.definitions[0].operation === "mutation" ? (useMutation as any) : (useLazyQuery as any)

  const [lazyQueryMethod, { loading, error, data }] = fetchingMethod(gqlType, {
    onCompleted: (data: any) => {
      if (!setState) return
      console.log(setState)
      setState.name === "actionCreator" ? dispatch(setState(data)) : setState(data)
    },
    onError: (error: any) => {
      console.log(error)
      dispatch(
        createAlertMessage({
          title: `Ha ocurrido un error inesperado`,
          description: error.message,
          type: "error",
          visible: true
        })
      )
    }
  })

  return { lazyQueryMethod, loading, error, data }
}
