import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToHash() {
  const location = useLocation();

  useEffect(function () {
    if (location.hash === "") {
      return
    }
    const id = location.hash.slice(1)
    const element = document.getElementById(id)
    if (element !== null) {
      element.scrollIntoView()
    }

    console.log(location)
    console.log(location.hash)
    console.log(id)
    console.log(element)

  }, [location])
  return null
}

export default ScrollToHash
