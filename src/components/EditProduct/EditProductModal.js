import React from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const { Option } = Select;

const EditProductModal = ({ visible, onCancel, onSave, product, categories }) => {
  const formik = useFormik({
    initialValues: {
      id: product ? product.id : '', // Check if product is null
      category: product ? product.category : '',
      name: product ? product.name : '',
      description: product ? product.description : '',
      price: product ? product.price.toString() : '',
    },
    validationSchema: Yup.object({
      category: Yup.string().required('Category is required'),
      name: Yup.string().required('Name is required'),
      description: Yup.string().required('Description is required'),
      price: Yup.number().required('Price is required').positive('Price must be positive').nullable(),
    }),
    onSubmit: values => {
      onSave(values);
    },
  });

  return (
    <Modal
      title="Edit Product"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={formik.handleSubmit}>
          Save
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Form.Item label="Category" required hasFeedback validateStatus={formik.errors.category ? 'error' : ''}>
          <Select
            placeholder="Select Category"
            onChange={value => formik.setFieldValue('category', value)}
            value={formik.values.category}
          >
            {categories.map(category => (
              <Option key={category} value={category}>{category}</Option>
            ))}
          </Select>
          {formik.errors.category ? <span style={{ color: 'red' }}>{formik.errors.category}</span> : null}
        </Form.Item>
        <Form.Item label="Name" required hasFeedback validateStatus={formik.errors.name ? 'error' : ''}>
          <Input
            placeholder="Enter Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            name="name"
          />
          {formik.errors.name ? <span style={{ color: 'red' }}>{formik.errors.name}</span> : null}
        </Form.Item>
        <Form.Item label="Description" required hasFeedback validateStatus={formik.errors.description ? 'error' : ''}>
          <Input.TextArea
            placeholder="Enter Description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            name="description"
          />
          {formik.errors.description ? <span style={{ color: 'red' }}>{formik.errors.description}</span> : null}
        </Form.Item>
        <Form.Item label="Price" required hasFeedback validateStatus={formik.errors.price ? 'error' : ''}>
          <Input
            type="number"
            placeholder="Enter Price"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
            name="price"
          />
          {formik.errors.price ? <span style={{ color: 'red' }}>{formik.errors.price}</span> : null}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProductModal;
