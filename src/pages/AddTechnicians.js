import React, { useState, useContext } from "react"

import IdentityContext from "../../IdentityContext"

import LoginCard from "./app/components/LoginCard"
import WelcomeCard from "../WelcomeCard"
import Styles from "./app/components/Dash.module.css"
import Layout from "./layout/layout"

import AddTechForm from "../Components/AddTechnician/AddTechForm"

function AddTechnicians() {
  const { user } = useContext(IdentityContext)
  const [autoHeight] = useState(false)

  return (
    <div
      className={`bg-secondary text-light ${
        autoHeight ? Styles.auto : Styles.fh
      }`}
    >
      <Layout />
      {user.email ? <WelcomeCard /> : <LoginCard />}
      <div className="container-fluid" style={{ paddingLeft: "2.5%" }}>
        <AddTechForm />
      </div>
      {/* {Menustatus ? <MenuCar /> : null} */}
    </div>
  )
}

export default AddTechnicians
