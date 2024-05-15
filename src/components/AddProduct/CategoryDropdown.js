import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const CategoryDropdown = ({ categories, value, onChange }) => {
  return (
    <Select
      placeholder="Select Category"
      onChange={onChange}
      value={value}
    >
      {categories.map(category => (
        <Option key={category} value={category}>{category}</Option>
      ))}
    </Select>
  );
};

export default CategoryDropdown;
