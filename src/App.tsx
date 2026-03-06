import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Home } from '@/pages/Home';
import { Settings } from '@/pages/Settings';
import FundDetail from '@/pages/FundDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout><Outlet /></Layout>}>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="/fund/:code" element={<FundDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
