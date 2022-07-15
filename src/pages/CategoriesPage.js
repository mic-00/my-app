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
                {this.props.categories.map((c, i) =>
                    <CategoryCard key={i} title={c} />
                )}
            </Content>
        </Layout>;
    }
}

export default CategoriesPage;