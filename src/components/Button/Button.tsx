export default function Button({ text, callback, size }: { text: string; callback?: any; size: string }) {
  return (
    <button
      className="button"
      onClick={callback}
      style={size === "big" ? { width: "100%" } : { width: "max-content", padding: "10px", fontSize: "12px" }}
    >
      {text}
    </button>
  )
}
