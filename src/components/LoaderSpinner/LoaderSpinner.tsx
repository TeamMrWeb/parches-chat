import { Oval } from "react-loader-spinner"

export default function LoaderSpinner() {
  return (
    <div className="loader-spinner">
      <Oval
        height={100}
        width={100}
        color="#dd4ec6"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#8d4fc9"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
      <p>Cargando Parches Chat...</p>
    </div>
  )
}
