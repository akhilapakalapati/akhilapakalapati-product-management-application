import React from 'react';
import { Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ProductItem = ({ product, onEdit, onDelete }) => {
  const handleEdit = () => {
    onEdit(product);
  };

  const handleDelete = () => {
    onDelete(product.id);
  };

  return (
    <tr>
      <td>{product.category}</td>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>${product.price.toFixed(2)}</td>
      <td>
        <Button type="primary" icon={<EditOutlined />} onClick={handleEdit} style={{ marginRight: '8px' }}>
          Edit
        </Button>
        <Popconfirm
          title="Are you sure to delete this product?"
          onConfirm={handleDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger" icon={<DeleteOutlined />}>
            Delete
          </Button>
        </Popconfirm>
      </td>
    </tr>
  );
};

export default ProductItem;
