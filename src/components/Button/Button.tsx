export default function Button({ text, callback, size }: { text: string; callback?: any; size: string }) {
  return size === "big" ? (
    <button className="button" onClick={callback} style={{ width: "100%" }}>
      {text}
    </button>
  ) : (
    <button className="button" onClick={callback} style={{ width: "max-content", padding: "10px", fontSize: "12px" }}>
      {text}
    </button>
  )
}
