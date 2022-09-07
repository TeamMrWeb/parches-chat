import { useLazyQuery } from "@apollo/client"
import { useDispatch } from "react-redux"
import { createAlertMessage } from "../slicers/alertMessageSlice"

export const useLazyQueries = (gqlType: any, setState: any) => {
  const dispatch = useDispatch()

  const [lazyQueryMethod, { loading, error, data }] = useLazyQuery(gqlType, {
    onCompleted: data => {
      dispatch(setState(data))
    },
    onError: error => {
      console.log(error)
      dispatch(
        createAlertMessage({
          title: `Ha ocurrido un error inesperado`,
          description: error,
          type: "error",
          visible: true
        })
      )
    }
  })

  return { lazyQueryMethod, loading, error, data }
}
