import { Routes, Route } from 'react-router-dom';
import styled from './Main.module.css';
import TheftReportForm from './TheftReportForm/TheftReportForm';
import SignInForm from './SignInForm/SignInForm';
import SignUpForm from './SignUpForm/SignUpForm';
import TheftCasesTable from './TheftCasesTable/TheftCasesTable';

function Main() {
  return (
    <div className={styled.wrap}>
      <Routes>
        <Route path='/' element={<TheftReportForm />} />
        <Route path='/signUp' element={<SignUpForm />} />
        <Route path='/signIn' element={<SignInForm />} />
        <Route path='/theftTable' element={<TheftCasesTable />} />
      </Routes>
    </div>
  );
}

export default Main;
