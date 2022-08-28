export default function Button({text, callback}: {text: string, callback?: Function}) {
  return (
    <button className="button" onClick={() => callback} >{text}</button>
  )
}