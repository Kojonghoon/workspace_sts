import { Route, Routes } from "react-router-dom";
import "./App.css";
import MemberPage from "./components/page/MemberPage";

function App() {
  return (
    <>
      <Routes>
        <Route path='/member' exact={true} element={<MemberPage/>}/>
      </Routes>
    </>
  );
}

export default App;
