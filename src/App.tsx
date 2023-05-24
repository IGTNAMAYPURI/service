import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'mobx-react'

// pages
import { Applications, Resources, Raw, NoPage } from "./pages";

// store
import appStore from "./store/appStore";
import Layout from "./components/Layout";

import "./App.css"

function App() {

  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="" element={<Raw />} />
            <Route path="/raw/:type/:key" element={<Raw />} />
            <Route path="resources" element={<Resources />} />
            <Route path="applications" element={<Applications />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </Layout>
      </BrowserRouter >
    </Provider >
  )
}

export default App
