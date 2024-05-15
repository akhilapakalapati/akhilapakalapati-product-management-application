import React from 'react';
import { Row, Col, Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const ProductFilters = ({ categories, onSearchName, onSearchDescription, onCategoryChange }) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={8}>
        <Input
          placeholder="Search by Name"
          prefix={<SearchOutlined />}
          onChange={e => onSearchName(e.target.value)}
        />
      </Col>
      <Col span={8}>
        <Input
          placeholder="Search by Description"
          prefix={<SearchOutlined />}
          onChange={e => onSearchDescription(e.target.value)}
        />
      </Col>
      <Col span={8}>
        <Select
          placeholder="Select Category"
          style={{ width: '100%' }}
          onChange={onCategoryChange}
        >
          <Option value="">All Categories</Option>
          {categories.map(category => (
            <Option key={category} value={category}>{category}</Option>
          ))}
        </Select>
      </Col>
    </Row>
  );
};

export default ProductFilters;
