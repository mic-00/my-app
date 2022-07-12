import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Layout } from 'antd';
import SurveysPage from './pages/SurveysPage';
import CategoriesPage from './pages/CategoriesPage';
import MySider from './layout/MySider';

class App extends React.Component {
    render() {
        return <BrowserRouter>
            <Layout>
                <MySider />
                <Routes>
                    <Route path="/" element={<SurveysPage />} />
                    <Route path="/categories" element={<CategoriesPage />} />
                    <Route path="/categories/Other" element={<SurveysPage category="Other" />} />
                </Routes>
            </Layout>
        </BrowserRouter>;
    }
}

export default App;