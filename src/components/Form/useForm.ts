import React, { useEffect, useState } from "react"

interface formData {
  email: string
  password: string
}

export const useForm = () => {
  const [form, setForm] = useState<formData>({email: "", password: ""})

  useEffect(() => {
    console.log(form)
  }, [form])
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = (e.currentTarget.elements[0] as HTMLInputElement).value 
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value
    setForm({...form, email, password})
  }

  return {handleSubmit, form}
}