import React, { useState, useEffect } from 'react';
import { Table, Row, Col, Input, Select, Button, Popconfirm } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ProductFilters from './ProductFilters';
import ProductItem from './ProductItem';
import EditProductModal from '../EditProduct/EditProductModal';
import { products as mockProducts } from '../data';


const { Option } = Select;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchDescription, setSearchDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
    const categoriesSet = new Set(mockProducts.map(product => product.category));
    setCategories(Array.from(categoriesSet));
  };

  useEffect(() => {
    let filteredData = mockProducts.filter(product => {
      if (searchName && !product.name.toLowerCase().includes(searchName.toLowerCase())) {
        return false;
      }
      if (searchDescription && !product.description.toLowerCase().includes(searchDescription.toLowerCase())) {
        return false;
      }
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }
      return true;
    });
    setFilteredProducts(filteredData);
  }, [searchName, searchDescription, selectedCategory]);

  const handleCategoryChange = value => {
    setSelectedCategory(value);
  };

  const handleEdit = product => {
    setSelectedProduct(product);
    setEditModalVisible(true);
  };

  const handleDelete = id => {
    // Perform delete operation here
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
  };

  const handleSave = values => {
    // Perform save operation here
    const updatedProducts = products.map(product => {
      if (product.id === values.id) {
        return { ...product, ...values };
      }
      return product;
    });
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    setEditModalVisible(false);
  };

  const handleCancel = () => {
    setEditModalVisible(false);
  };

  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <h2>Product List</h2>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Button type="primary">
            <Link to="/add">Add Product</Link>
          </Button>
        </Col>
      </Row>
      <ProductFilters
        categories={categories}
        onSearchName={setSearchName}
        onSearchDescription={setSearchDescription}
        onCategoryChange={handleCategoryChange}
      />
      <Table dataSource={filteredProducts} columns={columns} rowKey="id" />
      <EditProductModal
        visible={editModalVisible}
        onCancel={handleCancel}
        onSave={handleSave}
        product={selectedProduct}
        categories={categories}
      />
    </div>
  );
};

export default ProductList;
