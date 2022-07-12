import React from 'react'
import { Layout } from 'antd';
import CategoryCard from "../components/CategoryCard";
import MyHeader from "../layout/MyHeader";

const { Content } = Layout;

class CategoriesPage extends React.Component {
    render() {
        return <Layout>
            <MyHeader title="Categorie" />
            <Content>
                <CategoryCard title="Politic" />
                <CategoryCard title="Eating and drinking" />
                <CategoryCard title="Free time" />
                <CategoryCard title="Study" />
                <CategoryCard title="Other" />
            </Content>
        </Layout>;
    }
}

export default CategoriesPage;