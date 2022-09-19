import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { incrementProgressLoader, stopLoader } from "../../slicers/loaderSlice"

export default function Loader({ progress }: { progress: any }) {
  const loader = useSelector((state: any) => state.loader)
  const ref = useRef<HTMLDivElement | null>(null)
  const [index, setIndex] = useState(2)
  const dispatch = useDispatch()

  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
  }

  const progressIncrement = (i: number) => {
    let division = 90 / i
    let result = Math.abs(division - 90)
    setIndex(index + 1)
    setTimeout(() => {
      if (ref.current?.style.width !== "100%") dispatch(incrementProgressLoader(result))
      else
        setTimeout(() => {
          dispatch(stopLoader())
        }, 600)
    }, getRandomInt(500, 600))
  }

  useEffect(() => {
    progressIncrement(index)
  }, [loader.progress])

  return (
    <section className="loader">
      <div className="loader__progress" style={{ width: `${progress}%` }} ref={ref}></div>
    </section>
  )
}
