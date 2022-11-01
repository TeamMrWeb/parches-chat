import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { createAlertMessage } from "../../slicers/alertMessageSlice"
import { useFetchingMethod } from "../../apollo/useFetchingMethod"
import { SEND_EMAIL_VERIFICATION } from "../../graphql/queries"

export const useEmailVerification = () => {
  const [buttonCooldown, setButtonCooldown] = useState(
    JSON.parse(localStorage.getItem("cooldown") || "false")
      ? JSON.parse(localStorage.getItem("cooldown") || "false")
      : 0
  )
  const { lazyQueryMethod: sendVerificationToEmail, error } =
    useFetchingMethod(SEND_EMAIL_VERIFICATION)
  const dispatch = useDispatch()

  useEffect(() => {
    decreseCooldown()
  }, [])

  useEffect(() => {
    if (!error && buttonCooldown === 300) {
      dispatch(
        createAlertMessage({
          title: `Se ha enviado un correo de verificación a tu correo electrónico`,
          type: "success",
          visible: true
        })
      )
    }
    return () => {
      localStorage.setItem("cooldown", JSON.stringify(buttonCooldown))
    }
  }, [error, buttonCooldown])

  const decreseCooldown = () => {
    setInterval(() => setButtonCooldown((prev: number) => prev - 1), 1000)
  }

  const sendEmailVerification = (email: string) => {
    setButtonCooldown(300)
    sendVerificationToEmail({ variables: { email } }).then(() => decreseCooldown())
  }

  const convertTimeToMinutesAndSeconds = (time: number) => {
    const minutes = Math.floor(time / 60)
    const rawSeconds = time - minutes * 60
    const seconds = rawSeconds < 10 ? `0${rawSeconds}` : rawSeconds
    return `0${minutes}:${seconds}`
  }

  return { sendEmailVerification, buttonCooldown, convertTimeToMinutesAndSeconds }
}
